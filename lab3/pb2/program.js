function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("input_name");
  const birth = document.getElementById("input_birth");
  const age = document.getElementById("input_age");
  const email = document.getElementById("input_email");

  // Reset all borders first
  const data = [name, birth, age, email];
  data.forEach((input) => {
    input.style.border = "2px solid #ccc";
  });

  let error = "";

  // -------------------- Name --------------------
  name.style.border = "2px solid lime";
  if (
    name.value === "" ||
    name.value === null ||
    !/^[a-zA-Z]+$/.test(name.value)
  ) {
    error += "Invalid name\n";
    name.style.border = "2px solid red";
  }

  // -------------------- Birth --------------------
  birth.style.border = "2px solid lime";
  if (birth.value === "" || birth.value === null) {
    error += "Invalid birth date\n";
    birth.style.border = "2px solid red";
  }

  // -------------------- Age --------------------
  age.style.border = "2px solid lime";

  // Calculate age based on birth date
  const birthDate = new Date(birth.value);
  const today = new Date();
  let calculatedAge = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if birthday hasn't occurred this year
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    calculatedAge--;
  }

  console.log(calculatedAge);

  if (
    age.value === "" ||
    age.value === null ||
    age.value < 1 ||
    age.value > 99 ||
    parseInt(age.value) !== calculatedAge
  ) {
    error += "Invalid age\n";
    age.style.border = "2px solid red";
  }

  // -------------------- Email --------------------
  email.style.border = "2px solid lime";
  if (
    email.value === "" ||
    email.value === null ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
  ) {
    error += "Invalid email\n";
    email.style.border = "2px solid red";
  }

  // If there are errors, show them and don't submit the form
  if (error !== "") {
    alert(error);
    return;
  }

  // If there are no errors, show a success message
  alert("Form submitted successfully");
}
