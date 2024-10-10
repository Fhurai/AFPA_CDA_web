/**
 * Initialization variables.
 */
const formMenu = document.querySelector("form#menu");
const formGame = document.querySelector("form#game");
const historyDiv = document.querySelector("div.history");
const bar = document.querySelector(".bar");
var number;
var max;
var historyTable = [];
var limits = [];

/**
 * Init page load.
 */
document.addEventListener("DOMContentLoaded", function () {
    initBoard(); // Init game board.
    propose(); // Launch proposition game.
});

/**
 * Init game board.
 */
function initBoard() {
    formMenu.addEventListener("click", function (event) { // Click on form.

        if (event.target.type == "button") {// Check if the click target is a button.

            formMenu.classList = "filled"; // Disparition of the max number / menu form.

            max = Number.parseInt(formMenu.querySelector("input[type='number']").value); // Set the max variable as a number.
            limits = [0, max]; // Set the limits of numbers given by user.

            number = Math.floor(Math.random() * Number.parseInt(max)); // Set the random number to guess.

            // Change guess input with max number set by user.
            formGame.querySelector("input[type='number']").placeholder = "0-" + max;
            formGame.querySelector("input[type='number']").max = max;

            // Show the components of the game board.
            formGame.classList.add("on");
            historyDiv.classList.add("on");

            draw(); // Draw the bar board.
        }
    });

    formMenu.addEventListener("submit", function (event) { // Enter key in input
        event.preventDefault(); // Prevent the form submit.
        formMenu.querySelector("input[type='button']").click(); // Click on input button instead.
    });
}

/**
 * Launch proposition game.
 */
function propose() {

    formGame.addEventListener("click", function (event) { // Click on game form.

        if (event.target.type == "button") {// Check if the click target is a button.

            let proposition = Number.parseInt(formGame.querySelector("input[type='number']").value); // Set the user proposition as a number.
            formGame.querySelector("div input[type='number']").value = ""; // Input emptied.

            historyTable.push(proposition); // Adding the proposition in history table.

            // Creation of visual representation of history.
            let div = document.createElement("div"); 

            if (proposition > number) { 
                // If proposition higher than guess number then history entry is edited to show it.
                div.classList = "wrong lower";
                div.innerHTML = "Lower than " + proposition;
                
                limits[1] = proposition; // Adding the given number as the high limit.
            } else if (proposition < number) {
                // If proposition lower than guess number then history entry is edited to show it.
                div.classList = "wrong higher";
                div.innerHTML = "Higher than " + proposition;
                
                limits[0] = proposition; // Adding the given number as the low limit.
            } else if (proposition === number) {
                // If proposition is the right number then history entry is edited to show it.
                div.className = "success";
                div.innerHTML = "Bingo ! The number is " + proposition + "<br/>";
                div.innerHTML += "Congrats, you found the number in " + historyTable.length + " hits.";
                bar.querySelector("div:nth-child(" + proposition + ")").classList = "success";
            }

            // Adding the history entry and scrolling to bottom of history.
            historyDiv.appendChild(div);
            historyDiv.scrollTo(0, historyDiv.scrollHeight);

            // Color the bar board.
            colors();
        }
    });

    formGame.addEventListener("submit", function (event) { // Enter key in input
        event.preventDefault(); // Prevent the form submit.
        formGame.querySelector("input[type='button']").click(); // Click on input button instead.
    });
}

/**
 * Draw the bar board.
 */
function draw() {

    for (let index = 0; index < max; index++) {
        // For each number between 0 and max, creation of a element in the bar board with a unbreakable space.
        let barElement = document.createElement("div");
        barElement.innerHTML = "&nbsp;";
        barElement.id = index + 1;
        bar.appendChild(barElement);
    }
}

/**
 * Color the bar board.
 */
function colors() {

    for (let index = 1; index < max; index++) {
        // Going through all number elements in bar board.

        if (index <= limits[0] || index >= limits[1])
            // If the element number is outside the user limits, we class it as wrong.
            bar.querySelector("div:nth-child(" + index + ")").classList.add("wrong");

        if (index === limits[0])
            // If element is low limit, edit of the element to show it.
            bar.querySelector("div:nth-child(" + index + ")").classList = "wrong limit low";
        else if (index === limits[1])
            // If element is high limit, edit of the element to show it.
            bar.querySelector("div:nth-child(" + index + ")").classList = "wrong limit high";
        else
            // If element is not a limit, edit of the element to show it.
            bar.querySelector("div:nth-child(" + index + ")").classList.remove("limit");
    }
}