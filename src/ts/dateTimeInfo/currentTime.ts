export function setCurrentTime() {
  let now: Date = new Date();
  let parsedToStringNow: string = now.toString();

  let newNow: string = parsedToStringNow.substring(0, parsedToStringNow.length - 37);
  let timeField = document.getElementById("currentTimeDate");

  if (timeField) {
    timeField.textContent = newNow;
  } else {
    console.log("Элемент не найден!");
  }
}
