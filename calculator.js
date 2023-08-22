function do_operation(operation, num1, num2) {
  if (operation === "/") {
    return num1 / num2;
  } else if (operation === "*") {
    return num1 * num2;
  } else if (operation === "+") {
    return num1 + num2;
  } else if (operation === "-") {
    return num1 - num2;
  }
}

let num1 = 0;
let num2 = 0;

let operation = "";

const operationsDiv = document.getElementsByClassName("operation");

const input = document.getElementById("number-input");

input.addEventListener("input", function () {
  const pattern = /^-?\d+(\.\d+)?$/;

  if (!input.value.match(pattern) && input.value !== "") {
    input.style.border = "1px solid red";
    input.style.boxShadow = "0 0 5px red";

    for (let i = 1; i < operationsDiv.length; i++) {
      operationsDiv[i].children[0].disabled = true;
    }
  } else {
    input.style.border = "";
    input.style.boxShadow = "";

    for (let i = 1; i < operationsDiv.length; i++) {
      operationsDiv[i].children[0].disabled = false;
    }
  }
});

const numberBtns = document.getElementsByClassName("number");
const pattern = /^[0]$/;
for (let i = 0; i < numberBtns.length; i++) {
  numberBtns[i].addEventListener("click", function () {
    if (operation) {
      if (Number(input.value) === num1) {
        input.value = numberBtns[i].children[0].textContent;
      } else {
        input.value += numberBtns[i].children[0].textContent;
      }
    } else {
      if (input.value.length === 1 && input.value.match(pattern)) {
        input.value = numberBtns[i].children[0].textContent;
      } else {
        input.value += numberBtns[i].children[0].textContent;
      }
    }
  });
}

const clearBtn = operationsDiv[0];
clearBtn.addEventListener("click", clearAll);
function clearAll(event, message = "") {
  input.value = message;

  input.style.border = "";
  input.style.boxShadow = "";

  num1 = 0;
  num2 = 0;
  operation = "";

  for (let i = 1; i < operationsDiv.length; i++) {
    operationsDiv[i].children[0].disabled = false;
  }
}

const persentBtn = operationsDiv[1];
persentBtn.addEventListener("click", function () {
  num1 = Number(input.value);
  result = num1 / 100;
  console.log(num1);
  input.value = String(result);
  num1 = Number(input.value);
});

// Giving every operation a functionality
for (let i = 2; i < 6; i++) {
  operationsDiv[i].addEventListener("click", function () {
    if (operation) {
      num2 = Number(input.value);
      input.value = "";
      num1 = do_operation(operation, num1, num2);

      if (isNaN(num1) || num1 === Infinity) {
        clearAll(event, (message = "Error"));
        return;
      }

      input.value = String(num1);
    } else {
      num1 = Number(input.value);
      input.value = "";
      operation = operationsDiv[i].children[0].textContent;
    }
  });
}

const floatBtn = operationsDiv[6];
floatBtn.addEventListener("click", function () {
  if (input.value.length > 0 && !input.value.includes(".")) {
    input.value = input.value + ".";
  }
});

const equalBtn = document.getElementById("equal-button");
equalBtn.addEventListener("click", function () {
  num2 = Number(input.value);
  input.value = String(do_operation(operation, num1, num2));

  if (isNaN(input.value) || input.value === Infinity) {
    clearAll(event, (message = "Error"));
    return;
  }

  operation = "";
});
