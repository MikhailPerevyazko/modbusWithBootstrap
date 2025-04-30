import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { SimpleViewParameterTable } from './simpleViewParameterTable';

export interface DataUpdate {
    complect: number;
    data: Record<string, number>;
}

export function createTableFromData(data: DataUpdate) {
    document.getElementById('newTable')!.innerHTML = '';
    let div = document.getElementById("newTable");
    if (!div) {
        console.error("Элемент #firstTable не найден!");
      }
    
    const tableBySelectedData = new SimpleViewParameterTable(div, {
        "colGroup" : ["10", "20", "30"],
        "caption" : ["ID", "Описание", "Значение"]
    });
    
    let message = 1;
    Object.entries(data.data).forEach(([id, value]) => {
        tableBySelectedData.addParameter(id, message);
        tableBySelectedData.setValue(id, value)
        message += 1;
    })
}

export const setupWorkerListener = async () => {
    const unlisten = await listen<DataUpdate>('new-data', (event) => {
        createTableFromData(event.payload);
    });
    await invoke('start_worker');
    
    return unlisten;
};