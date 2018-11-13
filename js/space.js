var canvas = document.getElementById("myCanvas");

// var ctx = canvas.getContext("2d");
var ctxcraft = canvas.getContext("2d");


function paddle(){

 this.paddleHeight = 10;
 this.paddleWidth = 75;
 this.paddleX = ((canvas.width)-75)/2;
 this.paddleY=702;
 this.rightPressed = false;
 this.leftPressed = false;
 this.upPressed = false;
 this.downPressed =false;

 this.keyDownHandler =function(e) {
    console.log("down");
   if(e.keyCode == 39) {
       this.rightPressed = true;
      
   }
   else if(e.keyCode == 37) {
       this.leftPressed = true;
       console.log(this.leftPressed);
   }
   else if(e.keyCode == 38) {
       this.upPressed = true;
       console.log(this.upPressed);
   }
   else if(e.keyCode == 40) {
       this.downPressed = true;
       console.log(this.downPressed);
   }
   console.log(this.rightPressed);
},

this.keyUpHandler = function (e) {
   console.log("Up");
   if(e.keyCode == 39) {
       this.rightPressed = false;
   }
   else if(e.keyCode == 37) {
       this.leftPressed = false;
   }
   else if(e.keyCode == 38) {
       this.upPressed = false;
   }
   else if(e.keyCode == 40) {
       this.downPressed = false;
   }
},

this.drawPaddle = function() {
     console.log("drawPaddle");
   ctxcraft.beginPath();
    console.log(this.paddleX);
    console.log(this.paddleY);
   ctxcraft.rect(100,10, 10, 10);
   ctxcraft.fillStyle = "#0095DD";
   ctxcraft.fill();
   ctxcraft.closePath();
}

this.movePaddle= function(){
    if(this.rightPressed && this.paddleX < canvas.width-this.paddleWidth) {
         console.log("changes");
        this.paddleX += 7;
        console.log(this.paddleX);
    }
    else if(this.leftPressed && this.paddleX > 0) {
         console.log("changesleft");
        this.paddleX -= 7;
    }
    else if(this.upPressed && this.paddleY > 0) {
         console.log("changesup");
        this.paddleY -= 7;
    }
    else if(this.downPressed && this.paddleY < canvas.height-this.paddleHeight) {
         console.log("changesdown");
        this.paddleY += 7;
    }
    // console.log(this.paddleX);
    // console.log(this.paddleY);
}
this.updatePaddle= function(){
    // console.log("updatePaddle");
    this.drawPaddle();
    this.movePaddle();
}

}

function Circle(x, y, dx, dy, radius, fillColor){

 this.radius=radius;
 this.x = x;
 this.dx = dx;
 this.y = y;
 this.dy = dy;
 this.min=0; 
 this.max=9;
 this.color1=0;
 this.color2=0;
 this.color3=0; 
 this.i=(this.x-4)/2; 
//  this.paddleHeight = 10;
//  this.paddleWidth = 75;
//  this.paddleX = ((this.canvas.width)-75)/2;
//  this.paddleY=702;
//  this.rightPressed = false;
//  this.leftPressed = false;
//  this.upPressed = false;
//  this.downPressed =false;
 this.score =0;
 this.updateScore = function () {
    document.getElementById("score").innerHTML = "SCORE : " + this.score;
  },

//   this.keyDownHandler =function(e) {
//      console.log("down");
//     if(e.keyCode == 39) {
//         this.rightPressed = true;
//     }
//     else if(e.keyCode == 37) {
//         this.leftPressed = true;
//     }
//     else if(e.keyCode == 38) {
//         this.upPressed = true;
//     }
//     else if(e.keyCode == 40) {
//         this.downPressed = true;
//     }
// },

// this.keyUpHandler = function (e) {
//     console.log("Up");
//     if(e.keyCode == 39) {
//         this.rightPressed = false;
//     }
//     else if(e.keyCode == 37) {
//         this.leftPressed = false;
//     }
//     else if(e.keyCode == 38) {
//         this.upPressed = false;
//     }
//     else if(e.keyCode == 40) {
//         this.downPressed = false;
//     }
// },

// this.drawPaddle = function() {
//     ctxcraft.beginPath();
    
//     ctxcraft.rect(this.paddleX,this.paddleY , this.paddleWidth, this. paddleHeight);
//     ctxcraft.fillStyle = "#0095DD";
//     ctxcraft.fill();
//     ctxcraft.closePath();
// },

this.randomNum = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
},

