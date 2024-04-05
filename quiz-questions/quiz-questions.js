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

document.addEventListener("DOMContentLoaded", function () {
    const quizData = JSON.parse(localStorage.getItem('quizData'));
    if (quizData) {
        displayQuestions(quizData);
    } else {
        console.error('No quiz data found');
    }
});

function displayQuestions(data) {
    // if boolean

    // if multiple
    const multipleQuestionsContent = document.querySelector(".q-content");
    for (let i = 0; i < data.length; i++)
    multipleQuestionsContent.innerHTML += `
                <div class="q-card">
                <span id="q-number"></span>
                <div id="question"></div>
            </div>
            <div class="answer-btns">
                <div class="uni-btn answer-btn-single" id="answer-btn-1">$</div>
                <div class="uni-btn answer-btn-single" id="answer-btn-2"></div>
                <div class="uni-btn answer-btn-single" id="answer-btn-3"></div>
                <div class="uni-btn answer-btn-single" id="answer-btn-4"></div>
                <div class="uni-btn" id="confirm-btn"><a href="quiz-final-score.html">Confirm</a></div>
            </div>
    `

}