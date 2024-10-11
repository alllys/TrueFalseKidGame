let allQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let questions = []; // Массив для 10 вопросов

// Функция для загрузки вопросов
function loadQuestions() {
    fetch('questions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не отвечает');
            }
            return response.json();
        })
        .then(data => {
            allQuestions = data;
            startGame();
        })
        .catch(error => {
            console.error('Ошибка при загрузке вопросов:', error);
        });
}

// Функция для начала игры
function startGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById('restartButton').style.display = 'none'; // Скрыть кнопку перезапуска
    document.getElementById('feedback').innerText = ''; // Очистить сообщения
    questions = getRandomQuestions(10); // Получить случайные 10 вопросов
    showQuestion();
}

// Функция для получения случайных вопросов
function getRandomQuestions(num) {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random()); // Перемешать вопросы
    return shuffled.slice(0, num); // Вернуть первые num вопросов
}

// Функция для отображения текущего вопроса
function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById('question').innerText = question.text;
        document.getElementById('questionNumber').innerText = `Вопрос ${currentQuestionIndex + 1} из ${questions.length}`;
        showImage(question.object);
        document.getElementById('feedback').innerText = ''; // Очистить предыдущее сообщение
    } else {
        endGame();
    }
}

// Функция для генерации ASCII-арт
function generateAsciiArt(object) {
    const asciiArt = `
          ,--.
       ,--.'|
   ,--,|  | :                    ,--,
,---.'|  | |                    |  |
|   | : _,'|  .--,      ,--,  ,--,|
:   : |/  /| /       \   /   |   | |
|   |   .  /| .--, |   |   |   | |
|   |  |  | . |  | |   |   |   | |
'   |  |  | | |  | |   |   |   | |
|   |  |  | | |  | |   |   |   | |
'---'--'---' '---'---'   '---'---'
    `;
    return asciiArt.replace(/ +/g, ' '); // Удаление лишних пробелов
}

// Функция для отображения ASCII-арт на канвасе
function showImage(object) {
    const canvas = document.getElementById('textCanvas');
    const ctx = canvas.getContext('2d');

    // Устанавливаем размеры канваса
    canvas.width = 400;  // ширина канваса
    canvas.height = 300; // высота канваса

    // Очищаем канвас
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Устанавливаем стиль текста
    ctx.fillStyle = 'black'; // Цвет текста
    ctx.font = '16px monospace'; // Шрифт текста
    ctx.textAlign = 'left'; // Выравнивание текста
    ctx.textBaseline = 'top'; // Выравнивание текста по верху

    // Генерируем ASCII-арт
    const asciiArt = generateAsciiArt(object);
    const lines = asciiArt.split('\n'); // Разбиваем ASCII-арт на строки

    // Рисуем каждую строку на канвасе
    lines.forEach((line, index) => {
        ctx.fillText(line, 10, 20 + index * 20); // Отрисовка строки
    });

    // Отображаем канвас
    canvas.style.display = 'block';
}

// Функция для обработки ответа
function answer(isTrue) {
    const question = questions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');

    // Проверяем правильность ответа
    if (question.answer === isTrue) {
        correctAnswers++;
        feedback.innerText = 'Правильно!'; // Отображаем сообщение о правильном ответе
        feedback.style.color = 'green'; // Задаем цвет текста
    } else {
        feedback.innerText = 'Неправильно!'; // Отображаем сообщение о неправильном ответе
        feedback.style.color = 'red'; // Задаем цвет текста
    }

    // Задержка перед показом следующего вопроса
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1000); // 1000 мс = 1 секунда
}

// Функция для завершения игры
function endGame() {
    document.getElementById('question').innerText = `Игра окончена! Вы ответили правильно на ${correctAnswers} из ${questions.length} вопросов.`;
    document.getElementById('imageContainer').innerHTML = ''; // Очистить контейнер для изображений
    document.getElementById('restartButton').style.display = 'block'; // Показать кнопку перезапуска
    document.getElementById('feedback').innerText = ''; // Очистить предыдущее сообщение
}

// Функция для перезапуска игры
function restartGame() {
    loadQuestions(); // Перезагрузить вопросы и начать игру заново
}

// Загрузка вопросов при загрузке страницы
loadQuestions();
