"use strict";

// start screen-------------------------------------
const startBtn = document.querySelector(".startBtn");
const start = document.querySelector(".start");

startBtn.addEventListener("click", function () {
  start.classList.add("hide");
});

// play----------------------------------------------
const restart = document.querySelector(".restart");
const check = document.querySelector(".check");
const message = document.querySelector(".tips");
const text = document.querySelector("h1");
const color = document.querySelector("main");
let secretNumber = document.querySelector(".secretNumber");

const border = document.querySelectorAll(".border")

const number = Math.trunc(Math.random() * 50 + 1);

let score = 20;
function calcScore() {
  score -= 1;
  document.querySelector(".score").textContent = score;
}
let highScore = 0;
function setHighScore() {
  if (score > highScore) {
    highScore = score;
    document.querySelector(".highScore").textContent = highScore;
  }
}

const again = function () {
  document.querySelector(".input").value = "";
  score = 20;
  document.querySelector(".score").textContent = score;
  document.querySelector(".highScore").textContent = 0;
  color.style.backgroundColor = "#f5dc6f";
  secretNumber.textContent = "?";
  text.textContent = "✨ Guess the Number! ✨";
  message.textContent = "🧐 Start guessing...";
};

function gameLogic() {
  let guess = Number(document.querySelector(".input").value);
  if (!guess) {
    message.textContent = "🚫 No number!";
  } else if (guess === number) {
    message.textContent = "🎉 Guess is correct!";
    text.textContent = "Guess is correct!";
    color.style.backgroundColor = "#80D76E";
    secretNumber.textContent = number;
    for (let index = 0; index < border.length; index++) {
      border[index].style.borderColor = "#5ca44d";
      border[index].style.color = "#80D76E";
    }
    setHighScore();
  } else if (score > 1) {
    if (guess > number) {
      message.textContent = "🎈 Too high!";
      calcScore();
    } else if (guess < number) {
      message.textContent = "❄️ Too low!";
      calcScore();
    }
  } else {
    message.textContent = "You lost the game!";
    document.querySelector(".score").textContent = 0;
  }
}

// check button----------------------------------------------
check.addEventListener("click", gameLogic);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    gameLogic();
  }
});

// restart button----------------------------------------------
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    again();
  }
});
restart.addEventListener("click", again);
