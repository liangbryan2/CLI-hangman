var Letter = require('./Letter.js');

var Word = function (word) {
    this.letters = [];
    for (var i = 0; i < word.length; i++) {
        if (word[i] === ' ') {
            this.letters.push(' ');
        } else {
            this.letters.push(new Letter(word[i]));
        }
    };
    this.word = '';
    this.actualWord = word;
    this.string = function () {
        var currentWord = '';
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i] === ' ') {
                currentWord += '  '
            } else {
                currentWord += ' ' + this.letters[i].display();
            }
        }
        console.log(currentWord);
        this.word = currentWord;
        return currentWord;
    }
    this.guessLetter = function (letter) {
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i] === ' ') continue;
            this.letters[i].guess(letter);
        }
    }
}

module.exports = Word;