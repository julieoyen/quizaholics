async function fetchJSON(path) {
    try {
        const response = await fetch(path);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return [];
    }
}

async function displayItem(index, dataList) {
    const cardDiv = document.getElementById('card-1');
    if (dataList.length === 0) {
        cardDiv.innerHTML = '<p>No data available</p>';
        return;
    }
    const currentItem = dataList[index];
    cardDiv.innerHTML = `
            <p>${currentItem.id}</p>
            <p>${currentItem.text}</p>
        `;
}

async function displayNextItem(dataList) {
    let currentIndex = parseInt(document.getElementById('card-1').dataset.index || 0);
    currentIndex = (currentIndex + 1) % dataList.length;
    document.getElementById('card-1').dataset.index = currentIndex;
    displayItem(currentIndex, dataList);
    document.getElementById('back').disabled = false;
}

async function displayPreviousItem(dataList) {
    let currentIndex = parseInt(document.getElementById('card-1').dataset.index || 0);
    currentIndex = (currentIndex - 1 + dataList.length) % dataList.length;
    document.getElementById('card-1').dataset.index = currentIndex;
    displayItem(currentIndex, dataList);
    if (currentIndex === 0) {
        document.getElementById('back').disabled = true;
    }
}

window.onload = async () => {
    document.getElementById('card-1').innerHTML = '<p>Start playing!</p>';
    document.getElementById('back').disabled = true;

    let list1Data = await fetchJSON('../why-me/why-me.json').then(data => data.list1);
    let list2Data = await fetchJSON('../why-me/why-me-english.json').then(data => data.list2);

    document.getElementById('eng-btn').addEventListener('click', () => {
        document.getElementById('card-1').dataset.index = 0;
        displayItem(0, list2Data);
    });

    document.getElementById('nor-btn').addEventListener('click', () => {
        document.getElementById('card-1').dataset.index = 0;
        displayItem(0, list1Data);
    });

    document.getElementById('next').addEventListener('click', () => {
        const currentIndex = parseInt(document.getElementById('card-1').dataset.index || 0);
        displayNextItem(document.getElementById('eng-btn').classList.contains('active') ? list2Data : list1Data);
    });

    document.getElementById('back').addEventListener('click', () => {
        const currentIndex = parseInt(document.getElementById('card-1').dataset.index || 0);
        displayPreviousItem(document.getElementById('eng-btn').classList.contains('active') ? list2Data : list1Data);
    });
};