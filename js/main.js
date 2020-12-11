// The questions in an object
const myQuestions = [
  {
      question: "Haw manny hearts octopus hav?",
      answers: {
          a: "It hav no heart",
          b: "It hav 3 heart",
          c: "It hav 1 heart, wat do think, mann?",
          d: "It has 8 heart - 1 for eatch tentacle"
          },
      correctAnswer: "b"
  },
  {
  question: "Haw manny sucksions cups ocotopus hav?",
  answers: {
      a: "Up two 8-ty",
      b: "Up two 1-hundrund 8-ty",
      c: "Up two 2-hundrund 4-ty",
      d: "Up two 8-hundrund"
      },
      correctAnswer: "c"
  },
  {
      question: "Haw do say manny octopus?",
      answers: {
      a: "Octopodes",
      b: "Octopuses",
      c: "Octopi",
      d: "Non abov .. or ol abov?"
      },
      correctAnswer: "d"
  },
  {
    question: "Who Otto the Octopus an why so verry faymus?",
    answers: {
        a: "He verry old octopus, probly older thenn Santa",
        b: "He verry big octopus, cann probably eat cat with 1 byte",
        c: "He verry smart octopus, somtime take electricyty from stupit building",
        d: "He verry strange octopus, has two manny leg and wird color."
        },
    correctAnswer: "c"
  },
  {
    question: "Wat Aristoteles say on octopus?",
    answers: {
        a: "He stupit mann, say octopus dumb",
        b: "He say noting about octopus",
        c: "He say octopus wisstom animal",
        d: "He dangirus mann, say octopus hiss best food"
        },
    correctAnswer: "a"
  },
  {
    question: "Wat color octopus blood?",
    answers: {
        a: "It blu",
        b: "It black",
        c: "It hav no color",
        d: "It red, stupit"
        },
    correctAnswer: "a"
  }
];


// Variables for HTML content containers
const quizContainer = document.getElementById('quiz-carousel');
const resultsContainer = document.getElementById('results');

//Variables for HTML buttons
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.carousel-item')
const startButton = document.getElementById('start')
const submitButton = document.getElementById('submit');

// Submit button event listener
submitButton.addEventListener('click', showResults);

