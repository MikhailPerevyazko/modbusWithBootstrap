use rand::Rng;
use serde_json::json;
use std::collections::BTreeMap;
use std::sync::{Arc, RwLock};
use std::thread;
use std::time::Duration;
use tauri::Emitter;
use std::sync::atomic::{AtomicBool, Ordering};

struct SharedData {
    complect_number: Arc<RwLock<usize>>,
    data: Arc<RwLock<BTreeMap<usize, BTreeMap<String, f32>>>>,
    started: Arc<AtomicBool>
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let shared_data = SharedData::new_with_random_data();
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(shared_data)
        .invoke_handler(tauri::generate_handler![
            set_complect_number,
            start_worker
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

impl SharedData {
    /// Устанавливает новый номер комплекта
    /// Возвращает Result:
    /// - Ok(()) если запись прошла успешно
    /// - Err(String) с сообщением об ошибке, если не удалось получить блокировку
    pub fn set_complect_number(&self, new_number: usize) -> Result<(), String> {
        let mut complect = self
            .complect_number
            .write()
            .map_err(|e| format!("Failed to acquire write lock: {}", e))?;

        *complect = new_number;
        Ok(())
    }

    /// Создаёт новую структуру SharedData с инициализированными случайными данными
    pub fn new_with_random_data() -> Self {
        let mut rng = rand::rng();
        let mut data = BTreeMap::new();

        // Создаём 6 комплектов (0..6)
        for complect in 0..6 {
            let mut complect_data = BTreeMap::new();
            // Генерируем случайное количество элементов (1..30)
            let item_count = 30;

            // Заполняем случайными данными
            for i in 0..item_count {
                let key = format!("id {}",i+complect);
                let value = rng.random_range(0.0..100.0);
                complect_data.insert(key, value);
            }

            data.insert(complect, complect_data);
        }

        SharedData {
            complect_number: Arc::new(RwLock::new(0)),
            data: Arc::new(RwLock::new(data)),
            started: Arc::new(AtomicBool::new(false),)
        }
    }
}

#[tauri::command]
fn set_complect_number(state: tauri::State<SharedData>, complect: usize) -> Result<(), String> {
    match state.set_complect_number(complect) {
        Ok(_) => Ok(()),
        Err(err) => Err(format!("{err}")),
    }
}

#[tauri::command]
async fn start_worker(
    app: tauri::AppHandle,
    state: tauri::State<'_, SharedData>,
) -> Result<(), String> {
    if state.started.load(Ordering::Relaxed){
     return Ok(())
    }
    // Клонируем Arc-ссылки из состояния
    let complect_num = Arc::clone(&state.complect_number);
    let data = Arc::clone(&state.data);
    let started =state.started.clone();
    start_data_worker(
        complect_num,
        data,
        started,
        Arc::new(app), // AppHandle в Arc для передачи в поток
    );

    Ok(())
}

pub fn start_data_worker(
    complect_num: Arc<RwLock<usize>>,
    data: Arc<RwLock<BTreeMap<usize, BTreeMap<String, f32>>>>,
    started: Arc<AtomicBool>,
    app: Arc<tauri::AppHandle>,
) -> thread::JoinHandle<()> {
    thread::spawn(move || {
        let mut rng = rand::rng();
        started.store(true, Ordering::Relaxed);

        loop {
            thread::sleep(Duration::from_secs(1));

            // Чтение номера комплекта
            let current_complect = match complect_num.read() {
                Ok(num) => *num,
                Err(e) => {
                    eprintln!("Ошибка чтения complect_number: {}", e);
                    continue;
                }
            };

            // Обновление данных
            let updated_data = {
                let mut data_lock = match data.write() {
                    Ok(lock) => lock,
                    Err(e) => {
                        eprintln!("Ошибка блокировки данных: {}", e);
                        continue;
                    }
                };

                if let Some(complect_data) = data_lock.get_mut(&current_complect) {
                    for value in complect_data.values_mut() {
                        *value = rng.random_range(0.0..100.0);
                    }
                    complect_data.clone() // Клонируем для отправки
                } else {
                    continue;
                }
            };

            // Отправка события
            let payload = json!({
                "complect": current_complect,
                "data": updated_data
            });

            if let Err(e) = app.emit("new-data", payload) {
                eprintln!("Ошибка отправки события: {}", e);
            }
        }
    })
}

