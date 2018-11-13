var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ctxcraft = canvas.getContext("2d");
var circleColors = ["#E54661", "#FFA644", "#998A2F", "#2C594F", "#002D40", "#0497FF", "grey"];

var spacecruiser={
 x : 10,
 y : 10,
 dx : 4,
 dy : -4,
 allCircles : [],
 min:0, 
 max:9,
 color1:0,
 color2:0,
 color3:0, 
 i:(this.x-4)/2, 
 paddleHeight : 10,
 paddleWidth : 150,
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
    ctxcraft.rect(spacecruiser.paddleX,spacecruiser.paddleY , spacecruiser.paddleWidth, spacecruiser.paddleHeight);
    ctxcraft.fillStyle = "#0095DD";
    ctxcraft.fill();
    ctxcraft.closePath();
},

 randomNum : function(min, max) {
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

// collision: function(){
//     if(spacecruiser.x+ 10 > spacecruiser.paddleX && spacecruiser.x < (spacecruiser.paddleX + spacecruiser.paddleWidth) && spacecruiser.y+10 > spacecruiser.paddleY && spacecruiser.y < (spacecruiser.paddleY + spacecruiser.paddleHeight)) {
//         spacecruiser.dy = -spacecruiser.dy;
//         spacecruiser.randomColorGeneration();
//         spacecruiser.score+=1;
//         spacecruiser.updateScore();
        
//         }
// },

// collisions: function(x,y){
//     if(x+ 10 > spacecruiser.paddleX && x < (spacecruiser.paddleX + spacecruiser.paddleWidth) && y+10 > spacecruiser.paddleY && y < (spacecruiser.paddleY + spacecruiser.paddleHeight)) {
//         spacecruiser.dy = -spacecruiser.dy;
//         spacecruiser.randomColorGeneration();
//         spacecruiser.score+=1;
//         spacecruiser.updateScore();
//         }
// },

movePaddle: function(){
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

init:function () {
      var radius = Math.floor(Math.random() * 13) + 2;
      var x = Math.random() * (2020 - radius * 2) + radius;
      var y = Math.random() * (7 - radius * 2) + radius;
      var dx =  (Math.random() - 0.5) * 3;
      var dy = 3;
      var fillColor = circleColors[Math.floor(Math.random() * circleColors.length)];
      spacecruiser.allCircles.push(new Circle(x, y, dx, dy, radius, fillColor));
  },

draw : function  () {
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius ,0, (Math.PI) * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
      };

      this.xaxis =function(){
        if(this.x + this.dx < 10  || this.x + this.dx > canvas.width-10) {
            this.radius = 0;

            }
    },
    
    this.yaxis=function(){
        if(this.y + this.dy > canvas.height-10) {
            this.radius = 0;
               
            }
    },

      this.collisions= function(x,y){
        if(x+ 10 > spacecruiser.paddleX && x < (spacecruiser.paddleX + spacecruiser.paddleWidth) && y+10 > spacecruiser.paddleY && y < (spacecruiser.paddleY + spacecruiser.paddleHeight)) {
            this.radius = 0;
            spacecruiser.score+=1;
            console.log("collision");
            spacecruiser.updateScore();
            }
    };
    
      this.update = function() {
        this.collisions(this.x,this.y);
        this.x += this.dx;
        this.y += this.dy;
        this.xaxis();
        this.yaxis();
        this.draw();
      };
  }


document.addEventListener("keydown", spacecruiser.keyDownHandler, false);
document.addEventListener("keyup", spacecruiser.keyUpHandler, false);

function animateCanvas() {
    spacecruiser.init();
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    spacecruiser.drawPaddle();
    spacecruiser.movePaddle();
    for(var i = 0; i < spacecruiser.allCircles.length; ++i) {
        if(spacecruiser.allCircles[i].radius==0)
        {
            spacecruiser.allCircles.splice(i, 1);
        //  spacecruiser.allCircles[i];
            console.log("deleted");
            
        }
    }
    for(var i = 0; i < spacecruiser.allCircles.length; ++i) {
        
        spacecruiser.allCircles[i].update();
    }
  
  }
  function start(){
    // init();
    this.canvas.width = 720;
    this.canvas.height = 720;
    animateCanvas();
  }
  start()
// function can(){
//     this.canvas.width = 720;
//     this.canvas.height = 720;
//     spacecruiser.draw();
// }
// can();