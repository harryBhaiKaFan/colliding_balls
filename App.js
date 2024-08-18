
let screen = null;
let ctx = null;


function randInt(min,max)
{
    return (min + Math.floor(Math.random()*(max - min)));
}

function Ball(rad,color){
    this.x = randInt(0,window.innerWidth - rad);
    this.y = randInt(-200,-100);
    this.rad = rad;
    this.color = color;
}

Ball.prototype.fallSpeed = 9.8;

Ball.prototype.behaveCollided = () => {

}

Ball.prototype.isCollided = () => {

}

Ball.prototype.fall = () => {

}

Ball.prototype.render = (ctx,delta) => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x,this.y,this.rad,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
}

const App = {
    balls: [],
    init: function(){
        screen = document.querySelector("#screen");
        ctx = screen.getContext("2d");

        // Starting animation ...
        requestAnimationFrame(this.render.bind(this));
    },

    render: function(){
        requestAnimationFrame(this.render.bind(this));
    }
}


window.onload = App.init.bind(App);