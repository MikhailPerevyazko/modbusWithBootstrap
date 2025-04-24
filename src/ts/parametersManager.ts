export class ParameterManager {
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
export const manager: ParameterManager = new ParameterManager();
export let counter: number = 0;

export function createParameterTable(manager: ParameterManager, iterator: number): string {
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

