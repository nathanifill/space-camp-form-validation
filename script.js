/* VARIABLES */

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');

/* FUNCTIONS */

// Show errors in form input by making them visible
function showError(input, message) {
  input.className = `${input.id} failure`;
  let errorText = input.parentElement.querySelector('small');
  errorText.innerText = message;
  errorText.style.visibility = 'visible';
}

// Show successful form input validation
function showSuccess(input) {
  input.className = `${input.id} success`;
  let errorText = input.parentElement.querySelector('small');
  errorText.style.visibility = 'hidden';
}

// Returns true if input hasn't been filled in
function isEmpty(input) {
  return input.value == '' ? true : false;
}

// Returns true if passwords match
function doPasswordsMatch(password1, password2) {
  return password1.value == password2.value ? true : false;
}

// Returns true if email format is valid
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Check length of inputs is between a specified min and max, otherwise returns error
function checkLength(input, min, max) {
  const inputLength = input.value.length;
  if (inputLength >= min && inputLength <= max) {
    showSuccess(input);
    return true;
  } else {
    showError(
      input,
      `Your ${input.id} must be between ${min} and ${max} characters. Please try again.`
    );
    return false;
  }
}

/* EVENT LISTENERS */

form.addEventListener('submit', function (event) {
  // Stop form from submitting because there's no back end
  event.preventDefault();

  // Checks fields have been filled in
  const inputArr = [username, email, password, password2];
  inputArr.forEach(function (input) {
    if (isEmpty(input)) {
      showError(input, 'Please fill this in.');
    } else {
      showSuccess(input);
    }
  });

  // Check email is valid
  isValidEmail(email.value)
    ? showSuccess(email)
    : showError(email, 'Please enter a valid email address.');

  // Check that inputs satisfy length requirement
  const passwordMin = 6;
  const passwordMax = 20;
  checkLength(username, 5, 16);
  checkLength(password, passwordMin, passwordMax);

  // If passwords don't match, show error
  if (!doPasswordsMatch(password, password2)) {
    showError(password2, 'Your passwords do not match.');
  } // if the length of the password confirmation isn't the right length, show error
  else if (!checkLength(password2, passwordMin, passwordMax)) {
    showError(password2, 'Please check the length of your password.');
  } // if the passwords match and the length of the password is acceptable, show success on password and password2
  else if (
    doPasswordsMatch(password, password2) &&
    checkLength(password, passwordMin, passwordMax)
  ) {
    showSuccess(password);
    showSuccess(password2);
  }
});
