// cleaning all the inputs value when the user click clean all buttons.
let selectedType = null;
clearInputBtn.addEventListener("click", () => {
  allInputs.forEach((input) => {
    input.value = "";
  });
});

// toggle between selected radio input.
function selectedRadioInput(selectedElement, otherElement) {
  selectedType =
    selectedType === selectedElement.id ? null : selectedElement.id;
  console.log(selectedType);

  const selectedElementDot = selectedElement.children[1];
  const otherElementDot = otherElement.children[1];

  if (selectedType) {
    toggleClasses(otherElement, [], ["border-[#d7da2f]", "bg-yellow-50"]);
    toggleClasses(
      selectedElement,
      ["border-[#d7da2f]", "bg-yellow-50"],
      ["border-gray-400"]
    );
  } else {
    toggleClasses(selectedElement, [], ["border-[#d7da2f]", "bg-yellow-50"]);
    const selectedDot = selectedElement.querySelector(".dot");
    selectedDot?.remove();
  }

  otherElementDot.querySelector(".dot")?.remove();

  if (!selectedElementDot.querySelector(".dot")) {
    const dot = document.createElement("div");
    dot.className = "h-3 w-3 rounded-full bg-[#d7da2f] dot";
    selectedElementDot.appendChild(dot);
  }
}

typeContainer.addEventListener("click", (e) => {
  const element = e.target.id;
  if (element === "repayments") {
    selectedRadioInput(repayments, interestOnly);
  } else if (element === "interest-only") {
    selectedRadioInput(interestOnly, repayments);
  }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let isValid = true;
  const inputValues = {};

  allInputs.forEach((input) => {
    if (input.value === "") {
      isValid = false;
      validationErrorMassage(input);
    }
    inputValues[input.name] = parseFloat(input.value);
  });
  if (isValid) {
    if (selectedType === "repayments") {
      paytype.textContent = selectedType;
      calculateMortgage(inputValues);
    } else if (selectedType === "interest-only") {
      paytype.textContent = "Interest";
      calculateInterestOnly(inputValues);
    }
    validateRadioInput();
    allInputs.forEach((input) => {
      const parentEl = input.parentNode;

      parentEl.parentNode.querySelector(".error-massage")?.remove;
    });
  }
});

function calculateMortgage(obj) {
  const {
    ["interest-rate"]: interestRate,
    ["loan-ammount"]: loanAmount,
    year,
  } = obj;
  const r = interestRate / 100 / 12;
  const p = loanAmount;
  const n = year * 12;
  if (r === 0) {
    const m = p / n;
    repaymentsAmmount.textContent = m.toFixed(2);
  }

  const m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalRepay = (m * n).toFixed(2);
  repaymentsAmmount.innerText = m.toFixed(2);
  totalRepayments.textContent = totalRepay;
}
function calculateInterestOnly(obj) {
  const {
    ["interest-rate"]: interestRate,
    ["loan-ammount"]: loanAmount,
    year,
  } = obj;
  if (interestRate === 0) {
    const i = p / n;
    repaymentsAmmount.textContent = i.toFixed(2);
  }
  const interest = (loanAmount * interestRate) / (100 * 12);
  const totalPayAmmount = interest * (year * 12) + loanAmount;
  repaymentsAmmount.textContent = interest.toFixed(2);
  totalRepayments.textContent = totalPayAmmount;
}

function validationErrorMassage(input) {
  const parentEl = input.parentNode;
  const buttonEl = parentEl.querySelector('button[type="button"]');

  toggleClasses(parentEl, ["border", "border-red-500"], ["border-[#e3f3fd]"]);
  toggleClasses(
    buttonEl,
    ["text-white", "bg-red-500"],
    ["text-[#4e6e7e]", "lime"]
  );

  if (!parentEl.parentNode.querySelector(".error-massage")) {
    const errorMassage = document.createElement("p");
    errorMassage.className = "text-sm text-red-500 mt-1 error-massage";
    errorMassage.innerText = "This field is required";
    parentEl.parentNode.appendChild(errorMassage);
  }
}
function validateRadioInput() {
  const errorExists = !!typeContainer.querySelector(".error-massage");

  if (!selectedType && !errorExists) {
    const errorMessage = document.createElement("p");
    errorMessage.className = "text-sm text-red-500 mt-1 error-massage";
    errorMessage.innerText = "Please select an option";
    typeContainer.appendChild(errorMessage);
  } else if (selectedType) {
    addClass(resultTitle, "hidden");
    removeClass(resultDisplay, "hidden");
    typeContainer.querySelector(".error-massage")?.remove();
  }
}
