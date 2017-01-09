var classesOfImages = ['fa-bomb bomb', 'fa-search', 'fa-search', 'fa-recycle recycle2 bonus',
  'fa-recycle recycle2 bonus', 'fa-pause-circle-o pause bonus', 'fa-pause-circle-o pause bonus', 'fa-arrows-alt shuffle bonus',
  'fa-arrows-alt shuffle bonus', 'fa-eye-slash disappear bonus', 'fa-eye-slash disappear bonus', 'fa-eye xray bonus', 'fa-eye xray bonus',
  'fa-snowflake-o','fa-snowflake-o','fa-user-circle','fa-user-circle',
  'fa-user-circle-o','fa-user-circle-o','fa-space-shuttle','fa-space-shuttle','fa-minus-square','fa-minus-square',
  'fa-minus-square-o','fa-minus-square-o']

var currentPlayerOneCursorPosition = 1;
var currentPlayerTwoCursorPosition = 26;
var numberOfFlippedCardsForPlayerOne = 0;
var numberOfFlippedCardsForPlayerTwo = 0;
var pairsOfMatchedCardsPlayerOne = 0;
var pairsOfMatchedCardsPlayerTwo = 0;
var scoreOfPlayerOne = 0;
var scoreOfPlayerTwo = 0;
var timer = 10;
var timerId = 'ongoing';
var timerForPlayerOneCursorDisappear = 10;
var timerForPlayerTwoCursorDisappear = 10;
var statusOfPlayerOneCursor = 'normal';
var statusOfPlayerTwoCursor = 'normal';
var onceForPlayerOne = false; //for cursorDisappear, to make sure this function or powerup happens only ONCE
var onceForPlayerTwo = false;
var xrayCardsLeftPlayerOne = 3;
var xrayCardsLeftPlayerTwo = 3;
var boardRotationPlayerOne = 'normal';
var boardRotationPlayerTwo = 'normal';
var timerForPlayerOneCursorSlow = 10;
var timerForPlayerTwoCursorSlow = 10;

var restart = function() {
  $('.card').removeClass("red cursor1 blue cursor2");
  $('#1').toggleClass("red cursor1");
  $('#26').toggleClass("blue cursor2");
  currentPlayerOneCursorPosition = 1;
  currentPlayerTwoCursorPosition = 26;
  numberOfFlippedCardsForPlayerOne = 0;
  numberOfFlippedCardsForPlayerTwo = 0;
  pairsOfMatchedCardsPlayerOne = 0;
  pairsOfMatchedCardsPlayerTwo = 0;
  scoreOfPlayerOne = 0;
  scoreOfPlayerTwo = 0;
  timer = 60;
  timerId = 'ongoing';
  timerForPlayerOneCursorDisappear = 10;
  timerForPlayerTwoCursorDisappear = 10;
  statusOfPlayerOneCursor = 'normal';
  statusOfPlayerTwoCursor = 'normal';
  onceForPlayerOne = false; //for cursorDisappear, to make sure this function or powerup happens only ONCE
  onceForPlayerTwo = false;
  xrayCardsLeftPlayerOne = 3;
  xrayCardsLeftPlayerTwo = 3;
  boardRotationPlayerOne = 'normal';
  boardRotationPlayerTwo = 'normal';
  timerForPlayerOneCursorSlow = 10;
  timerForPlayerTwoCursorSlow = 10;
}

function shuffle(array) { // Fisher-Yates shuffle
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var randomAssignImages = function(player) {
  // classesOfImages.sort(function() {
  //   return 0.5 - Math.random();
  // });
  classesOfImages = shuffle(classesOfImages);
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
    $('.playerOneScore').text(scoreOfPlayerOne);
  }
  else if (player === 'playerTwo') {
    $('.playerTwoScore').text(scoreOfPlayerTwo);
  }
}

