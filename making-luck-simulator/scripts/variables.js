export const game = {
  gamePoints: document.querySelector('.gamePoints'),
  gamePPS: document.querySelector('.gamePPS')
};



export const buttons = {
  resetButton: document.getElementById('resetButton'),
  buttonContainers: document.querySelector('.buttonContainers'),
  firstRow: document.querySelector('.firstRow'),
  secondRow: document.querySelector('.secondRow'),
  thirdRow: document.querySelector('.thirdRow'),
  firstButton: document.querySelector('.firstButton'),
  secondButton: document.querySelector('.secondButton'),
  thirdButton: document.querySelector('.thirdButton'),
  eighthButton: document.querySelector('.eighthButton')
};

export const buttonCosts = {
  firstButton: 15,
  secondButton1: 40,
  secondButton2: 325,
  secondButton3: 2550,
  thirdButton: 120,
  fourthButton1: 750,
  fourthButton2: 9000,
  fifthButton1: 5000,
  sixthButton: 15000,
  eighthButton1: 250000
}

export function kFormatter(num) {
  if (Math.abs(num) > 999 && Math.abs(num) < 999999) {
    return Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K';
  } 
  else if (Math.abs(num) >= 999999 && Math.abs(num) < 999999999) {
    return Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'M';
  }
  if (Math.abs(num) >= 999999999 && Math.abs(num) < 999999999999) {
    return Math.sign(num)*((Math.abs(num)/1000000000).toFixed(1)) + 'B';
  } 
  if (Math.abs(num) >= 999999999999 && Math.abs(num) < 999999999999999) {
    return Math.sign(num)*((Math.abs(num)/1000000000000).toFixed(1)) + 'T';
  } 
  if (Math.abs(num) >= 999999999999999 && Math.abs(num) < 999999999999999999) {
    return Math.sign(num)*((Math.abs(num)/1000000000000000).toFixed(1)) + 'Qa';
  } 
  if (Math.abs(num) >= 999999999999999999 && Math.abs(num) < 999999999999999999999) {
    return Math.sign(num)*((Math.abs(num)/1000000000000000000).toFixed(1)) + 'Qi';
  } 
  if (Math.abs(num) >= 999999999999999999999 && Math.abs(num) < 999999999999999999999999) {
    return Math.sign(num)*((Math.abs(num)/1000000000000000000000).toFixed(1)) + 'Sx';
  } 
  if (Math.abs(num) >= 999999999999999999999999 && Math.abs(num) < 999999999999999999999999999) {
    return Math.sign(num)*((Math.abs(num)/1000000000000000000000000).toFixed(1)) + 'Sp';
  } 
  if (Math.abs(num) >= 999999999999999999999999999 && Math.abs(num) < 999999999999999999999999999999) {
    return Math.sign(num)*((Math.abs(num)/1000000000000000000000000000).toFixed(1)) + 'Oc';
  } 
  else {
    return Math.sign(num)*Math.abs(num)
  }
}

export function addDiv(divName, divHTML, parentDiv, classList) {
  parentDiv = document.querySelector(`.${parentDiv}`);
  const div = document.createElement(`div`);
  div.classList.add(divName);
  if (classList) {
    div.classList.add(classList);
  }
  div.innerHTML = `${divHTML}`;
  parentDiv.appendChild(div);
}

export function removeDiv(divName, parentName) {
  let parentDiv = document.querySelector(`.${parentName}`);
  let childDiv =  document.querySelector(`.${divName}`)
  parentDiv.removeChild(childDiv);
}