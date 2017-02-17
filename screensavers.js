/* Item Globals */
var canvas = document.getElementById("TV");
var ctx = canvas.getContext("2d");
var dvdBtn = document.getElementById("DVDBtn");
var circleBtn = document.getElementById("circleBtn");
var stopBtn = document.getElementById("stopBtn");
var requestId;

/* Position Globals */
var radius = 10;
var circleDir = 1;
var dvdX = Math.random() * 500;
var dvdY = Math.random() * 500;

/* Style Globals */
var redColor = "#F8333C";
var blueColor = "#2B9EB3";

var animateCircle = function(e) {
  console.log("Triggered!")
  window.cancelAnimationFrame(requestId);
  /*clearCanvas();*/
  ctx.fillStyle = redColor;

  var drawCircle = function(e) {
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.moveTo(250 + radius, 250);
    ctx.arc(250, 250, radius, 0, 2 * Math.PI);
    ctx.fill();

    if (radius >= 250) {
      circleDir = -1;
      ctx.fillStyle = blueColor;
    };

    if (radius <= 0) {
      circleDir = 1;
      ctx.fillStyle = redColor;
    };

    radius += circleDir;

    requestId = window.requestAnimationFrame(drawCircle);
  }

  drawCircle();
};

var clearCanvas = function(e) {
  ctx.clearRect(0, 0, 500, 500);
}

var stopAnimation = function(e) {
  window.cancelAnimationFrame(requestId);
}

circleBtn.addEventListener("click", animateCircle);
stopBtn.addEventListener("click", stopAnimation);
