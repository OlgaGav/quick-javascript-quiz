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
    questions();
    inProgress = true;
}

function startQuiz2() {
    timerCount = 120;
    quizMain.innerHTML = "";
    startTimer();
    inProgress = true;
    quizField();
    var numberOfQuestionsInQuiz = quizQuestions.length;
    console.log("startQuiz2 begin, numberOfQuestionsInQuiz is ", numberOfQuestionsInQuiz)
    showQuestion(0);
    // for (var q=0; q<numberOfQuestionsInQuiz; q++) {
    //     var activeQuestionInQuiz = quizQuestions[q];
    //     console.log ("activeQuestionInQuiz: ", activeQuestionInQuiz)
    //     showQuestion(activeQuestionInQuiz);
        
    // }
}


// Implementation of timer. 
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


function quizField() {
    /* Generate section element in main
    <main>
        <section id="quiz-field"></section>
        <div id="questionText"></div>
        <ul id="answers"></ul>
    </main>        
    */
    var qSection = document.createElement('section');
    qSection.id = "quiz-field";
    document.getElementsByTagName('main')[0].appendChild(qSection);
}

function showQuestion(questionId) {
        let activeQuestionInQuiz = quizQuestions[questionId];
        // Prepare <div id="questionText">, <ul id="answers">, <li id="answer">, <div id="validation">
        document.getElementById("quiz-field").innerHTML="";
        
        var qDiv = document.createElement('div');
        qDiv.id = "questionText";
        document.getElementById('quiz-field').appendChild(qDiv);
        
        var aUl = document.createElement('ul');
        aUl.id = "answers";
        document.getElementById('quiz-field').appendChild(aUl);
        
        //show question on the screen
        qDiv.textContent=activeQuestionInQuiz.question;
        //show answers on the screen
        var answerOptions = activeQuestionInQuiz.answers;
        console.log("answersChoiceArray.length: ", answerOptions.length);
        console.log("answersChoiceArray: ", answerOptions);
        
        for (let j=0; j<answerOptions.length; j++) {
            let answerOption = answerOptions[j];
            let aLi = document.createElement('li');
            aLi.className = "answer";
            aLi.onclick = () => checkAnswer(questionId,j);
            document.getElementById('answers').appendChild(aLi);
            aLi.textContent = (j+1) +". "+ answerOption;
        }
}

function checkAnswer(questionId, userAnswerId) {
    let activeQuestionInQuiz = quizQuestions[questionId];
    let correctAnswer = activeQuestionInQuiz.correct_answer;
    if (correctAnswer!==userAnswerId) {
        timerCount -= 10;
    }

    if (timerCount<=0) {
        endQuiz();
        return;
    }
    let nextQuestionId = questionId + 1;
    if (nextQuestionId===quizQuestions.length) {
        endQuiz();
        return;
    }
    showQuestion(nextQuestionId);
}

// function to show questions when quiz started
/*
        <section id="quiz-field">
            <div id="questionText">String values must be enclosed within ____ when being assigned to variables</div>
            <ul id="answers">
                <li id="answer">Commas</li>
                <li id="answer">Curly Brackets</li>
                <li id="answer">Quotes</li>
                <li id="answer">Parenthesis</li>
            </ul>
            <div id="validation">Correct!</div>
        </section>
*/
function questions() {
    /* Create section element in main
    <main>
        <section id="quiz-field"></section>
    </main>        
    */
    var qSection = document.createElement('section');
    qSection.id = "quiz-field";
    document.getElementsByTagName('main')[0].appendChild(qSection);
    
    // Prepare <div id="questionText">, <ul id="answers">, <li id="answer">, <div id="validation">
    var qDiv = document.createElement('div');
    qDiv.id = "questionText";
    document.getElementById('quiz-field').appendChild(qDiv);
    
    var aUl = document.createElement('ul');
    aUl.id = "answers";
    document.getElementById('quiz-field').appendChild(aUl);

    var vDiv = document.createElement('div');
    vDiv.id = "validation";

    for (let i=0; i<quizQuestions.length; i++) {

        let userChoice = "";
        let correctAnswer = "";

        //qObject containt the question with answers and correct answer
        let qObject = quizQuestions[i];
        correctAnswer = qObject.correct_answer;
        //Question
        var activeQuestion = qObject.question;
        qDiv.textContent=activeQuestion;
        //Answers
        var answersChoiceArray = qObject.answers;
        console.log("answersChoiceArray.length is ", answersChoiceArray.length);
        for (let j=0; j<answersChoiceArray.length; j++) {
            let answerChoice = answersChoiceArray[j];
            let aLi = document.createElement('li');
            aLi.id = "answer";
            document.getElementById('answers').appendChild(aLi);
            aLi.textContent = (j+1) +". "+ answerChoice;
        }
        //event handler wait user click on the button with answer
        var answerButton = document.getElementById('answer');
        console.log("answerButton value",answerButton)

        if (userChoice !== correctAnswer) {
            // timerCount -= 10;
        }
    }
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
startButton.addEventListener("click", startQuiz2);



// List of questions and answers for the quiz. correct_answer is an index of answer's array
let quizQuestions = [
	{
		"question": "1. Arrays in JavaScript can be used to store:",
		"answers": [
			"Numbers and Strings",
			"Other Arrays",
			"Booleans",
			"All of the Above"
		],
		"correct_answer": 3,
	},
		{
            "question": "2. String values must be enclosed within ____ when being assigned to variables",
            "answers": [
                "Commas",
                "Curly Brackets",
                "Quotes",
                "Parenthesis"
		],
		"correct_answer": 2, 
	},
		{
            "question": "3. Commonly used data types DO NOT include:",
            "answers": [
                "Strings",
                "Booleans",
                "Alerts",
                "Numbers"
		],
		"correct_answer": 2,
	},
		{
            "question": "4. The condition of an if/else statement is enclosed with:",
            "answers": [
                "Quotes",
                "Curly Brackets",
                "Parenthesis",
                "Square Brackets"
		],
		"correct_answer": 2,
	},
	{
        "question": "5. As a developer, I want to be able to remove the last element of my array and I want to also be able to add a new element to the beginning of my array. Which two array methods should I use?",
        "answers": [
            "pop() and unshift()",
            "push() and sort()",
            "forEach() and pop()",
            "concat() and shift()"
		],
		"correct_answer": 0,
	},
    {
        "question": "6. How do we declare a conditional statement in JavaScript?",
        "answers": [
            "if...else",
            "for loop",
            "while loop",
            "difference...between"
    ],
    "correct_answer": 0,
}
]






