

fetch("questions.json")
.then(response => response.json())
.then(data => {
questions = data;
const numQuestions = questions.length;
const questionsToAsk = Math.ceil(numQuestions * 0.25);
const randomQuestions = [];

  while (randomQuestions.length < questionsToAsk) {
    let randomIndex = Math.floor(Math.random() * numQuestions);
    if (!randomQuestions.includes(questions[randomIndex])) {
      randomQuestions.push(questions[randomIndex]);
    }
  }

  let score = 0;
  let currentQuestionIndex = 0;

  const trueButton = document.querySelector("#true-button");
  const falseButton = document.querySelector("#false-button");
  const questionContainer = document.querySelector("#question-container");
  const scoreContainer = document.querySelector("#score");
  const timerContainer = document.querySelector("#timer");

  trueButton.addEventListener("click", () => checkAnswer(true));
  falseButton.addEventListener("click", () => checkAnswer(false));

  function checkAnswer(answer) {
    const currentQuestion = randomQuestions[currentQuestionIndex];
    clearTimeout(timerId);
    if (currentQuestion.answer === answer) {
      score += currentQuestion.points;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === randomQuestions.length) {
      // quiz is over
      questionContainer.innerHTML = "Quiz is over! Final score: " + score + " out of " + questionsToAsk * 10;
      trueButton.style.display = "none";
      falseButton.style.display = "none";
    } else {
      // show next question
      showQuestion(randomQuestions[currentQuestionIndex]);
    }
    scoreContainer.innerHTML = score;
  }

  let timerId;
  let timeLeft = 5;

  function showQuestion(question) {
    questionContainer.innerHTML = question.question;
    timeLeft = 30;
    timerContainer.innerHTML = timeLeft;
    timerId = setInterval(() => {
      timeLeft--;
      timerContainer.innerHTML = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timerId);
        checkAnswer(null);
      }
    }, 1000);
  }

  showQuestion(randomQuestions[currentQuestionIndex]);
  
});
