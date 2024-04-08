const redirectTo = url => {
    window.location.href = url;
};

document.addEventListener("DOMContentLoaded", () => {
    const quizButton = document.querySelector('.quiz-btn');
    const gamesButton = document.querySelector('.games-btn');

    if (quizButton && gamesButton) {
        quizButton.addEventListener("click", () => {
            redirectTo('categories-menu/categories-menu.html');
        });

        gamesButton.addEventListener("click", () => {
            redirectTo('game-mode-menu/game-mode-menu.html');
        });
    } else {
        console.error("Error: Quiz button or games button not found.");
    }
});