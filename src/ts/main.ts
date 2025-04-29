import "../scss/styles.scss";
import { setCurrentTime } from "./currentTime";
import { updateTableAndInfoField } from "./tableAndInfoField";
import { getTaskData } from "./getTaskFromDropDown";
import { setupWorkerListener } from "./dataUpdate";


function main() {
  document.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
      setCurrentTime();
      updateTableAndInfoField();
    }, 1000);

    setupWorkerListener();
    getTaskData();
  });
}

main();
