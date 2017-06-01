var isThereBonus = function(player) {

  if (player === 'playerOne') {
    if ($('.matched > .back > i').hasClass('bonus')) {
      return true;
    }
  }
  if (player === 'playerTwo') {
    if ($('.matched2 > .back > i').hasClass('bonus')) {
      console.log("istherebonus worked playerTwo");
      return true;
    }
  }
}


var unleashBonus = function(player) {
  // if '.matched .bonus' (elements with both classes),
  if (player === 'playerOne') {
    if ($('.matched > .back > .bonus').hasClass('disappear')) {
      $('.matched > .back > i').removeClass('bonus'); //to prevent future complications
      cursorDisappear('playerTwo'); // this effect is on the opponent
    }
    else if ($('.matched > .back > .bonus').hasClass('recycle2')) {
      $('.matched > .back > i').removeClass('bonus'); //to prevent future complications
      rotateBoard('playerTwo'); // this effect is on the opponent
    }
    else if ($('.matched > .back > .bonus').hasClass('xray')) {
      $('.matched > .back > i').removeClass('bonus'); //to prevent future complications
      xrayCursor('playerOne'); // this effect is on this player
    }
    else if ($('.matched > .back > .bonus').hasClass('shuffle')) {
      $('.matched > .back > i').removeClass('bonus'); //to prevent future complications
      prepareForCardShuffle('playerTwo'); // this effect is on the opponent
    }
    else if ($('.matched > .back > .bonus').hasClass('pause')) {
      $('.matched > .back > i').removeClass('bonus'); //to prevent future complications
      pausePausePause('playerTwo'); // this effect is on the opponent
    }
  }

  else if (player === 'playerTwo') {
    if ($('.matched2 > .back > .bonus').hasClass('disappear')) {
      $('.matched2 > .back > i').removeClass('bonus'); //to prevent future complications
      cursorDisappear('playerOne'); // this effect is on the opponent
    }
    else if ($('.matched2 > .back > .bonus').hasClass('recycle2')) {
      $('.matched2 > .back > i').removeClass('bonus'); //to prevent future complications
      rotateBoard('playerOne'); // this effect is on the opponent
    }
    else if ($('.matched2 > .back > .bonus').hasClass('xray')) {
      $('.matched2 > .back > i').removeClass('bonus'); //to prevent future complications
      xrayCursor('playerTwo'); // this effect is on this player
    }
    else if ($('.matched2 > .back > .bonus').hasClass('shuffle')) {
      $('.matched2 > .back > i').removeClass('bonus'); //to prevent future complications
      prepareForCardShuffle('playerOne'); // this effect is on the opponent
    }
    else if ($('.matched2 > .back > .bonus').hasClass('pause')) {
      $('.matched2 > .back > i').removeClass('bonus'); //to prevent future complications
      pausePausePause('playerOne'); // this effect is on the opponent
    }
  }
}

var cursorDisappear = function(victim) { //done

  if (victim === 'playerOne') {
    // statusOfPlayerOneCursor = 'gone';
    updatePlayerStatusAndMessage('playerOne', 'gone');
    flashEffect('playerOne', 'gone');
    moveCursor(victim);
  }
  else if (victim === 'playerTwo') {
    // statusOfPlayerTwoCursor = 'gone';
    updatePlayerStatusAndMessage('playerTwo', 'gone');
    flashEffect('playerTwo', 'gone');
    moveCursor(victim);
  }

}

var rotateBoard = function(victim) {
  if (victim === 'playerTwo') {
    updatePlayerStatusAndMessage('playerTwo', 'rotate');
    flashEffect('playerTwo', 'rotate');
    $('.playerTwoBox').addClass('rotate90CounterClockwise');
    boardRotationPlayerTwo = 'rotated';
    returnToOriginalPosition = setTimeout(function() {
      $('.playerTwoBox').removeClass('rotate90CounterClockwise');
      boardRotationPlayerTwo = 'normal';
    },10000)
  }
  else if (victim === 'playerOne') {
    updatePlayerStatusAndMessage('playerOne', 'rotate');
    flashEffect('playerOne', 'rotate');
    $('.playerOneBox').addClass('rotate90Clockwise');
    boardRotationPlayerOne = 'rotated';
    returnToOriginalPosition = setTimeout(function() {
      $('.playerOneBox').removeClass('rotate90Clockwise');
      boardRotationPlayerOne = 'normal';
    },10000)
  }
}

