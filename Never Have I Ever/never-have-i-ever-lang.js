document.addEventListener("DOMContentLoaded", function () {
  const norwegianBtn = document.getElementById("norwegianBtn");
  const englishBtn = document.getElementById("englishBtn");

  let currentLanguage = localStorage.getItem("language") || "eng";

  setLanguage(currentLanguage);

  norwegianBtn.addEventListener("click", function () {
    setLanguage("no");
  });

  englishBtn.addEventListener("click", function () {
    setLanguage("eng");
  });

  async function setLanguage(language) {
    try {
      localStorage.setItem("language", language);
      await fetchData(language);
    } catch (error) {
      console.error("Error setting language:", error);
    }
  }

  async function fetchData(language) {
    try {
      const response = await fetch(`never-have-i-ever-${language}.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});

norwegianBtn.addEventListener("click", function () {
  console.log("Navigating to a new page...");
  window.location.href = "never-have-i-ever.html";
});

englishBtn.addEventListener("click", function () {
  console.log("Navigating to a new page...");
  window.location.href = "never-have-i-ever.html";
});
