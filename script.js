// stores the gameboard as an array inside of an object
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const selections = Array.from(document.querySelectorAll('.options'));

// WINNING COMBINATIONS
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6],
]; // Diagonals

// Store players in objects
let players = (function () {
  let playerOne = 'X';
  let playerTwo = 'O';
  let changePlayer = () => {
    // currentPlayer = playerOne;
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    return currentPlayer;
  };
  return {
    playerOne,
    changePlayer,
  };
})();

// function to update the GameBoard
function updateGameboard(index) {
  if (gameBoard[index]) {
    console.log('A value exists there');
    return;
  }
  gameBoard[index] = currentPlayer;
  players.changePlayer();
}

let gameFlow = () => {
  selections.forEach((selection, index) => {
    selection.addEventListener('click', () => {
      updateGameboard(index);
      selection.textContent = gameBoard[index];
      checkWinner(index);
    });
  });
};

gameFlow();

function checkWinner(index) {
  let xPatterns = [];
  let oPatterns = [];
  gameBoard.forEach((item, index) => {
    if (item == 'X') {
      xPatterns.push(index);
    }
  });

  gameBoard.forEach((item, index) => {
    if (item == 'O') {
      oPatterns.push(index);
    }
  });

  winPatterns.forEach((pattern) => {
    if (xPatterns.length > 2) {
      let output = pattern.every((value) => xPatterns.includes(value));
      if (output) {
        selections.forEach(
          (selection) => (selection.style.pointerEvents = 'none')
        );
      }
    }

    if (oPatterns.length > 2) {
      let output = pattern.every((value) => oPatterns.includes(value));
      if (output) {
        selections.forEach(
          (selection) => (selection.style.pointerEvents = 'none')
        );
      }
    }
  });
}
