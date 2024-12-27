let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"]; let highestScore = 0;
let leaderboard = [];

let started = false;
let level = 0;


// Dom manipulation start
let h2 = document.querySelector(" h2")

const leaderboardDisplay = document.getElementById("leaderboard");
const highestScoreDisplay = document.getElementById("highest-score");


// 1 event listener
document.addEventListener('keypress', function () {
    if (started == false) {
        started = true;
        console.log("Game started");
        levelUp();
    }
});

// Flash buttons
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 150)
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 150)
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Random button choose
    let rdm = Math.floor(Math.random() * 3);
    let rdmColor = btns[rdm];
    let rdmBtn = document.querySelector(`.${rdmColor}`);
    gameSeq.push(rdmColor)
    console.log(gameSeq);
    gameFlash(rdmBtn);
}

// check answers
function checkAnswer(index) {
    // console.log("Current level :", level)
    //let index = level - 1;
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        //console.log("Incorrect");
        h2.innerHTML = `Game over! Your Score was <b>${level}</b><br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200)
        if (level > highestScore) {
            highestScore = level;
            highestScoreDisplay.innerText = highestScore;
            updateLeaderboard(level);
        }
        reset(); //resetting a function.  down
    }
}


//function reset
function reset() {
    started = false; gameSeq = []; userSeq = []; level = 0;
}


// button press Event Listener
function btnPress() {
    //console.log(this)
    let btn = this;
    userFlash(btn)

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor)
    console.log(userSeq); //squence vala color added to gameSequence vala array. 
    // then we move on to the check the ans ke jo
    checkAnswer(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
// Update leaderboard
function updateLeaderboard(score) {
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    renderLeaderboard();
}

// Render leaderboard
function renderLeaderboard() {
    leaderboardDisplay.innerHTML = "";
    leaderboard.slice(0, 5).forEach((score, index) => {
        const li = document.createElement("li");
        li.innerText = `#${index + 1}: ${score}`;
        leaderboardDisplay.appendChild(li);
    });
}