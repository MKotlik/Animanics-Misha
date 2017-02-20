/*
    GLOBAL VARIABLES
 */

// Item Globals
var canvas = document.getElementById("TV");
var ctx = canvas.getContext("2d");
var dvdBtn = document.getElementById("DVDBtn");
var circleBtn = document.getElementById("circleBtn");
var stopBtn = document.getElementById("stopBtn");
var dvdImg = new Image();
dvdImg.src = "dvd_logo.png";
var requestId;

// Position Globals
// General
var canH = canvas.height;
var canW = canvas.width;
console.log("Canvas Size: " + canW + " by " + canH);
var centerX = canW / 2;
var centerY = canH / 2;
console.log("Canvas center: (" + centerX + "," + centerY + ")");
// Circle-related
var radius = canW / 50;
console.log("Cirle radius: " + radius + "px");
var circleDir = 1;
// DVD-related
var dvdWidth = 150;
var dvdHeight = 68;
var dvdX = Math.round(Math.random() * (canW - dvdWidth - 1));
var dvdY = Math.round(Math.random() * (canH - dvdHeight - 1));
// Subtracting 1 from canvas dimensions to protect from rounding-up issues.
console.log("DVD starting position: (" + dvdX + "," + dvdY + ")");
var dvdXDir = 1;
var dvdYDir = 1;

// Status Globals
var circleFirst = true;
var dvdFirst = true;

// Style Globals
var redColor = "#F8333C";
var redTransparent = "rgba(248, 51, 60, 0.125)";
var blueColor = "#2B9EB3";
var blueTransparent = "rgba(43, 158, 179, 0.125)";
var dvdColorSelector = 1;

/*
    ANIMATION FUNCTIONS
 */

var animateCircle = function(e) {
    console.log("Triggered!");
    window.cancelAnimationFrame(requestId);
    //clearCanvas();

    var drawCircle = function(e) {
        if (circleFirst) {
            ctx.fillStyle = redColor;
            circleFirst = false;
        }

        ctx.clearRect(0, 0, canW, canH);
        ctx.beginPath();
        ctx.moveTo(centerX + radius, centerY);
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();

        if (radius >= centerX) {
            circleDir = -1;
            ctx.fillStyle = blueColor;
        }
        if (radius <= 0) {
            circleDir = 1;
            ctx.fillStyle = redColor;
        }

        radius += circleDir;

        requestId = window.requestAnimationFrame(drawCircle);
    };

    drawCircle();
};

var animateDVD = function(e) {
    console.log("DVD Triggered!");
    window.cancelAnimationFrame(requestId);
    //clearCanvas();

    var drawDVD = function(e) {
        if (dvdFirst) {
            ctx.fillStyle = redTransparent;
            dvdFirst = false;
        } else {
            if (dvdColorSelector == 1) {
                ctx.fillStyle = redTransparent;
            } else {
                ctx.fillStyle = blueTransparent;
            }
        }

        ctx.clearRect(0, 0, canW, canH);
        ctx.beginPath();
        ctx.moveTo(dvdX, dvdY);
        ctx.drawImage(dvdImg, dvdX, dvdY);
        ctx.fillRect(dvdX, dvdY, dvdWidth, dvdHeight);
        ctx.fill();

        if (dvdX + dvdWidth >= canW) {
            dvdXDir = -1;
            dvdColorSelector = dvdColorSelector * -1;
        }
        if (dvdX <= 0) {
            dvdXDir = 1;
            dvdColorSelector = dvdColorSelector * -1;
        }
        if (dvdY + dvdHeight >= canH) {
            dvdYDir = -1;
            dvdColorSelector = dvdColorSelector * -1;
        }
        if (dvdY <= 0) {
            dvdYDir = 1;
            dvdColorSelector = dvdColorSelector * -1;
        }

        dvdX += 1 * dvdXDir;
        dvdY += 1 * dvdYDir;

        requestId = window.requestAnimationFrame(drawDVD);
    };

    drawDVD();
};

/*
    CONTROL FUNCTIONS
 */

var clearCanvas = function(e) {
    ctx.clearRect(0, 0, canW, canH);
};

var stopAnimation = function(e) {
    window.cancelAnimationFrame(requestId);
};

/*
    BUTTON EVENT LISTENERS
 */

circleBtn.addEventListener("click", animateCircle);
dvdBtn.addEventListener("click", animateDVD);
stopBtn.addEventListener("click", stopAnimation);
