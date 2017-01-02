var classesOfImages = ['fa-bomb', 'fa-search', 'fa-search', 'fa-recycle',
  'fa-recycle', 'fa-pause-circle-o', 'fa-pause-circle-o', 'fa-arrows-alt',
  'fa-arrows-alt', 'fa-eye-slash', 'fa-eye-slash',
  'fa-plane','fa-plane', 'fa-fighter-jet','fa-fighter-jet','fa-user-circle','fa-user-circle',
  'fa-user-circle-o','fa-user-circle-o','fa-space-shuttle','fa-space-shuttle','fa-minus-square','fa-minus-square',
  'fa-minus-square-o','fa-minus-square-o']

var currentPlayerOneCursorPosition = 1;
var currentPlayerTwoCursorPosition = 26;
var numberOfFlippedCardsForPlayerOne = 0;
var numberOfFlippedCardsForPlayerTwo = 0;
var pairsOfMatchedCardsPlayerOne = 0;
var pairsOfMatchedCardsPlayerTwo = 0;
var timer = 60;
var timerId = 'ongoing';

var restart = function() {
  $('.card').removeClass("red");
  $('#1').toggleClass("red");
  $('#26').toggleClass("blue");
}

var randomAssignImages = function(player) {
  classesOfImages.sort(function() {
    return 0.5 - Math.random();
  });
  if (player === 'playerOne') {
    for (var i=1; i<=25; i++) { //loop through each of playerOne's cards
      $('#'+i+' > .back > i').addClass(classesOfImages[i-1]);
    }
  }
  else if (player === 'playerTwo') {
    for (var i=26; i<=50; i++) { //loop through each of playerTwo's cards
      $('#'+i+' > .back > i').addClass(classesOfImages[i-26]);
    }
  }
}

var updateOrCheckScore = function(player) {
  if (player === 'playerOne') {
    $('.playerOneScore').text(pairsOfMatchedCardsPlayerOne*5);
  }
  else if (player === 'playerTwo') {
    $('.playerTwoScore').text(pairsOfMatchedCardsPlayerTwo*5);
  }
}

var updateTime = function() {
  if (timerId === 'ongoing') {
    $('.timerBox').text(timer + ' SEC');
    timeInterval = setInterval(function(){
      timer--;
      if (timer === 0) {
        alert("Time's up!");
        clearInterval(timeInterval);
        return false;
      }
      $('.timerBox').text(timer + ' SEC');
    },1000)
  }
}

var moveCursor = function(whichPlayer) {
  if (whichPlayer === 'playerOne') {
    $('.card').removeClass("red");
    $('#'+currentPlayerOneCursorPosition).toggleClass("red");
  }
  else if (whichPlayer === 'playerTwo') {
    $('.card').removeClass("blue");
    $('#'+currentPlayerTwoCursorPosition).toggleClass("blue");
  }
}

var canMoveOrNot = function(direction) {
  //add one general if condition: if isGameOver === false
  // if (isGameOver() === false) {
    if ((direction.which === 68) && (currentPlayerOneCursorPosition%5 !== 0)) { //'D' key - move right
      currentPlayerOneCursorPosition ++;
      moveCursor('playerOne');
    }
    if ((direction.which === 65) && (currentPlayerOneCursorPosition%5 !== 1)) { //'A' key - move left
      currentPlayerOneCursorPosition --;
      moveCursor('playerOne');
    }
    if ((direction.which === 83) && (currentPlayerOneCursorPosition <= 20)) { //'S' key - move down
      currentPlayerOneCursorPosition += 5;
      moveCursor('playerOne');
    }
    if ((direction.which === 87) && (currentPlayerOneCursorPosition >= 6)) { //'W' key - move up
      currentPlayerOneCursorPosition -= 5;
      moveCursor('playerOne');
    }
    if ((direction.which === 39) && (currentPlayerTwoCursorPosition%5 !== 0)) { //'right' key - move right
      currentPlayerTwoCursorPosition ++;
      moveCursor('playerTwo');
    }
    if ((direction.which === 37) && (currentPlayerTwoCursorPosition%5 !== 1)) { //'left' key - move left
      currentPlayerTwoCursorPosition --;
      moveCursor('playerTwo');
    }
    if ((direction.which === 40) && (currentPlayerTwoCursorPosition <= 45)) { //'down' key - move down
      currentPlayerTwoCursorPosition += 5;
      moveCursor('playerTwo');
    }
    if ((direction.which === 38) && (currentPlayerTwoCursorPosition >= 31)) { //'up' key - move up
      currentPlayerTwoCursorPosition -= 5;
      moveCursor('playerTwo');
    }
  // }
  // else {
  //   alert("The game has ended!");
  // }
} //settles the boundaries of both players' screens

