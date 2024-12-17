const questions = [
    {
      question: "Which fashion designer is known for creating the 'little black dress'?",
      answers: ["Coco Chanel", "Christian Dior"],
      correct: 0,
      images: [
        "../images/coco-chanel.jpg", 
        "../images/christian-dior.jpg",   
      ]
    },
    {
      question: "Which brand is known for its red-soled shoes?",
      answers: ["Christian Louboutin", "Jimmy Choo"],
      correct: 0,
      images: [
        "../images/louboutin.jpg", 
        "../images/jimmy-choo.jpg",   
      ]
    },
    {
      question: "What is the fashion capital of the world?",
      answers: ["Paris", "Milan"],
      correct: 1,
      images: [
        "../images/paris.jpg", 
        "../images/milan.jpg",   
      ]
    },
    {
      question: "Who is the founder of the fashion brand 'Vuitton'?",
      answers: ["Louis Vuitton", "Marc Jacobs"],
      correct: 0,
      images: [
        "../images/louis-vuitton.jpg", 
        "../images/marc-jacobs.jpg",   
      ]
    },
    {
      question: "Which fashion designer is known for his red carpet gowns worn by celebrities?",
      answers: ["Elie Saab", "Zuhair Murad"],
      correct: 1,
      images: [
        "../images/elie-saab.jpg", 
        "../images/zuhair-murad.jpg",   
      ]
    },
    {
      question: "Which brand is famous for its plaid patterns and trench coats?",
      answers: ["Burberry", "Chanel"],
      correct: 0,
      images: [
        "../images/burberry.jpg", 
        "../images/coco-chanel.jpg",   
      ]
    },
    {
      question: "Which luxury brand is known for its iconic bags such as the 'Kelly' and 'Birkin'?",
      answers: ["Hermés", "Gucci"],
      correct: 1,
      images: [
        "../images/hermes.jpg", 
        "../images/gucci.jpg",   
      ]
    },
    {
      question: "What fabric is most commonly used for formal suits?",
      answers: ["Wool", "Cotton"],
      correct: 0,
      images: [
        "../images/wool.jpg", 
        "../images/cotton.jpg",   
      ]
    },
    {
      question: "Which designer is famous for his 'Under the Sea' themed collections?",
      answers: ["Jean-Paul Gaultier", "Karl Lagerfeld"],
      correct: 1,
      images: [
        "../images/jean-paul-gaultier.jpg", 
        "../images/karl-lagerfeld.jpg",   
      ]
    },
    {
      question: "Which fashion model is known for her 'Curvy' figure and became famous in the 1990s?",
      answers: ["Kate Upton", "Ashley Graham"],
      correct: 1,
      images: [
        "../images/kate-upton.jpg", 
        "../images/ashley-graham.jpg",   
      ]
    },
  ];
  
  
  let currentQuestionIndex = 0;
  let score = 0;
  const userAnswers = [];
  
  const quizContainer = document.getElementById("quiz-container");
  
  function renderQuestion() {
    const question = questions[currentQuestionIndex];
  
    quizContainer.innerHTML = `
      <div class="question-header">
        <h3>Question ${currentQuestionIndex + 1}/${questions.length}</h3>
        <p>${question.question}</p>
      </div>
      <div class="question-container">
        ${question.answers
          .map(
            (answer, index) => `
              <button class="answer-btn" style="background-image: url('${question.images[index]}');" onclick="handleAnswer(${index})">${answer}</button>
            `
          )
          .join('')}
      </div>
      <div class="nav-btns">
        ${currentQuestionIndex > 0 ? `
          <button class="nav-btn" onclick="previousQuestion()">Précédent</button>
        ` : ''}
        
        ${currentQuestionIndex < questions.length - 1 ? `
          <button class="nav-btn" onclick="nextQuestion()">Suivant</button>
        ` : ''}
      </div>
    `;
  }
  
  function handleAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const existingAnswerIndex = userAnswers.findIndex(
      answer => answer.question === question.question
    );
  
    const newAnswer = {
      question: question.question,
      selected: question.answers[selectedIndex],
      correct: question.answers[question.correct],
      isCorrect: selectedIndex === question.correct,
    };
  
    if (existingAnswerIndex !== -1) {
      userAnswers[existingAnswerIndex] = newAnswer;
    } else {
      userAnswers.push(newAnswer);
    }
  
    score = userAnswers.filter(answer => answer.isCorrect).length;
  
    nextQuestion();
  }
  
  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuestion();
    }
  }
  
  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      renderQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    quizContainer.innerHTML = `
      <div class="result-container">
        <h3>Results</h3>
        <p>You gained ${score}/${questions.length} points!</p>
        <ul class="list-group">
          ${userAnswers
            .map(
              (answer, index) => `
              <li class="list-group-item ${answer.isCorrect ? 'correct' : 'incorrect'}">
                <strong>Q${index + 1}:</strong> ${answer.question}<br/>
                <strong>Votre réponse:</strong> ${answer.selected}<br/>
                <strong>Bonne réponse:</strong> ${answer.correct}
              </li>
            `
            )
            .join('')}
        </ul>
      </div>
    `;
  }
  
  renderQuestion();