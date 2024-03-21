document.addEventListener("DOMContentLoaded", function() {
    const answerButtons = document.querySelectorAll('.answer-btn-single');

    answerButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove border from all buttons
            answerButtons.forEach(btn => {
                btn.classList.remove('clicked');
            });
            // Add border to the clicked button
            button.classList.add('clicked');
        });
    });
});