let inProgress;
let timerCount;
let highScore;
let quizMain = document.querySelector(".quiz");
let timerElement = document.querySelector(".timer-count");
let startButton = document.getElementById("start-button");

function startQuiz() {
  timerCount = 60;
  quizMain.innerHTML = "";
  startTimer();
  questions();
  inProgress = true;
}

function startQuiz2() {
  timerCount = 60;
  quizMain.innerHTML = "";
  startTimer();
  inProgress = true;
  quizField();
  var numberOfQuestionsInQuiz = quizQuestions.length;
  console.log(
    "startQuiz2 begin, numberOfQuestionsInQuiz is ",
    numberOfQuestionsInQuiz
  );
  //start quiz from first question
  showQuestion(0);
}

// Implementation of timer.
function startTimer() {
  timerElement.textContent = timerCount;
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // check if end quiz condition is met
      if (!inProgress || timerCount === 0) {
        // clear the interval and stop timer
        clearInterval(timer);
        endQuiz();
      }
    }
  }, 1000);
}

function stopTimer() {}

function quizField() {
  //Generate section element which will be the parent for quiz field
  var qSection = document.createElement("section");
  qSection.id = "quiz-field";
  document.getElementsByTagName("main")[0].appendChild(qSection);
}

function showQuestion(questionId) {
  let activeQuestionInQuiz = quizQuestions[questionId];
  /* Generate HTML tags for question page 
  <div id="questionText"> to show the question
  <ul id="answers"> and <li id="answer"> for answer options
  <div id="validation"> for validation message
  at the beginning clean the quiz field from previous question
  */
  //   document.getElementById("quiz-field").innerHTML = "";

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
    // document.getElementById("answers").appendChild(aLi);
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
    console.log("answer was correct");
  } else {
    // if answer is not correct  - timer minus 10 seconds
    timerCount -= 10;
    document.getElementById("validation").textContent = "Wrong!";
    console.log("answer was wrong");
  }
  // quiz ends when timer is 0
  if (timerCount <= 0) {
    endQuiz();
    return;
  }

  let nextQuestionId = questionId + 1;
  //if this is the last question user redirected to page to show user's score.
  if (nextQuestionId === quizQuestions.length) {
    endQuiz();
    return;
  }
  //show next question  if it's not he last one
  showQuestion(nextQuestionId);
}

// rendering the page when 'win' conditions are met
function endQuiz() {
  stopTimer();
  console.log("quiz end");
}

// put score to local storage, if current score if higher
function setHighScoreToStorage(currentScore) {
  // TODO add number wins on the page
  let storedHighScore = getHighScoreFromStorage;
  if (currentScore >= storedHighScore) {
    localStorage.setItem("highScore", highScore);
  }
}
// Function to get high score from local storage. Return 0 if doesn't exist.
function getHighScoreFromStorage() {
  // get stored value from client's localstorage if it's exist
  let storedHighScore = localStorage.getItem("highScore");
  // set counter to 0 if stored value doesn't exist
  if (storedHighScore === null) {
    return 0;
  } else {
    return storedHighScore;
  }
}

//Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz2);

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
];
