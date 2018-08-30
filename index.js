var inquirer = require('inquirer');
var Word = require('./Word.js');
var wordsArray = ["hydrogen", "helium", "lithium", "beryllium", "boron", "carbon", "nitrogen", "oxygen", "fluorine", "neon", "sodium", "magnesium", "aluminum", "silicon", "phosphorus", "sulfur", "chlorine", "argon", "potassium", "calcium", "scandium", "titanium", "vanadium", "chromium", "manganese", "iron", "cobalt", "nickel", "copper", "zinc", "gallium", "germanium", "arsenic", "selenium", "bromine", "krypton", "rubidium", "strontium", "yttrium", "zirconium", "niobium", "molybdenum", "technetium", "ruthenium", "rhodium", "palladium", "silver", "cadmium", "indium", "tin", "antimony", "tellurium", "iodine", "xenon", "cesium", "barium", "lanthanum", "cerium", "praseodymium", "neodymium", "promethium", "samarium", "europium", "gadolinium", "terbium", "dysprosium", "holmium", "erbium", "thulium", "ytterbium", "lutetium", "hafnium", "tantalum", "tungsten", "rhenium", "osmium", "iridium", "platinum", "gold", "mercury", "thallium", "lead", "bismuth", "polonium", "astatine", "radon", "francium", "radium", "actinium", "thorium", "protactinium", "uranium", "neptunium", "plutonium", "americium", "curium", "berkelium", "californium", "einsteinium", "fermium", "mendelevium", "nobelium", "lawrencium", "rutherfordium", "dubnium", "seaborgium", "bohrium", "hassium", "meitnerium"];
// var wordsArray = ['testing spaces', 'test', 'game'];
var words = [];
for (var i = 0; i < wordsArray.length; i++) {
    words.push(new Word(wordsArray[i]));
}
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var guessedWords = [];
var word;
var getWord = function () {
    var num = Math.floor(Math.random() * words.length);
    word = words[num];
    guessedWords.push(words.splice(num, 1));
    return word;
}
getWord();
word.string();
var guessLeft = 10;
var guessedLetters = [];

var guess = function () {
    inquirer.prompt([{
        type: 'input',
        message: 'Guess a letter.',
        name: 'letter',
        validate: function (letter) {
            if (alphabet.includes(letter.toLowerCase()) && letter.length === 1) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function (res) {
        var beforeGuess = word.word;
        word.guessLetter(res.letter.toLowerCase());
        var check = word.string();
        var afterGuess = word.word;
        if (!check.includes('_')) {
            console.log("You'ved guessed the word! Next word.");
            guessedLetters = [];
            guessLeft = 10;
            var test = getWord();
            if (test) {
                word.string();
                guess();
            } else {
                console.log("You've beat the game!");
                return;
            }
        } else if (beforeGuess === afterGuess) {
            if (guessedLetters.includes(res.letter)) {
                guess();
            } else {
                guessedLetters.push(res.letter);
                console.log('Guessed letters', guessedLetters);
                guessLeft--;
                console.log(`You have ${guessLeft} guess left`);
                if (guessLeft === 0) {
                    console.log('The word was', word.actualWord);
                    guessedLetters = [];
                    guessLeft = 10;
                    var test = getWord();
                    if (test) {
                        word.string();
                        guess();
                    } else {
                        console.log("You've beat the game!");
                        return;
                    }
                } else {
                    guess();
                }
            }
        } else {
            guess();
        }
    })
}

guess();