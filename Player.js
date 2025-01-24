// Author: Cynthia Zhu
// Date: 12/9/2024
// Description: implements the Player class, which inherits from Blob

'use strict';

var winningRadius = window.innerHeight/4; // bigger than this wins
var losingRadius = 4;                     // smaller than this loses
var growRadius = 10;                      // grow by this many pixels
var shrinkRadius = 3; 
class Player extends Blob{
    /** 
    * Constructor
    *
    * @param {string} color - a string of the player's color
    * @param {number} radius - a number of the player's radius
    */
    constructor(color,radius){
        super(color,radius);
    }

    /** 
    * takes an x,y location and moves the DIV so that the center is in the new location
    *
    * @param {number} x - a number of the x coordinate of the destination
    * @param {number} y - a number of the y coordinate of the destination
    */
    move(x,y){
        this.setX(x);
        this.setY(y);
    }

    /** 
    * increases the radius by growRadius pixels
    *
    */
    grow(){
        this.setRadius(this.radius+=growRadius);
        if (this.radius>winningRadius){
            stopGame('You win!');
        }
    }

    /** 
    * decreases the radius by shrinkRadius pixels
    *
    */
    shrink(){
        this.setRadius(this.radius-=shrinkRadius);
        if (this.radius<losingRadius){
            stopGame("You lose");
        }
    }

    /** 
    * invoked when a collision happens
    * 
    * @param {Object} other - an Enemy object
    *
    */
    collide(other){
        if (this.intersects(other)){
            if (this.getRadius()>=other.getRadius()){
                this.grow();
            }
            else{
                this.shrink();
            }
        }
    }
}

var thePlayer=new Player('blue',15);
thePlayer.setX(window.innerWidth/2);
thePlayer.setY(window.innerHeight/2);