var xrayCursor = function(player) {
  if (player === 'playerOne') {
    statusOfPlayerOneCursor = 'xray';
    updatePlayerStatusAndMessage('playerOne', "xray");
    flashEffect('playerOne', 'xray');
  }
  if (player === 'playerTwo') {
    statusOfPlayerTwoCursor = 'xray';
    updatePlayerStatusAndMessage('playerTwo', "xray");
    flashEffect('playerTwo', 'xray');
  }
}

var pausePausePause = function(victim) {
  if (victim === 'playerTwo') {
    // statusOfPlayerTwoCursor = 'slowed';
    updatePlayerStatusAndMessage('playerTwo', 'slowed');
    flashEffect('playerTwo', 'slow');
    setTimeout(function() {
      preventKeySpamming2 = setInterval(function() {
        // statusOfPlayerTwoCursor = 'normal';
        updatePlayerStatusAndMessage('playerTwo', 'normal');
      },100)
      $('.blue').css('transition','0.1s ease');
    },10000)
    setTimeout(function() {
      clearInterval(preventKeySpamming2);
    },13000)
  }

  if (victim === 'playerOne') {
    // statusOfPlayerOneCursor = 'slowed';
    updatePlayerStatusAndMessage('playerOne', 'slowed');
    flashEffect('playerOne', 'slow');
    setTimeout(function() {
      //set a setInterval here to 'rapidfire' setting (100ms) status back to 'normal', in case player spams direction key.
      preventKeySpamming1 = setInterval(function() {
        // statusOfPlayerOneCursor = 'normal';
            updatePlayerStatusAndMessage('playerOne', 'normal');
      },100)

      $('.red').css('transition','0.1s ease');
    },10000)
    setTimeout(function() {
      clearInterval(preventKeySpamming1);
    },13000)
  }
}

var checkForBomb = function(flippedNum) {

  if (flippedNum === 'flipped1') { //when player one flips over the bomb in the first flip
    if ($('.flipped1 > .back > i').hasClass('bomb')) {
      setTimeout(function() {
        $('.flipped1').flip(false);
        $('.card').removeClass('flipped1');
        numberOfFlippedCardsForPlayerOne = 0;
      },800)
      return true;
    }
  }
  else if (flippedNum === 'flipped2') { //when player one flips over the bomb in the second flip
    if ($('.flipped2 > .back > i').hasClass('bomb')) {
      setTimeout(function() {
        $('.flipped1, .flipped2').flip(false);
        $('.card').removeClass('flipped1 flipped2');
        numberOfFlippedCardsForPlayerOne = 0;
      },800)
      return true;
    }
  }
  if (flippedNum === 'flipped3') { //when player two flips over the bomb in the first flip
    if ($('.flipped3 > .back > i').hasClass('bomb')) {
      setTimeout(function() {
        $('.flipped3').flip(false);
        $('.card').removeClass('flipped3');
        numberOfFlippedCardsForPlayerTwo = 0;
        $('.playerTwoScore').text(scoreOfPlayerTwo);
      },800)
      return true;
    }
  }
  else if (flippedNum === 'flipped4') { //when player two flips over the bomb in the second flip
    if ($('.flipped4 > .back > i').hasClass('bomb')) {
      setTimeout(function() {
        $('.flipped3, .flipped4').flip(false);
        $('.card').removeClass('flipped3 flipped4');
        numberOfFlippedCardsForPlayerTwo = 0;
        $('.playerTwoScore').text(scoreOfPlayerTwo);
      },800)
      return true;
    }
  }



}

