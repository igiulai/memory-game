const grid = document.getElementById('grid');
const restartButton = document.getElementById('restart');

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Создание карточек
function createCards() {
    const numbers = Array.from({ length: 8 }, (_, i) => i + 1);
    const pairs = [...numbers, ...numbers];
    cards = pairs.sort(() => Math.random() - 0.5);
    cards.forEach((number) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.number = number;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

// Перевернуть карточку
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('open');
    this.innerText = this.dataset.number;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

// Проверка на соответствие
function checkForMatch() {
    const isMatch = firstCard.dataset.number === secondCard.dataset.number;

    isMatch ? disableCards() : unflipCards();
}

// Отключение карточек
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Перевернуть карточки обратно
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('open');
        firstCard.innerText = '';
        secondCard.classList.remove('open');
        secondCard.innerText = '';
        resetBoard();
    }, 1000);
}

// Сброс состояния игры
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];

    if (Array.from(document.querySelectorAll('.card')).every(card => card.classList.contains('open'))) {
        restartButton.classList.remove('button');
    }
}

// Перезапуск игры
function restartGame() {
    grid.innerHTML = '';
    restartButton.classList.add('button');
    createCards();
}

// Обработчик кнопки "Сыграть ещё раз"
restartButton.addEventListener('click', restartGame);

// Начальная инициализация
createCards();