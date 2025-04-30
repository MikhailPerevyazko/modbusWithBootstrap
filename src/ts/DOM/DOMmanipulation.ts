// import "../scss/styles.scss";
import "/home/Mikhail/projects/boostrapTauri/modbus/src/scss/styles.scss"
import { setCurrentTime } from "../dateTimeInfo/currentTime";
import { updateInfoField } from "../dateTimeInfo/upperInfoField";
import getTaskData from "./getTaskFromDropDown";
import { setupWorkerListener } from "../tables/dataUpdate";
import { counter, createParameterTable, update } from "../tables/table";
 

export function start() {
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