const cells = document.querySelectorAll('.cell');
const newGameBtn = document.getElementById('newGameBtn');
const resultScreen = document.getElementById('resultScreen');
const resultText = document.getElementById('resultText');
const playAgainBtn = document.getElementById('playAgainBtn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

// All winning combinations
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkResult();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for win or draw
function checkResult() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;

    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      endGame(`${boardState[a]} wins!`);
      return;
    }
  }

  if (!boardState.includes("")) {
    endGame("It's a Draw!");
  }
}

// Stop game & show result overlay
function endGame(message) {
  gameActive = false;
  resultText.textContent = message;
  resultScreen.classList.remove('hidden');
}

// Reset game
function resetGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => (cell.textContent = ""));
  resultScreen.classList.add('hidden');
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
newGameBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);
