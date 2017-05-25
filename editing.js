//  below is moveCursor for playerTwo
  if ((whichPlayer === 'playerTwo') && (statusOfPlayerTwoCursor === 'white') && (onceForPlayerTwo === false)) { //playerTwo suffers cursorDisappear()

    $('.card').removeClass("blue");
    onceForPlayerTwo = true;
    $('#'+currentPlayerTwoCursorPosition).toggleClass("white"); //later add z-index value to .white

    playerTwoCursorDisappear = setInterval(function(){
      timerForPlayerTwoCursorDisappear--;
      if (timerForPlayerTwoCursorDisappear === 0) {
        statusOfPlayerTwoCursor = 'normal';
        $('.card').removeClass("white");
      }
    },1000) // the problem is the timer-- accelerates every time playerTwo hits the direction button
  }
  else if ((whichPlayer === 'playerTwo') && (statusOfPlayerTwoCursor === 'white') && (onceForPlayerTwo === true)) {
    $('#'+currentPlayerTwoCursorPosition).toggleClass("white");
  }
  else if ((whichPlayer === 'playerTwo') && (statusOfPlayerTwoCursor === 'xray') && (xrayCardsLeftPlayerTwo >= 0)) {
    if (xrayCardsLeftPlayerTwo === 0) {
      $('.card').removeClass("blue");
      $('#'+currentPlayerTwoCursorPosition).toggleClass("blue");
      $('.playerTwoBox .front').empty();
      statusOfPlayerTwoCursor === 'normal';
    }
    else if (xrayCardsLeftPlayerTwo > 0) {
      $('.card').removeClass("blue");
      $('.playerTwoBox .front').empty();
      xrayCardsLeftPlayerTwo--;
      $('#'+currentPlayerTwoCursorPosition).toggleClass("blue");
      $('#'+currentPlayerTwoCursorPosition+'> .back > .fa').clone().appendTo('#'+currentPlayerTwoCursorPosition+'> .front'); //xray
    }

  }

  else if (whichPlayer === 'playerTwo') {
    $('.card').removeClass("blue");
    $('#'+currentPlayerTwoCursorPosition).toggleClass("blue");
  }





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
    },1000) // the problem is the timer-- accelerates every time playerOne hits the direction button (this is solved by gone2)
  }
  // else if ((whichPlayer === 'playerOne') && (statusOfPlayerOneCursor === 'white') && (onceForPlayerOne === true)) {
    else if ((whichPlayer === 'playerOne') && (statusOfPlayerOneCursor === 'gone2')) {
      $('.card').removeClass("white1 cursor1");
      $('#'+currentPlayerOneCursorPosition).toggleClass("white1 cursor1");
  }





  else if ((whichPlayer === 'playerOne') && (statusOfPlayerOneCursor === 'xray') && (xrayCardsLeftPlayerOne >= 0)) {

    if (xrayCardsLeftPlayerOne === 0) { //clear last xray-ed card before returning to 'normal'

      $('.card').removeClass("red cursor1");
      $('#'+tempPlayerOnePrevId+'> .front').empty(); // removes previously xrayed card
      $('#'+currentPlayerOneCursorPosition+'> .front > img').clone().appendTo('#'+tempPlayerOnePrevId+'> .front'); // clones back the jQuery logo front

      $('#'+currentPlayerOneCursorPosition).toggleClass("red cursor1");
      statusOfPlayerOneCursor === 'normal';
    }

    else if (xrayCardsLeftPlayerOne === 3) { // first xray card, no prev xray-ed card to remove
      $('.card').removeClass("red cursor1");
      $('#'+currentPlayerOneCursorPosition+'> .front').empty(); // removes current card's logo
      $('#'+currentPlayerOneCursorPosition+'> .back > .fa').clone().appendTo('#'+currentPlayerOneCursorPosition+'> .front'); // xray back of current card
      $('#'+currentPlayerOneCursorPosition).toggleClass("red cursor1");

      tempPlayerOnePrevId = currentPlayerOneCursorPosition;
      xrayCardsLeftPlayerOne--;
    }

    else if (xrayCardsLeftPlayerOne > 0) {

      $('.card').removeClass("red cursor1");
      $('#'+tempPlayerOnePrevId+'> .front').empty(); // removes previously xrayed card
      $('#'+currentPlayerOneCursorPosition+'> .front > img').clone().appendTo('#'+tempPlayerOnePrevId+'> .front'); // clones back the jQuery logo front

      $('#'+currentPlayerOneCursorPosition+'> .front').empty(); // removes current card's logo
      $('#'+currentPlayerOneCursorPosition+'> .back > .fa').clone().appendTo('#'+currentPlayerOneCursorPosition+'> .front'); //xray
      $('#'+currentPlayerOneCursorPosition).toggleClass("red cursor1");

      tempPlayerOnePrevId = currentPlayerOneCursorPosition;
      xrayCardsLeftPlayerOne--;
    }
  }






  //
