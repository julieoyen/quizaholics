let listData = [];
let currentIndex = 0;
let langBtnActiveClass = 'eng-btn';
let firstCardColor = 'var(--firstcard)';
let secondCardColor = 'var(--secondcard)';

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

async function displayItem(index, placeholderText = 'Choose language and start playing!') {
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

    card1Div.style.background = firstCardColor;
    card2Div.style.background = secondCardColor;
}

function handleNextClick() {
    currentIndex = (currentIndex + 1) % listData.length;
    displayItem(currentIndex);
    [firstCardColor, secondCardColor] = [secondCardColor, firstCardColor]; // Swap colors
    document.getElementById('back').disabled = false;
}

function handleBackClick() {
    currentIndex = (currentIndex - 1 + listData.length) % listData.length;
    displayItem(currentIndex);

    document.getElementById('back').disabled = currentIndex <= 1;
}

function handleLangBtnClick(langBtn) {
    langBtnActiveClass = langBtn.classList.contains('eng-btn') ? 'eng-btn' : 'nor-btn';
    fetchJSONData(langBtnActiveClass === 'eng-btn' ? 'eng' : 'nor');
}

async function initializePage() {
    document.getElementById('card-1').innerHTML = '<p>Start playing!</p>';
    document.getElementById('card-2').innerHTML = '';

    document.getElementById('back').disabled = true;

    document.getElementById('next').addEventListener('click', handleNextClick);
    document.getElementById('back').addEventListener('click', handleBackClick);
    document.querySelectorAll('.lang-btns').forEach(btn => {
        btn.addEventListener('click', () => handleLangBtnClick(btn));
    });

    await fetchJSONData('eng');
}

window.onload = async () => {
    initializePage();

    displayItem(0, 'Choose language and start playing!');
};

