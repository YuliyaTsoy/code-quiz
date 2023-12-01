// DEPENDENCIES
//start button
var startButton = document.querySelector("#start");
var questionEl = document.getElementById("question");
var button1El = document.getElementById("button1");
var button2El = document.getElementById("button2");
var button3El = document.getElementById("button3");
var button4El = document.getElementById("button4");
var container = document.getElementById("container");
container.style.display = "none";
var intro = document.getElementById("intro");
var header = document.getElementById("header");
var buttonEl = document.getElementsByClassName("btn");
console.log(buttonEl);
var timerEl = document.getElementById("timer");
var initialsEl = document.getElementById("enter-initials");
initialsEl.style.display = "none";
var scoreEl = document.getElementById("score");
var submitButtonEl = document.getElementById("submit-button");
var inputEl = document.getElementById("input");
var highScoresEl = document.getElementById("high-scores");
highScoresEl.style.display = "none";
// DATA
var questionBank = [
  {
    question: "Commonly used data types DO NOT include:",
    choice1: "strings",
    choice2: "booleans",
    choice3: "alerts",
    choice4: "numbers",
    correctChoice: "alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed within:",
    choice1: "quotes",
    choice2: "curly brackets",
    choice3: "parentheses",
    choice4: "square brackets",
    correctChoice: "parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store:",
    choice1: "numbers and strings",
    choice2: "other arrays",
    choice3: "booleans",
    choice4: "all of the above",
    correctChoice: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ___ when being assigned to variables.",
    choice1: "commas",
    choice2: "curly brackets",
    choice3: "quotes",
    choice4: "parentheses",
    correctChoice: "quotes",
  },
  {
    question:
      "A very usefull tool used during development and debugging for printing content to the debugger is:",
    choice1: "JavaScript",
    choice2: "terminal/bash",
    choice3: "for loops",
    choice4: "console.log",
    correctChoice: "console.log",
  },
];

var timer;
var timerCount;

// var currentQuestionIndex = Math.floor(Math.random()*questionBank.length);
var currentQuestionIndex = 0;
var currentQuestion = questionBank[currentQuestionIndex];

// FUNCTIONS
function startQuiz() {
  intro.style.display = "none";
  header.style.display = "none";
  container.style.display = "block";
  renderQuestions();
  timerCount = 60;
  startTimer();
}

function renderQuestions() {
  questionEl.textContent = currentQuestion.question;
  button1El.textContent = currentQuestion.choice1;
  button2El.textContent = currentQuestion.choice2;
  button3El.textContent = currentQuestion.choice3;
  button4El.textContent = currentQuestion.choice4;
}
function startTimer() {
  timerEl.textContent = "Time left: " + timerCount;
  timer = setInterval(function () {
    timerCount--;
    timerEl.textContent = "Time left: " + timerCount;
  }, 1000);
}

// function wrongAnswer (){
//     timerCount = timerCount - 10;
//     timerEl.textContent = 'Time left: '+ timerCount;
//    currentQuestionIndex++;
// currentQuestion = questionBank[currentQuestionIndex]
// if (currentQuestionIndex === questionBank.length || timerCount <=0){
//     gameOver()
// } else {
// renderQuestions()
// }
// }
function checkAnswer(event) {
  var clickButton = event.target;
  var content = clickButton.textContent;
  if (currentQuestionIndex < questionBank.length) {
    currentQuestion = questionBank[currentQuestionIndex];
  } else {
    gameOver();
  }
  if (content !== currentQuestion.correctChoice) {
    timerCount = timerCount - 10;
  }
  if (currentQuestionIndex == questionBank.length || timerCount <= 0) {
    gameOver();
  } else {
      renderQuestions();
      currentQuestionIndex++;
  }
}

//handle end of the game
function gameOver() {
  // stop the timer
  clearInterval(timer);
  console.log (timerCount);
  //   alert("game over!");
  // create input for user initials
  container.style.display = "none";
  initialsEl.style.display = "block";
    if (timerCount<=0) {    // <<<<<--------------------
        clearInterval(timer);
    }
  scoreEl.textContent = "Your Score is: " + timerCount;

}

function getHighScoresFromLocalStorage() {
  // get high scores from local storage
  var highScores = localStorage.getItem("High Scores");

  // if high scores was not in local storage
  if (!highScores) {
    // then create a new array for high scores
    highScores = [];
  } else {
    // if high scores were in local storage, parse into an array
    highScores = JSON.parse(highScores);
  }

  return highScores;
}

function setToLocalStorage(highScore) {
  var highScores = getHighScoresFromLocalStorage();

  // add new high score to high scores array
  highScore = timerCount;
  highScores.push(highScore);

  // write new array back to local storage (as a string!)
  localStorage.setItem("High Scores", JSON.stringify(highScores));
}
function displayHighScoresList () {// <<<<<<<<<------------------------
    initialsEl.style.display = "none";
    // add name from input and score

    inputEl.textContent = input.value;
}
// USER INTERACTIONS
startButton.addEventListener("click", startQuiz);

for (i = 0; i < buttonEl.length; i++) {
  buttonEl[i].addEventListener("click", checkAnswer);
}
submitButtonEl.addEventListener("click", displayHighScoresList);
