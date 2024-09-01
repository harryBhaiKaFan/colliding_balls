
import { Ball,Vector } from "./Ball.js";

let screen = document.querySelector("#screen");
let ctx = screen.getContext("2d");


function randInt(min,max)
{
    return (min + Math.floor(Math.random()*(max - min)));
}

const App = {
    balls: [],
    init: function(){
        screen.height = window.innerHeight;
        screen.width = window.innerWidth;
        for (let i = 0; i < 10; i++)
        {
            this.balls.push(new Ball({
                pos:Vector.create(randInt(25,window.innerWidth-50),randInt(25,window.innerHeight-50)),
                vel:Vector.create(randInt(0,10),randInt(0,10)),
                rad:25,
                color:`rgb(${randInt(0,255)},${randInt(0,255)},${randInt(0,255)})`
            }));
        }

        for (let i = 0; i < this.balls.length; i++)
        {
            for (let j = 0; j < this.balls.length; j++)
            {
                this.balls[i].addCollisionObject(this.balls[j]);
            }
        }

        // Starting animation ...
        requestAnimationFrame(this.render.bind(this));
    },

    render: function(){

        ctx.clearRect(0,0,screen.width,screen.height)

        this.balls.forEach(ball => {
            ball.render(ctx);
        });;
        requestAnimationFrame(this.render.bind(this));
    }
}


window.onload = App.init.bind(App);