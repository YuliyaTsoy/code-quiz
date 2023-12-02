// DEPENDENCIES
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
var timerEl = document.getElementById("timer");
var initialsEl = document.getElementById("enter-initials");
initialsEl.style.display = "none";
var scoreEl = document.getElementById("score");
var submitButtonEl = document.getElementById("submit-button");
var inputEl = document.getElementById("input");
var highScoresEl = document.getElementById("high-scores");
highScoresEl.style.display = "none";
var listItemEl = document.getElementById("list-item");

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
var currentQuestionIndex = 0;
var currentQuestion = questionBank[currentQuestionIndex];

// Helper FUNCTIONS

// gets quiz started
function startQuiz() {
  intro.style.display = "none";
  header.style.display = "none";
  container.style.display = "block";
  renderQuestions();
  timerCount = 60;
  startTimer();
}
// renders questions to the page
function renderQuestions() {
  questionEl.textContent = currentQuestion.question;
  button1El.textContent = currentQuestion.choice1;
  button2El.textContent = currentQuestion.choice2;
  button3El.textContent = currentQuestion.choice3;
  button4El.textContent = currentQuestion.choice4;
}
//timer starts
function startTimer() {
  timerEl.textContent = "Time left: " + timerCount;
  timer = setInterval(function () {
    if (timerCount <= 0) {
      gameOver();
    }
    timerCount--;
    timerEl.textContent = "Time left: " + timerCount;
  }, 1000);
}

// checks user's answers
function checkAnswer(event) {
  var clickButton = event.target;
  var content = clickButton.textContent;

  if (content !== currentQuestion.correctChoice) {
    timerCount = timerCount - 10;
  }

  if (currentQuestionIndex === questionBank.length - 1) {
    gameOver();
  } else {
    currentQuestionIndex++;
    currentQuestion = questionBank[currentQuestionIndex];
    renderQuestions();
  }
}

// ends game
function gameOver() {
  // stop the timer
  clearInterval(timer);

  // create input for user initials
  container.style.display = "none";
  initialsEl.style.display = "block";

  //checks if the timer goes at or below zero
  if (timerCount <= 0) {
    clearInterval(timer);
  }
  scoreEl.textContent = "Your Score is: " + timerCount;
}

// gets data from local storage:
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

// sets data to local storage:
function setToLocalStorage(highScore) {
  var highScores = getHighScoresFromLocalStorage();
  // adds new high score to high scores array
  var textInitials = inputEl.value;
  highScore = timerCount;
  var entry = {
    textInitials,
    highScore,
  };
  highScores.push(entry);

  // writes new array back to local storage (as a string!)
  localStorage.setItem("High Scores", JSON.stringify(highScores));
}
// function returning to the home page:
function goHome() {
  window.location.href = "../index.html";
}

// displays high scores list after user input initials
function displayHighScoresList() {
  setToLocalStorage();
  initialsEl.style.display = "none";
  highScoresEl.style.display = "block";
  var data = getHighScoresFromLocalStorage();
  var newList = document.createElement("ul");

  for (var i = 0; i < data.length; i++) {
    var newListItem = document.createElement("li");
    newListItem.textContent = data[i].textInitials + ": " + data[i].highScore;
    newList.appendChild(newListItem);
  }
  highScoresEl.appendChild(newList);

  // adds Go Back Button that returns to the home screen on click
  var goBackBtn = document.createElement("button");
  goBackBtn.textContent = "Go Back";
  highScoresEl.appendChild(goBackBtn);
  goBackBtn.addEventListener("click", goHome);
 
}

// USER INTERACTIONS - event listeners

// starts quiz after click on Start button
startButton.addEventListener("click", startQuiz);

// after click on answer button - new question appears on the screen:
for (i = 0; i < buttonEl.length; i++) {
  buttonEl[i].addEventListener("click", checkAnswer);
}

// after click on submit button scores are displayed
submitButtonEl.addEventListener("click", displayHighScoresList);
