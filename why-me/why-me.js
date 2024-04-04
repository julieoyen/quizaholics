// Define global variables
let listData = [];
let currentIndex = 0;
let langBtnActiveClass = 'eng-btn'; // Default language button active class

// Function to fetch JSON data
async function fetchJSONData(lang) {
    try {
        const path = lang === 'eng' ? '../why-me/why-me-english.json' : '../why-me/why-me.json';
        const response = await fetch(path);
        const data = await response.json();
        listData = lang === 'eng' ? data.list2 : data.list1;
        displayItem(currentIndex);
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

// Function to display item
async function displayItem(index, placeholderText = '') {
    const cardDiv = document.getElementById('card-1');
    if (listData.length === 0) {
        cardDiv.innerHTML = `<p>${placeholderText}</p>`;
        return;
    }
    const currentItem = listData[index];
    cardDiv.innerHTML = `
            <p>${currentItem.id}</p>
            <p>${currentItem.text}</p>
        `;
}


// Function to handle next button click
function handleNextClick() {
    currentIndex = (currentIndex + 1) % listData.length;
    displayItem(currentIndex);
    document.getElementById('back').disabled = false;
}

// Function to handle back button click
function handleBackClick() {
    currentIndex = (currentIndex - 1 + listData.length) % listData.length;
    displayItem(currentIndex);
}

// Function to handle language button click
function handleLangBtnClick(langBtn) {
    langBtnActiveClass = langBtn.classList.contains('eng-btn') ? 'eng-btn' : 'nor-btn';
    fetchJSONData(langBtnActiveClass === 'eng-btn' ? 'eng' : 'nor');
}

// Function to initialize the page
async function initializePage() {
    // Set initial text in card-1
    document.getElementById('card-1').innerHTML = '<p>Start playing!</p>';

    // Disable back button initially
    document.getElementById('back').disabled = true;

    // Attach event listeners to buttons
    document.getElementById('next').addEventListener('click', handleNextClick);
    document.getElementById('back').addEventListener('click', handleBackClick);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => handleLangBtnClick(btn));
    });

    // Fetch JSON data for the default language
    await fetchJSONData('eng'); // Assuming English is the default language
}

// Initialize the page when the window loads
window.onload = async () => {
    // Initialize the page
    await initializePage();

    // Display placeholder text when the page loads
    displayItem(0, 'Choose language and start playing!');
};
