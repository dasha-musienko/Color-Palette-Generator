const pickedColorEl = document.querySelector("input[type='color']");
const textInputEl = document.querySelector("input[type='text']");
const submitBtnEl = document.querySelector(".input-button");
const randomBtnEl = document.querySelector(".random-button");
const analogicSchemeEl = document.querySelector(".analogic-scheme");
const whiteSwatches = document.querySelector(".white-palette .swatches");
const blackSwatches = document.querySelector(".black-palette .swatches");
const secondarySchemesEl = document.querySelector(".secondary-schemes");
const splitComplementaryEl = document.querySelector(".split-complementary");
const triadicEl = document.querySelector(".triadic");
const doubleComplementaryEl = document.querySelector(".double-complementary");
const randomColorsEl = document.querySelector(".random-colors");

let pickedColorHEX = "";
let pickedColorRGB = "";
let pickedColorHSV = "";
let randomColor = Please.make_color().join();

pickedColorEl.addEventListener("input", colorPickHandler);
textInputEl.addEventListener("input", textInputHandler);
submitBtnEl.addEventListener("click", submitBtnElClickHandler);
randomBtnEl.addEventListener("click", randomBtnElClickHandler);

function colorPickHandler(evt) {
  pickedColorHEX = evt.target.value;
  textInputEl.value = pickedColorHEX;
  submitBtnEl.style.backgroundColor = pickedColorHEX;
}

function textInputHandler(evt) {
  pickedColorHEX = evt.target.value;
}

function submitBtnElClickHandler() {
  createsDefaultMarkup(pickedColorHEX);
}

function createsDefaultMarkup(color) {
  pickedColorRGB = Please.HEX_to_RGB(color);
  pickedColorHSV = Please.HEX_to_HSV(color);

  createsAnalogicMarkup(createsAnalogicColorsArr(pickedColorHSV));

  createsWhiteGradientMarkup(createsWhiteArr(pickedColorRGB));

  createsBlackGradientMarkup(createsBlackArr(pickedColorRGB));

  createsSplitComplementaryMarkup(createsSplitComplementaryArr(pickedColorHSV));

  createsTriadicMarkup(createsTriadicArr(pickedColorHSV));

  createsDoubleComplementaryMarkup(
    createsDoubleComplementaryArr(pickedColorHSV)
  );

  createsRandomColorsMarkup(createsRandomColorsArr());
  submitBtnEl.style.backgroundColor = color;
}

function createsAnalogicMarkup(arr) {
  analogicSchemeEl.innerHTML = arr
    .map((el) => {
      return `
      <li class="analogic-color" style="background-color: ${el}">
        <span class="analogic-hex">HEX: ${el}</span>
        <span class="analogic-rgb">RGB: ${Object.values(
          Please.HEX_to_RGB(el)
        ).join(", ")}</span>
        </li>
      `;
    })
    .join("");
}

function createsAnalogicColorsArr(color) {
  return Please.make_scheme(pickedColorHSV, {
    scheme_type: "analogous",
    format: "hex",
  });
}

function createsWhiteGradientMarkup(arr) {
  whiteSwatches.innerHTML = arr
    .map((el) => {
      return `
        <li class="swatch">
            <div class="swatch-color" style="background-color: ${el}"></div>
             <p class="swatch-hex">${el}</p>
        </li>
      `;
    })
    .join("");
}

function createsWhiteArr(color) {
  const colorArr = Object.values(color);
  const n = 8;
  const difference = colorArr.map((el) => (256 - el) / n);

  let colorsArr = [];

  for (let i = 0; i < n; i += 1) {
    colorsArr.push(
      colorArr.map((el, idx) => parseInt(el + difference[idx] * i))
    );
  }

  return colorsArr.map((el) =>
    Please.RGB_to_HEX({ r: el[0], g: el[1], b: el[2] })
  );
}

