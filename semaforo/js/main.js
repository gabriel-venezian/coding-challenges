const img = document.getElementById("img");
const buttons = document.getElementById("buttons");
let colorIndex = 0;
let intervalId = null;

const trafficLight = (event) => {
    stopAutomatic();
    turnOn[event.target.id]();
}

const nextIndex = () => colorIndex = colorIndex < 2 ? ++colorIndex : 0;

const changeColor = () => {
    const colors = ["red", "yellow", "green"];
    const color = colors[colorIndex];
    turnOn[color]();
    nextIndex();
}

const stopAutomatic = () => {
    clearInterval(intervalId);
}

const turnOn = {
    "red":        () => img.src = "./img/red.png",
    "green":      () => img.src = "./img/green.png",
    "yellow":     () => img.src = "./img/yellow.png",
    "automatic":  () => intervalId = setInterval(changeColor, 2000)
}

buttons.addEventListener("click", trafficLight);