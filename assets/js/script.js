let isWin;
let timerCount;
let winCounter;
let loseCounter;
let quizMain = document.querySelector(".quiz");
let timerElement = document.querySelector(".timer-count");
let startButton = document.getElementById("start-button");

function startQuiz() {
    // timer value in minutes
    timerCount = 5;
    quizMain.innerHTML = "";
    startTimer();
    isWin = false;
}

// Implementation of timer. Initial value: 5 minutes
function startTimer() {
    timerElement.textContent = timerCount;
    timer = setInterval (function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >=0) {
            // check if win condition is met
            if (isWin && timerCount>0) {
                // clear the interval and stop timer
                clearInterval(timer);
                winGame();
            }
        }
        // Check if lose condition is met
        if (timerCount === 0) {
            // clear interval
            clearInterval(timer);
            loseGame();
        }
    }, 60000
    )
}

// rendering the page when 'win' conditions are met 
function winGame() {

}

// rendering the page when 'lose' conditions are met
function loseGame() {

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






