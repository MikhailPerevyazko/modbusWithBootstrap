import { ParameterManager } from "./parametersManager";
import { SimpleViewParameterTable } from "./simpleViewParameterTable";

export const parameter_ids = [
    "id1", "id2", "id3", "id4", "id5"
];
export let counter: number = 0;
export const manager: ParameterManager = new ParameterManager();

let values = manager.getValues();

export function createParameterTable(manager: ParameterManager) {
  const ids = manager.getIds();
  
  document.getElementById('firstTable')!.innerHTML = '';
  
  let div = document.getElementById("firstTable");
  if (!div) {
    console.error("Элемент #firstTable не найден!");
  }

  const upperTable = new SimpleViewParameterTable(div, {
    "colGroup" : ["14", "45"],
    "caption" : ["ID", "Описание", "Значение"]
  });


  ids.forEach((id, index) => {
    const value = values[index];
    upperTable.addParameter(id, value);
  });
  
  return upperTable;
}

export async function update(table: SimpleViewParameterTable, iterator: number) {
    parameter_ids.forEach((id, index) => {
        let value = values[index]
        table.setValue(id, value + iterator)
    });

    counter += 1;
}