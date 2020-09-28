  let selectedCategory = "Linux";
  let selectedLimit = 10;
  let selectedDifficulty = "easy";
  let myQuestions = null;
  let slides = null;
  let answerContainers = null;
  let currentSlide = 0;
  let numCorrect = document.getElementById("results");
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const quizConfigurationContainer = document.getElementById('quizControls');
  const submitQuizConfiguration = document.getElementById('submit-configuration');

  // Event listeners
  submitQuizConfiguration.addEventListener('click', reactOnSubmitQuizConfiguration);
  submitButton.addEventListener('click', showResults);

 
  submitButton.style.visibility = 'hidden';

  function Quizconf(){
    // variable to store the HTML output
		let xhttp = new XMLHttpRequest();
	    xhttp.open("GET", ' https://quizapi.io/api/v1/questions?category=' + selectedCategory + '&difficulty=' + selectedDifficulty + '&limit=' + selectedLimit, true);
	    xhttp.setRequestHeader("X-Api-Key","73QY7nLYBjODPDNRCfzFuyRD4Qi6sTJUTRkniLVJ");
	    xhttp.send();
	    xhttp.onload = function() {
		  if (xhttp.status != 200)  {
					console.log(xhttp.status);
		  } else{
				Questions = JSON.parse(xhttp.responseText);
				const output = [];

				// for each question...
				Questions.forEach(
					(currentQuestion, questionNumber) => {

						// variable to store the list of possible answers
						const answers = [];
						console.log("currentQuestion", currentQuestion);
						console.log("questionNumber", questionNumber);

						// and for each available answer...
						for(letter in currentQuestion.answers){
							if(currentQuestion.answers[letter] === null) {
								continue;
								}
							console.log("letter", letter);

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
						  `<div class="slide">
							<div class="question"> ${currentQuestion.question} </div>
							<div class="answers"> ${answers.join("")} </div>
						  </div>`
						  
						);
						quizContainer.innerHTML = output.join('');
				}		
					);
				answerContainers = quizContainer.querySelectorAll('.answers');
			}
		}	
  }
  
 function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // for each question...
    Questions.forEach( (currentQuestion, questionNumber) => {
		  console.log("QuestionNumber:", questionNumber, "currentQuestion:", currentQuestion);
		  // find selected answer
		  const answerContainer = answerContainers[questionNumber];
		  const selector = `input[name=question${questionNumber}]:checked`;
		  const userAnswer = (answerContainer.querySelector(selector) || {}).value;
		  console.log("Useranswer", userAnswer);
	  

		  // if answer is correct
		  console.log("currentQuestion.correct_answer:",currentQuestion.correct_answer, "userAnswer:",userAnswer);
		  if(currentQuestion.correct_answer === userAnswer){
				// add to the number of correct answers
				numCorrect++;

				// color the answers green
				answerContainers[questionNumber].style.color = 'yellow';
		  }
		  // if answer is wrong or blank
		  else{
				// color the answers red
				answerContainers[questionNumber].style.color = 'red';
		  }
	  
    });
	
 }

  function reactOnSubmitQuizConfiguration() {
	  
    submitButton.style.visibility = 'visible';
	quizConfigurationContainer.style.display = 'none';
	
	// Category Input from User
	let category_a = document.getElementById("category");
	selectedCategory = category_a.options[category_a.selectedIndex].value;
	
	// Difficulty input from User
	var difficulty_a = document.getElementById("difficulty");
	selectedDifficulty = difficulty_a.options[difficulty_a.selectedIndex].value;
	
	// Question Limit input from User
	var limit_a = document.getElementById("questionLimit");
	selectedLimit = limit_a.options[limit_a.selectedIndex].value;
	// Kick things off
	Quizconf();
	
  }