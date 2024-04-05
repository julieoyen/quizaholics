let currentIndex = 0;
let currentLanguage = "eng";

async function fetchData(language) {
  try {
    const response = await fetch(`never-have-i-ever-${language}.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayStatement(statements, index, language) {
  const statement = statements[index];
  const firstCardElement = document.getElementById("first-card");
  firstCardElement.textContent = statement.text;
}

function onNextButtonClick(statements) {
  currentIndex = (currentIndex + 1) % statements.length;
  displayStatement(statements, currentIndex, currentLanguage);
}

function onBackButtonClick(statements) {
  currentIndex = (currentIndex - 1 + statements.length) % statements.length;
  displayStatement(statements, currentIndex, currentLanguage);
}

async function onLanguageButtonClick(language) {
  currentLanguage = language;
  const data = await fetchData(language);
  shuffleArray(data.statements);
  currentIndex = 0; // Reset currentIndex when language changes
  displayStatement(data.statements, currentIndex, currentLanguage);
}

(async () => {
  try {
    const engData = await fetchData(currentLanguage);
    const statements = engData.statements;
    shuffleArray(statements);
    displayStatement(statements, currentIndex, currentLanguage);

    const engButton = document.querySelector(".eng-btn");
    const norButton = document.querySelector(".nor-btn");

    engButton.addEventListener("click", () => onLanguageButtonClick("eng"));
    norButton.addEventListener("click", () => onLanguageButtonClick("no"));

    const nextButton = document.querySelector(
      ".game-btn-box .game-btn:nth-of-type(2)"
    );
    const backButton = document.querySelector(
      ".game-btn-box .game-btn:nth-of-type(1)"
    );

    nextButton.addEventListener("click", () => onNextButtonClick(statements));
    backButton.addEventListener("click", () => onBackButtonClick(statements));
  } catch (error) {
    console.error("Error:", error);
  }
})();