var checkWinner = function() {
  if (scoreOfPlayerOne > scoreOfPlayerTwo) {
    return "Player One!";
  }
  else if (scoreOfPlayerTwo > scoreOfPlayerOne) {
    return "Player Two!";
  }
  else {
    return "It's a draw!"
  }
}

var updateTime = function() {
  if (isGameOver() === true) {
    //do the same as below;
    $('.playerOneStatusBar, .playerTwoStatusBar').replaceWith("<div class='winner'>Winner is..." + checkWinner() + "</div>");
    clearInterval(timeInterval);
    return false;
  }
  if (timerId === 'ongoing') {
    $('.timerBox').text(timer + ' SEC');
    timeInterval = setInterval(function(){
      timer--;
      if (timer === 0) {
        $('.playerOneStatusBar, .playerTwoStatusBar').replaceWith("<div class='winner'>Winner is..." + checkWinner() + "</div>");
        clearInterval(timeInterval);
        return false;
      }
      $('.timerBox').text(timer + ' SEC'); // shift this to before alert to get '0 sec'
    },1000)
  }
}

var moveCursor = function(whichPlayer) {

//  below is moveCursor for playerOne
  // if ((whichPlayer === 'playerOne') && (statusOfPlayerOneCursor === 'white') && (onceForPlayerOne === false)) { //playerOne suffers cursorDisappear()
  if ((whichPlayer === 'playerOne') && (statusOfPlayerOneCursor === 'gone')) {
    $('.card').removeClass("red cursor1");
    $('#'+currentPlayerOneCursorPosition).toggleClass("white1 cursor1"); //distinguish from p2's white2, as an undifferentiated '.white' will cause conflict
    statusOfPlayerOneCursor = 'gone2' //to make sure the setInterval below is started once only

    setInterval(function(){
      timerForPlayerOneCursorDisappear--; //from global variable of 10seconds
      if (timerForPlayerOneCursorDisappear === 0) { //this way is better than having the timer at the specialEffects side
        statusOfPlayerOneCursor = 'normal';
        $('.card').removeClass("white1 cursor1");
        $('#'+currentPlayerOneCursorPosition).toggleClass("red cursor1");
      }
    },1000) // the problem is the timer-- accelerates every time playerOne hits the direction button
  }
  // else if ((whichPlayer === 'playerOne') && (statusOfPlayerOneCursor === 'white') && (onceForPlayerOne === true)) {
    else if ((whichPlayer === 'playerOne') && (statusOfPlayerOneCursor === 'gone2')) {
      $('.card').removeClass("white1 cursor1");
      $('#'+currentPlayerOneCursorPosition).toggleClass("white1 cursor1");
  }
  else if ((whichPlayer === 'playerOne') && (statusOfPlayerOneCursor === 'xray') && (xrayCardsLeftPlayerOne >= 0)) {
    if (xrayCardsLeftPlayerOne === 0) { //clear last xray-ed card before returning to 'normal'
      $('.card').removeClass("red cursor1");
      $('#'+currentPlayerOneCursorPosition).toggleClass("red cursor1");
      $('.playerOneBox .front').empty();
      statusOfPlayerOneCursor === 'normal';
    }
    else if (xrayCardsLeftPlayerOne > 0) {
      $('.card').removeClass("red cursor1");
      $('.playerOneBox .front').empty(); //removes previous xray-ed card
      xrayCardsLeftPlayerOne--;
      $('#'+currentPlayerOneCursorPosition).toggleClass("red cursor1");
      $('#'+currentPlayerOneCursorPosition+'> .back > .fa').clone().appendTo('#'+currentPlayerOneCursorPosition+'> .front'); //xray
    }
  }

  else if (  (whichPlayer === 'playerOne') && (statusOfPlayerOneCursor === 'slowed')         ) {
      $('.card').removeClass("red cursor1");
      statusOfPlayerOneCursor = 'slowed2'; //stops player's movement, preventing player from simply moving again to escape the slow effect
      $('.red').css('transition','10000s ease');
      $('#'+currentPlayerOneCursorPosition).toggleClass("red cursor1");
      setTimeout(function() {
          statusOfPlayerOneCursor = 'slowed';
      },1000)

    }

  else if (   (whichPlayer === 'playerOne') && (statusOfPlayerOneCursor === 'normal')   ) {
    $('.card').removeClass("red cursor1");
    $('#'+currentPlayerOneCursorPosition).toggleClass("red cursor1");
  }




//  below is moveCursor for playerTwo ----------------------------------------
    if ((whichPlayer === 'playerTwo') && (statusOfPlayerTwoCursor === 'gone')) { //playerTwo suffers cursorDisappear()

      $('.card').removeClass("blue cursor2");
      $('#'+currentPlayerTwoCursorPosition).toggleClass("white2 cursor2");
      statusOfPlayerTwoCursor = 'gone2';

      setInterval(function(){
        timerForPlayerTwoCursorDisappear--;
        if (timerForPlayerTwoCursorDisappear === 0) {
          statusOfPlayerTwoCursor = 'normal';
          $('.card').removeClass("white2 cursor2");
          $('#'+currentPlayerTwoCursorPosition).toggleClass("blue cursor2");
        }
      },1000) // the problem is the timer-- accelerates every time playerTwo hits the direction button (gone2 resolves this issue)
    }
    else if ((whichPlayer === 'playerTwo') && (statusOfPlayerTwoCursor === 'gone2')) {
      $('.card').removeClass("white2 cursor2");
      $('#'+currentPlayerTwoCursorPosition).toggleClass("white2 cursor2");
    }
    else if ((whichPlayer === 'playerTwo') && (statusOfPlayerTwoCursor === 'xray') && (xrayCardsLeftPlayerTwo >= 0)) {
      if (xrayCardsLeftPlayerTwo === 0) {
        $('.card').removeClass("blue cursor2");
        $('#'+currentPlayerTwoCursorPosition).toggleClass("blue cursor2");
        $('.playerTwoBox .front').empty();
        statusOfPlayerTwoCursor === 'normal';
      }
      else if (xrayCardsLeftPlayerTwo > 0) {
        $('.card').removeClass("blue cursor2");
        $('.playerTwoBox .front').empty();
        xrayCardsLeftPlayerTwo--;
        $('#'+currentPlayerTwoCursorPosition).toggleClass("blue cursor2");
        $('#'+currentPlayerTwoCursorPosition+'> .back > .fa').clone().appendTo('#'+currentPlayerTwoCursorPosition+'> .front'); //xray
      }

    }

    else if (  (whichPlayer === 'playerTwo') && (statusOfPlayerTwoCursor === 'slowed')         ) {
      $('.card').removeClass("blue cursor2");
      statusOfPlayerTwoCursor = 'slowed2'; //stops player's movement, preventing player from simply moving again to escape the slow effect
      $('.blue').css('transition','10000s ease');
      $('#'+currentPlayerTwoCursorPosition).toggleClass("blue cursor2");
      setTimeout(function() {
        statusOfPlayerTwoCursor = 'slowed'
      },1000)
    }
    else if (  (whichPlayer === 'playerTwo') && (statusOfPlayerTwoCursor === 'normal')   ) {
      $('.card').removeClass("blue cursor2");
      $('#'+currentPlayerTwoCursorPosition).toggleClass("blue cursor2");
    }
}

