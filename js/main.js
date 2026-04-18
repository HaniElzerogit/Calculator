const display = document.querySelector(".display");
const expressionDisplay = document.querySelector(".expression");
const buttons = document.querySelectorAll(".buttons button");

let expression = "";
let lastWasResult = false;

const resetIfResult = () => {
  if (lastWasResult) {
    expression = "";
    display.textContent = "";
    expressionDisplay.textContent = "";
    lastWasResult = false;
  }
};
const setResult = (value) => {
  expression = value.toString();
  display.textContent = value;
  expressionDisplay.textContent = value;
  lastWasResult = true;
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    // =========================
    // NUMBERS + OPERATORS
    // =========================
    if (
      !isNaN(value) ||
      value === "+" ||
      value === "−" ||
      value === "×" ||
      value === "÷" ||
      value === "."
    ) {
      if (lastWasResult && !isNaN(value)) {
        expression = "";
        lastWasResult = false;
      }

      if (lastWasResult && isNaN(value)) {
        lastWasResult = false;
      }

      expression += value;

      display.textContent = expression;
      expressionDisplay.textContent = expression;
    }

    // =========================
    // EQUALS
    // =========================
    else if (value === "=") {
      try {
        let cleanExpression = expression
          .replaceAll("×", "*")
          .replaceAll("÷", "/")
          .replaceAll("−", "-");

        let result = eval(cleanExpression);

        display.textContent = result;
        expressionDisplay.textContent = expression + " =";

        expression = result.toString();
        lastWasResult = true;
      } catch {
        display.textContent = "Error";
        expression = "";
        expressionDisplay.textContent = "";
        lastWasResult = false;
      }
    }

    // =========================
    // BACKSPACE
    // =========================
    else if (value === "⌫") {
      resetIfResult();

      expression = expression.slice(0, -1);

      display.textContent = expression || "0";
      expressionDisplay.textContent = expression;
    }

    // =========================
    // CE
    // =========================
    else if (value === "CE") {
      resetIfResult();

      expression = expression.replace(/(\d+\.?\d*)$/, "");

      display.textContent = expression || "0";
      expressionDisplay.textContent = expression;
    }

    // =========================
    // C
    // =========================
    else if (value === "C") {
      expression = "";
      lastWasResult = false;

      display.textContent = "0";
      expressionDisplay.textContent = "";
    }

    // =========================
    // ±
    // =========================
    else if (value === "±") {
      if (lastWasResult && !isNaN(value)) {
        expression = "";
        lastWasResult = false;
      }

      if (lastWasResult && isNaN(value)) {
        lastWasResult = false;
      }

      let match = expression.match(/-?\d+\.?\d*$/);

      if (match) {
        let num = parseFloat(match[0]);
        let toggled = (num * -1).toString();

        expression = expression.replace(/-?\d+\.?\d*$/, toggled);

        display.textContent = expression;
        expressionDisplay.textContent = expression;
      }
    }

    // =========================
    // √x
    // =========================
    else if (value === "√x") {
      if (lastWasResult && !isNaN(value)) {
        expression = "";
        lastWasResult = false;
      }

      if (lastWasResult && isNaN(value)) {
        lastWasResult = false;
      }

      let match = expression.match(/(\d+\.?\d*)$/);

      if (match) {
        let num = parseFloat(match[0]);
        setResult(Math.sqrt(num));
      }
    }

    // =========================
    // x²
    // =========================
    else if (value === "x²") {
      if (lastWasResult && !isNaN(value)) {
        expression = "";
        lastWasResult = false;
      }
      if (lastWasResult && isNaN(value)) {
        lastWasResult = false;
      }

      let match = expression.match(/(\d+\.?\d*)$/);

      if (match) {
        let num = parseFloat(match[0]);
        setResult(num * num);
      }
    }

    // =========================
    // 1/x
    // =========================
    else if (value === "1/x") {
      if (lastWasResult && !isNaN(value)) {
        expression = "";
        lastWasResult = false;
      }

      if (lastWasResult && isNaN(value)) {
        lastWasResult = false;
      }

      let match = expression.match(/(\d+\.?\d*)$/);

      if (match) {
        let num = parseFloat(match[0]);

        if (num === 0) {
          display.textContent = "Error";
          expression = "";
          return;
        }

        setResult(1 / num);
      }
    }

    // =========================
    // %
    // =========================
    else if (value === "%") {
      if (lastWasResult && !isNaN(value)) {
        expression = "";
        lastWasResult = false;
      }

      if (lastWasResult && isNaN(value)) {
        lastWasResult = false;
      }

      let match = expression.match(/(\d+\.?\d*)$/);

      if (match) {
        let num = parseFloat(match[0]);
        setResult(num / 100);
      }
    }
  });
});
document.addEventListener("keydown", (e) => {
  let key = e.key;

  if (key === "*") key = "×";
  if (key === "/") key = "÷";
  if (key === "-") key = "−";

  const btn = Array.from(buttons).find((b) => b.textContent === key);

  if (btn) {
    btn.click();
  }

  if (key === "Enter") {
    const equalsBtn = Array.from(buttons).find((b) => b.textContent === "=");
    if (equalsBtn) equalsBtn.click();
  }

  if (key === "Backspace") {
    const backBtn = Array.from(buttons).find((b) => b.textContent === "⌫");
    if (backBtn) backBtn.click();
  }

  if (key === "Escape") {
    const cBtn = Array.from(buttons).find((b) => b.textContent === "C");
    if (cBtn) cBtn.click();
  }
});
