import { SimpleViewParameterTable } from "./simpleViewParameterTable";

export class ParameterManager {
  parameters: {
    id1: number,
    id2: number,
    id3: number,
    id4: number,
    id5: number,
  };

  constructor() {
    this.parameters = {
      id1: 100,
      id2: 200,
      id3: 300,
      id4: 400,
      id5: 500,
    };
  }

  getTableFormat() {
    return {
      ids: Object.keys(this.parameters),
      values: Object.values(this.parameters),
    };
  }

  update() {
    // Функция обновляет значения
  }

  default() {
    return this.parameters;
  }
}


export let counter: number = 0;
export const manager: ParameterManager = new ParameterManager();

export function createParameterTable(manager: ParameterManager, iterator: number) {
  const tableData = manager.getTableFormat();
  
  document.getElementById('firstTable')!.innerHTML = '';
  
  let div = document.getElementById("firstTable");
  if (!div) {
    console.error("Элемент #firstTable не найден!");
  }

  const upperTable = new SimpleViewParameterTable(div, {
    "colGroup" : ["14", "45"],
    "caption" : ["ID", "Значение"]
  });


  tableData.ids.forEach((id, index) => {
    const value = tableData.values[index];
    upperTable.addParameter(id, value+iterator);
  });
    
  counter += 1;
}
