let allQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let questions = []; // Array for 10 questions

// Function to load questions
function loadQuestions() {
    fetch('questions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network error');
            }
            return response.json();
        })
        .then(data => {
            allQuestions = data;
            startGame();
        })
        .catch(error => {
            console.error('Error loading questions:', error);
        });
}

// Function to start the game
function startGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById('restartButton').style.display = 'none'; // Hide the restart button
    document.getElementById('feedback').innerText = ''; // Clear messages
    questions = getRandomQuestions(10); // Get 10 random questions
    showQuestion();
}

// Function to get random questions
function getRandomQuestions(num) {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random()); // Shuffle questions
    return shuffled.slice(0, num); // Return the first num questions
}

// Function to display the current question
function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById('question').innerText = question.text;
        document.getElementById('questionNumber').innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        document.getElementById('feedback').innerText = ''; // Clear previous message
    } else {
        endGame();
    }
}

// Function to handle answer
function answer(isTrue) {
    const question = questions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');

    // Check answer correctness
    if (question.answer === isTrue) {
        correctAnswers++;
        feedback.innerText = 'Correct!'; // Show correct answer message
        feedback.style.color = 'green'; // Set text color
    } else {
        feedback.innerText = 'Incorrect!'; // Show incorrect answer message
        feedback.style.color = 'red'; // Set text color
    }

    // Show image based on answer correctness
    showImage(question.answer);

    // Delay before showing the next question
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 2000); // 2000 ms = 2 seconds
}

// Function to display image based on answer
function showImage(isTrue) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Clear previous image

    // Create an image element
    const img = document.createElement('img');
    img.style.maxWidth = '100%';

    // Set the image source based on the answer
    if (isTrue) {
        img.src = 'https://img.icons8.com/dog'; // Replace with an appropriate image URL for true answer
    } else {
        img.src = 'https://img.icons8.com/cat'; // Replace with an appropriate image URL for false answer
    }

    // Append the image to the image container
    imageContainer.appendChild(img);
}

// Function to end the game
function endGame() {
    document.getElementById('question').innerText = `Game over! You answered correctly ${correctAnswers} out of ${questions.length} questions.`;
    document.getElementById('restartButton').style.display = 'block'; // Show restart button
    document.getElementById('feedback').innerText = ''; // Clear previous message
}

// Function to restart the game
function restartGame() {
    loadQuestions(); // Reload questions and start the game again
}

// Load questions when the page loads
loadQuestions();
