const rollBtn = document.getElementById("roll-btn");
const diceFields = [
  document.getElementById("die1"),
  document.getElementById("die2"),
  document.getElementById("die3"),
  document.getElementById("die4"),
  document.getElementById("die5")
];
const totalField = document.getElementById("total");

function rollDice() {
  let rolls = [];
  for (let i = 0; i < diceFields.length; i++) {
    let value = Math.floor(Math.random() * 6) + 1;
    rolls.push(value);
    diceFields[i].value = value;
  }
  totalField.value = rolls.reduce((a, b) => a + b, 0);

  // keep focus on button for Enter key
  rollBtn.focus();
}

rollBtn.addEventListener("click", rollDice);

// auto-roll on page load
window.onload = () => {
  rollDice();
  rollBtn.focus();
};
