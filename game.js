var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

  $(document).one("keydown", function() {
    $("#title").text("Level " + level);
    nextSequence();
  });

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("succes");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  } else {
    console.log("wrong");
    $("#title").text("Game Over, Press Any Key to Restart!");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver(currentLevel);
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  $(document).one("keydown", function() {
    $("#title").text("Level " + level);
    nextSequence();
  });
}
