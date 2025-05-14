// Global variables
let firstCard = null;
let secondCard = null;
let canFlipped = true;
let matchedPairs = 0;
const totalPairs = 8;

$(document).ready(function () {
  // Initialize cards
  $(".cell").each(function () {
    $(this).find("p").css("color", "transparent");
  });

  // Event handlers
  $(".cell").on("click", function () {
    selectCell(this);
  });

  $(".play-again").on("click", function () {
    resetGame();
  });

  // Remove inline onclick handlers
  $(".cell").removeAttr("onclick");
  $(".play-again").removeAttr("onclick");
});

function selectCell(cell) {
  if (!canFlipped || cell === firstCard || cell === secondCard) return;

  // Show the number
  $(cell).find("p").css("color", "white");
  $(cell).css("backgroundColor", "#0984e3");

  if (!firstCard) {
    firstCard = cell;
  } else {
    secondCard = cell;
    canFlipped = false;

    if ($(firstCard).find("p").text() === $(secondCard).find("p").text()) {
      // Match found
      $(firstCard).css("backgroundColor", "#00b894");
      $(secondCard).css("backgroundColor", "#00b894");
      matchedPairs++;

      setTimeout(() => {
        if (matchedPairs === totalPairs) {
          showWinMessage();
        }
        resetCards();
      }, 500);
    } else {
      // No match
      $(firstCard).css("backgroundColor", "#d63031");
      $(secondCard).css("backgroundColor", "#d63031");

      setTimeout(() => {
        $(firstCard).find("p").css("color", "transparent");
        $(secondCard).find("p").css("color", "transparent");
        $(firstCard).css("backgroundColor", "#ffffff");
        $(secondCard).css("backgroundColor", "#ffffff");
        resetCards();
      }, 1000);
    }
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  canFlipped = true;
}

function showWinMessage() {
  $(".win-message").css("display", "flex");
}

function resetGame() {
  // Reset matched pairs counter
  matchedPairs = 0;

  // Hide win message
  $(".win-message").css("display", "none");

  // Reset all cards
  $(".cell").each(function () {
    $(this).find("p").css("color", "transparent");
    $(this).css("backgroundColor", "#ffffff");
  });

  // Shuffle the cards
  $(".game-container").each(function () {
    const rows = $(this).children();
    rows.each(function () {
      const cells = $(this).children().toArray();
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        $(this).append(cells[j]);
      }
    });
  });
}
