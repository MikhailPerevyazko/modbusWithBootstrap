import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

export interface DataUpdate {
    complect: number;
    data: Record<number, number>;
}

export function createTableFromData(data: DataUpdate) {
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

export const setupWorkerListener = async () => {
    const unlisten = await listen<DataUpdate>('new-data', (event) => {
        const tableHtml = createTableFromData(event.payload);
        console.log(event.payload)
        document.getElementById('newTable')!.innerHTML = tableHtml
    });
    await invoke('start_worker');
    
    return unlisten;
};