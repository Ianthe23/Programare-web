// Global variables
let firstCard = null;
let secondCard = null;
let canFlip = true;
let matchedPairs = 0;
const totalPairs = 8;

$(document).ready(function () {
  // Initialize cards
  $(".cell").each(function () {
    $(this).removeClass("revealed");
  });

  // Event handlers
  $(".cell").on("click", function () {
    check(this);
  });

  $(".play-again").on("click", function () {
    resetGame();
  });

  // Remove inline onclick handlers
  $(".cell").removeAttr("onclick");
  $(".play-again").removeAttr("onclick");
});

function check(cell) {
  if (!canFlip || cell === firstCard) return;

  // Show the image
  $(cell).addClass("revealed");
  $(cell).css("backgroundColor", "#0984e3");

  if (!firstCard) {
    firstCard = cell;
  } else {
    secondCard = cell;
    canFlip = false;

    if (
      $(firstCard).find("img").attr("alt") ===
      $(secondCard).find("img").attr("alt")
    ) {
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
        $(firstCard).removeClass("revealed");
        $(secondCard).removeClass("revealed");
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
  canFlip = true;
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
    $(this).removeClass("revealed");
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
