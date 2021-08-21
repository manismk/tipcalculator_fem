var percentSpans = document.querySelectorAll(".percentSpan");
var billAmount = document.querySelector("#billAmount");
var custom = document.querySelector("#custom");
var noOfPeople = document.querySelector("#noOfPeople");
var tipDisplay = document.querySelector("#tipDisplay");
var billDisplay = document.querySelector("#billDisplay");
var radiobuttons = document.getElementsByName("tip");
var billError = document.querySelector("#billError");
var peopleError = document.querySelector("#peopleError");
var customError = document.querySelector("#customError");
for (var i = 0; i < radiobuttons.length; i++) {
  radiobuttons[i].onclick = function () {
    custom.value = "";
    calculate();
  };
}
billAmount.oninput = function () {
  errorHandler(billAmount, billError);
};
function errorHandler(amountContainer, errorContainer, flag) {
  if (Number(amountContainer.value) < 0) {
    errorContainer.innerHTML = "Can't be less than 0";
    amountContainer.style.boxShadow = "0px 0px 0px  2px  red";
  } else if (
    Number(amountContainer.value) === 0 &&
    amountContainer.value === "0" &&
    flag != 0
  ) {
    errorContainer.innerHTML = "Can't be  0";
    amountContainer.style.boxShadow = "0px 0px 0px  2px  red";
  } else {
    errorContainer.innerHTML = "";
    amountContainer.style.boxShadow = "0px 0px 0px  2px  var(--strong-cyan)";
    calculate();
  }
}

noOfPeople.oninput = function () {
  errorHandler(noOfPeople, peopleError);
};
custom.oninput = function () {
  errorHandler(custom, customError, 0);
};
for (let i = 0; i < percentSpans.length; i++) {
  percentSpans[i].addEventListener("click", () => {
    var percent = percentSpans[i].innerHTML;
    percent = percent.substring(0, percent.length - 1);
    document.getElementById(percent).checked = true;
    custom.value = "";
    calculate();
  });
}

custom.addEventListener("focus", () => {
  for (var i = 0; i < radiobuttons.length; i++) radiobuttons[i].checked = false;
  calculate();
});

function calculate() {
  var bill = Number(billAmount.value);
  var people = Number(noOfPeople.value);
  var customPercent = Number(custom.value);
  //document.querySelector('input[name="tip"]:checked');
  var tipSelector = document.querySelector('input[name="tip"]:checked');

  if (tipSelector !== null) {
    tipSelector = tipSelector.value;
  }
  // console.log(
  //   `bill-${bill}, people-${people}, custom-${customPercent},tipselector-${Number(
  //     tipSelector
  //   )}`
  // );

  if (bill > 0 && people > 0) {
    var billPerPerson = (bill / people).toFixed(2);
    var selectedTip = customPercent > 0 ? customPercent : Number(tipSelector);
    console.log(selectedTip);
    var tipPerPerson = ((selectedTip * bill) / 100 / people).toFixed(2);
    billPerPerson = (Number(billPerPerson) + Number(tipPerPerson)).toFixed(2);
    // console.log(`bill-${billPerPerson} & tip-${tipPerPerson}`);
    billDisplay.innerHTML = `$${billPerPerson}`;
    tipDisplay.innerHTML = `$${tipPerPerson}`;
  } else {
    console.log("somethoing missing");
    billDisplay.innerHTML = "$0.00";
    tipDisplay.innerHTML = "$0.00";
  }
}

function reset() {
  billDisplay.innerHTML = "$0.00";
  tipDisplay.innerHTML = "$0.00";
  billAmount.style.boxShadow = "0px 0px 0px  2px  var(--strong-cyan)";
  noOfPeople.style.boxShadow = "0px 0px 0px  2px  var(--strong-cyan)";
  custom.style.boxShadow = "0px 0px 0px  2px  var(--strong-cyan)";
  for (var i = 0; i < radiobuttons.length; i++) radiobuttons[i].checked = false;
  billAmount.value = "";
  noOfPeople.value = "";
  custom.value = "";
  billError.innerHTML = "";
  peopleError.innerHTML = "";
  customError.innerHTML = "";
}
