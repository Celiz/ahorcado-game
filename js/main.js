import { ScoreManager } from './score.js';

class Ahorcado {
    constructor() {
        this.word = '';
        this.guessedLetters = new Set();
        this.maxAttempts = 6;
        this.attempts = 0;
        this.score = 0;
        this.wordDisplay = document.getElementById('word-display');
        this.guessesDisplay = document.getElementById('guesses');
        this.messageDisplay = document.getElementById('message');
        this.hangmanImage = document.getElementById('hangman-image');
        this.letterRow1 = document.getElementById('letter-row-1');
        this.letterRow2 = document.getElementById('letter-row-2');
        this.scoreManager = new ScoreManager();

        this.createLetterButtons();
    }
    createLetterButtons() {
        const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
        const midpoint = Math.ceil(alphabet.length / 2);

        for (let i = 0; i < alphabet.length; i++) {
            const button = document.createElement('button');
            button.textContent = alphabet[i];
            button.addEventListener('click', () => this.makeGuess(alphabet[i]));

            if (i < midpoint) {
                this.letterRow1.appendChild(button);
            } else {
                this.letterRow2.appendChild(button);
            }
        }
    }

    async initGame() {
        try {
            await this.scoreManager.initializePlayer();
            const word = await this.getWord();
            this.word = word.toUpperCase();
            this.updateWordDisplay();
            this.updateHangmanImage();
            this.score = 0;
            this.scoreManager.displayScore(this.score);
            this.scoreManager.fetchAndDisplayTopScores();
        } catch (error) {
            console.error('Error al iniciar el juego:', error);
            this.messageDisplay.textContent = 'Error al iniciar el juego. Por favor, recarga la página.';
        }
    }

    async getWord() {
        const response = await fetch('https://random-word-api.herokuapp.com/word?lang=es');
        if (!response.ok) {
            throw new Error('No se pudo obtener una palabra aleatoria.');
        }

        const data = await response.json();
        return data[0];
    }

    updateWordDisplay() {
        this.wordDisplay.textContent = this.word
            .split('')
            .map(letter => this.guessedLetters.has(letter) ? letter : '_')
            .join(' ');
    }


    WordDisplay() {
        this.wordDisplay.textContent = this.word
            .split('')
            .map(letter => this.guessedLetters.has(letter) ? letter : '_')
            .join(' ');
    }

    updateHangmanImage() {
        this.hangmanImage.src = `/public/hangman-${this.attempts}.png`;
        this.hangmanImage.alt = `Ahorcado - ${this.attempts} intentos`;
    }

    normalizeString = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      };

    makeGuess(letter) {
        const normalizedLetter = this.normalizeString(letter);
        const normalizedWord = this.normalizeString(this.word);

        if (this.guessedLetters.has(normalizedLetter)) {
            this.messageDisplay.textContent = 'Ya has intentado esa letra.';
            return;
        }

        this.guessedLetters.add(normalizedLetter);
        this.guessesDisplay.textContent = `Letras intentadas: ${Array.from(this.guessedLetters).join(', ')}`;

        const buttonElement = Array.from(this.letterRow1.children).concat(Array.from(this.letterRow2.children))
            .find(button => this.normalizeString(button.textContent) === normalizedLetter);
        if (buttonElement) {
            buttonElement.disabled = true;
        }

        if (normalizedWord.includes(normalizedLetter)) {
            this.updateWordDisplay();
            this.score += 10; // Aumenta la puntuación por cada letra correcta
            if (!this.wordDisplay.textContent.includes('_')) {
                this.score += 50; // Bonus por completar la palabra
                this.messageDisplay.textContent = '¡Felicidades! Has ganado.';
                this.disableAllButtons();
                this.scoreManager.updateScore(this.score);
            } else {
                this.messageDisplay.textContent = '¡Bien hecho! Letra correcta.';
            }
        } else {
            this.attempts++;
            this.updateHangmanImage();
            if (this.attempts >= this.maxAttempts) {
                this.messageDisplay.textContent = `Has perdido. La palabra era: ${this.word}`;
                this.disableAllButtons();
                this.scoreManager.updateScore(this.score);
            } else {
                this.messageDisplay.textContent = 'Letra incorrecta. Intenta de nuevo.';
            }
        }
        this.scoreManager.displayScore(this.score);
    }

    updateWordDisplay() {
        this.wordDisplay.textContent = this.word
            .split('')
            .map(letter => this.guessedLetters.has(this.normalizeString(letter)) ? letter : '_')
            .join(' ');
    }

    disableAllButtons() {
        Array.from(this.letterRow1.children).concat(Array.from(this.letterRow2.children)).forEach(button => {
            button.disabled = true;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Ahorcado();
    game.initGame();
});