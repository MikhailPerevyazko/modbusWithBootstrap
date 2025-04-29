import "../scss/styles.scss";
import { setCurrentTime } from "./currentTime";
import { updateInfoField } from "./tableInfoField";
import { getTaskData } from "./getTaskFromDropDown";
import { setupWorkerListener } from "./dataUpdate";
import { counter, createParameterTable, manager, update } from "./table";
 

function main() {
  document.addEventListener("DOMContentLoaded", () => {
    setupWorkerListener();
    getTaskData();
    const table = createParameterTable(manager)
    
    setInterval(() => {
      setCurrentTime();
      updateInfoField();
      update(table, counter);
    }, 1000);
  });
}

main();
