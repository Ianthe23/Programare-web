$(document).ready(function () {
  var $tableBody = $("#body");
  var $tableHeader = $("#header");

  // Get all header cells
  const $headerCells = $tableHeader.find("th");

  // Track sort directions for each column (start with ascending)
  const sortDirections = {};
  $headerCells.each(function (index) {
    sortDirections[index] = true; // true = ascending
  });

  // Add click event listeners to header cells
  $headerCells.each(function (columnIndex) {
    $(this).on("click", function () {
      // Toggle sort direction when clicked
      sortDirections[columnIndex] = !sortDirections[columnIndex];
      sortTable(columnIndex, sortDirections[columnIndex]);
    });

    // Set initial cursor style
    $(this).css("cursor", "pointer");
  });

  function sortTable(columnIndex, ascending = true) {
    const $rows = $tableBody.find("tr").toArray();

    $rows.sort(function (a, b) {
      const aValue = $(a).children().eq(columnIndex).text();
      const bValue = $(b).children().eq(columnIndex).text();

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

    // Clear the table body and add the sorted rows
    $tableBody.empty();
    $.each($rows, function (index, row) {
      $tableBody.append(row);
    });
  }
});
