let c = 0;   // Counter Value
let ci = 0;  // Increment Clicks
let cd = 0;  // Decrement Clicks

const count = document.getElementById("count");
const incCount = document.getElementById("incCount");
const decCount = document.getElementById("decCount");

function inc() {
    c++;
    // Reset increment clicks after 10
    ci = (ci >= 10) ? 0 : ci + 1;
    update();
}

function dec() {
    // Prevent counter from going below 0
    c = c > 0 ? c - 1 : 0;

    // Reset decrement clicks after 10
    cd = (cd >= 10) ? 0 : cd + 1;
    update();
}

function update() {
    count.textContent = c;
    incCount.textContent = ci;
    decCount.textContent = cd;
}
