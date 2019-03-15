var cvas = document.getElementById("canvas"); //get reference to canvas
var ctx = cvas.getContext("2d"); //get  context of the page



//Text configuration
ctx.font = "15px Verdana";

//load images

var bg = new Image();
var bgStart = new Image();
var skierFront = new Image();
var skierLeft = new Image();
var skierRight = new Image();
var bear = new Image();
var mammoth = new Image();
var bunny = new Image();
var flagsBlue = new Image();
var flagsRed = new Image();
var wood = new Image();

bg.src = "/ressources/images/game/background.png";
bgStart.src = "/ressources/images/game/background_start.png";
skierFront.src = "/ressources/images/game/skier_front.png";
skierLeft.src = "/ressources/images/game/skier_left.png";
skierRight.src = "/ressources/images/game/skier_right.png"
bear.src = "/ressources/images/game/bear.png";
mammoth.src = "/ressources/images/game/mammoth.png";
bunny.src = "/ressources/images/game/bunny.png";
flagsBlue.src = "/ressources/images/game/flags_blue.png";
flagsRed.src = "/ressources/images/game/flags_red.png";
wood.src = "/ressources/images/game/wood.png";

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

var playerSpeed = 2;
var pX = 130; //player's position from left side

var pY = 80; //player's position from top, constant


var score = 0;

var bgY = 0;
var treeY = 600;

var obstacle = [];
obstacle[0] = {
    x : 0,
    y : 600
};


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

draw();