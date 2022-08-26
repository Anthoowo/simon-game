//if(window.screen.width< 700){
  //$('h1').html('pls switch to abigger screen')
//}
//else{
var started = false;
var storedInput = [];
var gamePattern = [];
$(document).on("keydown",function(){
  if (!started) {
    model.nextSequence();
    view.displayLevel();
    started = true;
  }
}) ;
$('.btn').on("click", function(event){
  var colorInput = event.target.getAttribute('id');
  storedInput.push(colorInput);
  model.generateRandomSound(colorInput);
  buttonAnnimation(colorInput);
  model.compareSound(storedInput,storedInput.length-1);
});
//}
var view = {
 gameOver: function(){
   $("h1").html("Game Over, Press Any Key to Restart");

    //  $('.btn').addClass('pressed');
    // setTimeout(function(){ $('.btn').removeClass('pressed');}, 150);
    $('body').addClass('game-over');
    setTimeout(function(){ $('body').removeClass('game-over');}, 150);

 },
 displayLevel: function(){
   $('h1').html("level  "+ model.currentLevel);
 }
}

var model= {
  buttonColor: ['green', 'red', 'yellow','blue'],
  numberOfButtons: 4,
  currentLevel: 0,
  generateRandomNumber: function(){
  var numbers = [0,1,2,3];
    var n = Math.floor(Math.random()* 4);
    return numbers[n];
  },
  generateRandomColor: function(){
    var buttonColor = this.buttonColor;
    var randomColor = buttonColor[this.generateRandomNumber()];
    return randomColor;
  },
  generateRandomSound: function(randomColor){
    var randSound = new Audio('sounds/'+ randomColor +".mp3" );
    randSound.play();
    $("#"+ randomColor).fadeIn(150).fadeOut(150).fadeIn(150);;
  },
  startGameOver: function(){
    this.generateRandomSound("wrong");
    view.gameOver();
    this.currentLevel = 0;
    gamePattern = [];
    storedInput = [];
    started = false;
  },
  nextSequence: function(){
    this.currentLevel++;
    view.displayLevel();
  storedInput = [];
  var randomColor = this.generateRandomColor();
  gamePattern.push(randomColor);
  this.generateRandomSound(randomColor);
  },
  compareSound: function(inputArray,currentLevel){
    var input = inputArray;
    if (gamePattern[currentLevel] === input[currentLevel] ) {
      if (gamePattern.length === input.length) {
        setTimeout(()=>
        model.nextSequence(),700)
      }

    }
  else{
    this.startGameOver();
    }
  }
}

function buttonAnnimation(currentkey){
var activeButton = document.querySelector("."+ currentkey);
activeButton.classList.add("pressed");
setTimeout(function(){activeButton.classList.remove("pressed")}, 100);
}
