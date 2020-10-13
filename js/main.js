const myQuestions = [
  {
      question: "How many hearts does an octopus have?",
      answers: {
          a: "It doesn't have a heart",
          b: "It has three hearts",
          c: "It has one heart, what do think, man?",
          d: "It has eight hearts - one for each tentacle"
          },
      correctAnswer: "b"
  },
  {
  question: "How many suctions cups can an ocotopus have?",
  answers: {
      a: "Up to 80",
      b: "Up to 160",
      c: "Up to 240",
      d: "Up to 800"
      },
      correctAnswer: "c"
  },
  {
      question: "How do you say octopus in plural form?",
      answers: {
      a: "Octopodes",
      b: "Octopuses",
      c: "Octopi",
      d: "None above .. or all above?"
      },
      correctAnswer: "d"
  }
];


// Variables
const quizContainer = document.getElementById('quiz-carousel');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

// Paging
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.carousel-item')
const startButton = document.getElementById('start')
let currentSlide = 0;

// Function to generate quiz 
function buildQuiz(){
  // Variable for storing the upcoming HTML
  const output = [];

  // For each loop going through the questions
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // Variable for storing the answers
      const answers = [];

      // Going through each answer
      for(letter in currentQuestion.answers) {

        // Each answer gets it's radio buttons
        answers.push(
          `<div class="radio">
          <input type="radio" id="${questionNumber}_${letter}" name="question${questionNumber}" value="${letter}" class="radio__input">
          <label for="${questionNumber}_${letter}" class="radio__label">
          ${letter} :
          ${currentQuestion.answers[letter]}
          </label>
          </div><br>`
        );
      }

      //
        
          if(questionNumber === 0){
            output.push(
              `<div class="carousel-item active">
                <h2 id="question">${currentQuestion.question}</h2>
              <div class="answers"> ${answers.join("")} 
              </div>
              </div>`
            );
          }

          else{
            output.push(
              `<div class="carousel-item">
                <h2 id="question">${currentQuestion.question}</h2>
              <div class="answers"> ${answers.join("")} 
              </div>
              </div>`
            );
          }          
    }
  );

    // Now questions, answers and div classes are merged into "quizContainer" and pushed to HTML
    quizContainer.innerHTML = output.join('');
    document.getElementById('next').style.display = "block";
    document.getElementById('start').style.display = "none"; 

}

function showResults(){

  // Getting the answers from the HTML document
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // Variable declared for counting correct answers
  let numCorrect = 0;

  // For loop like before, for each question
  myQuestions.forEach( (currentQuestion, questionNumber) => {
  
    // Creating variables to find the users answer 
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`
    // Here the user answer is stored, if the user didn't select anything, the value is undefiend
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // Checking to see if the answer matches the correct one
    if(userAnswer === currentQuestion.correctAnswer){
      // Add +1 to the numCorrect variable
      numCorrect++;
    }
  }
);


  // Displaying the results!
  function displayResults() {
    const scorePerCent = Math.round(100 * numCorrect/myQuestions.length);
    if(scorePerCent >= 75){
    resultsContainer.innerHTML = 
    `<h2>You good, frend!</h2>
    <div class="icons-results"><i class="far fa-grin-hearts"></i></div>
    <p>You get <strong>${numCorrect}</strong> out of <strong>${myQuestions.length}</strong> question write.</p>`;
    }
    else if(scorePerCent >= 50){
      resultsContainer.innerHTML = 
      `<h2>You not two bad</h2>
      <div class="icons-results"><i class="far fa-grin-hearts"></i></div>
      <p>You get <strong>${numCorrect}</strong> out of <strong>${myQuestions.length}</strong> question write.</p>`;
      }
    else if(scorePerCent >= 25){
      resultsContainer.innerHTML = 
      `<h2>You stupid!</h2>
      <div class="icons-results"><i class="far fa-grin-squint-tears"></i></div>
      <p>You only get <strong>${numCorrect}</strong> out of <strong>${myQuestions.length}</strong> question write.</p>`;
      }
    else{ 
      resultsContainer.innerHTML = 
      `<h2>Oooocwaaard</h2>
      <div class="icons-results"><i class="far fa-flushed"></i></div>
      <p>You now noting, Jon Snow.</p>`;
      }
    }
  

  displayResults();
}

// Kick OFF
buildQuiz();
//showResults();

    
// Event listeners
submitButton.addEventListener('click', showResults);
startButton.addEventListener('click', buildQuiz)

    
var clicks = 0;
let lastQuestion = myQuestions.length - 1;
function countClicks() {
  if (clicks ===  lastQuestion) {
      switchButtons();
  } 
}

function switchButtons(){
  document.getElementById('submit').style.display = "block";
  document.getElementById('next').style.display = "none";      
  }

  $(document).ready (function () {
    startCount();
});
 
function startCount()
{
	timer = setInterval(count,1000);
}
function count()
{
	var time_shown = $("#realtime").text();
        var time_chunks = time_shown.split(":");
        var hour, mins, secs;
 
        hour=Number(time_chunks[0]);
        mins=Number(time_chunks[1]);
        secs=Number(time_chunks[2]);
        secs++;
            if (secs==60){
                secs = 0;
                mins=mins + 1;
               } 
              if (mins==60){
                mins=0;
                hour=hour + 1;
              }
              if (hour==13){
                hour=1;
              }
 
        $("#realtime").text(hour +":" + plz(mins) + ":" + plz(secs));
 
}
 
function plz(digit){
 
    var zpad = digit + '';
    if (digit < 10) {
        zpad = "0" + zpad;
    }
    return zpad;
}