document.addEventListener("DOMContentLoaded", function () {
  var table_body = document.getElementById("body");
  var table_header = document.getElementById("header");

  // Get all first-column cells (row headers: "Pret", "Cantitate")
  const rowHeaders = table_body.querySelectorAll("tr > td:first-child");

  // Track sorting direction for each row
  let sortDirections = {
    pret: true, // true = ascending
    cantitate: true,
  };

  // Add click event listeners to row headers (Pret, Cantitate)
  rowHeaders.forEach((rowHeader, rowIndex) => {
    rowHeader.addEventListener("click", function () {
      // Toggle sort direction based on which row was clicked
      const rowName = rowHeader.textContent.trim().toLowerCase();
      if (rowName in sortDirections) {
        sortDirections[rowName] = !sortDirections[rowName];
      }
      sortByRow(rowIndex, sortDirections[rowName]);
    });
    // Add a cursor pointer to indicate it's clickable
    rowHeader.style.cursor = "pointer";
  });

  // Make the "Produs" header clickable to sort by product name
  const produsHeader = table_header.querySelector("th:first-child");
  if (produsHeader) {
    produsHeader.addEventListener("click", sortByProductName);
    produsHeader.style.cursor = "pointer";
  }

  // Variable to track sorting direction
  let productSortAscending = true;

  // Function to sort by product name
  function sortByProductName() {
    const productHeaders = Array.from(
      table_header.querySelectorAll("th")
    ).slice(1);

    // Toggle sort direction
    productSortAscending = !productSortAscending;

    // Create array of objects with header and its cells
    const columns = [];
    const rows = Array.from(table_body.querySelectorAll("tr"));

    // Collect column data
    for (let i = 0; i < productHeaders.length; i++) {
      const columnIndex = i + 1;
      const header = productHeaders[i];

      const column = {
        header: header,
        cells: [],
        name: header.textContent.trim(),
      };

      rows.forEach((row) => {
        column.cells.push(row.children[columnIndex]);
      });

      columns.push(column);
    }

    // Sort by product name
    columns.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return productSortAscending ? comparison : -comparison;
    });

    // Reorder the table using the same logic as sortByRow

    // Store the headers in their new order
    const sortedHeaders = columns.map((column) => column.header);

    // Save a copy of all cells per row
    const rowCells = [];
    rows.forEach((row) => {
      rowCells.push(Array.from(row.children).slice(1));
    });

    // Reorder columns one row at a time
    rows.forEach((row, rowIdx) => {
      // Remove all cells except the first one
      for (let i = row.children.length - 1; i > 0; i--) {
        row.removeChild(row.children[i]);
      }

      // Add back cells in sorted order
      columns.forEach((column) => {
        row.appendChild(column.cells[rowIdx]);
      });
    });

    // Now handle the header row separately
    // Clear all header cells (keeping first one)
    const headerParent = productHeaders[0].parentNode;
    while (headerParent.children.length > 1) {
      headerParent.removeChild(headerParent.children[1]);
    }

    // Add sorted headers back
    sortedHeaders.forEach((header) => {
      headerParent.appendChild(header);
    });
  }

  function sortByRow(rowIndex, ascending = true) {
    // Get the row that was clicked
    const rows = Array.from(table_body.querySelectorAll("tr"));
    const clickedRow = rows[rowIndex];

    // Create an array to store column data for sorting
    const columns = [];

    // Get all the headers (except the first one with "Produs")
    const headerRow = table_header.querySelector("tr") || table_header;
    const productHeaders = Array.from(
      table_header.querySelectorAll("th")
    ).slice(1);

    // For each column (product), collect its data
    for (let i = 0; i < productHeaders.length; i++) {
      const columnIndex = i + 1; // Skip the first column (row headers)

      // Create an object to store the column data
      const column = {
        header: productHeaders[i],
        cells: [],
        // The value we'll sort by is the cell in the clicked row
        value: clickedRow.children[columnIndex].textContent.trim(),
      };

      // Collect all cells for this column
      rows.forEach((row) => {
        column.cells.push(row.children[columnIndex]);
      });

      columns.push(column);
    }

    // Sort the columns based on the clicked row's values
    columns.sort((a, b) => {
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

    // Save a copy of all cells per row before removing them
    const rowCells = [];
    rows.forEach((row) => {
      rowCells.push(Array.from(row.children).slice(1));
    });

    // Reorder columns one row at a time
    rows.forEach((row, rowIdx) => {
      // Remove all cells except the first one
      const cells = rowCells[rowIdx];
      for (let i = row.children.length - 1; i > 0; i--) {
        row.removeChild(row.children[i]);
      }

      // Add back cells in sorted order
      columns.forEach((column) => {
        row.appendChild(column.cells[rowIdx]);
      });
    });

    // Now handle the header row separately
    // First grab the first header cell (Produs)
    const firstHeaderCell = productHeaders[0].parentNode.children[0];

    // Clear all header cells (keeping first one)
    const headerParent = productHeaders[0].parentNode;
    while (headerParent.children.length > 1) {
      headerParent.removeChild(headerParent.children[1]);
    }

    // Add sorted headers back
    sortedHeaders.forEach((header) => {
      headerParent.appendChild(header);
    });
  }
});
