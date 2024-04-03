const selectorButtons = document.querySelectorAll(".gameModeButton");

const selectedGameMode = function(event) {
    event.target.style.backgroundColor = "blue";
}

selectorButtons.forEach(button => {
    button.addEventListener("click", selectedGameMode);
});