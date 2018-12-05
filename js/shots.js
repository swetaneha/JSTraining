var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var on=true;
var bulletPressed=false;
var bullets=[];
var level=0;
var myReq;
// canvas.width = 720 ;
// canvas.height =  325;

canvas.width = window.innerWidth ;
canvas.height =  window.innerHeight;
var bulletx=canvas.width/2+46;
var bullety=canvas.height-80;
// var circleColors = ["#E54661", "#FFA644", "#998A2F", "#2C594F", "#002D40", "#0497FF", "grey"];
var img=new Image();
var monsterimg=new Image();
// img.onload=start;
img.src='../images/sp.png';
img.width=200;
img.height=200;
monsterimg.src='../images/monster.png';
var k=0;

// main object

var spacecruiser={
 allCircles : [],  //array containing all the monsters coordinated 
 score :0,  //score of the  game
 lives :3,  // number of lives in the game


// function to update the score of user.
 updateScore : function () {
    document.getElementById("score").innerHTML = "SCORE : " + this.score;
  },


//function to insert monsters in an array.
init:function () {
     k+=1;
     if(spacecruiser.allCircles.length <25 && (k%15==0))
     {
      var radius =52;
      var x = Math.random() * (2020 - radius * 2) + radius;
      var y = Math.random() * (7 - radius * 2) + radius;
      var dx =  (Math.random() - 0.5) * 13;
    //   console.log(dx);
      var dy = 1;
    //var fillColor = circleColors[Math.floor(Math.random() * circleColors.length)];
      if(radius>10){
        spacecruiser.allCircles.push(new Circle(x, y, dx+2, dy+2, radius));
      }
     }
  },

//function to listen the fire button action.
bulletKey: function (e){
    if(e.keyCode == 102) {
        bulletPressed = true;
    }
},


//function to insert bullets in an array. Three bullets will be shoted at one press. 
initBullet: function (){
    if(on){
    var x=bulletx;
    var y=bullety;
    bullets.push(new bullet(x,x,y,y-10));
    bullets.push(new bullet(x+10, x+10, y-25, y-15));
    bullets.push(new bullet(x-10, x-10, y-25, y-15));
    }
}

}


// Prototype for monsters
function Circle(x, y, dx, dy, radius) {
    
    this.radius = radius;
    this.x = x+(this.radius/2);
    this.dx = dx;
    this.y = y+(this.radius/2);
    this.dy = dy;
    this.minRadius = radius;
    //function to draw monsters.
    this.draw = function() {
        ctx.beginPath();
        if(level==0)
        {
            ctx.drawImage(monsterimg, this.x-(this.radius/2), this.y-(this.radius/2), this.radius, this.radius);
        }
        else if(level==2)
        {
            
        }
      };

      //function to check y-axis and and parallel screen end collisions. 
      this.xaxis =function(){
        if(this.x + this.dx < 10  || this.x + this.dx > canvas.width-10) {
            this.dx=-this.dx;

            }
    },
    
    //function to check x-axis and and parallel screen end collisions. 
    this.yaxis=function(){
        if(this.y + this.dy > canvas.height-10) {
            this.radius = 0;
               
            }
    },

      // collision with spaceship
      this.collisions= function(x,y){
        var a = x - bulletx;
        var b = y - (bullety+23);
        var c = Math.sqrt( a*a + b*b );
        if(c<((this.radius/2)+40)) {
            this.radius = 0;
            spacecruiser.lives-=1;
            if(spacecruiser.lives<0)
            {
                console.log(spacecruiser.score);
                document.getElementById("finalscore").innerHTML = "Your score is : " + spacecruiser.score;
                document.getElementById("gameOverMenu").style.display = "flex";
                
               
                spacecruiser.updateScore();
            }
        }
    };

    //update function for the game.
      this.update = function() {
        this.collisions(this.x,this.y);
        this.x += this.dx;
        this.y += this.dy;
        this.xaxis();
        this.yaxis();
        this.draw();
      };
  }

// Prototype for bullets

