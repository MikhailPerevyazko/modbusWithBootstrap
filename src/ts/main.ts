import '../scss/styles.scss';
import { setCurrentTime } from './currentTime';
import { updateTableAndInfoField } from './tableAndInfoField';
import { setupWorkerListener } from './dataUpdate';
import { getTaskData } from './getTaskFromDropDown';



function main() {
    document.addEventListener("DOMContentLoaded", () => {
        setupWorkerListener();
        getTaskData()
    
        setInterval(() => {
            setCurrentTime();
            updateTableAndInfoField();
        }, 1000)
    })
}

main();


  