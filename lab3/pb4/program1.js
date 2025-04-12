document.addEventListener("DOMContentLoaded", function () {
  var table_body = document.getElementById("body");
  var table_header = document.getElementById("header");

  // Get all header cells
  const headerCells = table_header.querySelectorAll("th");

  // Track sort directions for each column (start with ascending)
  const sortDirections = {};
  headerCells.forEach((_, index) => {
    sortDirections[index] = true; // true = ascending
  });

  // Add click event listeners to header cells
  headerCells.forEach((headerCell, columnIndex) => {
    headerCell.addEventListener("click", function () {
      // Toggle sort direction when clicked
      sortDirections[columnIndex] = !sortDirections[columnIndex];
      sortTable(columnIndex, sortDirections[columnIndex]);

      // Add cursor pointer
      headerCell.style.cursor = "pointer";
    });
    // Set initial cursor style
    headerCell.style.cursor = "pointer";
  });

  function sortTable(columnIndex, ascending = true) {
    const rows = Array.from(table_body.querySelectorAll("tr"));

    rows.sort((a, b) => {
      const aValue = a.children[columnIndex].textContent;
      const bValue = b.children[columnIndex].textContent;

      let comparison;
      // If both values are numbers, sort as numbers
      if (!isNaN(aValue) && !isNaN(bValue)) {
        comparison = parseFloat(aValue) - parseFloat(bValue);
      } else {
        // If both values are strings, sort as strings
        comparison = aValue.localeCompare(bValue);
      }

      // Apply sort direction
      return ascending ? comparison : -comparison;
    });

    // Clear the table body
    table_body.innerHTML = "";

    // Add the sorted rows back to the table body
    rows.forEach((row) => table_body.appendChild(row));
  }
});
