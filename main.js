class Ahorcado {
    constructor() {
        this.word = '';
        this.guessedLetters = new Set();
        this.maxAttempts = 6;
        this.attempts = 0;
        this.wordDisplay = document.getElementById('word-display');
        this.guessesDisplay = document.getElementById('guesses');
        this.messageDisplay = document.getElementById('message');
        this.hangmanImage = document.getElementById('hangman-image');
        this.letterRow1 = document.getElementById('letter-row-1');
        this.letterRow2 = document.getElementById('letter-row-2');

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
            
            const Word = await this.getWord();
            const translatedWord = await this.translateWord(Word);
            this.word = translatedWord.toUpperCase();
            this.updateWordDisplay();
            this.updateHangmanImage();
        } catch (error) {
            console.error('Error al iniciar el juego:', error);
            this.messageDisplay.textContent = 'Error al iniciar el juego. Por favor, recarga la página.';
        }
    }

    async getWord() {
        const response = await fetch('https://random-word.ryanrk.com/api/en/word/random/?maxlength=7');
        if (!response.ok) {
            throw new Error('No se pudo obtener una palabra aleatoria.');
        }

        const data = await response.json();
        return data[0];
    }


    async translateWord(word) {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|es`);
        if (!response.ok) {
            throw new Error('No se pudo traducir la palabra.');
        }

        const data = await response.json();
        return data.responseData.translatedText;
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

    makeGuess(letter) {
        if (this.guessedLetters.has(letter)) {
            this.messageDisplay.textContent = 'Ya has intentado esa letra.';
            return;
        }

        this.guessedLetters.add(letter);
        this.guessesDisplay.textContent = `Letras intentadas: ${Array.from(this.guessedLetters).join(', ')}`;

        const buttonElement = Array.from(this.letterRow1.children).concat(Array.from(this.letterRow2.children))
            .find(button => button.textContent === letter);
        if (buttonElement) {
            buttonElement.disabled = true;
        }

        if (this.word.includes(letter)) {
            this.updateWordDisplay();
            if (!this.wordDisplay.textContent.includes('_')) {
                this.messageDisplay.textContent = '¡Felicidades! Has ganado.';
                this.disableAllButtons();
            } else {
                this.messageDisplay.textContent = '¡Bien hecho! Letra correcta.';
            }
        } else {
            this.attempts++;
            this.updateHangmanImage();
            if (this.attempts >= this.maxAttempts) {
                this.messageDisplay.textContent = `Has perdido. La palabra era: ${this.word}`;
                this.disableAllButtons();
            } else {
                this.messageDisplay.textContent = 'Letra incorrecta. Intenta de nuevo.';
            }
        }
    }

    disableAllButtons() {
        Array.from(this.letterRow1.children).concat(Array.from(this.letterRow2.children)).forEach(button => {
            button.disabled = true;
        });
    }
}

const game = new Ahorcado();
game.initGame();