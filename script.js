const categories = [
  "Marvel",
  "The Lord of the Rings",
  "Star Wars",
  "How to Train Your Dragon",
  "Kung Fu Panda",
  "Pirates of the Caribbean",
  "Disney",
  "Pixar",
  "Geography",
  "Science",
  "History",
  "Countries",
  "Food",
  "Children's Books",
  "Languages"
];

const homeScreen = document.getElementById("home-screen");
const setupScreen = document.getElementById("setup-screen");
const selectedGameTitle = document.getElementById("selected-game-title");
const categoryList = document.getElementById("category-list");
const playerName = document.getElementById("player-name");
const setupMessage = document.getElementById("setup-message");
const backButton = document.getElementById("back-button");
const startButton = document.getElementById("start-button");

let selectedGame = "";

function displayCategories() {
  categoryList.innerHTML = categories
    .map((category, index) => {
      return `
        <label class="category-option">
          <input type="checkbox" value="${category}" ${index < 5 ? "checked" : ""}>
          <span>${category}</span>
        </label>
      `;
    })
    .join("");
}

document.querySelectorAll(".game-card").forEach((card) => {
  card.addEventListener("click", () => {
    selectedGame = card.dataset.game;

    selectedGameTitle.textContent =
      selectedGame === "letter"
        ? "Category Letter Game"
        : "Trivia";

    displayCategories();
    setupMessage.textContent = "";
    homeScreen.classList.add("hidden");
    setupScreen.classList.remove("hidden");
  });
});

backButton.addEventListener("click", () => {
  setupScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  playerName.value = "";
});

startButton.addEventListener("click", () => {
  const name = playerName.value.trim();
  const selectedCategories = [
    ...categoryList.querySelectorAll("input:checked")
  ].map((checkbox) => checkbox.value);

  if (!name) {
    setupMessage.textContent = "Please enter your name.";
    return;
  }

  if (selectedCategories.length === 0) {
    setupMessage.textContent = "Please choose at least one category.";
    return;
  }

  const gameName =
    selectedGame === "letter"
      ? "Category Letter Game"
      : "Trivia";

  setupMessage.textContent =
    `${gameName} selected for ${name}. The game screen is our next step.`;
});
