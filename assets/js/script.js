let timerCount;
let inProgress = false;
let quizMain = document.getElementById("quiz");
let timerElement = document.querySelector(".timer-count");
let startPage = document.getElementById("start");
let startButton = document.getElementById("start-button");
let viewHighScoresLink = document.getElementById("high-score-link");
let highScores = document.getElementById("high-scores");
let backButton = document.getElementById("back-button");
let clearHighscoresButton = document.getElementById("clear-high-scores-button");

// List of questions and answers for the quiz. correct_answer is an index of answer's array
let quizQuestions = [
  {
    question: "1. Arrays in JavaScript can be used to store:",
    answers: [
      "Numbers and Strings",
      "Other Arrays",
      "Booleans",
      "All of the Above",
    ],
    correct_answer: 3,
  },
  {
    question:
      "2. String values must be enclosed within ____ when being assigned to variables",
    answers: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    correct_answer: 2,
  },
  {
    question: "3. Commonly used data types DO NOT include:",
    answers: ["Strings", "Booleans", "Alerts", "Numbers"],
    correct_answer: 2,
  },
  {
    question: "4. The condition of an if/else statement is enclosed with:",
    answers: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    correct_answer: 2,
  },
  {
    question:
      "5. As a developer, I want to be able to remove the last element of my array and I want to also be able to add a new element to the beginning of my array. Which two array methods should I use?",
    answers: [
      "pop() and unshift()",
      "push() and sort()",
      "forEach() and pop()",
      "concat() and shift()",
    ],
    correct_answer: 0,
  },
  {
    question: "6. How do we declare a conditional statement in JavaScript?",
    answers: ["if...else", "for loop", "while loop", "difference...between"],
    correct_answer: 0,
  },
  {
    question: "7. A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal/bash", "for loop", "console.log"],
    correct_answer: 3,
  }
]

// function which is called to start the quiz
function startQuiz() {
  timerCount = 70;
  startPage.style.display = "none";
  quizMain.innerHTML = "";
  inProgress = true;
  startTimer();
  quizField();
  //start quiz from first question
  showQuestion(0);
}

// Implementation of timer
function startTimer() {
  timerElement.textContent = timerCount;
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount <= 0) {
      endQuiz();
    }
  }, 1000);
}

function stopTimer() {
  inProgress=false;
  clearInterval(timer);
}


function quizField() {
  //Generate section element which will be the parent for quiz field
  var qSection = document.createElement("section");
  qSection.id = "quiz-field";
  quizMain.appendChild(qSection);
}

function showQuestion(questionId) {
  let activeQuestionInQuiz = quizQuestions[questionId];
  /* Generate HTML tags for question page 
  <div id="questionText"> to show the question
  <ul id="answers"> and <li id="answer"> for answer options
  <div id="validation"> for validation message
  at the beginning clean the quiz field from previous question
  */

  if (document.getElementById("questionText")) {
    document.getElementById("questionText").innerHTML = "";
  } else {
    let qDiv = document.createElement("div");
    qDiv.id = "questionText";
    document.getElementById("quiz-field").appendChild(qDiv);
  }

  if (document.getElementById("answers")) {
    document.getElementById("answers").innerHTML = "";
  } else {
    var aUl = document.createElement("ul");
    aUl.id = "answers";
    document.getElementById("quiz-field").appendChild(aUl);
  }

  let question = document.getElementById("questionText");
  let answers = document.getElementById("answers");

  //show question on the screen
  question.textContent = activeQuestionInQuiz.question;
  //show answers on the screen
  var answerOptions = activeQuestionInQuiz.answers;
  for (let j = 0; j < answerOptions.length; j++) {
    let answerOption = answerOptions[j];
    let aLi = document.createElement("li");
    aLi.className = "answer";
    aLi.onclick = () => checkAnswer(questionId, j);
    answers.appendChild(aLi);
    aLi.textContent = j + 1 + ". " + answerOption;
  }
}

function checkAnswer(questionId, userAnswerId) {
  let activeQuestionInQuiz = quizQuestions[questionId];
  let correctAnswer = activeQuestionInQuiz.correct_answer;

  if (document.getElementById("validation")) {
    document.getElementById("validation").innerHTML = "";
  } else {
    var vDiv = document.createElement("div");
    vDiv.id = "validation";
    document.getElementById("quiz-field").appendChild(vDiv);
  }

  // render the validation message
  if (correctAnswer === userAnswerId) {
    document.getElementById("validation").textContent = "Correct!";
  } else {
    // if answer is not correct  - timer minus 10 seconds
    timerCount -= 10;
    document.getElementById("validation").textContent = "Wrong!";
  }
  // quiz ends when timer is 0
  if (timerCount <= 0) {
    timerCount = 0;
    endQuiz();
    return;
  }

  let nextQuestionId = questionId + 1;
  //if this is the last question user redirected to page to show user's score.
  if (nextQuestionId === quizQuestions.length) {
    endQuiz();
    return;
  }
  //show next question  if it's not the last one
  showQuestion(nextQuestionId);
}

// rendering the page when 'end quiz' conditions are met
function endQuiz() {
  stopTimer();
  let currentScore = timerCount;
  timerElement.textContent = currentScore;
  //render end quiz page
  document.getElementById("answers").remove();
  document.getElementById("questionText").innerHTML =
    "<h2>All done!</h2>" +
    "<p id='results-p'> Your final score is <span id='current-score'>" +
    currentScore +
    "</span>.</p>" +
    "<form>" +
    "<label for='initials'>Enter initials:   </label>" +
    "<input id='initials' type='text'/>" +
    "<button id='submit-button'>Submit</button>" +
    "</form>";

    document.getElementById("submit-button").addEventListener("click", function(event) {
      event.preventDefault();
      var userName = document.querySelector("#initials").value.trim();
      if (userName.length > 0) {
        var newScoreObject = {
          "name": userName,
          "score": currentScore
        } 
      } else {
        return;
      }
      var storedScores = JSON.parse(localStorage.getItem("highScores"));
      if (storedScores === null) {
        var storedScores = [];
      }
      storedScores.push(newScoreObject);
      localStorage.setItem("highScores", JSON.stringify(storedScores));
      showHighScorePage(); 
    })
}

// function to show the table with scores if any are stored in localstorage
function renderHighScores() {
  document.getElementById("high-score-list").innerHTML="";

  var highScoresArray = JSON.parse(localStorage.getItem("highScores"));
  if (highScoresArray === null) {
    highScoresArray = [];
  }
  // sort aray with scores in descending order
  highScoresArray.sort((a, b) => b.score - a.score);
  for (let i = 0; i < highScoresArray.length; i++) {
    let liEl = document.createElement('li');
    liEl.textContent = highScoresArray[i].name + " - " + highScoresArray[i].score;
    document.getElementById("high-score-list").appendChild(liEl);
  }
}

function showHighScorePage() {
  quizMain.style.display = "none";
  startPage.style.display = "none";
  highScores.style.display = "flex";
  renderHighScores();
}

function clearHighScores() {
  localStorage.removeItem("highScores");
  document.getElementById("high-score-list").innerHTML="";
}

function backToQuiz() {
  quizMain.style.display = "flex";
  highScores.style.display = "none";
  if (!inProgress){
    startPage.style.display = "flex";
    quizMain.innerHTML = "";
  }
}

//Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);
viewHighScoresLink.addEventListener("click", showHighScorePage);
backButton.addEventListener("click", backToQuiz);
clearHighscoresButton.addEventListener("click", clearHighScores);