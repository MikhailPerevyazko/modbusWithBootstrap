import { createParameterTable , manager, counter  } from "./parametersManager";

export function updateTableAndInfoField() {
    createParameterTable(manager, counter);
    
    let infoUpdateField = document.getElementById("infoField");
    
    if (infoUpdateField) {
        infoUpdateField.textContent = `Данные обновлены: ${counter} раз`
    } else {
        console.log('Элемент не найден!')
    }
}