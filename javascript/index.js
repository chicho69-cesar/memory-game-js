const buttons = document.querySelectorAll('.button');
const acerts = document.querySelector('.acerts');
const time = document.querySelector('.time');
const moves = document.querySelector('.moves');

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => Math.random() - 0.5);

let uncoveredCards = 0;
let totalMoves = 0;
let totalAcerts = 0;
let isTimeRunning = false;
let reverseTime = 30;
let timeCounter = null;

let firstResult = 0;
let secondResult = 0;

let card1 = null;
let card2 = null;

const blockCards = numbers => {
    for (let i = 0; i <= 15; i++) {
        let blockCard = document.getElementById(`${i}`);
        blockCard.innerHTML = `<img src="./../../assets/images/${numbers[i]}.png"/>`;
        blockCard.disabled = true;
    }
}

const flip = (elements, uncoveredCards) => {
    let {
        element,
        position,
        numbers
    } = elements;

    uncoveredCards++;

    if (uncoveredCards === 1) {
        card1 = element;
        firstResult = numbers[position];
        card1.disabled = true;
        card1.innerHTML = `<img src="/assets/images/${firstResult}.png">`;
    } else if (uncoveredCards === 2) {
        card2 = element;
        secondResult = numbers[position];
        card2.disabled = true;
        card2.innerHTML = `<img src="/assets/images/${secondResult}.png">`;

        if (firstResult === secondResult) {
            firstResult = 0;
            secondResult = 0;
            uncoveredCards = 0;
        } else {
            setTimeout(() => {
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
            }, 500);
        }
    }

    return uncoveredCards;
}

const init = () => {
    buttons.forEach((button, index) => {
        let elements = {
            element: button,
            position: index,
            numbers: numbers
        };

        button.addEventListener('click', () => {
            if (!isTimeRunning) {
                timeCounter = setInterval(() => {
                    reverseTime--;
                    time.innerHTML = `Tiempo: ${reverseTime} segundos`;
            
                    if (reverseTime === 0) {
                        clearInterval(timeCounter);
                        blockCards(numbers);
                        time.innerHTML = 'Lo siento el tiempo se acabo 😥';
                    }
                }, 1000);

                isTimeRunning = true;
            }

            uncoveredCards = flip(elements, uncoveredCards);

            if (uncoveredCards === 2 || uncoveredCards === 0) {
                totalMoves++;
                moves.innerHTML = 'Movimientos: ' + totalMoves;
            }

            if (uncoveredCards === 0) {
                totalAcerts++;
                acerts.innerHTML = 'Aciertos: ' + totalAcerts;

                if (totalAcerts === 8) {
                    clearInterval(timeCounter);
                    acerts.innerHTML += ' 😱';
                    time.innerHTML = `Fantastico, lo hiciste en ${(30 - reverseTime)} segundos 😎`;
                    moves.innerHTML += ' 🤙';
                }
            }

            if (uncoveredCards === 2) {
                uncoveredCards = 0;
            }
        });
    });
}

init();