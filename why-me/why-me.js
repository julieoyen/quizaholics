// // Define global variables
// let listData = [];
// let currentIndex = 0;
// let langBtnActiveClass = 'eng-btn'; // Default language button active class
//
// // Function to fetch JSON data
// async function fetchJSONData(lang) {
//     try {
//         const path = lang === 'eng' ? '../why-me/why-me-english.json' : '../why-me/why-me.json';
//         const response = await fetch(path);
//         const data = await response.json();
//         listData = lang === 'eng' ? data.list2 : data.list1;
//         displayItem(currentIndex);
//     } catch (error) {
//         console.error('Error fetching JSON:', error);
//     }
// }
//
// // Function to display item with shuffle effect
// async function displayItem(index, placeholderText = '') {
//     const cardDiv1 = document.getElementById('card-1');
//     const cardDiv2 = document.getElementById('card-2');
//
//     // Determine which card is currently visible
//     const visibleCard = cardDiv1.style.zIndex === '5' ? cardDiv1 : cardDiv2;
//     const hiddenCard = visibleCard === cardDiv1 ? cardDiv2 : cardDiv1;
//
//     if (listData.length === 0) {
//         // Display placeholder text
//         visibleCard.innerHTML = `<p>${placeholderText}</p>`;
//         hiddenCard.innerHTML = '';
//         return;
//     }
//
//     // Display current item on the hidden card
//     const currentItem = listData[index];
//     hiddenCard.innerHTML = `
//             <p>${currentItem.id}</p>
//             <p>${currentItem.text}</p>
//         `;
//
//     // Toggle z-index to create shuffle effect
//     visibleCard.style.zIndex = hiddenCard.style.zIndex === '5' ? '4' : '5';
//
//     // Switch background colors of the cards
//     const bgColor1 = getComputedStyle(cardDiv1).backgroundColor;
//     const bgColor2 = getComputedStyle(cardDiv2).backgroundColor;
//     cardDiv1.style.backgroundColor = bgColor2;
//     cardDiv2.style.backgroundColor = bgColor1;
//
//     // Ensure #card-2 remains at an angle
//     if (cardDiv2.style.zIndex === '5') {
//         cardDiv2.style.transform = 'rotate(4deg)';
//     } else {
//         cardDiv2.style.transform = ''; // Reset rotation
//     }
// }
//
//
//
//
//
// // Function to handle next button click
// function handleNextClick() {
//     currentIndex = (currentIndex + 1) % listData.length;
//     displayItem(currentIndex);
//     document.getElementById('back').disabled = false;
// }
//
// // Function to handle back button click
// function handleBackClick() {
//     currentIndex = (currentIndex - 1 + listData.length) % listData.length;
//     displayItem(currentIndex);
// }
//
// // Function to handle language button click
// function handleLangBtnClick(langBtn) {
//     langBtnActiveClass = langBtn.classList.contains('eng-btn') ? 'eng-btn' : 'nor-btn';
//     fetchJSONData(langBtnActiveClass === 'eng-btn' ? 'eng' : 'nor');
// }
//
// // Function to initialize the page
// async function initializePage() {
//     // Set initial text in card-1
//     document.getElementById('card-1').innerHTML = '<p>Start playing!</p>';
//
//     // Disable back button initially
//     document.getElementById('back').disabled = true;
//
//     // Attach event listeners to buttons
//     document.getElementById('next').addEventListener('click', handleNextClick);
//     document.getElementById('back').addEventListener('click', handleBackClick);
//     document.querySelectorAll('.lang-btn').forEach(btn => {
//         btn.addEventListener('click', () => handleLangBtnClick(btn));
//     });
//
//     // Fetch JSON data for the default language
//     await fetchJSONData('eng'); // Assuming English is the default language
// }
//
// // Initialize the page when the window loads
// window.onload = async () => {
//     // Initialize the page
//     await initializePage();
//
//     // Display placeholder text when the page loads
//     displayItem(0, 'Choose language and start playing!');
// };

// Define global variables
let listData = [];
let currentIndex = 0;
let langBtnActiveClass = 'eng-btn'; // Default language button active class
let firstCardColor = 'var(--firstcard)';
let secondCardColor = 'var(--secondcard)';

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
    const card1Div = document.getElementById('card-1');
    const card2Div = document.getElementById('card-2');

    if (listData.length === 0) {
        card1Div.innerHTML = `<p>${placeholderText}</p>`;
        card2Div.innerHTML = '';
        return;
    }

    const currentItem = listData[index];
    card1Div.innerHTML = `
        <p>${currentItem.id}</p>
        <p>${currentItem.text}</p>
    `;
    card2Div.innerHTML = '';

    // Set background colors
    card1Div.style.background = firstCardColor;
    card2Div.style.background = secondCardColor;
}

// Function to handle next button click
function handleNextClick() {
    currentIndex = (currentIndex + 1) % listData.length;
    displayItem(currentIndex);
    [firstCardColor, secondCardColor] = [secondCardColor, firstCardColor]; // Swap colors
    document.getElementById('back').disabled = false;
}

// Function to handle back button click
function handleBackClick() {
    currentIndex = (currentIndex - 1 + listData.length) % listData.length;
    displayItem(currentIndex);

    // Disable back button if currentIndex is 2 or less
    document.getElementById('back').disabled = currentIndex <= 1;
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
    document.getElementById('card-2').innerHTML = '';

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
    // Existing initialization code
    initializePage();

    // Display placeholder text when the page loads
    displayItem(0, 'Choose language and start playing!');
};

