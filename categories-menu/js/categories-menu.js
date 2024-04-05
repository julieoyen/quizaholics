const selectorWrapper = document.querySelector(".gameModeButtonsWrapper");
const categoriesWrapper = document.querySelector(".categories-btns");
let selectedGameMode = ""; // Initialize selectedGameMode variable


if (selectorWrapper) {
    let selectorButtons = selectorWrapper.querySelectorAll(".gameModeButton");
    selectorButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (!this.classList.contains('active')) {
                clearActives(selectorButtons);
                this.classList.toggle('active');
                selectedGameMode = this.dataset.value;
                console.log(selectedGameMode);
            }
        });
    });
}

if (categoriesWrapper) {
    let categoriesBtns = categoriesWrapper.querySelectorAll(".categories-btn");
    categoriesBtns.forEach(button => {
        button.addEventListener("click", function () {
            if (!this.classList.contains('clicked')) {
                clearActives(categoriesBtns);
                this.classList.toggle('clicked');
                let selectedCategory = this.dataset.value;
                let apiUrl = `https://opentdb.com/api.php?amount=20&category=${selectedCategory}&type=${selectedGameMode}`;
                console.log(apiUrl);
            }
        });
    });
}

function clearActives(classlist) {
    if (classlist) {
        classlist.forEach(button => {
            button.classList.remove('active');
        });
    }
}

