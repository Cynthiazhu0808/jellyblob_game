// Author: Cynthia Zhu
// Date: 12/9/2024
// Description: attaches event handlers, puts all the pieces together, and implements the game

'use strict';

var delay_in_milliseconds=1000;
var intervalID=null;

/** 
* launch a single enemy
*/
function launchEnemy(){  
    var newEnemy=new Enemy();
    let randomSide=random.arrayElt(['top','right','left','bottom']); //randomly choose a side to enter from
    newEnemy.setSide(randomSide);
    newEnemy.start();
}

/** 
* start the game
*/
function startGame(){
    $("#intro").remove();
    intervalID = setInterval(function () {launchEnemy();}, delay_in_milliseconds);
    $(document).on('mousemove', function (evt) {thePlayer.move(evt.clientX,evt.clientY);});
}
$("#start").on("click",startGame);

/** 
* stops the game
*/
function stopGame(result){
    clearInterval(intervalID);
    $("#winOrLose").text(result);
    $('.circle').stop();
}