var canMoveOrNot = function(direction) {
  //add one general if condition: if isGameOver === false
  // if (isGameOver() === false) { (this is done at keyup)
  if (boardRotationPlayerOne !== 'normal') {
    if ((direction.which === 68) && (currentPlayerOneCursorPosition >= 6)) { //'D' key - move right - need it to be a -5 to Id.
      currentPlayerOneCursorPosition -= 5;
      moveCursor('playerOne');
    }
    if ((direction.which === 65) && (currentPlayerOneCursorPosition <= 20)) { //'A' key - move left - need it to be a +5
      currentPlayerOneCursorPosition += 5;
      moveCursor('playerOne');
    }
    if ((direction.which === 83) && (currentPlayerOneCursorPosition%5 !== 0)) { //'S' key - move down - need it to be a +1
      currentPlayerOneCursorPosition++;
      moveCursor('playerOne');
    }
    if ((direction.which === 87) && (currentPlayerOneCursorPosition%5 !==1)) { //'W' key - move up - need it to be a -1
      currentPlayerOneCursorPosition--;
      moveCursor('playerOne');
    }
  }

  if ((statusOfPlayerOneCursor!=='slowed2') && (boardRotationPlayerOne === 'normal') ) { //to prevent movement of player when 'slowed2'
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
  }

  if (boardRotationPlayerTwo === 'rotated') {
    if ((direction.which === 37) && (currentPlayerTwoCursorPosition >= 31)) {
      currentPlayerTwoCursorPosition -= 5;
      moveCursor('playerTwo');
    }
    if ((direction.which === 39) && (currentPlayerTwoCursorPosition <= 45)) {
      currentPlayerTwoCursorPosition += 5;
      moveCursor('playerTwo');
    }
    if ((direction.which === 38) && (currentPlayerTwoCursorPosition%5 !== 0)) {
      currentPlayerTwoCursorPosition++;
      moveCursor('playerTwo');
    }
    if ((direction.which === 40) && (currentPlayerTwoCursorPosition%5 !==1)) {
      currentPlayerTwoCursorPosition--;
      moveCursor('playerTwo');
    }
  }
  if ((statusOfPlayerTwoCursor!=='slowed2') && (boardRotationPlayerTwo === 'normal')  ) { //to prevent movement of player2 when 'slowed2'
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
  }
  // }
  // else {
  //   alert("The game has ended!");
  // }
} //settles the boundaries of both players' screens

