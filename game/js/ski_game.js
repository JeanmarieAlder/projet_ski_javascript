/*eslint-env browser*/

//Load canvas and context
var cvas = document.getElementById("canvas"); //get reference to canvas
var ctx = cvas.getContext("2d"); //get  context of the page

//Text configuration
ctx.font = "15px Verdana";

//load images (11 total)

//Variables creation
var bg = new Image();
var bgReady = false;
var bgStart = new Image();
var bgStartReady = false;
var skierFront = new Image();
var skierFrontReady = false;
var skierLeft = new Image();
var skierLeftReady = false;
var skierRight = new Image();
var skierRightReady = false;
var bear = new Image();
var bearReady = false;
var mammoth = new Image();
var mammothReady = false;
var bunny = new Image();
var bunnyReady = false;
var flagsBlue = new Image();
var flagsBlueReady = false;
var flagsRed = new Image();
var flagsRedReady = false;
var wood = new Image();
var woodReady = false;

//Make sure images are loaded before starting the page
bg.onload = function () {
	bgReady = true;
};
bgStart.onload = function () {
	bgStartReady = true;
};
skierFront.onload = function () {
	skierFrontReady = true;
};
skierLeft.onload = function () {
	skierLeftReady = true;
};
skierRight.onload = function () {
	skierRightReady = true;
};
bear.onload = function () {
	bearReady = true;
};
mammoth.onload = function () {
	mammothReady = true;
};
bunny.onload = function () {
	bunnyReady = true;
};
flagsBlue.onload = function () {
	flagsBlueReady = true;
};
flagsRed.onload = function () {
	flagsRedReady = true;
};
wood.onload = function () {
	woodReady = true;
};


bg.src = "./images/game/background.png";
bgStart.src = "./images/game/background_start.png";
skierFront.src = "./images/game/skier_front.png";
skierLeft.src = "./images/game/skier_left.png";
skierRight.src = "./images/game/skier_right.png"
bear.src = "./images/game/bear.png";
mammoth.src = "./images/game/mammoth.png";
bunny.src = "./images/game/bunny.png";
flagsBlue.src = "./images/game/flags_blue.png";
flagsRed.src = "./images/game/flags_red.png";
wood.src = "./images/game/wood.png";

//image dimensions (for hitboxes)
var playerSizeX = skierFront.width; //same width when turning
var playerSizeY = skierFront.height; //same height when turning
var bunnySizeX = bunny.width;
var bunnySizeY = bunny.height;
var bearSizeX = bear.width;
var bearSizeY = bear.height;
var mammothSizeX = mammoth.width;
var mammothSizeY = mammoth.height;


//Variables

var initial = true;
var keyPressed = 0;
var leftKeyPressed = false;
var rightKeyPressed = false;

var playerSpeed = 6;
var pX = 130; //player's position from left side

var pY = 80; //player's position from top, constant


var score = 0;

var bgY = 0;
var treeY = 600;



//key pressed

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);


function keyDownHandler(event)
{
    keyPressed = event.keyCode;
    console.log(keyPressed);
    switch(keyPressed){
        case 37:
            leftKeyPressed = true;
            break;
        case 39:
            rightKeyPressed = true;
            break;
            
    }
}
function keyUpHandler(event)
{
    keyPressed = event.keyCode;
    console.log(keyPressed);
    switch(keyPressed){
        case 37:
            leftKeyPressed = false;
            break;
        case 39:
            rightKeyPressed = false;
            break;
            
        }
}

//draw images

function draw()
{
    //console.log(bgY);
    
    if(initial)
    {
        ctx.drawImage(bgStart, 0, bgY);
    }else{
        ctx.drawImage(bg, 0, bgY);
    }
    
    
    ctx.drawImage(wood, 0, treeY);
    
    bgY -= playerSpeed;
    treeY -= playerSpeed;
    score += playerSpeed;
    
    if(treeY <= -10)
    {
        treeY = 600;
    }
    if(bgY <= -512){
        bgY = 0 - (-512 - bgY);
        initial = false;
    }
    
    if(leftKeyPressed && pX >= 0){
        pX -= 2;
        ctx.drawImage(skierLeft, pX, pY);
    }else if(rightKeyPressed){
        pX += 2;
        ctx.drawImage(skierRight, pX, pY);
    }else{
        ctx.drawImage(skierFront, pX, pY);
    }
    
    ctx.fillText("Score: " + score, 10,20); //Score display
    ctx.fillText("Speed: " + playerSpeed, 10, 40)
    
    requestAnimationFrame(draw);
}

function imagesReady()
{
    if(bgReady && bgStartReady && skierFrontReady && skierLeftReady && skierRightReady
      && bearReady && mammothReady && bunnyReady && flagsBlueReady && flagsRedReady
      && woodReady){
        return true;
    }else{
        return false;
    }
}

while(!(imagesReady)){
    //checks if images are ready
    //Do nothing in the meantime
}
draw();