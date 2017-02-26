window.onload = runThis;

function runThis() {

const keys = [].slice.call(document.getElementsByClassName("keys")); //converts HTML collection to array
const p = document.getElementById("txtPreview");
const r = document.getElementById("txtResult");
let flag = "off"; //used to record whether last event was equal sign
let val;

keys.forEach((x) => x.addEventListener("click", handleThis));
document.addEventListener("keydown", handleThis);

function handleThis(e) {
  val = null;  //reset val to avoid binding val to any key
  let lastChar = p.value.slice(-1); //last character in p.value (p)



  if(e.type == "click") {
    val = this.innerText;
  }

  if(e.type == "keydown") {
    if(/\d|[\+,\-,\*,\/,\.,\=,\(,\)]/.test(e.key)) {
      val = e.key;
    }
    switch (e.key) {
      case "Enter": val = "=";
      break;
      case "Delete": val = "CLR";
      break;
      case "Escape": val = "CLR";
      break;
      case "Backspace": val = "DEL";
      break;
    }
  }

  let operator = /[\+,\-,\*,\/]/.test(val);  //test if operator
  let number = /\d/.test(val);              //test if number

  if(flag === "on" && (number || val === "CLR" || val === ".")) {
    r.value = "";
    p.value = "";
    flag = "off";
  }

  if(operator === true && p.value !== "" && /\d|\)/.test(lastChar) === true) {
    p.value += " " + val + " ";
    r.value = val;
    flag = "off";
  }

  if(number) {
    p.value += val;
    if (/\d/.test(r.value) === true || r.value === "") {
    r.value += val;
    }
    else {
    r.value = val;
    }
  }

  if(val === "." && /\./g.test(r.value) === false){
    if(/\d/.test(r.value) === false) {
      r.value = 0;
      p.value += 0;
    }
    p.value += val;
    r.value += val;
  }

  if(val === "=") {
    if(p.value === "" || r.value === "") {
      p.value = "";
      r.value = "";
    }
    else {
      r.value = eval(p.value);
      p.value = r.value;
    }
    flag = "on";
    if(isNaN(r.value) || r.value == (Infinity || "-Infinity") ) {
      r.value = "Error";
      p.value = "Error";
    }

  }

  if(val === "DEL"){
    if(lastChar === " ") {
      p.value = p.value.slice(0,-2);  //delete last 2 characters
      r.value = "";
    }
    p.value = p.value.slice(0,-1);  //delete last character
    r.value = r.value.slice(0,-1);
  }

  if(val === "CLR"){
    p.value = "";
    r.value = "";
  }

  let parenOpen = (p.value.match(/\(/g)||[]).length;
  let parenClose = (p.value.match(/\)/g)||[]).length;

  if(val === "(" && isNaN(parseInt(lastChar)) && /\)|\./.test(lastChar) === false) {
    p.value += val;
    r.value = val;
  }

  if(val === ")" && parenOpen !== 0 && parenClose < parenOpen) {
    p.value += val;
    r.value = val;
  }

  p.scrollLeft = p.scrollWidth;

}

}
