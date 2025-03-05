// cleaning all the inputs value when the user click clean all buttons.
clearInputBtn.addEventListener("click", () => {
  allInputs.forEach((input) => {
    input.value = "";
  });
});

// toggle between selected radio input.
let selectedType = null;
typeContainer.addEventListener("click", (e) => {
  const element = e.target;
  const dot = document.createElement("div");
  dot.className = "w-3 h-3 rounded-full bg-[#d7da2f] dot";
  if (element.id === "repayments") {
    selectedType = element.id;
    removeClass(repayments, "border-gray-400");
    removeClass(interestOnly, "border-[#d7da2f]");
    removeClass(interestOnly, "bg-yellow-50");
    repayments.classList.add("border-[#d7da2f]", "bg-yellow-50");
    const radio = repayments.children[1];
    const reDot = interestOnly.children[1];
    if (reDot.querySelector(".dot")) {
      reDot.innerHTML = "";
    }

    repayments.classList.add("border-[#d7da2f]", "bg-yellow-50");
    if (!radio.querySelector(".dot")) {
      radio.appendChild(dot);
    }
  } else if (element.id === "interest-only") {
    selectedType = element.id;
    removeClass(interestOnly, "border-gray-400");
    removeClass(repayments, "border-[#d7da2f]");
    removeClass(repayments, "bg-yellow-50");
    const reDot = repayments.children[1];
    if (reDot.querySelector(".dot")) {
      reDot.innerHTML = "";
    }
    interestOnly.classList.add("border-[#d7da2f]", "bg-yellow-50");
    const radio = interestOnly.children[1];
    if (!radio.querySelector(".dot")) {
      radio.appendChild(dot);
    }
  }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const inputValues = {};
  const keys = ["loan-ammount", "year", "interest-rate"];
  allInputs.forEach((input, index) => {
    if (input.value === "") {
      validationErrorMassage(input);
    } else {
      addClass(resultTitle, "hidden");
      removeClass(resultDisplay, "hidden");
    }
    inputValues[keys[index]] = parseFloat(input.value);
  });
  const result = calculateMortgage(inputValues);
  setResultData(result);
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
    return p / n;
  }
  // const test = (p * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  // console.log(test);
  const m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalRepay = (m * n).toFixed(2);
  repaymentsAmmount.innerText = m.toFixed(2);
  totalRepayments.textContent = totalRepay;
}

function validationErrorMassage(input) {
  const parentEl = input.parentNode;
  const buttonEl = parentEl.querySelector('button[type="button"]');
  parentEl.classList.add("border", "border-red-500");
  removeClass(parentEl, "border-[#e3f3fd]");
  buttonEl.classList.remove("text-[#4e6e7e]", "bg-[#e3f3fd]", "lime");
  buttonEl.classList.add("text-white", "bg-red-500");

  const errorMassage = document.createElement("p");
  errorMassage.className = "text-sm text-red-500 mt-1";
  errorMassage.innerText = "This field is required";

  if (!parentEl.parentNode.querySelector("p")) {
    parentEl.parentNode.appendChild(errorMassage);
  }
}
