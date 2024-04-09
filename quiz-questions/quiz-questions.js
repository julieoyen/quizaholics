let currentQuestionNumber = 0;
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
        if (currentQuestionNumber < maxQuestions) {
            displayQuestion();
        } else {
            window.location.href = 'quiz-final-score.html';
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
        button.classList.remove('correct', 'incorrect', 'clicked');
    });

    currentQuestionNumber++;
    qNumber.textContent = currentQuestionNumber;
}

function answerQuestion(clickedButton) {
    const selectedAnswer = clickedButton.textContent;
    const correctAnswer = questions[currentQuestionNumber - 1].correct_answer;
    const correctButton = document.querySelector(`.answer-btn-single[data-answer="${correctAnswer}"]`);

    if (selectedAnswer === correctAnswer) {
        clickedButton.classList.add('correct');
        score += 1;
    } else {
        clickedButton.classList.add('incorrect');
        if (correctButton) {
            correctButton.classList.add('correct');
        }
    }

    // Remove border from all buttons
    const answerButtons = document.querySelectorAll('.answer-btn-single');
    answerButtons.forEach(btn => {
        btn.classList.remove('clicked');
    });
    // Add border to the clicked button
    clickedButton.classList.add('clicked');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}