this.randomColorGeneration=function(){
    spacecruiser.color1=this.randomNum(0,256);
    spacecruiser.color2=this.randomNum(0,256);
    spacecruiser.color3=this.randomNum(0,256);
},

this.xaxis =function(){
    if(spacecruiser.x + spacecruiser.dx < 10  || spacecruiser.x + spacecruiser.dx > canvas.width-10) {
        spacecruiser.dx = -spacecruiser.dx;
        spacecruiser.randomColorGeneration();
        spacecruiser.i=spacecruiser.i+1;
        
        }
},

this.yaxis=function(){
    if(spacecruiser.y + spacecruiser.dy < 10 || spacecruiser.y + spacecruiser.dy > canvas.height-10) {
            spacecruiser.dy = -spacecruiser.dy;
            spacecruiser.randomColorGeneration();
            spacecruiser.i=spacecruiser.i+1;
        }
},

this.collision= function(){
    if(spacecruiser.x+ 10 > spacecruiser.paddleX && spacecruiser.x < (spacecruiser.paddleX + spacecruiser.paddleWidth) && spacecruiser.y+10 > spacecruiser.paddleY && spacecruiser.y < (spacecruiser.paddleY + spacecruiser.paddleHeight)) {
        spacecruiser.dy = -spacecruiser.dy;
        spacecruiser.randomColorGeneration();
        spacecruiser.score+=1;
        spacecruiser.updateScore();
        
        }
},

// this.movePaddle= function(){
    
//     if(spacecruiser.rightPressed && spacecruiser.paddleX < canvas.width-spacecruiser.paddleWidth) {
//         spacecruiser.paddleX += 7;
//     }
//     else if(spacecruiser.leftPressed && spacecruiser.paddleX > 0) {
//         spacecruiser.paddleX -= 7;
//     }
//     else if(spacecruiser.upPressed && spacecruiser.paddleY > 0) {
//         spacecruiser.paddleY -= 7;
//     }
//     else if(spacecruiser.downPressed && spacecruiser.paddleY < canvas.height-spacecruiser.paddleHeight) {
//         spacecruiser.paddleY += 7;
//     }
// },

this.drawBall = function() { 
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


this.draw = function  () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spacecruiser.drawPaddle();
    spacecruiser.drawBall();
    spacecruiser.x += spacecruiser.dx;
    spacecruiser.y += spacecruiser.dy;
    // requestAnimationFrame(spacecruiser.draw);
},

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

this.init = function () {
    for(var i = 0; i < 1; ++i) {
      var radius = Math.floor(Math.random() * 13) + 2;
      var x = Math.random() * (2020 - radius * 2) + radius;
      var y = Math.random() * (7 - radius * 2) + radius;
      var dx =  (Math.random() - 0.5) * 3;
      var dy = 3;
      var fillColor = circleColors[Math.floor(Math.random() * circleColors.length)];
      allCircles.push(new Circle(x, y, dx, dy, radius, fillColor));
    }
  }
}

var spacecruiser={
    allCircles:[],
    paddle:new paddle(),
}

document.addEventListener("keydown",  spacecruiser.paddle.keyDownHandler, false);
document.addEventListener("keyup", spacecruiser.paddle.keyUpHandler, false);


// function can(){
//     this.canvas.width = 720;
//     this.canvas.height = 720;
//     // spacecruiser.draw();
//     spacecruiser.init();
// }
// can();

function animateCanvas() {
    this.canvas.width = 720 ;
    this.canvas.height =720;
    // //spacecruiser.draw();
    // spacecruiser.init();
    spacecruiser.paddle.updatePaddle();
     requestAnimationFrame(animateCanvas);
     this.ctxcraft.clearRect(0,0,window.innerWidth, window.innerHeight);
    // for(var i = 0; i < spacecruiser.allCircles.length; ++i) {
  
    //     spacecruiser.allCircles[i].draw();
  
    // }
    // spacecruiser.paddle.drawPaddle();
  }
  function start(){
    // init();
    animateCanvas();
  }
  start()