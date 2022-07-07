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

let clickAudio = new Audio("./../assets/sounds/click.wav");
let loseAudio = new Audio("./../assets/sounds/lose.wav");
let rightAudio = new Audio("./../assets/sounds/right.wav");
let winAudio = new Audio("./../assets/sounds/win.wav");
let wrongAudio = new Audio("./../assets/sounds/wrong.wav");

const blockCards = numbers => {
    for (let i = 0; i <= 15; i++) {
        let blockCard = document.getElementById(`${i}`);
        blockCard.innerHTML = `<img src="./../assets/images/${numbers[i]}.png"/>`;
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
        card1.innerHTML = `<img src="./../assets/images/${firstResult}.png">`;
        card1.disabled = true;

        clickAudio.play();
    } else if (uncoveredCards === 2) {
        card2 = element;
        secondResult = numbers[position];
        card2.innerHTML = `<img src="./../assets/images/${secondResult}.png">`;
        card2.disabled = true;

        if (firstResult === secondResult) {
            firstResult = 0;
            secondResult = 0;
            uncoveredCards = 0;

            rightAudio.play();
        } else {
            wrongAudio.play();

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
                        
                        loseAudio.play();
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

                    winAudio.play();
                }
            }

            if (uncoveredCards === 2) {
                uncoveredCards = 0;
            }
        });
    });
}

init();