import '../scss/styles.scss';
// import * as bootstrap from 'bootstrap';
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
    document.getElementById('table-container')!.innerHTML = tableHtml
    
    let infoUpdateField = document.getElementById("infoField");
    
    if (infoUpdateField) {
        infoUpdateField.textContent = `Данные обновлены: ${counter} раз`
    } else {
        console.log('Элемент не найден!')
    }
}


document.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        setCurrentTime();
        updateTableAndInfoField();
    }, 1000)
})

