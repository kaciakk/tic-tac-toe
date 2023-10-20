const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const status = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
const winsElement = document.getElementById("wins");
const lossesElement = document.getElementById("losses");
const drawsElement = document.getElementById("draws");

let currentPlayer = "X";
let gameActive = true;
let wins = 0;
let losses = 0;
let draws = 0;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClick);
});

restartButton.addEventListener("click", restartGame);

function cellClick(e) {
    const cell = e.target;
    const cellIndex = [...cells].indexOf(cell);
    makeMove(cell, cellIndex);
}

function makeMove(cell, index) {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin()) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player move  ${currentPlayer}`;
    }
}

function checkWin() {
    return winPatterns.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function endGame(isDraw) {
    if (isDraw) {
        status.textContent = "TIE!";
        draws++;
        drawsElement.textContent = `Ties: ${draws}`;
    } else {
        status.textContent = `Player ${currentPlayer} win!`;
        wins += currentPlayer === "X" ? 1 : 0;
        losses += currentPlayer === "O" ? 1 : 0;
        winsElement.textContent = `Player X: ${wins}`;
        lossesElement.textContent = `Player O: ${losses}`;
    }
    gameActive = false;
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== "");
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
    currentPlayer = "X";
    gameActive = true;
    status.textContent = `Player move  ${currentPlayer}`;
}

