let displayScore = document.getElementById("final-score");
function displayAllAnswers() {
    const dropdownContent = document.getElementById("answers-dropdown");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display ="block";
    }
}

function hideAllAnswers() {
    const hideDropdownContent = document.getElementById("answers-dropdown");
    if (hideDropdownContent.style.display === "none") {
        hideDropdownContent.style.display = "block";
    } else {
        hideDropdownContent.style.display ="none";
    }
}

document.addEventListener("DOMContentLoaded", function (){
    let getScore = localStorage.getItem('score');
    if(getScore) {
        displayScore.innerHTML = `${getScore} / 10`;
    } else {
        displayScore.innerHTML = '0 / 10';
    }

});

document.addEventListener("DOMContentLoaded", function(){
    let quizArray = JSON.parse(localStorage.getItem('quizData'));
    let userAnswerArray = JSON.parse(localStorage.getItem('answeredQuestions'));
    let questions = quizArray.results;
    let showAnswers = document.getElementById('answers-right-wrong');

    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        let userAnswer = userAnswerArray[i].selectedAnswer;

        let questionContainer = document.createElement('div');
        questionContainer.classList.add('question'); // Add class 'question' to the container

        let questionDiv = document.createElement('div');
        questionDiv.classList.add('question-text'); // Add class 'question-text' to the question div
        questionDiv.textContent = question.question;
        questionContainer.appendChild(questionDiv);

        let answersContainer = document.createElement('div');
        answersContainer.classList.add('answers'); // Add class 'answers' to the answers container

        let yourAnswer = document.createElement('div');
        yourAnswer.textContent = "Your Answer: " + userAnswer;
        yourAnswer.classList.add('answer', 'your-answer'); // Add classes 'answer' and 'your-answer' to the user's answer div
        answersContainer.appendChild(yourAnswer);

        if (userAnswer === question.correct_answer) {
            yourAnswer.style.color = "#8FFF00";
        } else {
            yourAnswer.style.color ="#810909";
        };

        let correctAnswerDiv = document.createElement('div');
        correctAnswerDiv.textContent = "Answer: " + question.correct_answer;
        correctAnswerDiv.classList.add('answer', 'correct-answer'); // Add classes 'answer' and 'correct-answer' to the correct answer div
        answersContainer.appendChild(correctAnswerDiv);

        questionContainer.appendChild(answersContainer); // Append the answers container to the question container

        showAnswers.appendChild(questionContainer); // Append the question container to the main container
    }
});