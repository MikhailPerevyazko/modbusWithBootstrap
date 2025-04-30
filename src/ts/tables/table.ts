import { ParameterManager } from "../parameterManager/parametersManager";
import { SimpleViewParameterTable } from "./simpleViewParameterTable";


export const parameter_ids = [
    "id1", "id2", "id3", "id4", "id5"
];
export let counter: number = 0;
export const manager: ParameterManager = new ParameterManager();


const values = manager.getValues();
const ids = manager.getIds();


export function createParameterTable() {  
  document.getElementById('firstTable')!.innerHTML = '';
  
  let div = document.getElementById("firstTable");
  if (!div) {
    console.error("Элемент #firstTable не найден!");
  }

  const upperTable = new SimpleViewParameterTable(div, {
    "colGroup" : ["10", "20", "30"],
    "caption" : ["ID", "Описание", "Значение"]
  });


  ids.forEach((id, index) => {
    const value = values[index];
    upperTable.addParameter(id, value);
  });
  
  return upperTable;
}

export function update(table: SimpleViewParameterTable, iterator: number) {
    parameter_ids.forEach((id, index) => {
        let value = values[index]
        table.setValue(id, value + iterator)
    });

    counter += 1;
}