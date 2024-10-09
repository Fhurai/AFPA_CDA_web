const formMenu = document.querySelector("form#menu");
const formGame = document.querySelector("form#game");
const historyDiv = document.querySelector("div.history");
const bar = document.querySelector(".bar");
var number;
var max;
var historyTable = [];

document.addEventListener("DOMContentLoaded", function () {
    initBoard();
    propose();
});

function initBoard() {
    formMenu.addEventListener("click", function (event) { // Click on form.

        if (event.target.type == "button") {// Check if the click target is a button.

            formMenu.classList = "filled"; // Disparition of the form.

            max = formMenu.querySelector("input[type='number']").value;

            number = Math.floor(Math.random() * Number.parseInt(max));
            formGame.querySelector("input[type='number']").placeholder = "0-" + max;
            formGame.querySelector("input[type='number']").max = max;
            formGame.classList.add("on");
            historyDiv.classList.add("on");
            draw();
        }
    });

    formMenu.addEventListener("submit", function (event) { // Enter key in input
        event.preventDefault(); // Prevent the form submit.
        formMenu.querySelector("input[type='button']").click(); // Click on input button instead.
    });
}

function propose() {
    formGame.addEventListener("click", function (event) {

        if (event.target.type == "button") {// Check if the click target is a button.

            let proposition = Number.parseInt(formGame.querySelector("input[type='number']").value);

            let div = document.createElement("div");

            historyTable.push(proposition);

            if (proposition > number) {
                div.classList = "wrong lower";
                div.innerHTML = "Lower than " + proposition;
                for (let index = proposition; index <= max; index++) {
                    bar.querySelector("div:nth-child(" + index + ")").classList = "wrong";
                }
            } else if (proposition < number) {
                div.classList = "wrong higher";
                div.innerHTML = "Higher than " + proposition;
                for (let index = 1; index <= proposition; index++) {
                    bar.querySelector("div:nth-child(" + index + ")").classList = "wrong";
                }
            } else if (proposition === number) {
                div.className = "success";
                div.innerHTML = "Bingo ! The number is " + proposition + "<br/>";
                div.innerHTML += "Congrats, you found the number in " + historyTable.length + " hits.";
                bar.querySelector("div:nth-child(" + proposition + ")").classList = "success";
            }
            historyDiv.appendChild(div);
            historyDiv.scrollTo(0, historyDiv.scrollHeight);
        }
    });

    formGame.addEventListener("submit", function (event) { // Enter key in input
        event.preventDefault(); // Prevent the form submit.
        formGame.querySelector("input[type='button']").click(); // Click on input button instead.
    });
}

function draw(proposition) {
    for (let index = 0; index < max; index++) {
        let barElement = document.createElement("div");
        barElement.innerHTML = "&nbsp;";
        bar.appendChild(barElement);
    }
}