const selectorWrapper = document.querySelector(".gameModeButtonsWrapper");

if (selectorWrapper) {
    let selectorButtons = selectorWrapper.querySelectorAll(".gameModeButton");
    let i;
    for (i=0; i < selectorButtons.length; i++) {
        selectorButtons[i].addEventListener("click", function () {
            if (!this.classList.contains('active')) {
                clearActives(selectorButtons);
                this.classList.toggle('active');
            }
        });
    }
}

function clearActives(classlist) {
    if (classlist) {
        for (i = 0; i < classlist.length; i++) {
            classlist[i].classList.remove('active');
        }
    }
}
