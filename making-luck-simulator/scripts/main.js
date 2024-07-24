import {game, buttons, addDiv, removeDiv, kFormatter, buttonCosts} from '../scripts/variables.js'



let points = Number(localStorage.getItem('points')) || 0;
let pointsPerSecond = Number(localStorage.getItem('pointsPerSecond')) || 1;
let buttonDone = Number(localStorage.getItem('buttonDone')) || 0;
let secondUpgradeLevel = 1;
let fourthUpgradeLevel = 1

if (buttons.buttonContainers) {
  addDiv('firstButton',
      `<label>Beginning > 0/1</label>
      <div class="divider">1</div>
      <label>It's time, > 2x Point</label>
      <label>Cost > ${kFormatter(buttonCosts.firstButton)} Points</label>`,
      'buttonContainers')
}

// Updating stats

function updateDisplay() {
  if (game.gamePoints) {
    game.gamePoints.innerHTML = `Points: ${kFormatter(points)}`;
  }
  if (game.gamePPS) {
    game.gamePPS.innerHTML = `PPS > ${kFormatter(pointsPerSecond)}`;
  }
}

setInterval(() => {
  points += pointsPerSecond;
  updateDisplay();
  localStorage.setItem('points', points);
}, 1000);

setInterval(() => {
  updateDisplay();
  localStorage.setItem('pointsPerSecond', pointsPerSecond);
}, 1000);

// Buttons
function firstUpgrade() {
  if (points >= 15) {
    pointsPerSecond = pointsPerSecond * 2;
    localStorage.setItem('pointsPerSecond', pointsPerSecond);
    points -= buttonCosts.firstButton;
    localStorage.setItem('point', points);
    buttons.buttonContainers.innerHTML = '';
    addDiv('firstRow',``,'buttonContainers');
      addDiv('firstButton', `
            <label>Beginning > 1/1</label>
            <div class="divider">1</div>
            <label>It's time, > 2x Point</label>
            <label>Cost > Maxed</label>`, 
            'firstRow', 'done')

    addDiv('secondRow',``,'buttonContainers');
      addDiv('thirdButton', `
        <label>Points Generator > 0/1</label>
        <div class="divider">3</div>
        <label>Cool > 3x Point</label>
        <label>Cost > ${kFormatter(buttonCosts.thirdButton)} Point</label>`, 
        'secondRow')
      addDiv('secondButton', `
        <label>Double Goods > 0/3</label>
        <div class="divider">2</div>
        <label>2x Point x Level</label>
        <label>Cost > ${kFormatter(buttonCosts.secondButton1)} Point</label>`, 
        'secondRow')
    
    addDiv('thirdRow',``,'buttonContainers');
      addDiv('eighthButton', `
        <label>Triple Deluxe > 0/5</label>
        <div class="divider">8</div>
        <label> 3x Point x Level</label>
        <label>Cost > ${kFormatter(buttonCosts.eighthButton1)} Point</label>`, 
        'thirdRow')
  }
}
function secondUpgrade() {
  switch (secondUpgradeLevel) {
    case 1:
      if (points >= 40) {
        pointsPerSecond *= secondUpgradeLevel * 2;
        points -= buttonCosts.secondButton1;
        localStorage.setItem('pointsPerSecond', pointsPerSecond);
        localStorage.setItem('points', points);
        removeDiv('secondButton', 'secondRow');
        addDiv('fourthButton', `
            <label>Synergy > 0/2</label>
            <div class="divider">4</div>
            <label>Point > 1x</label>
            <label>Cost > ${buttonCosts.fourthButton1} Points</label>
          `, 'secondRow');
        addDiv('secondButton', `
          <label>Double Goods > 1/3</label>
          <div class="divider">2</div>
          <label>2x Point x ${secondUpgradeLevel}</label>
          <label>Cost > ${buttonCosts.secondButton2} Points</label>
          `, 'secondRow');
        secondUpgradeLevel++;
      }
      break;
    case 2:
      if (points >= 320) {
        pointsPerSecond *= secondUpgradeLevel;
        points -= buttonCosts.secondButton2;
        localStorage.setItem('pointsPerSecond', pointsPerSecond);
        localStorage.setItem('points', points);
        removeDiv('secondButton', 'secondRow');
        addDiv('secondButton', `
          <label>Double Goods > 2/3</label>
          <div class="divider">2</div>
          <label>2x Point x ${secondUpgradeLevel}</label>
          <label>Cost > ${buttonCosts.secondButton3} Points</label>
          `, 'secondRow');
        secondUpgradeLevel++;
      }
      break;
    case 3:
      if (points >= 2550) {
        pointsPerSecond *= 1.5;
        points -= buttonCosts.secondButton3;
        localStorage.setItem('pointsPerSecond', pointsPerSecond);
        localStorage.setItem('points', points);
        removeDiv('secondButton', 'secondRow');
        addDiv('secondButton', `
          <label>Double Goods > 3/3</label>
          <div class="divider">2</div>
          <label>2x Point x ${secondUpgradeLevel}</label>
          <label>Cost > Maxed </label>
          `, 'secondRow', 'done');
        secondUpgradeLevel++;
      }
      break;
    default:
        console.log('Error! Contact with developer!');
        console.log(secondUpgradeLevel);
      break;
    }
}

