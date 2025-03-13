const quizData = [
    {
        question: 'Which of the following words is a synonym for happy?',
        options: ['Sad','Joyful','Angry','Bored'],
        answer: 'Joyful'
    },
    {
        question: 'What is the past sentence of the verb go?',
        options: ['Goed','Went','Goes','Going'],
        answer: 'Went'
    },
    {
        question: 'Who wrote Hamlet?',
        options: ['Shakespear','Austen','Tolkien','hemingwa'],
        answer: 'Shakespear'
    },
    {
        question: 'What is the plural of Deer',
        options: ['Deerses','Deer','Dears','Dear'],
        answer: 'Deer'
    }
];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answers');
const nextButton = document.getElementById('nextButton');
const leaderboardElement = document.querySelector('.leaderboard');

function loadQuestions() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;
    answerElement.innerHTML = "";
    
    currentQuestion.options.forEach(options => {
        const button = document.createElement('button')
        button.innerHTML = options;
        button.classList.add('btn');
        button.addEventListener("click", () => checkAnswer(options));
        answerElement.appendChild(button);
    });
}
function resetState() {
    nextButton.style.display = 'none';
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild);
    }
}
function checkAnswer(selectedOption) {
    const correctAnswer = quizData[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestions();
    } else {
        showResult();
    }
}
function showResult() {
    questionElement.innerText = "Quiz Completed! Score: "  + score + "/" + quizData.length;
    answerElement.innerHTML = "";
    nextButton.innerText = "Restart";
    nextButton.style.display = "block";
    leaderboardElement.style.display = "block";
   
    saveToleaderboard(score);
    displayLeaderboard();
    
    nextButton.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerText = "Next";
        loadQuestions();
    });
}
function saveToleaderboard(score) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const playerName = prompt('Enter your name') || 'Anonymous';
    
    leaderboard.push({name: playerName, score});
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function displayLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboardElement.innerHTML = "<h3>Leaderboard</h3>";
    leaderboardElement.classList.add('lb-heading');
    leaderboard.forEach((entry, index)=> {
        leaderboardElement.innerHTML += `<p>${index + 1}:  ${entry.name}  - ${entry.score}</p>`;
    });
}
displayLeaderboard();
loadQuestions();