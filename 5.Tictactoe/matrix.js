// Selector variables.
const formMenu = document.querySelector("form");
let nbCells;
const board = document.querySelector(".board");
const informations = document.querySelector("#informations");
let matrix = [];
var player = 1;

/**
 * Page loading with board initialization.
 */
document.addEventListener("DOMContentLoaded", function () {
    initBoard();
});

/**
 * Board initialization.
 */
function initBoard() {

    formMenu.addEventListener("click", function (event) { // Click on form.

        nbCells = formMenu.querySelector("input[type='number']").value; // Get the number of cells

        // Initialization of matrix values to 0.
        for (let i = 0; i < nbCells; i++) {
            let column = [];
            for (let j = 0; j < nbCells; j++) {
                column[j] = 0;
            }
            matrix[i] = column;
        }

        if (event.target.type == "button") {// Check if the click target is a button.
            renderBoard(); // Render of the board.

            informations.classList.toggle("blue"); // First player is blue.
            formMenu.classList = "filled"; // Disparition of the form.

            board.addEventListener("click", changeCellValue); // Click on cells.
        }
    });

    formMenu.addEventListener("submit", function(event){
        event.preventDefault();
        formMenu.querySelector("input[type='button']").click();
    });
}

/**
 * Render method.
 */
function renderBoard() {
    board.innerHTML = "";// Board is emptied before filling.

    board.style.width = (nbCells * 5 + 1) + "rem"; // Board with is set with the case number.

    for (let i = 0; i < nbCells; i++) { // Going through lines.
        let row = document.createElement("tr");
        for (let j = 0; j < nbCells; j++) { // Going through columns.
            let cell = document.createElement("td");

            if (matrix[i][j] === 0) // If value matrix is empty.
                cell.classList = ""
            else // If value matrix is value of player.
                cell.classList = matrix[i][j] === 1 ? "blue" : "red";
            row.appendChild(cell);
        }
        board.appendChild(row);
    }

    if (checkVictory()) { // Game is won.
        // Put back the winner player.
        informations.classList.toggle("blue");
        informations.classList.toggle("red");

        // State the end of the game with win message.
        informations.classList.add("end");
        informations.innerHTML = " won ! 🏆";

        // Delete event listener from cells.
        board.removeEventListener("click", changeCellValue);
    } else if (checkTie()) {
        // Tie message at the end of the game.
        informations.classList = "informations green";
        informations.innerHTML = "this is a tie ! ⚔";
        informations.classList.add("end");
    }
}

/**
 * Method to change the value of the cell.
 * 
 * @param {Event} event 
 */
function changeCellValue(event) {
    // Coordinates of the cell.
    let cellIndex = event.target.cellIndex;
    let rowIndex = event.target.parentNode.rowIndex;

    if (matrix[rowIndex][cellIndex] === 0) { // If matrix value for cell coordinates is empty.

        // Change value in matrix.
        matrix[rowIndex][cellIndex] = player;

        // Render of the board.
        renderBoard();

        // Change actual player.
        informations.classList.toggle("blue");
        informations.classList.toggle("red");
        player = player === 1 ? 2 : 1;
    }
}

/**
 * Check method for victory.
 * 
 * @returns {bool} State of victory.
 */
function checkVictory() {
    return checkLine() || checkColumn() || checkInter();
}

/**
 * Check line victory.
 * 
 * @returns {bool} State of line victory.
 */
function checkLine() {

    for (let index = 0; index < nbCells; index++) { // Going through lines

        if (matrix[index].every((val, i, arr) => val === arr[0] && val !== 0))
            // Check if all values from lines are the same.
            return true;
    }

    // No lines has same values, no victory.
    return false;
}

/**
 * Check column victory.
 * 
 * @returns  {bool} State of victory.
 */
function checkColumn() {

    for (let index = 0; index < nbCells; index++) { // Going through lines.

        if (matrix.map((row) => { return row[index] }).every((val, i, arr) => val === arr[0] && val !== 0))
            // Create columns from matrix and check if all values from columns are the same.
            return true;
    }
    // No columns has same values, no victory.
    return false;
}

/**
 * Check intercardinales victory.
 * 
 * @returns {bool} State of victory.
 */
function checkInter() {
    // Initialization of variables.
    let sameValues = false;
    let inter1 = [];
    let inter2 = [];

    for (let index = 0; index < nbCells; index++) {
        // Going through lines and creating arrays for intercardinales.
        inter1[index] = matrix[index][index];
        inter2[nbCells - index - 1] = matrix[index][nbCells - index - 1];
    }

    // Set state if one of the intercardinale is won.
    sameValues = inter1.every((val, i, arr) => val === arr[0] && val !== 0);
    sameValues = sameValues || inter2.every((val, i, arr) => val === arr[0] && val !== 0);

    return sameValues; // Return state of intercardinales.
}

/**
 * Check if game is a tie.
 * All values are played and no 0 is in matrix.
 * 
 * @returns {bool} State of tie.
 */
function checkTie() {
    // Flatten the array to check if all values are different of 0.
    return matrix.flat().every((val, i, arr) => val !== 0);
}