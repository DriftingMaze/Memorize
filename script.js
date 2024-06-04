var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 1;

document.addEventListener ("keydown", function (event) {
    if (event.key === "Enter") {
        if(!started) {
            var restartMessage = document.querySelector("#restart-message");
            if (restartMessage) {
                restartMessage.textContent = "";
            }
            nextSequence();
            started = true;
        }
    }
});

document.addEventListener ("click", function (event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    buttonAnimation(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
    console.log(userClickedPattern);
});

function nextSequence () {
    userClickedPattern = [];
    document.querySelector("#level-title").textContent = ("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    buttonAnimation(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    console.log(gamePattern);
}

function buttonAnimation (buttonSelector) {
    var animation = document.querySelector("#" + buttonSelector);
    animation.classList.add("pressed");
    setTimeout (function () {
        animation.classList.remove("pressed");
    }, 300);
}

function playSound (soundSelector) {
    var sound = new Audio("./sounds/" + soundSelector + ".mp3");
    sound.play();
}

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            console.log("Correct!");
            setTimeout (function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong!");
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        setTimeout (function () {
            document.querySelector("body").classList.remove("game-over");
        }, 200);
        document.querySelector("#level-title").textContent = "Game Over";
        document.querySelector("#restart-message").textContent = "Press Enter To Restart!";
        startOver();
    }
}

function startOver () {
    gamePattern = [];
    level = 1;
    started = false;
}