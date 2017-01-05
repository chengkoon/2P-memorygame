var animating = false;

$('#container').on('click', '.move', function () {

    var clickedDiv = $(this).closest('div'),
        prevDiv = $("#container > :first-child"),
        distance = clickedDiv.offset().left - prevDiv.offset().left;








    if (!clickedDiv.is(":first-child")) {
        animating = true;
        $.when(clickedDiv.animate({
           left: -distance
        }, 2000),
        prevDiv.animate({
            left: distance
        }, 2000)).done(function () {
            prevDiv.css('left', '0px');
            clickedDiv.css('left', '0px');
            prevDiv.insertBefore(clickedDiv);
            clickedDiv.prependTo("#container");
            animating = false;
        });
    }
});
