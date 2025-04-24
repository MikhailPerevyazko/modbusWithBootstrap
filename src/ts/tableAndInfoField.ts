import { createParameterTable , manager, counter  } from "./parametersManager";

export function updateTableAndInfoField() {
    const tableHtml = createParameterTable(manager, counter);
    document.getElementById('firstTable')!.innerHTML = tableHtml
    
    let infoUpdateField = document.getElementById("infoField");
    
    if (infoUpdateField) {
        infoUpdateField.textContent = `Данные обновлены: ${counter} раз`
    } else {
        console.log('Элемент не найден!')
    }
}