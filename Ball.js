
// Algorithm Stolen form: https://jeffreythompson.org/collision-detection/circle-circle.php#:~:text=First%2C%20calculate%20the%20distance%20between%20the%20two%20circle%E2%80%99s,%3C%3D%20c1r%2Bc2r%29%20%7B%20return%20true%3B%20%7D%20return%20false%3B
function circleInCircle(pos_a,pos_b,rad_a,rad_b=rad_a)
{
    let distX = pos_a.x - pos_b.x;
    let distY = pos_a.y - pos_b.y;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    if (distance <= rad_a + rad_b)
    {
        return true;
    }

    return false;
}

export const Vector = {
    create(x,y){
        return {x,y}
    },
    add(a,b)
    {
        return {
            x:a.x+b.x,
            y:a.y+b.y
        };
    }
}

export function Ball({pos,vel,rad,color})
{
    this.position = pos;
    this.velocity = vel;
    this.radius = rad;
    this.color = color;
    this.collisionObjects = [];
}

Ball.prototype.render = function(ctx) {

    this.position = Vector.add(this.position,this.velocity);

    if (this.position.x >= window.innerWidth - this.radius || this.position.x <= this.radius){
        this.velocity.x *= -1;
    }

    if (this.position.y >= window.innerHeight - this.radius || this.position.y <= this.radius){
        this.velocity.y *= -1;
    }

    this.collisionObjects.forEach((object)=>{
        let objPos = object.position;
        let objVel = object.velocity;

        // let thisVel = Object.create(this.velocity);

        if (circleInCircle(objPos,this.position,this.radius))
        {
            // this.velocity = Vector.add(this.velocity,objVel);
            // objVel = Vector.add(thisVel,objVel);
            
            // TODO: Fix above

            this.velocity.x *= -1;
            this.velocity.y *= -1;
            
            objVel.x *= -1;
            objVel.y *= -1;
        }

    })

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
}

Ball.prototype.addCollisionObject = function(object){
    this.collisionObjects.push(object);
}