var canFlipOrNot = function(player) {
  // if (isGameOver() === false) {
    if (player === 'playerOne') {
      if (    (numberOfFlippedCardsForPlayerOne < 2) && (!($('.red').hasClass('flipped1')))          ) {
        return true;
      }
      else {
        return false;
      }
    }
    else if (player === 'playerTwo') {
      if (    (numberOfFlippedCardsForPlayerTwo < 2) && (!($('.blue').hasClass('flipped3')))          ) {
        return true;
      }
      else {
        return false;
      }
    }
  // }
  // else {
  //   alert("The game has ended!");
  // }
}

var checkMatch = function(player) {
  if (player === 'playerOne') {
    if (numberOfFlippedCardsForPlayerOne === 0) {
      $(".red").addClass('flipped1');
      numberOfFlippedCardsForPlayerOne++;
    }
    else if (numberOfFlippedCardsForPlayerOne === 1) {
      $(".red").addClass('flipped2');
      numberOfFlippedCardsForPlayerOne++;
      if (($('.flipped1 > .back > i').attr('class')) === ($('.flipped2 > .back > i').attr('class'))) {
        console.log("OMG IT WORKED!");
        //add 'matched' class here
        $('.flipped1, .flipped2').addClass('matched');
        $('.matched').removeClass('flipped1 flipped2');
        pairsOfMatchedCardsPlayerOne++;
        updateOrCheckScore('playerOne');
        numberOfFlippedCardsForPlayerOne = 0;
        return;
      }
      else {
        setTimeout(function() {
          $('.flipped1, .flipped2').flip(false);
          $('.card').removeClass('flipped1 flipped2');
          numberOfFlippedCardsForPlayerOne = 0;
        },1000)
        console.log("Nope, no match.");
      }
    }
  }
  else if (player === 'playerTwo') {
    if (numberOfFlippedCardsForPlayerTwo === 0) {
      $(".blue").addClass('flipped3');
      numberOfFlippedCardsForPlayerTwo++;
    }
    else if (numberOfFlippedCardsForPlayerTwo === 1) {
      $(".blue").addClass('flipped4');
      numberOfFlippedCardsForPlayerTwo++;
      if (($('.flipped3 > .back > i').attr('class')) === ($('.flipped4 > .back > i').attr('class'))) {
        console.log("OMG IT WORKED!");
        //add 'matched' class here
        $('.flipped3, .flipped4').addClass('matched2');
        $('.matched2').removeClass('flipped3 flipped4');
        pairsOfMatchedCardsPlayerTwo++;
        updateOrCheckScore('playerTwo');
        numberOfFlippedCardsForPlayerTwo = 0;
        return;
      }
      else {
        setTimeout(function() {
          $('.flipped3, .flipped4').flip(false);
          $('.card').removeClass('flipped3 flipped4');
          numberOfFlippedCardsForPlayerTwo = 0;
        },1000)
        console.log("Nope, no match.");
      }
    }
  }
}

var isGameOver = function() {
  if ((timer === 0) || (pairsOfMatchedCardsPlayerOne === 12) || (pairsOfMatchedCardsPlayerTwo === 12)   ) {
    return true;
  }
  else {
    return false;
  }
}


$(document).ready(function(){
  restart();
  updateTime();
  updateOrCheckScore('playerOne');
  updateOrCheckScore('playerTwo');
  randomAssignImages('playerOne');
  randomAssignImages('playerTwo');
  $(".card").flip({
    trigger: 'manual'
  });
  $(document).keyup(function(event) {
    if (isGameOver() === false) {
      if ((event.which === 86) && (canFlipOrNot('playerOne')) ) { //need one more condition...if !hasClass('matched'), or how about abstract out to a function()
        console.log("numberOfFlippedCardsForPlayerOne is now: ",numberOfFlippedCardsForPlayerOne);
        $(".red").flip(true);
        checkMatch('playerOne');
      }
      else if ((event.which === 77) && (canFlipOrNot('playerTwo'))  ) {
        $(".blue").flip(true);
        checkMatch('playerTwo');
      }
      else if (event.which === 87 || 65 || 83 || 68 || 38 || 37 || 40 || 39) {
        canMoveOrNot(event);
      }
    }
    else {
      alert("The game has ended!");
    }
  })

})
