(function(){
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'green';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Q1. Who discovered the laws of motion?",
      answers: {
        a: "Galileo",
        b: "Albert Einstein",
        c: "Isaac Newton",
        d: "Heisenberg"
      },
      correctAnswer: "c"
    },
    {
      question: "Q2. Total distance divided by total time is?", 
      answers: {
        a: "Average speed",
        b: "constant speed",
        c: "Instantaneous speed",
        d: "Acceleration"
      },
      correctAnswer: "a"
    },
    {
      question: "Q3. Change in speed over a given period of time is?",

      answers: {
        a: "Velocity",
        b: "Acceleration",
        c: "Motion",
        d: "Speed"
      },
      correctAnswer: "b"
    },
    {
      question: "Q4. What is the unit of measurementfor work?",

      answers: {
        a: "Newtons",
        b: "Joules",
        c: "Watts",
        d: "Meters"
      },
      correctAnswer: "b"
    },
    {
      question: "Q5. If a student uses 10 Newtons of Force to push a chair 5 meters, how much work is being done?",

      answers: {
        a: "2 Joules",
        b: "0.5 Joules",
        c: "50 Joules",
        d: "20 Joules"
      },
      correctAnswer: "c"
    }
 

  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();
/////////////////////////////////////////////////////////////////////////////////
