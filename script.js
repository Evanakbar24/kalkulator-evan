const displayHistory = document.querySelector(".display-history");
const displayInput = document.querySelector(".display-input");
const clearAllButton = document.querySelector(".clear-all");
const clearEntityButton = document.querySelector(".clear-entity");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");

let disHistory = "";
let disInput = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numberButtons.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    disInput += e.target.innerText;
    displayInput.innerText = disInput;
  });
});

operatorButtons.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (!disInput) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (disHistory && disInput && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(disInput);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(name = "") {
  disHistory += disInput + " " + name + " ";
  displayHistory.innerText = disHistory;
  displayInput.innerText = "";
  disInput = "";
}

function mathOperation() {
  if (lastOperation === "+") {
    result += parseFloat(disInput);
  } else if (lastOperation === "-") {
    result -= parseFloat(disInput);
  } else if (lastOperation === "x") {
    result *= parseFloat(disInput);
  } else if (lastOperation === "%") {
    result /= parseFloat(disInput);
  }
}

equalButton.addEventListener("click", () => {
  if (!disInput || !disHistory) return;
  haveDot = false;
  mathOperation();
  clearVar();
  displayInput.innerText = result;
  disInput = result;
  disHistory = "";
});

clearAllButton.addEventListener("click", () => {
  displayHistory.innerText = "0";
  displayInput.innerText = "0";
  disHistory = "";
  disInput = "";
  result = null;
  lastOperation = "";
});
