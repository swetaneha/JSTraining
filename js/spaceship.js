var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;

var img=new Image();
img.onload=start;
img.src='../images/plane.jpg';
img.width=200;
img.height=200;
function start(){
  var cw,ch;
  cw=canvas.width=img.width;
  ch=canvas.height=img.height;
  ctx.drawImage(img,46,52);
  ctx.globalCompositeOperation='destination-in';
  ctx.beginPath();
  console.log("circular image");
  ctx.arc(cw/2,ch/2,48,0,Math.PI*2);
  ctx.closePath();
  ctx.fill();
}
