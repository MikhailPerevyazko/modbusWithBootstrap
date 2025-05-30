import { invoke } from '@tauri-apps/api/core';


// Выбрать номер в выпадающем списке
export function selectDropDownNumber() {
    let selectedNumber: HTMLSelectElement = document.getElementById('number-select') as HTMLSelectElement;
    let selectedValue = selectedNumber.options[selectedNumber.selectedIndex].textContent;
    let parsedSelectValue: number = Number(selectedValue);
    
    return parsedSelectValue;
}

// По нажатию кнопки выдать новый набор данных 
export default function getTaskData() {
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

export async function get() {
    
}
