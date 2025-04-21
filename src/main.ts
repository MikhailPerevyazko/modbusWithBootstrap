// import { invoke } from "@tauri-apps/api/core";


class ParameterManager {
    parameters: {id1: number, id2: number, id3: number, id4: number, id5: number};
    
    constructor() {
        this.parameters =  {
            id1: 100,
            id2: 200,
            id3: 300,
            id4: 400,
            id5: 500,
        }
    }

    // getValueFromId(id: string) {
    //     return this.parameters[id];
    // }

    // setValueOnId(id: string, value: number) {
    //     this.parameters[id] = value
    // }

    // fullUpdate() {
    //     for (const key in this.parameters) {
    //         this.parameters[key as keyof this.parameters] += 1;
    //     }
    // }

    getTableFormat() {
        return {
            ids: Object.keys(this.parameters),
            values: Object.values(this.parameters),
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        setCurrentTime();
        updateTableAndInfoField();
    }, 1000)
})

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
let counter: number = 0;

function createParameterTable(manager: ParameterManager, iterator: number): string {
    const tableData = manager.getTableFormat();
    let html = '<div><table class="table" id="parametersTable">';
    
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
        infoUpdateField.textContent = `Данные обновлены ${counter} раз`
    } else {
        console.log('Элемент не найден!')
    }
}