function createsBlackGradientMarkup(arr) {
  blackSwatches.innerHTML = arr
    .map((el) => {
      return `
        <li class="swatch">
            <div class="swatch-color" style="background-color: ${el}"></div>
             <p class="swatch-hex">${el}</p>
        </li>
      `;
    })
    .join("");
}

function createsBlackArr(color) {
  const colorArr = Object.values(color);
  const n = 8;
  const difference = colorArr.map((el) => el / n);

  let colorsArr = [];

  for (let i = 0; i < n; i += 1) {
    colorsArr.push(
      colorArr.map((el, idx) => parseInt(el - difference[idx] * i))
    );
  }

  return colorsArr.map((el) =>
    Please.RGB_to_HEX({ r: el[0], g: el[1], b: el[2] })
  );
}

function createsSplitComplementaryMarkup(arr) {
  splitComplementaryEl.style.backgroundColor = arr[0];
  splitComplementaryEl.innerHTML = `
      <span class="secondary-title ">Split Complementary</span>
        <span class="secondary-title ">${arr[0]}</span>
        <div class="secondary-color-second" style="background-color: ${arr[1]}">
        <span class="secondary-thumb-title">${arr[1]}</span></div>
        <div class="secondary-color-third" style="background-color: ${
          arr[2].slice(0, 5) + "99"
        }">
        <span class="secondary-thumb-title">${
          arr[2].slice(0, 5) + "99"
        }</span></div>
      `;
}

function createsSplitComplementaryArr(color) {
  return Please.make_scheme(color, {
    scheme_type: "split-complementary",
    format: "hex",
  });
}

function createsTriadicMarkup(arr) {
  triadicEl.style.backgroundColor = arr[0];
  triadicEl.innerHTML = `
      <span class="secondary-title ">Split Complementary</span>
        <span class="secondary-title ">${arr[0]}</span>
        <div class="secondary-color-second" style="background-color: ${arr[1]}">
        <span class="secondary-thumb-title">${arr[1]}</span></div>
        <div class="secondary-color-third" style="background-color: ${arr[2]}">
        <span class="secondary-thumb-title">${arr[2]}</span></div>
      `;
}

function createsTriadicArr(color) {
  return Please.make_scheme(color, {
    scheme_type: "triadic",
    format: "hex",
  });
}

function createsDoubleComplementaryMarkup(arr) {
  doubleComplementaryEl.style.backgroundColor = arr[0];
  doubleComplementaryEl.innerHTML = `
      <span class="secondary-title ">Split Complementary</span>
        <span class="secondary-title ">${arr[0]}</span>
        <div class="secondary-color-second" style="background-color: ${arr[1]}">
        <span class="secondary-thumb-title">${arr[1]}</span></div>
        <div class="secondary-color-third" style="background-color: ${arr[3]}">
        <span class="secondary-thumb-title">${arr[3]}</span></div>
      `;
}

function createsDoubleComplementaryArr(color) {
  return Please.make_scheme(color, {
    scheme_type: "double",
    format: "hex",
  });
}

function createsRandomColorsMarkup(arr) {
  randomColorsEl.innerHTML = `
      <h3 class="random-colors-title">Random Colors</h3>
        <ul>
            <li class="random-color-first">
                <div class="random-color-swatch" style="background-color: ${arr[0]}"></div>
                <h4 class="random-color-hex">${arr[0]}</h4>
            </li>

            <li class="random-color-second">
                 <div class="random-color-swatch" style="background-color: ${arr[1]}"></div>
                <h4 class="random-color-hex">${arr[1]}B</h4>
            </li>
        </ul> 
      `;
}

function createsRandomColorsArr() {
  return Please.make_color({
    colors_returned: 2,
    format: "hex",
  });
}

function randomBtnElClickHandler() {
  const color = Please.make_color().join();
  createsDefaultMarkup(color);

  textInputEl.value = color;
  pickedColorEl.value = color;
}

createsDefaultMarkup(randomColor);
