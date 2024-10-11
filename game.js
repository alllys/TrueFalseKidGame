let questions = [];
let currentQuestionIndex = 0;
let score = 0;
const maxQuestions = 10;

const questionElement = document.getElementById('question');
const trueButton = document.getElementById('true-btn');
const falseButton = document.getElementById('false-btn');
const resultElement = document.getElementById('result');
const nextButton = document.getElementById('next-btn');
const imageContainer = document.getElementById('image-container');

// Функция для загрузки вопросов из JSON файла
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = getRandomQuestions(data, maxQuestions);
        startGame();
    });

// Функция для выбора случайных вопросов
function getRandomQuestions(data, numQuestions) {
    const shuffled = data.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numQuestions);
}

// Начать игру
function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion();
}

// Показать следующий вопрос
function showQuestion() {
    resetState();
    let question = questions[currentQuestionIndex];
    questionElement.innerText = question.text;
}

// Сброс состояния для нового вопроса
function resetState() {
    resultElement.innerHTML = '';
    imageContainer.innerHTML = '';
}

// Обработчик ответа
function handleAnswer(isTrue) {
    const question = questions[currentQuestionIndex];
    const correct = question.answer === isTrue;
    
    if (correct) {
        resultElement.innerText = 'Правильно!';
        score++;
    } else {
        resultElement.innerText = 'Неправильно!';
    }

    // Показать изображение после ответа
    showImage(question.object);

    // Показать кнопку для следующего вопроса
    nextButton.classList.remove('hide');
}

// Функция для поиска и показа изображения объекта с Unsplash
function showImage(object) {
    const unsplashURL = `https://source.unsplash.com/400x300/?${object}`;

    // Вставка изображения на страницу
    imageContainer.innerHTML = `<img src="${unsplashURL}" alt="${object}">`;
}

// Обработчики кликов на кнопки ответа
trueButton.addEventListener('click', () => handleAnswer(true));
falseButton.addEventListener('click', () => handleAnswer(false));

// Следующий вопрос
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < maxQuestions) {
        showQuestion();
    } else {
        endGame();
    }
});

// Завершить игру
function endGame() {
    questionElement.innerText = `Игра окончена! Ваш результат: ${score} из ${maxQuestions}`;
    nextButton.classList.add('hide');
}
