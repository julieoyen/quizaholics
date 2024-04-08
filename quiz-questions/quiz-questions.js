document.addEventListener("DOMContentLoaded", function () {

    const quizData = JSON.parse(localStorage.getItem('quizData'));
    if (quizData) {
        displayQuestions(quizData);
    } else {
        console.error('No quiz data found');
    }

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

function displayQuestions(data) {

    const questionContainer = document.getElementById('question-container');
    const answerButtons = document.querySelectorAll('.answer-btn-single');

    // clear previous question and answer buttons
    questionContainer.innerHTML = '';
    answerButtons.forEach(button => {
        button.innerHTML = '';
        button.classList.remove('clicked');
    });

    //randomly select one question from the data
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const question = data.results[randomIndex];

    //create question element
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `<p>${question.question}</p>`;
    questionContainer.appendChild(questionElement);

    // combine correct and incorrect answers and shuffle them
    const answers = [question.correct_answer, ...question.incorrect_answers];
    shuffleArray(answers);

    //assign answers to answer buttons
    answerButtons.forEach((button, i) => {
        button.textContent = answers[i];
        button.addEventListener('click', () => {
            checkAnswer(button, question.correct_answer);
        })
    })
}


function checkAnswer(button, correctAnswer) {
    const selectedAnswer = button.textContent;
    const correctButton = document.querySelector(`.answer-btn-single[data-answer=${correctAnswer}]`);

    if (selectedAnswer === correctAnswer) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        correctButton.classList.add('correct');
    }
}

// function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1));
        [array[i], array[x]] = [array[x], array[i]];
    }
}

