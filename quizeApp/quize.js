document.addEventListener('DOMContentLoaded', () => {

    const quize_container = document.getElementById('quize_container');
    const quation_container = document.getElementById('quation_container');
    const quation = document.getElementById('quation');
    const options = document.getElementById('options');
    const nextQuizeButton = document.getElementById('nextQuize_button');
    const resultContainer = document.getElementById('result_container');
    const scoreNumber = document.getElementById('score');
    const restartButton = document.getElementById('restartButton');
    const startQuizeButton = document.getElementById('startQuizeButton');

    const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startQuizeButton.addEventListener('click', startQuize);

  nextQuizeButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuation();
    } else {
        showResult();
    }
  });

  restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    quize_container.classList.remove('invisible');

    startQuize();
  })


  function startQuize() {
    quize_container.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    startQuizeButton.classList.add("hidden");
    showQuation();
  }

  function showQuation() {
    nextQuizeButton.classList.add("hidden");
    options.textContent = "";
    quation.textContent = ` ${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].question}`;
    questions[currentQuestionIndex].choices.forEach((choice) => {
        const li = document.createElement('li');
        li.classList.add('newStyle');
        li.textContent = choice;
        li.addEventListener('click', () => {
            li.classList.toggle('selected');
        });
        li.addEventListener('click', () => selectAnswer(choice));
        options.appendChild(li);
    });
  };

  function selectAnswer(choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if(choice === correctAnswer) {
        score++;
    }
    nextQuizeButton.classList.remove('hidden');
  };

  function showResult() {
    quize_container.classList.add('hidden');
    quize_container.classList.add('invisible');
    resultContainer.classList.remove('hidden');
    scoreNumber.textContent = `${score} out of ${questions.length}`
  }

});