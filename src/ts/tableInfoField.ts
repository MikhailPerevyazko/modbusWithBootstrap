import { counter  } from "./table";

export function updateInfoField() {
    let infoUpdateField = document.getElementById("infoField");
    
    if (infoUpdateField) {
        infoUpdateField.textContent = `Данные обновлены: ${counter} раз`
    } else {
        console.log('Элемент не найден!')
    }
}