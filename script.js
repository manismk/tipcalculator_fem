var percentSpans = document.querySelectorAll(".percentSpan");
var billAmount = document.querySelector("#billAmount");
var custom = document.querySelector("#custom");
var noOfPeople = document.querySelector("#noOfPeople");
var tipDisplay = document.querySelector("#tipDisplay");
var billDisplay = document.querySelector("#billDisplay");
var radiobuttons = document.getElementsByName("tip");
for (var i = 0; i < radiobuttons.length; i++) {
  radiobuttons[i].onclick = function () {
    custom.value = "";
    calculate();
  };
}
billAmount.oninput = function () {
  calculate();
};
noOfPeople.oninput = function () {
  calculate();
};
custom.oninput = function () {
  calculate();
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
