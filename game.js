var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
console.log("Hello");
//start keypress
$(document).on("keypress",function(){
  if(!started){
  $("#level-title").text("Level "+level);
  newSequence();
  started=true;
  }
});

//keypress
$(".btn").on("click",function(){
  var userChosenColour=this.id;
  //var userChosenColour = $(this).attr("id");
  
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // clicked start at 0
  checkAnswer(userClickedPattern.length-1);
  
});

//sound
function playSound(name){
    //sounds
    var sounds=new Audio("sounds/"+name+".mp3");
    sounds.play();
}

//animate press
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed")
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);

}

function newSequence(){
  level++;
  userClickedPattern=[];
  //generate random number

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];

  //auto generate and put inside array 
  gamePattern.push(randomChosenColour);

  //animate
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level "+level);
  
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("success");

      if(gamePattern.length===userClickedPattern.length){

        setTimeout(function(){
          newSequence();
        },1000);
      }
      
     }
      else{

      gamePattern=[];
      var wrong =new Audio('sounds/wrong.mp3')
      wrong.play();

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      console.log("fail");
      startOver();
      }
    }
  
function startOver(){
  gamePattern=[];
  level=0;
  started=false;
}