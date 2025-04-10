function moveOption(id) {
  var list1 = document.getElementById("list1");
  var list2 = document.getElementById("list2");
  var selectedOption = document.getElementById(id);

  if (selectedOption) {
    if (selectedOption.parentElement === list1) {
      list2.appendChild(selectedOption);
    } else if (selectedOption.parentElement === list2) {
      list1.appendChild(selectedOption);
    }
  }
}