var canFlipOrNot = function(player) {
  // if (isGameOver() === false) {
    if (player === 'playerOne') {
      if (    (numberOfFlippedCardsForPlayerOne < 2) &&   (!($('.cursor1').hasClass('flipped1')))        ) {
        return true;
      }
      else {
        return false;
      }
    }
    else if (player === 'playerTwo') {
      if (    (numberOfFlippedCardsForPlayerTwo < 2) &&     (!($('.cursor2').hasClass('flipped3')))     ) {
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

  if (    (player === 'playerOne') &&   (!($(".cursor1").hasClass('matched')))       ) {
    if (numberOfFlippedCardsForPlayerOne === 0) {
      $(".cursor1").addClass('flipped1');
      numberOfFlippedCardsForPlayerOne++;
              if (checkForBomb('flipped1')) {
                return true;
              }
    }
    else if (numberOfFlippedCardsForPlayerOne === 1) {
      $(".cursor1").addClass('flipped2'); // add a condition here that states that IF ONLY it is RED and NOT .matched at the same time
      numberOfFlippedCardsForPlayerOne++;
      if (($('.flipped1 > .back > i').attr('class')) === ($('.flipped2 > .back > i').attr('class'))) {
        $('.flipped1, .flipped2').addClass('matched');
        $('.matched').removeClass('flipped1 flipped2');
        // if (isThereBonus('red')) invoke unleashBonus();
        if (isThereBonus('playerOne')) {
          unleashBonus('playerOne');
        }
        pairsOfMatchedCardsPlayerOne++;
        scoreOfPlayerOne += 5;
        updateOrCheckScore('playerOne');
        numberOfFlippedCardsForPlayerOne = 0;
        return;
      }
      else {
        if (checkForBomb('flipped2')) {
          return true; //if second flipped card is a bomb, skip the setTimeout below
        }
        setTimeout(function() {
          $('.flipped1, .flipped2').flip(false);
          $('.card').removeClass('flipped1 flipped2');
          numberOfFlippedCardsForPlayerOne = 0;
        },800)
        console.log("Nope, no match.");
      }
    }
  }

//below is for checkMatch('playerTwo') ----------------------------------------
  else if (    (player === 'playerTwo') &&    (!($(".cursor2").hasClass('matched2')))    ) {

    if (numberOfFlippedCardsForPlayerTwo === 0) {
      $(".cursor2").addClass('flipped3');
      numberOfFlippedCardsForPlayerTwo++;
      if (checkForBomb('flipped3')) {
        return true;
      }
    }
    else if (numberOfFlippedCardsForPlayerTwo === 1) {
      $(".cursor2").addClass('flipped4'); // add a condition here that states that IF ONLY it is RED and NOT .matched at the same time

      numberOfFlippedCardsForPlayerTwo++;
      if (($('.flipped3 > .back > i').attr('class')) === ($('.flipped4 > .back > i').attr('class'))) {
        $('.flipped3, .flipped4').addClass('matched2');
        $('.matched2').removeClass('flipped3 flipped4');
        // if (isThereBonus('red')) invoke unleashBonus();
        if (isThereBonus('playerTwo')) {
          unleashBonus('playerTwo');
        }
        pairsOfMatchedCardsPlayerTwo++;
        scoreOfPlayerTwo += 5;
        updateOrCheckScore('playerTwo');
        numberOfFlippedCardsForPlayerTwo = 0;
        return;
      }
      else {
        if (checkForBomb('flipped4')) {
          return true;
        }
        setTimeout(function() {
          $('.flipped3, .flipped4').flip(false);
          $('.card').removeClass('flipped3 flipped4');
          numberOfFlippedCardsForPlayerTwo = 0;
        },800)
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
  $('div.notHidden').fadeTo('slow', 0.1);
  $('div.firstBox').fadeIn(2000).removeClass('hidden');
  // restart();
  // updateOrCheckScore('playerOne');
  // updateOrCheckScore('playerTwo');
  // randomAssignImages('playerOne');
  // randomAssignImages('playerTwo');
  // $(".card").flip({
  //   trigger: 'manual'
  // });

  $('button').click(function(){
    $('div.firstBox').fadeOut(1000).addClass('hidden');
    $('div.notHidden').fadeTo('slow', 1);
    restart();
    updateTime();
    updateOrCheckScore('playerOne');
    updateOrCheckScore('playerTwo');
    randomAssignImages('playerOne');
    randomAssignImages('playerTwo');
    $(".card").flip({
      trigger: 'manual'
    });
    console.log("bomb is at: ",$('.bomb').parent());
    console.log("slow is at: ", $('.pause').parent());
    console.log("rotation is at: ",$('.recycle2').parent());
    console.log("disappear is at: ",$('.disappear').parent());
    console.log("xray is at: ",$('.xray').parent());
    console.log("shuffle is at: ",$('.shuffle').parent());
  })


  $(document).keyup(function(event) {

    if (isGameOver() === false) {
      if ((event.which === 86) && (canFlipOrNot('playerOne')) ) { //need one more condition...if !hasClass('matched'), or how about abstract out to a function()
        console.log("numberOfFlippedCardsForPlayerOne is now: ",numberOfFlippedCardsForPlayerOne);
        $(".cursor1").flip(true);
        checkMatch('playerOne');
      }

      else if ((event.which === 77) && (canFlipOrNot('playerTwo'))  ) {
        $(".cursor2").flip(true);
        checkMatch('playerTwo');
      }
      else if (event.which === 88) { //test for shuffleCard


        prepareForCardShuffle();

      }



      else if (event.which === 87 || 65 || 83 || 68 || 38 || 37 || 40 || 39)  {

        canMoveOrNot(event);
      }

    }
    else {
      // alert("The game has ended!"); //doesn't work well with keydown!

      console.log("the game has ended");
    }
  })

})
