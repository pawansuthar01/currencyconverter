const BASE_URL =
  "https://v6.exchangerate-api.com/v6/ba6768bd78eafc80bda6e310/latest";
let selectes = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let formCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".To select");
let msg = document.querySelector(".msg p");

const updateExchangeRate = async () => {
  let amount = document.querySelector(".Amonut input");
  let amtVal = amount.value;
  if (amtVal === 0 || amtVal < 0) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${formCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data["conversion_rates"];

  let ToCurr = rate[toCurr.value];
  let totalValue = amtVal * ToCurr;
  msg.innerText = `${amtVal} ${formCurr.value} = ${totalValue} ${toCurr.value}`;
};

for (const selected of selectes) {
  for (const key in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = key;
    newoption.value = key;
    if (selected.name === "from" && key === "USD") {
      newoption.selected = "selected";
    } else if (selected.name === "tO" && key === "INR") {
      newoption.selected = "selected";
    }
    selected.append(newoption);
  }
  selected.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currcode = element.value;
  let countercode = countryList[currcode];
  let img = element.parentElement.querySelector("img");

  let newScr = `https://flagsapi.com/${countercode}/flat/64.png`;
  img.src = newScr;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});
