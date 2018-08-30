var Letter = function(letter) {
    this.letter = letter;
    this.guessed = false;
    this.display = function() {
        if (this.guessed) {
            return this.letter;
        }
        else {
            return '_';
        }
    };
    this.guess = function(guess) {
        if (guess === this.letter) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;