var input = document.getElementById("input");
var operators = document.querySelectorAll("div.operators > *");
var numbers = document.querySelectorAll("div.numbers > *");
var result = document.getElementById("result");

var firstNr = "",
  secondNr = "",
  operator = "";
var calculated = false;

input.textContent = 0;

result.onclick = () => {
  if (operator) calculate();
};

operators.forEach((element) => {
  element.onclick = () => {
    if (firstNr && secondNr) {
      calculate();
    }
    operator = element.textContent;
    input.textContent += element.textContent;
  };
});

numbers.forEach((element) => {
  element.onclick = () => {
    if (
      ((calculated && firstNr && !operator) || !firstNr) &&
      element.textContent != "C" &&
      element.textContent != "."
    ) {
      setInput(element.textContent);
      calculated = false;
    } else
      switch (element.textContent) {
        case "C":
          setInput(0);
          firstNr = "";
          secondNr = "";
          operator = "";
          calculated = false;
          break;
        case ".":
          if (!operator && !firstNr.includes(".") && !secondNr)
            addInputNumber(element.textContent);
          if (!secondNr.includes(".") && operator)
            secondNr == ""
              ? addInputNumber(0 + element.textContent)
              : addInputNumber(element.textContent);
          break;
        default:
          addInputNumber(element.textContent);
      }
  };
});

function calculate() {
  if (!secondNr) secondNr = firstNr;
  var result = math[operator](Number(firstNr), Number(secondNr));
  result = Math.round(result * 100) / 100;
  setInput(result);
  secondNr = "";
  operator = "";
  calculated = true;
}

function addInputNumber(newVal) {
  !operator ? (firstNr += newVal) : (secondNr += newVal);
  input.textContent += newVal;
}

function setInput(newVal) {
  firstNr = newVal;
  input.textContent = newVal;
}

var math = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "×": (x, y) => x * y,
  "÷": (x, y) => x / y,
};
