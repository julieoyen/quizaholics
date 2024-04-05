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