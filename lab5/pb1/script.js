// Initialize when page loads
$(document).ready(function () {
  // Move items on click
  $("#list1").on("click", "option", function () {
    $(this).appendTo("#list2");
  });

  $("#list2").on("click", "option", function () {
    $(this).appendTo("#list1");
  });
});
