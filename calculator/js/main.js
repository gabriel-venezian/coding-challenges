'use strict';

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id *= key]');
const operators = document.querySelectorAll('[id *= operator]');

let newNumber = true;
let operator;
let previousNumber;

const pendingOperation = () => operator !== undefined;

const calculate = () => {
  if (pendingOperation()) {
    const currentNumber = parseFloat(display.textContent.replace(',', '.'));
    newNumber = true;
    const total = eval(`${previousNumber} ${operator} ${currentNumber}`); 
    refreshDisplay(total);
  }
};

const refreshDisplay = (text) => {
  if (newNumber) {
    display.textContent = text.toLocaleString('pt-BR');
    newNumber = false;
  } else {
    display.textContent += text.toLocaleString('pt-BR');
  };
};

const displayNumber = (event) => refreshDisplay(event.target.textContent);

numbers.forEach(number => number.addEventListener('click', displayNumber));

const selectOperator = (event) => {
  if (!newNumber) {
    calculate();
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = parseFloat(display.textContent.replace(',', '.'));
  };
};

operators.forEach(operator => operator.addEventListener('click', selectOperator));

const activateEquals = () => {
  calculate();
  operator = undefined;
}
document.getElementById('equals').addEventListener('click', activateEquals);

const clearDisplay = () => display.textContent = '';
document.getElementById('clearDisplay').addEventListener('click', clearDisplay);

const clearCalculus = () => {
  clearDisplay();
  operator = undefined;
  newNumber = true;
  previousNumber = undefined;
};
document.getElementById('clearCalculus').addEventListener('click', clearCalculus);

const removeLastElement = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removeLastElement);

const invertSign = () => {
  newNumber = true;
  refreshDisplay(display.textContent * -1);
};
document.getElementById('invert').addEventListener('click', invertSign);

const existsDecimal = () => display.textContent.indexOf(',') !== -1;
const existsValue = () => display.textContent.length > 0;

const decimalNumber = () => {
  if (!existsDecimal()) {
    if (existsValue()) {
      refreshDisplay(',');
    }
    else {
      refreshDisplay('0,');
    }
  };
};
document.getElementById('decimal').addEventListener('click', decimalNumber);

const keyMap = {
  '0'         : 'key0',
  '1'         : 'key1',
  '2'         : 'key2',
  '3'         : 'key3',
  '4'         : 'key4',
  '5'         : 'key5',
  '6'         : 'key6',
  '7'         : 'key7',
  '8'         : 'key8',
  '9'         : 'key9',
  '+'         : 'operatorSum',
  '-'         : 'operatorSubtraction',
  '*'         : 'operatorMultiplication',
  '/'         : 'operatorDivision',
  'Enter'     : 'equals',
  '='         : 'equals',
  'Backspace' : 'backspace',
  'Escape'    : 'clearCalculus',
  'c'         : 'clearDisplay',
  ','         : 'decimal'
};

const keyboardMap = (event) => {
  const key = event.key;

  const allowedKey = () => Object.keys(keyMap).indexOf(key) !== -1;

  if(allowedKey()) {
    document.getElementById(keyMap[key]).click();
  };
};
document.addEventListener('keydown', keyboardMap);
