let inProgress;
let timerCount;
let highScore;
let quizMain = document.querySelector(".quiz");
let timerElement = document.querySelector(".timer-count");
let startButton = document.getElementById("start-button");

function startQuiz() {
    timerCount = 120;
    quizMain.innerHTML = "";
    startTimer();
    inProgress = false;
}

// Implementation of timer. Initial value: 5 minutes
function startTimer() {
    timerElement.textContent = timerCount;
    timer = setInterval (function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >=0) {
            // check if end quiz condition is met
            if (!inProgress || timerCount===0) {
                // clear the interval and stop timer
                clearInterval(timer);
                endQuiz();
            }
        }
    }, 1000)
}


// rendering the page when 'win' conditions are met 
function endQuiz() {

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
startButton.addEventListener("click", startQuiz);







// List of questions and answers fro the quiz. correct_answer is an index of answer's array
let questions = [
	{
		"question_test": "Arrays in JavaScript can be used to store:",
		"answers": [
			"Numbers and Strings",
			"Other Arrays",
			"Booleans",
			"All of the Above"
		],
		"correct_answer": 3,
	},
		{
            "question_test": "String values must be enclosed within ____ when being assigned to variables",
            "answers": [
                "Commas",
                "Curly Brackets",
                "Quotes",
                "Parenthesis"
		],
		"correct_answer": 2, 
	},
		{
            "question_test": "Commonly used data types DO NOT include:",
            "answers": [
                "Strings",
                "Booleans",
                "Alerts",
                "Numbers"
		],
		"correct_answer": 2,
	},
		{
            "question_test": "The condition of an if/else statement is enclosed with:",
            "answers": [
                "Quotes",
                "Curly Brackets",
                "Parenthesis",
                "Square Brackets"
		],
		"correct_answer": 2,
	},
	{
        "question_test": "As a developer, I want to be able to remove the last element of my array and I want to also be able to add a new element to the beginning of my array. Which two array methods should I use?",
        "answers": [
            "pop() and unshift()",
            "push() and sort()",
            "forEach() and pop()",
            "concat() and shift()"
		],
		"correct_answer": 0,
	},
    {
        "question_test": "How do we declare a conditional statement in JavaScript?",
        "answers": [
            "if...else",
            "for loop",
            "while loop",
            "difference...between"
    ],
    "correct_answer": 0,
}
]






