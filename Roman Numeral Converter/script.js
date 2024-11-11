const convertBtn = document.getElementById("convert-btn");
const input = document.getElementById("number");
const output = document.getElementById("output");

convertBtn.addEventListener("click", () => {

  if(!input.value) output.innerHTML = "Please enter a valid number";
  else if(Number(input.value) <= 0) output.innerHTML = "Please enter a number greater than or equal to 1";
  else if(Number(input.value) >= 4000) output.innerHTML = "Please enter a number less than or equal to 3999";
  else {
    const number = Number(input.value);
    const roman = NumberToRoman(number);
    output.innerHTML = `${roman.toString()}`;
  }

})

const NumberToRoman = (num) => {
  const romanNumerals = [
    ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100],
    ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], ['IX', 9],
    ['V', 5], ['IV', 4], ['I', 1]
  ];

  let result = '';

  for (let i = 0; i < romanNumerals.length; i++) {
    const [symbol, value] = romanNumerals[i];
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}