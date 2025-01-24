// Author: Cynthia Zhu
// Date: 12/9/2024
// Description: implements the Enemy class, which also inherits from Blob

'use strict';

var minRadius = 4;
var maxRadius = window.innerWidth/8
var enemyDuration = 5000; 
class Enemy extends Blob{
    collided;  
    side;

    /** 
    * Constructor
    */
    constructor(){
        var randomColor=random.color();
        var randomRadius= random.intBetween(minRadius,maxRadius);
        super (randomColor,randomRadius);
        this.collided=false;
        this.side=null;
    }

    /** 
    * invoked when a collision happens and it records that the enemy has collided with the player and informs the player of the fact
    * 
    *
    */
    collide(){
        thePlayer.collide(this);
        this.collided=true;
        if (this.radius<=thePlayer.radius){  
            this.remove();
        }
    }

    /** 
    * updates the X and Y location of the center from the top/left CSS values
    *
    */
    updateLocation(){
        const top = parseInt(this.getDOM().css('top'),10);
        const left = parseInt(this.getDOM().css('left'),10);
        this.x = left + this.radius;
        this.y = top + this.radius;
    }

    /** 
    * checks for a collision
    *
    */
    maybeCollide(){
        this.updateLocation();
        console.log(this.x,this.y);
        if (!this.collided){
            if (this.intersects(thePlayer)){
                this.collide();
            }
        }
    }

    /** 
    * sets the initial X,Y coordinates of the enemy, based on the side it enters from
    *
    * @param {string} side - a string indicating which side of the screen the enemy is entering from
    */
    setSide(side){
        this.side=side;
        var randomX = random.intBetween(0, window.innerWidth);
        var randomY = random.intBetween(0, window.innerHeight);
        if (this.side==="top"){
            this.setX(randomX);
            this.setY(-this.radius);
        }
        if (this.side==="left"){
            this.setX(-this.radius);
            this.setY(randomY);
        }
        if (this.side==="bottom"){
            this.setX(randomX);
            this.setY(window.innerHeight+this.radius);
        }
        if (this.side==="right"){
            this.setX(window.innerWidth+this.radius);
            this.setY(randomY);
        }
    }

    /** 
    * starts the jQuery animation of this enemy moving across the board to its final X/Y value
    *
    */
    start(){
            let desX=this.x;
            let desY=this.y;
            if (this.side === 'top'){
                desY = window.innerHeight+this.radius;
            } else if (this.side === 'right'){
                desX = -this.radius; 
            } else if (this.side === 'bottom'){
                desY = -this.radius;
            } else if (this.side === 'left') {
                desX = window.innerWidth+this.radius;
            } 
            // jQuery Animation
            this.getDOM().animate(
                {left: desX-this.radius, top: desY-this.radius},
                {
                    duration: enemyDuration, // Duration of the animation
                    progress: () => this.maybeCollide(), // Function to check for collisions
                    complete: () => this.remove(), // Function to remove the element after animation
                }
            );
        }

    /** 
    * stops the animation and removes this enemy from the board
    *
    */
    remove(){
            this.getDOM().remove();
        }
    }
    
