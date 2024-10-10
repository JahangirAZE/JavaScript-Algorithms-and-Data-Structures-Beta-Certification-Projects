const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');

console.log(result);

function checkPalindrome(){
  const input = textInput.value.toLowerCase();
  const cleanedStr = cleanString(input);
  if(input === ""){
    alert("Please input a value");
    return;
  }
  if(cleanedStr === reverseString(cleanedStr)) {
    result.classList.remove("hidden");
    result.innerHTML = `${input} is a palindrome`;
  } else {
    result.classList.remove("hidden");
    result.innerHTML = `${input} is not a palindrome`;
  }
  setTimeout(()=>{
    result.classList.add("hidden");
  }, 3000);
  
};

const cleanString = (str) => str.replace(/[^a-zA-Z0-9]/g, '');

const reverseString = (str) => str.split('').reverse().join('');

checkBtn.addEventListener('click', checkPalindrome);