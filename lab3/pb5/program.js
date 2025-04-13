// Wait for the DOM to be fully loaded before executing
document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 1;
  let slideTimer; // Timer for automatic slideshow

  // Initialize the slideshow
  showSlides(slideIndex);
  // Start automatic slideshow
  startAutoSlide();

  // Make functions globally available
  window.plusSlides = function (n) {
    // Clear the timer when manually navigating
    clearTimeout(slideTimer);
    // Show the next/previous slide
    showSlides((slideIndex += n));
    // Restart the timer
    startAutoSlide();
  };

  window.currentSlide = function (n) {
    // Clear the timer when manually navigating
    clearTimeout(slideTimer);
    // Show the selected slide
    showSlides((slideIndex = n));
    // Restart the timer
    startAutoSlide();
  };

  // Function to start automatic slideshow
  function startAutoSlide() {
    // Clear any existing timer
    clearTimeout(slideTimer);
    // Set new timer for 3 seconds
    slideTimer = setTimeout(function () {
      slideIndex++;
      showSlides(slideIndex);
      startAutoSlide(); // Continue the cycle
    }, 3000); // 3 seconds
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("list-item");
    let dots = document.getElementsByClassName("dot");

    // If no slides found, exit the function
    if (slides.length === 0) {
      console.error("No slides found with class 'list-item'");
      return;
    }

    // If no dots found, create a simple fallback
    if (dots.length === 0) {
      console.warn("No dots found with class 'dot'");
    }

    // Reset slideIndex if out of bounds
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide
    slides[slideIndex - 1].style.display = "block";

    // Add active class to the current dot (if dots exist)
    if (dots.length > 0 && slideIndex <= dots.length) {
      dots[slideIndex - 1].className += " active";
    }
  }

  // Pause slideshow when user hovers over it
  document
    .querySelector(".slideshow-container")
    .addEventListener("mouseenter", function () {
      clearTimeout(slideTimer);
    });

  // Resume slideshow when user's mouse leaves
  document
    .querySelector(".slideshow-container")
    .addEventListener("mouseleave", function () {
      startAutoSlide();
    });

  // Allow links to work by preventing propagation
  const links = document.querySelectorAll(".list-item a");
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      // Don't prevent default here - we want the link to work normally
      // But we do want to stop any other click handlers
      event.stopPropagation();
    });
  });

  // Make the slide areas (except links) clickable to advance
  const listItems = document.querySelectorAll(".list-item");
  listItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      // Only advance if the click was directly on the list item (not on a link)
      if (
        event.target === this ||
        event.target.tagName === "IMG" ||
        event.target.className === "numberText"
      ) {
        plusSlides(1);
      }
    });
  });
});
