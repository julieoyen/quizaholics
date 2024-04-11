let currentQuestionNumber = 0;
let selectedAnswerCorrect = null;
let score = 0;
let questions = [];
const maxQuestions = 10;

document.addEventListener("DOMContentLoaded", function () {
    const quizData = JSON.parse(localStorage.getItem('quizData'));
    if (quizData) {
        questions = quizData.results;
        displayQuestion();
    } else {
        console.error('No quiz data found');
    }

    const answerButtons = document.querySelectorAll('.answer-btn-single');
    answerButtons.forEach(button => {
        button.addEventListener('click', () => {
            answerQuestion(button);
        });
    });

    const confirmButton = document.getElementById('confirm-btn');
    confirmButton.addEventListener('click', () => {
        const warningMessage = document.getElementById('warning-not-answered');
        // check if answer is selected
        if (selectedAnswerCorrect !== null) {
            // update score
            if (selectedAnswerCorrect) {
                score += 1;
            }
            // reset selected answer tracking
            selectedAnswerCorrect = null;
            warningMessage.textContent = ''; // clear warning message
            localStorage.setItem('score', score)
            // load next question or finish quiz
            if (currentQuestionNumber < maxQuestions) {
                displayQuestion();
            } else {
                window.location.href = 'quiz-final-score.html';
            }
        } else {
            warningMessage.textContent = 'Please select an answer before proceeding.';
        }

    });
});

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const qNumber = document.getElementById('current-question');

    const currentQuestion = questions[currentQuestionNumber];
    questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;

    const answerButtons = document.querySelectorAll('.answer-btn-single');
    const answers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
    shuffleArray(answers);
    answerButtons.forEach((button, index) => {
        button.textContent = answers[index];
        button.dataset.answer = answers[index]; // set data-answer attribute
        button.classList.remove('correct', 'incorrect', 'clicked');
    });

    currentQuestionNumber++;
    qNumber.textContent = currentQuestionNumber;
}


function answerQuestion(clickedButton) {
    const selectedAnswer = clickedButton.textContent;
    const correctAnswer = questions[currentQuestionNumber - 1].correct_answer;

    // Remove border from all buttons
    const answerButtons = document.querySelectorAll('.answer-btn-single');
    answerButtons.forEach(btn => {
        btn.classList.remove('clicked');
    });
    // Add border to the clicked button
    clickedButton.classList.add('clicked');

    selectedAnswerCorrect = (selectedAnswer === correctAnswer);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}