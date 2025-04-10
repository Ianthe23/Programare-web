let firstCard = null;
let secondCard = null;
let canFlip = true;
let matchedPairs = 0;
const totalPairs = 8;

function check(cell) {
  if (!canFlip || cell === firstCard) return;

  // Show the number
  cell.querySelector("p").style.color = "white";
  cell.style.backgroundColor = "#0984e3";

  if (!firstCard) {
    firstCard = cell;
  } else {
    secondCard = cell;
    canFlip = false;

    if (
      firstCard.querySelector("p").textContent ===
      secondCard.querySelector("p").textContent
    ) {
      // Match found
      firstCard.style.backgroundColor = "#00b894";
      secondCard.style.backgroundColor = "#00b894";
      matchedPairs++;

      setTimeout(() => {
        if (matchedPairs === totalPairs) {
          showWinMessage();
        }
        resetCards();
      }, 500);
    } else {
      // No match
      firstCard.style.backgroundColor = "#d63031";
      secondCard.style.backgroundColor = "#d63031";
      setTimeout(() => {
        firstCard.querySelector("p").style.color = "transparent";
        secondCard.querySelector("p").style.color = "transparent";
        firstCard.style.backgroundColor = "#ffffff";
        secondCard.style.backgroundColor = "#ffffff";
        resetCards();
      }, 1000);
    }
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  canFlip = true;
}

function showWinMessage() {
  const winMessage = document.querySelector(".win-message");
  winMessage.style.display = "flex";
}

function resetGame() {
  // Reset matched pairs counter
  matchedPairs = 0;

  // Hide win message
  document.querySelector(".win-message").style.display = "none";

  // Reset all cards
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.querySelector("p").style.color = "transparent";
    cell.style.backgroundColor = "#ffffff";
  });

  // Shuffle the cards
  const container = document.querySelector(".game-container");
  const rows = Array.from(container.children);
  rows.forEach((row) => {
    const cells = Array.from(row.children);
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      row.appendChild(cells[j]);
    }
  });
}

// Initialize cards
window.onload = function () {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.querySelector("p").style.color = "transparent";
  });
};
