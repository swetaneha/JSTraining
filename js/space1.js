var canvas = document.getElementById("myCanvas");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ctxcraft = canvas.getContext("2d");


var spacecruiser={

 x : 10,
 y : 10,
 dx : 4,
 dy : -4,
 min:0, 
 max:9,
 color1:0,
 color2:0,
 color3:0, 
 i:(this.x-4)/2, 
 paddleHeight : 10,
 paddleWidth : 75,
 paddleX : ((this.canvas.width)-75)/2,
 paddleY:702,
 rightPressed : false,
 leftPressed : false,
 upPressed : false,
 downPressed :false,
 score :0,
 updateScore : function () {
    document.getElementById("score").innerHTML = "SCORE : " + this.score;
  },

 keyDownHandler :function(e) {
     console.log("down");
    if(e.keyCode == 39) {
        spacecruiser.rightPressed = true;
    }
    else if(e.keyCode == 37) {
        spacecruiser.leftPressed = true;
    }
    else if(e.keyCode == 38) {
        spacecruiser.upPressed = true;
    }
    else if(e.keyCode == 40) {
        spacecruiser.downPressed = true;
    }
},

keyUpHandler : function (e) {
    console.log("Up");
    if(e.keyCode == 39) {
        spacecruiser.rightPressed = false;
    }
    else if(e.keyCode == 37) {
        spacecruiser.leftPressed = false;
    }
    else if(e.keyCode == 38) {
        spacecruiser.upPressed = false;
    }
    else if(e.keyCode == 40) {
        spacecruiser.downPressed = false;
    }
},

drawPaddle : function() {
    ctxcraft.beginPath();
    console.log("Draw Paddle");
    ctxcraft.rect(spacecruiser.paddleX,spacecruiser.paddleY , spacecruiser.paddleWidth, spacecruiser.paddleHeight);
    ctxcraft.fillStyle = "#0095DD";
    ctxcraft.fill();
    ctxcraft.closePath();
},

 randomNum : function(min, max) {
     console.log("Draw Paddle");
    return Math.floor(Math.random() * (max - min + 1)) + min;
},

randomColorGeneration:function(){
    spacecruiser.color1=this.randomNum(0,256);
    spacecruiser.color2=this.randomNum(0,256);
    spacecruiser.color3=this.randomNum(0,256);
},

xaxis :function(){

    if(spacecruiser.x + spacecruiser.dx < 10  || spacecruiser.x + spacecruiser.dx > canvas.width-10) {
        spacecruiser.dx = -spacecruiser.dx;
        spacecruiser.randomColorGeneration();
        spacecruiser.i=spacecruiser.i+1;
        
        }
},

yaxis:function(){
    if(spacecruiser.y + spacecruiser.dy < 10 || spacecruiser.y + spacecruiser.dy > canvas.height-10) {
            spacecruiser.dy = -spacecruiser.dy;
            spacecruiser.randomColorGeneration();
            spacecruiser.i=spacecruiser.i+1;
        }
},

collision: function(){
    if(spacecruiser.x+ 10 > spacecruiser.paddleX && spacecruiser.x < (spacecruiser.paddleX + spacecruiser.paddleWidth) && spacecruiser.y+10 > spacecruiser.paddleY && spacecruiser.y < (spacecruiser.paddleY + spacecruiser.paddleHeight)) {
        spacecruiser.dy = -spacecruiser.dy;
        spacecruiser.randomColorGeneration();
        spacecruiser.score+=1;
        spacecruiser.updateScore();
        
        }
},

movePaddle: function(){
    console.log("movePaddle");
    if(spacecruiser.rightPressed && spacecruiser.paddleX < canvas.width-spacecruiser.paddleWidth) {
        spacecruiser.paddleX += 7;
    }
    else if(spacecruiser.leftPressed && spacecruiser.paddleX > 0) {
        spacecruiser.paddleX -= 7;
    }
    else if(spacecruiser.upPressed && spacecruiser.paddleY > 0) {
        spacecruiser.paddleY -= 7;
    }
    else if(spacecruiser.downPressed && spacecruiser.paddleY < canvas.height-spacecruiser.paddleHeight) {
        spacecruiser.paddleY += 7;
    }
},

drawBall : function() { 
    console.log("drawBall");
    ctx.beginPath();
    ctx.arc(spacecruiser.x, spacecruiser.y, 10, 0, Math.PI*2,true);
    spacecruiser.xaxis();
    spacecruiser.yaxis();
    spacecruiser.collision();
    spacecruiser.movePaddle();
    ctx.fillStyle="rgb("+spacecruiser.color1+","+spacecruiser.color2+","+ spacecruiser.color3+")";
    ctx.fill();
    ctx.closePath();
},


draw : function  () {
    console.log("draw");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spacecruiser.drawPaddle();
    spacecruiser.drawBall();
    spacecruiser.x += spacecruiser.dx;
    spacecruiser.y += spacecruiser.dy;
    requestAnimationFrame(spacecruiser.draw);
}

}

// balls 


function Circle(x, y, dx, dy, radius, fillColor) {
    this.x = x;
    this.dx = dx;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
  
    this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius ,0, (Math.PI) * 2, true);
      c.fillStyle = fillColor;
      c.fill();
    };
  
    this.update = function() {
      if(this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
        this.dx = -(this.dx);
      }
      if(this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
        this.dy = -(this.dy);
      }
      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    };
  
  }


document.addEventListener("keydown", spacecruiser.keyDownHandler, false);
document.addEventListener("keyup", spacecruiser.keyUpHandler, false);


function can(){
    this.canvas.width = 720;
    this.canvas.height = 720;
    spacecruiser.draw();
}
can();