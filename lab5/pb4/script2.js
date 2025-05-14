$(document).ready(function () {
  var $tableBody = $("#body");
  var $tableHeader = $("#header");

  // Get all first-column cells (row headers: "Pret", "Cantitate")
  const $rowHeaders = $tableBody.find("tr > td:first-child");

  // Track sorting direction for each row
  let sortDirections = {
    pret: true, // true = ascending
    cantitate: true,
  };

  // Add click event listeners to row headers (Pret, Cantitate)
  $rowHeaders.each(function (rowIndex) {
    $(this).on("click", function () {
      // Toggle sort direction based on which row was clicked
      const rowName = $(this).text().trim().toLowerCase();
      if (rowName in sortDirections) {
        sortDirections[rowName] = !sortDirections[rowName];
      }
      sortByRow(rowIndex, sortDirections[rowName]);
    });
    // Add a cursor pointer to indicate it's clickable
    $(this).css("cursor", "pointer");
  });

  // Make the "Produs" header clickable to sort by product name
  const $produsHeader = $tableHeader.find("th:first-child");
  if ($produsHeader.length) {
    $produsHeader.on("click", sortByProductName);
    $produsHeader.css("cursor", "pointer");
  }

  // Variable to track sorting direction
  let productSortAscending = true;

  // Function to sort by product name
  function sortByProductName() {
    const $productHeaders = $tableHeader.find("th").slice(1);

    // Toggle sort direction
    productSortAscending = !productSortAscending;

    // Create array of objects with header and its cells
    const columns = [];
    const $rows = $tableBody.find("tr");

    // Collect column data
    $productHeaders.each(function (i) {
      const columnIndex = i + 1;
      const $header = $(this);

      const column = {
        header: this,
        cells: [],
        name: $header.text().trim(),
      };

      $rows.each(function () {
        column.cells.push($(this).children().eq(columnIndex)[0]);
      });

      columns.push(column);
    });

    // Sort by product name
    columns.sort(function (a, b) {
      const comparison = a.name.localeCompare(b.name);
      return productSortAscending ? comparison : -comparison;
    });

    // Reorder the table using the same logic as sortByRow

    // Store the headers in their new order
    const sortedHeaders = columns.map((column) => column.header);

    // Save a copy of all cells per row
    const rowCells = [];
    $rows.each(function () {
      rowCells.push($(this).children().slice(1).toArray());
    });

    // Reorder columns one row at a time
    $rows.each(function (rowIdx) {
      // Remove all cells except the first one
      $(this).children().slice(1).remove();

      // Add back cells in sorted order
      columns.forEach((column) => {
        $(this).append(column.cells[rowIdx]);
      });
    });

    // Now handle the header row separately
    // Clear all header cells (keeping first one)
    const $headerParent = $($productHeaders[0]).parent();
    $headerParent.children().slice(1).remove();

    // Add sorted headers back
    $(sortedHeaders).each(function () {
      $headerParent.append(this);
    });
  }

  function sortByRow(rowIndex, ascending = true) {
    // Get the row that was clicked
    const $rows = $tableBody.find("tr");
    const $clickedRow = $rows.eq(rowIndex);

    // Create an array to store column data for sorting
    const columns = [];

    // Get all the headers (except the first one with "Produs")
    const $productHeaders = $tableHeader.find("th").slice(1);

    // For each column (product), collect its data
    $productHeaders.each(function (i) {
      const columnIndex = i + 1; // Skip the first column (row headers)

      // Create an object to store the column data
      const column = {
        header: this,
        cells: [],
        // The value we'll sort by is the cell in the clicked row
        value: $clickedRow.children().eq(columnIndex).text().trim(),
      };

      // Collect all cells for this column
      $rows.each(function () {
        column.cells.push($(this).children().eq(columnIndex)[0]);
      });

      columns.push(column);
    });

    // Sort the columns based on the clicked row's values
    columns.sort(function (a, b) {
      const aValue = a.value;
      const bValue = b.value;

      let comparison;
      // If both values are numbers, sort numerically
      if (!isNaN(aValue) && !isNaN(bValue)) {
        comparison = parseFloat(aValue) - parseFloat(bValue);
      } else {
        // Otherwise sort alphabetically
        comparison = aValue.localeCompare(bValue);
      }

      // Apply the sort direction
      return ascending ? comparison : -comparison;
    });

    // Store the headers in their new order
    const sortedHeaders = columns.map((column) => column.header);

    // Reorder columns one row at a time
    $rows.each(function (rowIdx) {
      // Remove all cells except the first one
      $(this).children().slice(1).remove();

      // Add back cells in sorted order
      columns.forEach((column) => {
        $(this).append(column.cells[rowIdx]);
      });
    });

    // Now handle the header row separately
    // Clear all header cells (keeping first one)
    const $headerParent = $($productHeaders[0]).parent();
    $headerParent.children().slice(1).remove();

    // Add sorted headers back
    $(sortedHeaders).each(function () {
      $headerParent.append(this);
    });
  }
});