function bullet(x,x1,y,y1){
    this.x=x;
    this.x1=x1;
    this.y=y;
    this.y1=y1;    
    this.dx=5;
    this.dy=10;
    

    this.collision=function(){
        for(var i = 0; i < spacecruiser.allCircles.length; ++i) {
            if(Math.abs(spacecruiser.allCircles[i].x-this.x) < (spacecruiser.allCircles[i].radius/2) && Math.abs(spacecruiser.allCircles[i].y-this.y) < (spacecruiser.allCircles[i].radius/2))
            {
                spacecruiser.allCircles.splice(i, 1);
                this.y=this.y1;
                
                spacecruiser.score+=1;
                spacecruiser.updateScore();
            }
        }

    },

//function to draw the bullet
    this.shot=function (){
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x1,this.y1);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
    },
//function to shot the bullet
    this.draw=function (){
        this.y -= this.dy;
        this.y1 -=this.dy;
        this.shot();
        this.collision();
    }
}

// function bulletKey(e){
//     if(e.keyCode == 102) {
//         bulletPressed = true;
//     }
// }


// Prototype for spacecraft
function spacecraft(){
    var x=canvas.width/2+9;
    var y=canvas.height/2+375;
    var rightPressed=false;
    var leftPressed=false;
    
//left and right key handler 
    this.keyDownHandler =function(e) {
        // console.log("down");
       if(e.keyCode == 39) {
           rightPressed = true;
       }
       else if(e.keyCode == 37) {
           leftPressed = true;
       }
      
   },
   
   this.keyUpHandler = function (e) {
    //    console.log("Up");
       if(e.keyCode == 39) {
           rightPressed = false;
       }
       else if(e.keyCode == 37) {
           leftPressed = false;
       }
       
   },


   //function to move the bullet
   this.moveCraft= function(){
    if(rightPressed && x < canvas.width-78) {
        // console.log("rightmove");
        bulletx += 7;
        x+=7;
    }
    else if(leftPressed && x > 5 ) {
        bulletx -= 7;
        x-=7;
    }
    
},

//Prototype for scpacecraft
this.drawSpacecraft=function(){
    
    var z=canvas.width-40;
    if(on){
        this.moveCraft();
    }
    console.log(x);
    console.log(y);
    ctx.drawImage(img,bulletx-35,bullety,70,70);
    ctx.stroke();
    ctx.closePath();

    for(i=0;i<spacecruiser.lives;i++){
        ctx.drawImage(img,z,canvas.height-40,30,30);
        z=z-35;
    }

    ctx.beginPath();
    ctx.closePath();
    }

}


//main function to run the game
function start(){
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    spacecruiser.init();

    if(spacecruiser.lives<=0)
            {
                on=false;
                document.getElementById("finalscore").innerHTML = "Your score is : " + spacecruiser.score;
                document.getElementById("gameOverMenu").style.display = "flex";
               
            }

    for(var i = 0; i < bullets.length; ++i) {
        if(bullets[i].y==bullets[i].y1)
        {
            bullets.splice(i, 1);
        }
    }
   
    for(var i = 0; i < spacecruiser.allCircles.length; ++i) {
        if(spacecruiser.allCircles[i].radius==0)
        {
            spacecruiser.allCircles.splice(i, 1);
        }
    }
    for(var i = 0; i < spacecruiser.allCircles.length; ++i) {
        spacecruiser.allCircles[i].update();
    }
     craft.drawSpacecraft();
    if(bulletPressed==true)
    {
        spacecruiser.initBullet();
        bulletPressed=false;
    }
    for(var i = 0; i < bullets.length; ++i) {
        bullets[i].draw();
    }

    myReq=requestAnimationFrame(start);
    if(on===false)
    {
        cancelAnimationFrame(myReq);
    }
}

var craft=new spacecraft();
document.addEventListener("keypress", spacecruiser.bulletKey, false);
document.addEventListener("keydown",  craft.keyDownHandler, false);
document.addEventListener("keyup", craft.keyUpHandler, false);
document.getElementById("gameOverBtn").addEventListener("click", function() {
    location.reload();
  });

start();