var prepareForCardShuffle = function(victim) {

  var arrOfUnmatchedCardsIdPlayerOne = [];
  var arrOfUnmatchedCardsIdPlayerTwo = [];
  // var arrOfUnmatchedCardsId = [];

  if (victim === 'playerOne') {

    flashEffect('playerOne', 'shuffle');

    for (var i=1; i<26; i++) { //get array of IDs of unmatched cards
      if (  (!$('#'+i).hasClass('matched')) && (!$('#'+i).hasClass('cursor1'))    ) {
        arrOfUnmatchedCardsIdPlayerOne.push(i);
      }
    }
    arrOfUnmatchedCardsIdPlayerOne = shuffle(arrOfUnmatchedCardsIdPlayerOne); //using the Fisher-Yates shuffle function

    cardShuffle(arrOfUnmatchedCardsIdPlayerOne);
  }

  else if (victim === 'playerTwo') {
    flashEffect('playerTwo', 'shuffle');
    for (var j=26; j<51; j++) { //get array of IDs of unmatched cards
      if (  (!$('#'+j).hasClass('matched2')) && (!$('#'+j).hasClass('cursor2'))    ) {
        arrOfUnmatchedCardsIdPlayerTwo.push(j);
      }
    }
    arrOfUnmatchedCardsIdPlayerTwo = shuffle(arrOfUnmatchedCardsIdPlayerTwo); //using the Fisher-Yates shuffle function

    cardShuffle(arrOfUnmatchedCardsIdPlayerTwo);
  }

}

// var arrOfCardsToBeShuffled = [];

var cardShuffle = function(arrOfUnmatchedCardsId) {

  var arrOfCardsToBeShuffled = [];

  var firstCardId,
      secondCardId,
      firstCard,
      secondCard,
      beforeSecondCard,
      afterSecondCard,
      distanceTop,
      distanceLeft,
      animating = false;

  //
  // if (arrOfUnmatchedCardsId.length >= 4) {
  //   arrOfCardsToBeShuffled = arrOfUnmatchedCardsId.slice(0,4);
  // }
  // else if (arrOfUnmatchedCardsId.length < 4) {
  //   arrOfCardsToBeShuffled = arrOfUnmatchedCardsId;
  // }

  // while (arrOfCardsToBeShuffled.length) {

  if (arrOfUnmatchedCardsId.length >= 2) {
     arrOfCardsToBeShuffled = arrOfUnmatchedCardsId.slice(0,2);
  }


// start of odd-number arr scenario ------------------------------------------

    // if (arrOfCardsToBeShuffled.length === 3) { //if it's 5 cards, it will go thru the 'else if' condition first, splicing away 2 cards, leaving behind 3 cards for this to occur next.
      //this is to take care of the situation where the arr is odd number
      //the arr is most probably odd number (it excludes the cursor's card)
      //but it could be even number (if the bomb has been flipped)
      //so now the plan is to shuffle first two cards (same as non-odd scenario) but this time we splice away only one card, instead of two, in order to have two cards left (even)
      firstCardId = arrOfCardsToBeShuffled[0];
      secondCardId = arrOfCardsToBeShuffled[1];

      firstCard = $('#'+firstCardId),
      secondCard = $('#'+secondCardId),
      beforeSecondCard = $('#'+(secondCardId-1)),
      afterSecondCard = $('#'+(secondCardId+1)),
      distanceTop = firstCard.offset().top - secondCard.offset().top,
      distanceLeft = firstCard.offset().left - secondCard.offset().left,



      // if (!firstCard.hasClass('matched') && (!firstCard.hasClass('red'))) { //actually this condition is not necessary already...
        animating = true;
        $.when(firstCard.animate({
          top: -distanceTop,
          left: -distanceLeft
        }, 1000),
        secondCard.animate({
          top:distanceTop,
          left:distanceLeft
        }, 1000)).done(function() {
          secondCard.css('top', '0px');
          secondCard.css('left', '0px');
          firstCard.css('top', '0px');
          firstCard.css('left', '0px');
          secondCard.insertBefore(firstCard);
          if (secondCardId%5===1) {
            firstCard.insertBefore(afterSecondCard);
          }
          else {
            firstCard.insertAfter(beforeSecondCard); //this alone will not work for 1 move to 6, 1 will move to after 5 instead (row 1 still), so to mitigate this we have the line above
          };
          secondCard.attr('id',firstCardId);
          firstCard.attr('id',secondCardId);
          firstCard = $('#'+firstCardId); //this n nxt step ensure repeatability of swopping
          secondCard = $('#'+secondCardId);

          // firstCard.prependTo(".row1");
          // console.log(secondCard.attr('id'));
          // secondCard.attr('id=2')
          animating = false;
        });
}

// hahaha();










// need to think of how to differentiate between playerOne's and playerTwo's bonuses...
