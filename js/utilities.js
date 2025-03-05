const clearInputBtn = document.getElementById("clear-input-btn");
const submitBtn = document.getElementById("submit-btn");
const allInputs = document.querySelectorAll("input[type='number']");
const typeContainer = document.getElementById("mortgage-type-container");
const repayments = document.getElementById("repayments");
const interestOnly = document.getElementById("interest-only");
const resultTitle = document.getElementById("display-result-title");
const resultDisplay = document.getElementById("display-results");
const repaymentsAmmount = document.getElementById("repayments-ammount");
const totalRepayments = document.getElementById("total-repayments-ammout");
// console.log(resultDisplay, resultTitle);
const addClass = (element, className) => {
  element.classList.add(className);
};
const removeClass = (element, className) => {
  element.classList.remove(className);
};
