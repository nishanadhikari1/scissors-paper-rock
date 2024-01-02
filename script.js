let uScore = 0;
let computerScore = 0;
let gameFinished = false; 
const userScore_span = document.getElementById("my-score");
const computerScore_span = document.getElementById("computer-score");
const result = document.getElementById("result");
const restartButton = document.getElementById("restart-button");
const restartGameDiv = document.getElementById("restart-game");
const messageDiv = document.getElementById("message");

document.querySelectorAll('.selection').forEach(choice => {
    choice.addEventListener('click', function () {
        if (gameFinished) {
            return;
        }

        const userChoice = choice.firstElementChild.className;
        const computerChoice = getComputerChoice();

        let roundResult = winRound(computerChoice, userChoice);

        if (roundResult === 0) {
            uScore++;
            result.innerHTML = 'You win as computer choose ' + computerChoice;
        } else if (roundResult === 1) {
            computerScore++;
            result.innerHTML = 'Computer wins as computer choose ' + computerChoice;
        } else {
            result.innerHTML = 'Game tied as both choose ' + computerChoice;
        }

        userScore_span.innerHTML = uScore;
        computerScore_span.innerHTML = computerScore;

        if (uScore === 3 || computerScore == 3) {
            displayFinalMessage();
            gameFinished = true; 
        }
    });
});

function getComputerChoice() {
    const choices = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function winRound(computerChoice, userChoice) {
    if (
        (userChoice === "rock" && computerChoice === "scissor") ||
        (userChoice === "scissor" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock")
    ) {
        // User wins
        return 0;
    } else if (
        (computerChoice === "rock" && userChoice === "scissor") ||
        (computerChoice === "scissor" && userChoice === "paper") ||
        (computerChoice === "paper" && userChoice === "rock")
    ) {
        // Computer wins
        return 1;
    } else {
        // Tie
        return 2;
    }
}

function displayFinalMessage() {
    if (uScore === 3) {
        messageDiv.innerHTML = "Congratulations! You win!";
    } else {
        messageDiv.innerHTML = "Sorry! You lose.";
    }

    restartGameDiv.style.display = "flex";
}

restartButton.addEventListener('click', function () {
    uScore = 0;
    computerScore = 0;
    userScore_span.innerHTML = uScore;
    computerScore_span.innerHTML = computerScore;
    result.innerHTML = "";
    messageDiv.innerHTML = "";
    restartGameDiv.style.display = "none";
    gameFinished = false;
});
