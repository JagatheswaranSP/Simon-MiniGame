var gamePattern = [];
var colors = ["green","red","yellow","blue"];
var level = 0;
var userPattern = [];
var starts = false;

$(document).keydown(function () { 
    if(!starts){
        $("#level-title").text("Level " + level);
        nextsequence();
        starts = true;
    }
});

$(".btn").click(function(){
    var userchosen = $(this).attr("id");
    userPattern.push(userchosen);
    animation(userchosen);
    sounds(userchosen);
    
    game(userPattern.length-1);
});

function game(currentLevel){
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        if (gamePattern.length === userPattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }
    else{
        sounds("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")},200);
        startover();
    }
}

function nextsequence(){
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var random = Math.floor(Math.random() * 4);
    var randomcolor = colors[random];
    gamePattern.push(randomcolor);

    $("#" + randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    sounds(randomcolor);
}

function animation(randomcolor){
    $("#" + randomcolor).addClass("pressed");
    setTimeout(function(){
        $("#" + randomcolor).removeClass("pressed")
    },100);

}

function sounds(randomcolor){
    var sound = new Audio("./sounds/" + randomcolor + ".mp3")
    sound.play();
}



function startover() {
    level = 0;
    gamePattern = [];
    starts = false
  }