// Function to generate quiz and build the slides
function buildQuiz(){
  // Variable for storing the upcoming HTML
  const output = [];

  // For each loop going through the questions
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // Variable for storing the answers
      const answers = [];

      // Going through each answer and assign it a letter
      for(letter in currentQuestion.answers) {

        // Each answer gets it's radio buttons, id and such for the quiz and its validation to work properly
        // It's then pushed to the answers variable
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
          // Here comes if/else to push the questions themselves to the HTML. 
          // The first one will need to be different - having class "active" for the slides to work
          if(questionNumber === 0){
            output.push(
              `<div class="carousel-item active">
              <h2 id="question">${currentQuestion.question}</h2>
              <div class="answers"> ${answers.join("")} 
              </div>
              </div>`
            );
          }
          // You'll see in line 112 that the answers array is joined in at this point

          //The else statement is the same, except it doesn't have the "active" class
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
}

// Function for generating and display the results 
function showResults(){

  // Here I store the user submitted data from the HTML document in a variable
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // Another variable declared for counting correct answers
  let numCorrect = 0;

  // For loop like before, for each question
  myQuestions.forEach( (currentQuestion, questionNumber) => {
  
    // Creating variables to find the users answer 
    const answerContainer = answerContainers[questionNumber];
    // Variable for finding the excect data in answersContainer
    const selector = `input[name=question${questionNumber}]:checked`
    // Here the user answer is stored, if the user didn't select anything, the value is undefiend
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // Checking to see if the answer matches the correct one
    if(userAnswer === currentQuestion.correctAnswer){
      // Add +1 to the numCorrect variable if correct
      numCorrect++;
    }
  }
);


// Displaying the results!
function displayResults() {
  // I'm transforming the correct answers into percentage correct (so 3 out of 6 will be 50%)
  const scorePerCent = Math.round(100 * numCorrect/myQuestions.length);
  // Based on percentage, the function will output different HTML markup.
  // The first one is 75% or more. I consider that "the best"
  if(scorePerCent >= 75){
  resultsContainer.innerHTML = 
  `<h2>You good, frend!</h2>
  <div class="icons-results"><i class="far fa-grin-hearts"></i></div>
  <p>You get <strong>${numCorrect}</strong> out of <strong>${myQuestions.length}</strong> question write.</p>
  <a href="#"><button id="correct-answers" class="btn btn-purple" onclick="showCorrectAnswers();">Show Correct Answers<i class="far fa-lightbulb ml-3"></i></button></a>
  `;
  }
  else if(scorePerCent >= 50){
    resultsContainer.innerHTML = 
    `<h2>You not two bad</h2>
    <div class="icons-results"><i class="far fa-grin-hearts"></i></div>
    <p>You get <strong>${numCorrect}</strong> out of <strong>${myQuestions.length}</strong> question write.</p>
    <a href="#"><button id="correct-answers" class="btn btn-purple" onclick="showCorrectAnswers();">Show Correct Answers<i class="far fa-lightbulb ml-3"></i></button></a>
    `;
    }
  else if(scorePerCent >= 25){
    resultsContainer.innerHTML = 
    `<h2>You stupit!</h2>
    <div class="icons-results"><i class="far fa-grin-squint-tears"></i></div>
    <p>You only get <strong>${numCorrect}</strong> out of <strong>${myQuestions.length}</strong> question write.</p>
    <a href="#"><button id="correct-answers" class="btn btn-purple" onclick="showCorrectAnswers();">Show Correct Answers<i class="far fa-lightbulb ml-3"></i></button></a>
    `;
    }

  // The worst possible outcome, the user will be delcared a Jon Snow
  else{ 
    resultsContainer.innerHTML = 
    `<h2>Oooocwaaard</h2>
    <div class="icons-results"><i class="far fa-flushed"></i></div>
    <p>You now noting, Jon Snow.</p>
    <a href="#"><button id="correct-answers" class="btn btn-purple" onclick="showCorrectAnswers();">Show Correct Answers<i class="far fa-lightbulb ml-3"></i></button></a>
    `;
    }
  } 
  // And finally the function is generated
  displayResults();
  clearInterval(timer);
}

// This part is for making the submit button available to the user at the end of the quiz and hiding the next question button 
// It's maybe not the most elegant solution. It counts how many times the user has clicked the next button
// Once that number reaches the same number as the questions, the function is executed
clicks = 0;
let lastQuestion = myQuestions.length - 1;
function countClicks() {
  if (clicks ===  lastQuestion) {
      switchButtons();
  } 
}

// Here's the function referred to above, the one that switches the buttons
function switchButtons(){
  document.getElementById('submit').style.display = "block";
  document.getElementById('next').style.display = "none";      
  }
 
// Here's the function for counter 
function startCount() {
  timer = setInterval(count,1000);
}

// To display seconds, minutes, hours, we have to go through some hoops
// Time is split into chunks were each one is either a second, minute or hour
function count() {
	var time_shown = $("#realtime").text();
  var time_chunks = time_shown.split(":");
  var hour, mins, secs;
 
  hour=Number(time_chunks[0]);
  mins=Number(time_chunks[1]);
  secs=Number(time_chunks[2]);
  secs++;
  // Logic for turning seconds in to minutes, and minutes in to hours
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

// Function for stopping the loading screen, with some fade out animation
function stopLoading() {
  $(".loading-wrapper").fadeOut(800);
  buildQuiz();
  startCount();
}

// Function for the restart button. It calls in the loading screen again and makes sure the right buttons will be displayed when the user starts the quiz again
function restartLoading() {
  $(".loading-wrapper").fadeIn(800);
  document.getElementById('submit').style.display = "none";
  document.getElementById('next').style.display = "block"; 
  document.getElementById('pager-next').style.display = "none";
  document.getElementById('pager-prev').style.display = "none";
  // We need to remove any value from the "click" variable, so that the submit button will display in the correct place
  delete clicks;
  clicks = 0; 
}

// A simple function for displaying the correct answers. Some of the usual button hiding/displaying business
function showCorrectAnswers() {
  document.getElementById('pager-next').style.display = "block";
  document.getElementById('submit').style.display = "none";
  document.getElementById('pager-prev').style.display = "none"; 
  $('#centralModal').modal('hide');
  quizContainer.innerHTML = `
  <div class="carousel-item active">
  <div class="correct-answers text-center">
    <h2>Correct Answers - 1/2</h2>
    <h4>Haw manny hearts octopus have?</h4>
    <p>b.) It have 3 heart</p>
    <h4>Haw manny sucksions cups ocotopus have?</h4>
    <p>c.) Up two 2-hundrund 4-ty</p>
    <h4>Haw do say manny octopus?</h4>
    <p>d.) Non abov .. or ol abov?</p>
  </div>
</div>

<div class="carousel-item">
  <div class="correct-answers text-center">
    <h2>Correct Answers</h2>
    <h4>Who Otto the Octopus an why so verry faymous?</h4>
    <p>c.) He verry smart octopus, somtime take electricyty from stupid building</p>
    <h4>Wat Aristoteles say on octopus?</h4>
    <p>a.) He stupit mann, say octopus dumb</p>
    <h4>What color octopus blood?</h4>
    <p>a.) It has blue color</p>
  </div>
</div>
  `}

function hideNext() {
  document.getElementById('pager-next').style.display = "none";
  document.getElementById('pager-prev').style.display = "block"; 
}

function hidePrev() {
  document.getElementById('pager-prev').style.display = "none";
  document.getElementById('pager-next').style.display = "block"; 
}