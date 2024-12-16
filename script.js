var cp = "X";  // Start with X's turn
var gameover = false;  // Keep track if the game is over
var playerName = "";  // Store the player's name
var playerSurName = "";  // Store the player's surname

// Get all cells
let cells = [
    document.getElementById('cell1'),
    document.getElementById('cell2'),
    document.getElementById('cell3'),
    document.getElementById('cell4'),
    document.getElementById('cell5'),
    document.getElementById('cell6'),
    document.getElementById('cell7'),
    document.getElementById('cell8'),
    document.getElementById('cell9')
];

// Attach event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', function () {
        cellClick(cell);
    });
});

// Function to start the game
function startGame() {
    // Get the player's name and surname from the input fields
    playerName = document.getElementById("playerName").value.trim();
    playerSurName = document.getElementById("playerSurName").value.trim();

    // Check if both fields are filled out
    if (playerName === "" || playerSurName === "") {
        document.getElementById('nameError').style.display = 'block';  // Show error if name or surname is empty
        return;  // Exit if any field is empty
    }

    // Hide the name input section and show the game section
    document.getElementById("name-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
}

// Function to handle cell clicks
function cellClick(cell) {
    if (gameover || cell.innerHTML !== "") return;  // Skip if game is over or cell is filled
    write(cell);  // Write X or O in the clicked cell
    checkwin();  // Check for a win after every move
}

function checkwin() {
    let r = document.getElementById('result');
    if (checkLine(cells[0], cells[1], cells[2]) || checkLine(cells[3], cells[4], cells[5]) || 
        checkLine(cells[6], cells[7], cells[8]) || checkLine(cells[0], cells[3], cells[6]) || 
        checkLine(cells[1], cells[4], cells[7]) || checkLine(cells[2], cells[5], cells[8]) || 
        checkLine(cells[0], cells[4], cells[8]) || checkLine(cells[2], cells[4], cells[6])) {
        
        r.innerHTML = `${playerName} ${playerSurName}<br>🎉 (${cp}) is the winner! 🎉`;
        playSound('win.mp3'); // Play winning sound
        blinkScreen();  // Blink screen 4-5 times after win
        gameover = true; // End the game
    } else if (isBoardFull()) {
        r.innerHTML = `Oops! It's a draw! <br> 😔😔😔`;
        playSound('loss.mp3'); // Play sad sound for draw
        gameover = true;
    } else {
        cp = (cp === "X") ? "O" : "X"; // Switch player turn
    }
}

// Function to play sound
function playSound(src) {
    console.log("Playing sound: " + src);  // Debugging line
    let sound = new Audio(src);
    sound.play().catch((error) => {
        console.error("Error playing sound:", error);  // Catch any errors
    });
}

// Function to check a winning line
function checkLine(cell1, cell2, cell3) {
    return cell1.innerHTML === cp && cell2.innerHTML === cp && cell3.innerHTML === cp;
}

// Function to check if the board is full
function isBoardFull() {
    return cells.every(cell => cell.innerHTML !== "");
}

// Function to write X or O in the cell
function write(cell) {
    cell.innerHTML = cp;  // Set X or O in the clicked cell
}

// Function to restart the game
function restart() {
    cells.forEach(cell => {
        cell.innerHTML = ""; // Clear all cells
    });
    gameover = false; // Reset the gameover flag
    document.getElementById('result').innerHTML = ""; // Clear result message
    cp = "X"; // Start with X's turn
    document.body.style.backgroundColor = ""; // Reset background color
}

// Function to blink the screen after a win
function blinkScreen() {
    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
        if (blinkCount >= 7) {
            clearInterval(blinkInterval); // Stop blinking after 5 blinks
            document.body.style.backgroundColor = "orange"; // Keep the celebration color
        } else {
            document.body.style.backgroundColor = document.body.style.backgroundColor === "orange" ? "white" : "orange";
            blinkCount++;
        }
    }, 500);  // Toggle every 500ms
}