function thirdUpgrade() {
  pointsPerSecond *= 3;
  points -= buttonCosts.thirdButton;
  localStorage.setItem('pointsPerSecond', pointsPerSecond);
  localStorage.setItem('points', points);
  removeDiv('thirdButton','secondRow')
  addDiv('fifthButton', `
    <label>The Power > 0/5</label>
    <div class="divider">5</div>
    <label> 3x Point x Level</label>
    <label>Cost > ${kFormatter(buttonCosts.fifthButton1)} Point</label>`, 
    'secondRow')

  addDiv('thirdButton', `
    <label>Points Generator > 1/1</label>
    <div class="divider">3</div>
    <label>Cool > 3x Point</label>
    <label>Cost > 120 Point</label>`, 
    'secondRow', 'done')
}

function fourthUpgrade() {
  pointsPerSecond *= 3;
  points -= buttonCosts.fourthButton1;
  localStorage.setItem('pointsPerSecond', pointsPerSecond);
  localStorage.setItem('points', points);
  removeDiv('thirdButton','secondRow')
  addDiv('fifthButton', `
    <label>The Power > 0/5</label>
    <div class="divider">5</div>
    <label> 3x Point x Level</label>
    <label>Cost > ${kFormatter(buttonCosts.fifthButton1)} Point</label>`, 
    'secondRow')

  addDiv('thirdButton', `
    <label>Points Generator > 1/1</label>
    <div class="divider">3</div>
    <label>Cool > 3x Point</label>
    <label>Cost > 120 Point</label>`, 
    'secondRow', 'done')

  switch (fourthUpgradeLevel) {
    case 1:
      if (points >= 40) {
        pointsPerSecond *= secondUpgradeLevel * 2;
        points -= 40;
        localStorage.setItem('pointsPerSecond', pointsPerSecond);
        localStorage.setItem('points', points);
        removeDiv('fourthButton', 'secondRow');
        addDiv('fourthButton', `
            <label>Synergy > 1/2</label>
            <div class="divider">4</div>
            <label>Point > 1x</label>
            <label>Cost > ${kFormatter(buttonCosts.fourthButton2)} Points</label>
          `, 'secondRow');
        addDiv('sixthButton', `
          <label>Double Goods > 1/3</label>
          <div class="divider">2</div>
          <label>2x Point x ${secondUpgradeLevel}</label>
          <label>Cost > ${buttonCosts.sixthButton} Points</label>
          `, 'thirdRow');
        secondUpgradeLevel++;
      }
      break;
    case 2:
      if (points >= 320) {
        pointsPerSecond *= secondUpgradeLevel;
        points -= 320;
        localStorage.setItem('pointsPerSecond', pointsPerSecond);
        localStorage.setItem('points', points);
        removeDiv('secondButton', 'secondRow');
        addDiv('secondButton', `
          <label>Double Goods > 2/3</label>
          <div class="divider">2</div>
          <label>2x Point x ${secondUpgradeLevel}</label>
          <label>Cost > 2550 Points</label>
          `, 'secondRow');
        secondUpgradeLevel++;
      }
      break;
    }
  }

function resetGame() {
  localStorage.removeItem('points', 0);
  localStorage.removeItem('pointsPerSecond', pointsPerSecond);
  localStorage.removeItem('buttonDone', buttonDone);
  points = 0;
  pointsPerSecond = 1;
}




document.addEventListener('DOMContentLoaded', () => {
  if (buttons.resetButton) {
    buttons.resetButton.addEventListener('click', resetGame);
  }
  if (buttons.buttonContainers) {
    // For dynamically added buttons
    buttons.buttonContainers.addEventListener('click', (event) => {
      if (event.target.closest('.firstButton')) {
        firstUpgrade();
      }
    });
    buttons.buttonContainers.addEventListener('click', (event) => {
      if (event.target.closest('.secondButton')) {
        secondUpgrade();
      }
    });
    buttons.buttonContainers.addEventListener('click', (event) => {
      if (event.target.closest('.thirdButton')) {
        thirdUpgrade();
      }
    });
  }
});


buttons.firstButton.innerHTML = "";