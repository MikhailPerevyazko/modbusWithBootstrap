// use std::{
//     collections::{BTreeMap, VecDeque},
//     sync::{Arc, Mutex},
// };

// use log::error;
// use rmodbus_client::ModBusClient;


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            // modbus_init,
            // modbus_is_connected,
            // modbus_has_got_responses,
            // modbus_get_responses,
            // modbus_push_back_task_from_str,
            // modbus_push_front_task_from_str,
            // modbus_stop,
            // my_custom_command,
            // modbus_metrics
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// #[tauri::command]
// fn modbus_init(
//     state: tauri::State<ModbusClientState>,
//     channel: usize,
//     config: String,
// ) -> Result<String, String> {
//     let mut lock = match state.0.lock() {
//         Ok(lock) => lock,
//         Err(err) => return Err(format!("{err}")),
//     };
//     match lock.get_mut(&channel) {
//         Some(item) => match item.init(&config) {
//             Ok(()) => {
//                 println!("config passed {config}");
//                 Ok(format!("config passed {config}"))
//             }
//             Err(err) => {
//                 println!("config err {err}");
//                 Err(format!("{err}"))
//             }
//         },
//         None => {
//             let mut client = ModBusClient::new();
//             match client.init(&config) {
//                 Ok(()) => {
//                     println!("config passed {config}");
//                     lock.insert(channel, client);
//                     Ok(format!("config passed {config}"))
//                 }
//                 Err(err) => {
//                     println!("config err {err}");
//                     Err(format!("{err}"))
//                 }
//             }
//         }
//     }
// }

// #[tauri::command]
// fn modbus_is_connected(state: tauri::State<ModbusClientState>, channel: usize) -> bool {
//     let lock = match state.0.lock() {
//         Ok(lock) => lock,
//         Err(err) => {
//             error!("{err}");
//             return false;
//         }
//     };
//     match lock.get(&channel) {
//         Some(item) => item.is_connected(),
//         None => false,
//     }
// }

// #[tauri::command]
// fn modbus_has_got_responses(state: tauri::State<ModbusClientState>, channel: usize) -> bool {
//     let lock = match state.0.lock() {
//         Ok(lock) => lock,
//         Err(err) => {
//             error!("{err}");
//             return false;
//         }
//     };
//     match lock.get(&channel) {
//         Some(item) => item.have_got_responses(),
//         None => false,
//     }
// }

// #[tauri::command]
// fn modbus_get_responses(
//     state: tauri::State<ModbusClientState>,
//     channel: usize,
// ) -> Option<VecDeque<String>> {
//     let lock = match state.0.lock() {
//         Ok(lock) => lock,
//         Err(err) => {
//             error!("{err}");
//             return None;
//         }
//     };
//     match lock.get(&channel) {
//         Some(item) => item.last_responses_str(),
//         None => None,
//     }
// }

// #[tauri::command]
// fn modbus_push_back_task_from_str(
//     state: tauri::State<ModbusClientState>,
//     channel: usize,
//     task: String,
// ) -> Result<(), String> {
//     let lock = match state.0.lock() {
//         Ok(lock) => lock,
//         Err(err) => {
//             error!("{err}");
//             return Err(format!("{err}"));
//         }
//     };
//     match lock.get(&channel) {
//         Some(item) => match item.push_back_task_from_str(&task) {
//             Ok(_) => Ok(()),
//             Err(err) => Err(format!("{err}")),
//         },
//         None => Err(format!("Нет такого канала")),
//     }
// }

// #[tauri::command]
// fn modbus_push_front_task_from_str(
//     state: tauri::State<ModbusClientState>,
//     channel: usize,
//     task: String,
// ) -> Result<(), String> {
//     let lock = match state.0.lock() {
//         Ok(lock) => lock,
//         Err(err) => {
//             error!("{err}");
//             return Err(format!("{err}"));
//         }
//     };
//     match lock.get(&channel) {
//         Some(item) => match item.push_front_task_from_str(&task) {
//             Ok(_) => Ok(()),
//             Err(err) => Err(format!("{err}")),
//         },
//         None => Err(format!("Нет такого канала")),
//     }
// }

// #[tauri::command]
// fn modbus_stop(state: tauri::State<ModbusClientState>, channel: usize) {
//     let lock = match state.0.lock() {
//         Ok(lock) => lock,
//         Err(err) => {
//             error!("{err}");
//             return;
//         }
//     };
//     match lock.get(&channel) {
//         Some(item) => item.stop(),
//         None => {
//             error!("Нет такого канала");
//         }
//     }
// }

// #[tauri::command]
// fn modbus_metrics(state: tauri::State<ModbusClientState>, channel: usize) -> String {
//     let lock = match state.0.lock() {
//         Ok(lock) => lock,
//         Err(err) => {
//             error!("{err}");
//             return "".to_owned();
//         }
//     };
//     match lock.get(&channel) {
//         Some(item) => item.metrics(),
//         None => {
//             error!("Нет такого канала");
//             String::new()
//         }
//     }
// }

// #[tauri::command]
// fn my_custom_command() -> String {
//     let time = chrono::Local::now();
//     format!("{:?}", time)
// }

// struct ModbusClientState(Arc<Mutex<BTreeMap<usize, ModBusClient>>>);