import { letterButtons, inputText, startButton, mysteryLetters } from "./variable.js";

for (let i = 65; i < 91; i++) { // A-Z ASCII codes are 65-90
  const letter = String.fromCharCode(i);
  document.getElementById(`letter${letter}`).addEventListener('click', () => validateLetterGPT(letter));
}

let gameStart = 0;
function startGame() {
  let input = inputText.value;
  if (input !== "" && input !== " ") {
    gameStart = 1;
    document.querySelector('.balacaDiv').removeChild(startButton);
    document.querySelector('.balacaDiv').removeChild(inputText);
    for (let i = 0; i < input.length; i++) {
      let char = input[i];
      let labelChar = document.createElement('label');
      if (char !== ' ') {
        labelChar.classList.add(`labelChar${char.toLowerCase()}`);
        labelChar.innerText = '?';
      } else {
        labelChar.innerText = ' ';
      }
      document.querySelector('.mysteryLetters').appendChild(labelChar);
    } 
  }
}

let wrong = 0;
let finalize = 0;

function validateLetterGPT(letter) {
  let input = inputText.value;
  let cleanInput = input.split(" ").join("");
  let found = false;
  
  
  for (let i = 0; i < cleanInput.length; i++) {
    let char = cleanInput[i];
    if (letter.toLowerCase() === char.toLowerCase()) {
      let labelChars = document.querySelectorAll(`.labelChar${char.toLowerCase()}`);
      labelChars.forEach(labelChar => {
        if (labelChar.innerText !== char) {
          document.getElementById(`letter${char.toUpperCase()}`).style.display = 'none';
          labelChar.innerText = char;
          finalize++; 
        }
      });
      
      found = true;
    }
    
  }

  if (!found  && gameStart === 1 && wrong < 11) {
    wrong++;
    console.log(wrong);
    document.getElementById('hangmanPicture').src = `./imgs/${wrong}.jpg`;
  }

  if (wrong === 10 && gameStart === 1) {
    const h2 = document.createElement('h2');
    h2.innerText = `You made 10 wrong choices. You should reset to play again.\nCorrect word: ${input}`;
    document.querySelector('.balacaDiv').appendChild(h2);

    if (!document.querySelector('.resetButton')) {
      const button = document.createElement('button');
      button.innerText = 'Reset';
      button.classList.add('resetButton');
      document.querySelector('.balacaDiv').appendChild(button);
      button.addEventListener('click', () => {
        location.reload();
      });
    }

    console.log('Game over! You have reached the maximum number of wrong guesses.');
    return;
  }

  if (finalize === cleanInput.length && gameStart === 1) {
    if (!document.querySelector('.resetButton')) {
      const button = document.createElement('button');
      button.innerText = 'Reset';
      button.classList.add('resetButton');
      document.querySelector('.balacaDiv').appendChild(button);
      button.addEventListener('click', () => {
        location.reload();
      });
    }

    console.log('You made it!');
  }


}


startButton.addEventListener('click', startGame);
