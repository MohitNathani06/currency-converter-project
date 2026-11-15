const amt = document.querySelector("#num");

//const btn = document.querySelector("#btn");
const sel = document.querySelector("select");
const Base_Url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2026.11.13/v1/currencies/inr.json";
const select = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("p");
const interBtn = document.querySelector("#interChange");
countRes();
async function countRes() {
  let amtVal = amt.value;

  if (amtVal < 1) {
    msg.innerText = "Please enter amount 1 or greater !!";
    return;
  }
  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();
  let data = await fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2026.11.13/v1/currencies/${from}.json`,
  );
  let parse = await data.json();
  let rate = parse[from][to];
  let finalAmt = amtVal * rate;

  msg.innerText = `${amtVal} ${fromCurr.value}  =  ${finalAmt} ${toCurr.value}`;
}
//}
for (let sel of select) {
  for (let currCode in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerHTML = currCode;
    newOpt.value = currCode;
    sel.append(newOpt);

    if (sel.name === "from" && newOpt.value === "USD") {
      newOpt.selected = "selected";
    }
    if (sel.name === "to" && newOpt.value === "INR") {
      newOpt.selected = "selected";
    }
  }
  sel.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    countRes();
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countCode}/flat/64.png`;
};

interBtn.addEventListener("click", () => {
  let arr = [];
  for (let sel of select) {
    let i = sel.options[sel.selectedIndex].innerText;
    arr.push(i);
  }
  let changeableFrom = arr[1];
  let changeableTo = arr[0];
  let changeArr = [changeableTo, changeableFrom];

  for (let sel of select) {
    if (sel.name === "from") {
      let countCode = countryList[changeableFrom];
      let img = sel.parentElement.querySelector("img");
      img.src = `https://flagsapi.com/${countCode}/flat/64.png`;
      for (let opt of sel.options) {
        if (opt.text == changeableFrom) {
          opt.selected = true;
        }
      }
      countRes();
    }
    if (sel.name === "to") {
      let countCode = countryList[changeableTo];
      let img = sel.parentElement.querySelector("img");
      img.src = `https://flagsapi.com/${countCode}/flat/64.png`;
      for (let opt of sel.options) {
        if (opt.text == changeableTo) {
          opt.selected = true;
        }
      }
      countRes();
    }
  }
});
//  when btn loses focus
// amt.addEventListener("blur", () => {
//   if(amt.value==""){
//     amt.value=1;
//   }
//   countRes();
// });

//it is used when we change keystroke (means stopping typing key)
amt.addEventListener("input", () => {
  countRes();
});
