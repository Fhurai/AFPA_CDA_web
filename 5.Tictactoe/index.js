// Selector variables.
const formMenu = document.querySelector("form");
const board = document.querySelector(".board");
const informations = document.querySelector("#informations");
var nbCells;

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

        if (event.target.type == "button") {// Check if the click target is a button.

            nbCells = formMenu.querySelector("input[type='number']").value; // Get the case numbers for a line or column.

            board.innerHTML = "";// Board is emptied before filling.
            board.style.width = (nbCells * 5 + 1) + "rem"; // Board with is set with the case number.

            for (let i = 0; i < nbCells; i++) { // Going through lines.
                for (let j = 0; j < nbCells; j++) { // Going through columns.

                    let boardCell = document.createElement("div"); // Creation of the board cell.
                    boardCell.setAttribute("width", i); // Set the X coordinate of cell.
                    boardCell.setAttribute("height", j); // Set the Y coordinate of cell.
                    board.appendChild(boardCell); // Cell added to the board.
                }
            }

            informations.classList.toggle("blue"); // First player is blue.
            formMenu.classList = "filled"; // Disparition of the form.

            // Addition of eventlistener click with ChangeCell function on all cells of the board.
            Array.from(board.querySelectorAll("div")).forEach((bc) => {
                bc.addEventListener("click", ChangeCell);
            });
        }
    });

    formMenu.addEventListener("submit", function (event) { // Enter key in input
        event.preventDefault(); // Prevent the form submit.
        formMenu.querySelector("input[type='button']").click(); // Click on input button instead.
    });
}

/**
 * Change cell state when player click.
 * 
 * @param {Event} event 
 */
function ChangeCell(event) {

    if (event.target.classList.length === 0) { // If player choose an empty cell, its state change.
        event.target.classList = informations.classList;
        event.target.classList.remove("informations");

        playTurn(); // Player plays their move.
    }
}

/**
 * Play a turn
 */
function playTurn() {
    checkVictory(); // Check victory conditions

    // Change actual player.
    informations.classList.toggle("blue");
    informations.classList.toggle("red");
}

/**
 * Check victory conditions.
 */
function checkVictory() {

    if (checkLine() || checkColumn() || checkInter()) { // Check lines, columns and intercardinales.

        // Put back the winner player.
        informations.classList.toggle("blue");
        informations.classList.toggle("red");

        // State the end of the game with win message.
        informations.classList.add("end");
        informations.innerHTML = " won ! 🏆";

        // Remove the event listener on all board cells as winner is known.
        Array.from(board.querySelectorAll("div")).forEach((el) => {
            el.removeEventListener("click", ChangeCell);
        });
    } else
        checkTie(); // Check game is a tie.

}

/**
 * Check if game is a tie.
 */
function checkTie() {

    if (board.querySelectorAll("div").length === board.querySelectorAll("div[class]").length) { // If all cells are played.

        // Tie message at the end of the game.
        informations.classList = "informations green";
        informations.innerHTML = "this is a tie ! ⚔";
        informations.classList.add("end");
    }
}

/**
 * Check if line is won.
 * 
 * @returns {bool} State if one line is won.
 */
function checkLine() {
    let nbLines = Number.parseInt(formMenu.querySelector("input[type='number']").value); // Get the number of lines.

    for (let index = 0; index < nbLines; index++) { // Going through each line.
        // Initialization of numbers of colored cells, total cells & state if all cells of the line have same value.
        let colorCells = Array.from(board.querySelectorAll("div[width='" + index + "']")).map((el) => { return el.classList.length }).reduce((a, b) => a + b);
        let totalCells = Number.parseInt(formMenu.querySelector("input[type='number']").value);
        let sameValues = Array.from(board.querySelectorAll("div[width='" + index + "']")).map((el) => { return el.classList[0] }).every((val, i, arr) => val === arr[0]);

        if (colorCells === totalCells && sameValues) { // If all cells of the line are colored and have the same value then win !
            return true;
        }
    }

    return false; // Line not won.
}

/**
 * Check if column is won.
 * 
 * @returns {bool} State if one column is won.
 */
function checkColumn() {
    let nbColumn = Number.parseInt(formMenu.querySelector("input[type='number']").value); // Get the number of columns.

    for (let index = 0; index < nbColumn; index++) {// Going through each column.
        // Initialization of numbers of colored cells, total cells & state if all cells of the column have same value.
        let colorCells = Array.from(board.querySelectorAll("div[height='" + index + "']")).map((el) => { return el.classList.length }).reduce((a, b) => a + b);
        let totalCells = Number.parseInt(formMenu.querySelector("input[type='number']").value);
        let sameValues = Array.from(board.querySelectorAll("div[height='" + index + "']")).map((el) => { return el.classList[0] }).every((val, i, arr) => val === arr[0]);

        if (colorCells === totalCells && sameValues) { // If all cells of the column are colored and have the same value then win !
            return true;
        }
    }

    return false; // column not won.
}

/**
 * Check if intercardinal is won.
 * 
 * @returns @returns {bool} State if one intercardinal is won.
 */
function checkInter() {
    // Initialization of state of intercardinales and colors tables.
    let sameValues = false;
    let colors1 = [];
    let colors2 = [];

    for (let index = 0; index < nbCells; index++) { // Going through the number of cells in one line.
        // Get the colors of all cells in first intercardinale.
        colors1[index] = board.querySelector("div[width='" + index + "'][height='" + index + "']").classList[0];

        // Get the colors of all cells in second intercardinale.
        colors2[nbCells - index - 1] = board.querySelector("div[width='" + index + "'][height='" + (nbCells - index - 1) + "']").classList[0];
    }

    // Set state if one of the intercardinale is won.
    sameValues = Array.from(colors1).every((val, i, arr) => val === arr[0]) && Array.from(colors1).every((val, i, arr) => val !== undefined);
    sameValues = sameValues || Array.from(colors2).every((val, i, arr) => val === arr[0]) && Array.from(colors2).every((val, i, arr) => val !== undefined);

    return sameValues; // Return state of intercardinales.
}