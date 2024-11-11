const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');
const regex = /^1?\s?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;

const displayMessage = (message, className) => {
  resultsDiv.textContent = '';
  resultsDiv.innerHTML = `<div class="${className}">${message}</div>`;
};

const validatePhoneNumber = () => {
  const inputValue = userInput.value.trim();
  clearResults();

  if (!inputValue) {
    alert('Please provide a phone number');
    return;
  }

  if (regex.test(inputValue)) {
    displayMessage(`Valid US number: ${inputValue}`, 'valid-input');
  } else {
    displayMessage(`Invalid US number: ${inputValue}`, 'invalid-input');
  }
  userInput.value = '';
};

const clearInputsAndResults = () => {
  userInput.value = '';
  clearResults();
};

const clearResults = () => {
  resultsDiv.textContent = '';
};

checkBtn.addEventListener('click', validatePhoneNumber);
clearBtn.addEventListener('click', clearInputsAndResults);

userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    validatePhoneNumber();
  }
});