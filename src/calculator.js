function do_operation(operation, num1 = 0, num2) {
  if (operation === "/") {
    return num1 / num2;
  } else if (operation === "*") {
    return num1 * num2;
  } else if (operation === "+") {
    return num1 + num2;
  } else if (operation === "-") {
    return num1 - num2;
  } else if (operation === "^") {
    return num1 ** num2;
  }
}

function do_advanced_operation(operation, num) {
  if (operation === "sin") {
    return Math.sin(num);
  } else if (operation === "cos") {
    return Math.cos(num);
  } else if (operation === "tan") {
    return Math.tan(num);
  } else if (operation === "!") {
    return factorial(num);
  } else if (operation === "sqrt") {
    return Math.sqrt(num);
  } else if (operation === '^-1') {
    return 1 / num
  }
}

function factorial(num) {
  if (num === 1 || num === 0) {
    return 1;
  }
  return num * factorial(num - 1);
}

let num1 = 0;
let num2 = 0;

let operation = "";
let advancedOp = "";

const operationsDiv = document.getElementsByClassName("operation");

const input = document.getElementById("number-input");

function check_input() {
  let num = 0;
  if (input.value.endsWith(")")) {
    num = Number(
      input.value.slice(advancedOp.length + 1, input.value.length - 1)
    );
  } else {
    num = Number(input.value.slice(advancedOp.length + 1, input.value.length));
  }

  if (input.value.endsWith("!")) {
    num = Number(input.value.slice(0, -1));
  }

  if (input.value.endsWith('^(-1)')){
    num = Number(input.value.slice(0, -5))
  }

  num = do_advanced_operation(advancedOp, num);
  return num;
}

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
  advancedOp = "";

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
      if (operation === "^") {
        num2 = Number(input.value);
      }
      num1 = do_operation(operation, num1, num2);

      if (isNaN(num1) || num1 === Infinity) {
        clearAll(event, (message = "Error"));
        return;
      }

      input.value = String(num1);
    } else if (advancedOp) {
      num1 = check_input();
    } else {
      num1 = Number(input.value);
    }
    input.value = "";
    operation = operationsDiv[i].children[0].textContent;
    advancedOp = "";
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
  if (advancedOp) {
    num2 = check_input();
    advancedOp = "";
    if (!operation) {
      input.value = String(num2);
      return;
    }
  } else {
    num2 = Number(input.value);
  }
  input.value = String(do_operation(operation, num1, num2));

  if (isNaN(input.value) || input.value === Infinity) {
    clearAll(event, (message = "Error"));
    return;
  }

  operation = "";
});

const advancedOperations = document.getElementsByClassName("advanced-button");

for (let i = 0; i < 4; i++) {
  advancedOperations[i].addEventListener("click", function () {
    let operationName = advancedOperations[i].children[0].textContent;
    input.value = operationName + "(";
    advancedOp = operationName;
  });
}

const powerBtn = advancedOperations[4];
powerBtn.addEventListener("click", function () {
  num1 = Number(input.value);
  operation = "^";
  input.value = "";
});

const factBtn = advancedOperations[5];
factBtn.addEventListener("click", function () {
  if (input.value.endsWith("!")) {
    return;
  }
  input.value += "!";
  advancedOp = "!";
});

const negativePowerBtn = advancedOperations[6];
negativePowerBtn.addEventListener("click", function () {
  if (input.value.endsWith("^(-1)")) {
    return;
  }

  input.value += "^(-1)";
  advancedOp = "^-1";
});

const piBtn = advancedOperations[7];
piBtn.addEventListener("click", function () {
  input.value = String(Math.PI);
});

const expBtn = advancedOperations[8];
expBtn.addEventListener("click", function () {
  input.value = String(Math.E);
});

for (let i = 9; i < 11; i++) {
  advancedOperations[i].addEventListener("click", function () {
    text = advancedOperations[i].children[0].textContent;
    input.value += text;
  });
}
