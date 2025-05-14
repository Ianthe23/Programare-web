$(document).ready(function () {
  $("#submit").on("click", function (event) {
    event.preventDefault();
    submitForm(event);
  });
});

function submitForm(event) {
  event.preventDefault();

  const name = $("#input_name").val();
  const birth = $("#input_birth").val();
  const age = $("#input_age").val();
  const email = $("#input_email").val();

  let error = "";

  $("#input_name").css("border", "2px solid #ccc");
  $("#input_birth").css("border", "2px solid #ccc");
  $("#input_age").css("border", "2px solid #ccc");
  $("#input_email").css("border", "2px solid #ccc");

  $("#input_name").css("border", "2px solid lime");
  if (!name || !/^[a-zA-Z]+$/.test(name)) {
    error += "Invalid name\n";
    $("#input_name").css("border", "2px solid red");
  }

  $("#input_birth").css("border", "2px solid lime");
  if (!birth) {
    error += "Invalid birth\n";
    $("#input_birth").css("border", "2px solid red");
  }

  const birthDate = new Date(birth);
  const today = new Date();
  let calculatedAge = today.getFullYear() - birthDate.getFullYear();

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    calculatedAge--;
  }

  $("#input_age").css("border", "2px solid lime");
  if (
    !age ||
    isNaN(age) ||
    age < 1 ||
    age > 100 ||
    parseInt(age) !== calculatedAge
  ) {
    error += "Invalid age\n";
    $("#input_age").css("border", "2px solid red");
  }

  $("#input_email").css("border", "2px solid lime");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error += "Invalid email\n";
    $("#input_email").css("border", "2px solid red");
  }

  if (error) {
    alert(error);
    return;
  }

  alert("Form submitted successfully");
  console.log("submit");
}
