async function fetchJSON() {
    try {
        const response = await fetch('../why-me/why-me.json'); // Path to your JSON file
        const data = await response.json();
        return data.cards; // Accessing the 'cards' array
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return [];
    }
}

async function displayItem(index) {
    const cardDiv = document.getElementById('card-1');
    const data = await fetchJSON();
    if (data.length === 0) {
        cardDiv.innerHTML = '<p>No data available</p>';
        return;
    }
    const currentItem = data[index];
    cardDiv.innerHTML = `
                <p>${currentItem.id}</p>
                <p>${currentItem.text}</p>
            `;
}

async function displayNextItem() {
    let currentIndex = parseInt(document.getElementById('card-1').dataset.index || 0);
    const data = await fetchJSON();
    currentIndex = (currentIndex + 1) % data.length;
    document.getElementById('card-1').dataset.index = currentIndex;
    displayItem(currentIndex);
}

async function displayPreviousItem() {
    let currentIndex = parseInt(document.getElementById('card-1').dataset.index || 0);
    const data = await fetchJSON();
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    document.getElementById('card-1').dataset.index = currentIndex;
    displayItem(currentIndex);
}

window.onload = () => {
    displayItem(0);
    document.getElementById('next').addEventListener('click', displayNextItem);
    document.getElementById('back').addEventListener('click', displayPreviousItem);
};