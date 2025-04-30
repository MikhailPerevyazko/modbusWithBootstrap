import "/home/Mikhail/projects/boostrapTauri/modbus/src/scss/styles.scss"
import getTaskData from "./getTaskFromDropDown";
import { setCurrentTime } from "../dateTimeInfo/currentTime";
import { updateInfoField } from "../dateTimeInfo/upperInfoField";
import { setupWorkerListener } from "../tables/dataUpdate";
import { counter, createParameterTable, update } from "../tables/table";
 

export async function run() {
  document.addEventListener("DOMContentLoaded", () => {
    setupWorkerListener();
    getTaskData();

    const table = createParameterTable()
    
    setInterval(() => {
      setCurrentTime();
      updateInfoField();
      update(table, counter);
    }, 1000);
  });
}