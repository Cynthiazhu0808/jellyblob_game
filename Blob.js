// Author: Cynthia Zhu
// Date: 12/9/2024
// Description: implements the Blob class

'use strict';

/** 
    * check whether the value is a number
    *
    * @param {Object} val - an object to be checked
    * @return {number} val - the val is val is a number
    */
function isNum(val) {
    if( typeof val === 'number' ) {
        return val;
    } else {
        throw new Error('value is not a number');
    }
}


class Blob{
    color;
    radius;
    x;
    y;
    element;

    /** 
    * Constructor
    *
    * @param {string} color - a string of the Blob object's color
    * @param {number} radius - a number of the Blob object's radius
    */
    constructor(color,radius){
        this.setDom();
        this.addToGame("body");
        this.setColor(color);
        this.setRadius(radius);
        this.setX(0);
        this.setY(0);
    }

    /** 
    * adds the blob to some container
    *
    * @param {string} destination - a string of the container to add to
    */
    addToGame(destination){
        $(destination).append(this.element);
    }

    /** 
    * creates a DOM element (the div described above) and stores it in an instance variable
    *
    */
    setDom(){
        this.element=$('<div>').addClass('circle');
    }

    /** 
    * sets the color instance variable and also needs to update the DOM element's background-color property
    *
    * @param {string} color - a string of the Blob object's color
    */
    setColor(color){
        this.color=color;
        this.element.css("background-color",color);
    }

    /** 
    * sets the appropriate instance variable(s) and also needs to update the DOM element's width, height, left and top properties
    *
    * @param {number} radius- a number of the Blob object's radius
    */
    setRadius(radius) {
        this.radius = radius;
        this.element.css("width", radius * 2 + "px");
        this.element.css("height", radius * 2 + "px");
        this.element.css("left", (this.x - this.radius) + "px");
        this.element.css("top", (this.y - this.radius) + "px");
    }

    /** 
    * returns the current color
    * 
    * @return the color of the Blob object
    */
    getColor(){
        return this.color;
    }

    /** 
    * returns the DOM element stored in the instance variable
    * 
    * @return the DOM element
    */
    getDOM(){
        return this.element;
    }

    /** 
    * returns the diameter value
    * 
    * @return the diameter value
    */
    getDiameter(){
        return this.radius*2;
    }

    /** 
    * returns the radius value
    * 
    * @return the radius value
    */
    getRadius(){
        return this.radius;
    }

    /** 
    * returns the x value
    * 
    * @return the x value
    */
    getX(){
        return this.x;
    }

    /** 
    * returns the y value
    * 
    * @return the y value
    */
    getY(){
        return this.y;
    }

    /** 
    * change the x coordinate
    *
    * @param {number} x- a number of the Blob object's x coordinate
    */
    setX(x) {
        this.x = x;
        this.element.css("left", (this.x - this.radius) + "px");
    }

    /** 
    * change the y coordinate
    *
    * @param {number} y- a number of the Blob object's y coordinate
    */
    setY(y) {
        this.y = y;
        this.element.css("top", (this.y - this.radius) + "px");
    }

    /** 
    * return a string letting you know whether you got the basic invariants right
    * 
    * @return a string of whether you got the basic invariants right
    */
    location() {
        let x = this.getX();
        let y = this.getY();
        let left = parseInt(this.getDOM().css('left'),10);
        let top = parseInt(this.getDOM().css('top'),10);
        let r = this.getRadius();
        let xok = (left+r==x) ? "X OK" : "X WRONG";
        let yok = (top+r==y) ? "Y OK" : "Y WRONG";
        return `radius ${r} center (${x},${y}) w/ DOM elt (${left},${top}): ${xok}, ${yok}`;
    }

    /** 
    * checks whether the Blob object intersects with another Blob object
    * 
    * @param {Object} other- another Blob object
    * @return a boolean of whether intersects
    */
    intersects (other) {
        // six uses of the 'isNum' function to make sure all values are defined
        const dx = isNum(this.getX()) - isNum(other.getX());
        const dy = isNum(this.getY()) - isNum(other.getY());
        const r1 = isNum(this.getRadius());
        const r2 = isNum(other.getRadius());

        // finally, some real computation
        const distance_squared = (dx * dx + dy * dy);

        const rsum = r1+r2;
        const isCloser = (distance_squared <= rsum*rsum);
        return isCloser;
    }
}
