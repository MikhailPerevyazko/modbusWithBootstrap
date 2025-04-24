import '../scss/styles.scss';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';
import { ParameterManager } from "./parametersManager";


function setCurrentTime() {
  let now: Date = new Date();
  let parsedToStringNow: string = now.toString();
  
  let newNow: string = parsedToStringNow.substring(0, parsedToStringNow.length - 37);
  let timeField = document.getElementById('currentTimeDate');
  
  if (timeField) {
      timeField.textContent = newNow;
    } else {
        console.log("Элемент не найден!")
    }
}

const manager: ParameterManager = new ParameterManager();
export let counter: number = 0;

function createParameterTable(manager: ParameterManager, iterator: number): string {
    const tableData = manager.getTableFormat();
    
    let html = '<div><table class="table table-dark table-striped-columns" id="parametersTable">';
    
    html += '<thead><tr>';
    html += `<th>ID</th><th>Value</>`
    html += '</tr></thead>';
    html += '<tbody>';
    
    tableData.ids.forEach((id, index) => {
        const value = tableData.values[index];
        html += `<tr><td>${id}</td><td>${value+iterator}</td></tr>`
    })
    
    html += '</tbody>';
    html += '</table></div>';
    
    counter += 1;
    
    return html;
}

function updateTableAndInfoField() {
    const tableHtml = createParameterTable(manager, counter);
    document.getElementById('firstTable')!.innerHTML = tableHtml
    
    let infoUpdateField = document.getElementById("infoField");
    
    if (infoUpdateField) {
        infoUpdateField.textContent = `Данные обновлены: ${counter} раз`
    } else {
        console.log('Элемент не найден!')
    }
}


interface DataUpdate {
    complect: number;
    data: Record<number, number>;
}

const setupWorkerListener = async () => {
    const unlisten = await listen<DataUpdate>('new-data', (event) => {
        const tableHtml = createTableFromData(event.payload);
        console.log(event.payload)
        document.getElementById('newTable')!.innerHTML = tableHtml
    });
    await invoke('start_worker');
    
    return unlisten;
};

// Выбрать номер в выпадающем списке
function selectDropDownNumber() {
    let selectedNumber: HTMLSelectElement = document.getElementById('number-select') as HTMLSelectElement;
    let selectedValue = selectedNumber.options[selectedNumber.selectedIndex].textContent;
    let parsedSelectValue: number = Number(selectedValue);
    
    return parsedSelectValue;
}

function getTaskData() {
    let dropDownButton = document.getElementById('drop-down-button') as HTMLButtonElement;
    
    if (dropDownButton) {
        dropDownButton.addEventListener('click', () => {
            const selectedNumber = selectDropDownNumber();
            invoke('set_complect_number', {complect: selectedNumber})
        });
    } else {
        console.error('Элемент с ID "drop-down-button" не найден!');
    }
}

function createTableFromData(data: DataUpdate) {
    let html = '<div><table class="table table-dark table-striped-columns" id="newTable">';
    
    html += '<thead><tr>';
    html += `<th>ID</th><th>Value</>`
    html += '</tr></thead>';
    html += '<tbody>';
    
    Object.entries(data.data).forEach(([id, value]) => {
        html += `<tr><td>${id}</td><td>${value}</td></tr>`
    })
    
    html += '</tbody>';
    html += '</table></div>';
    
    return html;
}

document.addEventListener("DOMContentLoaded", () => {
    setupWorkerListener();
    getTaskData()

    setInterval(() => {
        setCurrentTime();
        updateTableAndInfoField();
    }, 1000)
})


  