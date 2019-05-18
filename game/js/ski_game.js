/*eslint-env browser*/

(function() {
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


    //Variables and objects
    
    function Player(speed, posX, posY)
    {
        this.speed = speed;
        this.posX = posX; //player's position from left side
        this.posY = posY; //player's position from top, constant
    }
    var player = new Player(6, 145, 80);
    
    var obstacleInitialY = 600;
    var distBetweenObstacles = 500;
    var obstableSpawnPoint = obstacleInitialY - distBetweenObstacles;
    var monsterSpawnPoint = obstacleInitialY - (distBetweenObstacles/2);
    var newX; //used to determine next x spawn position
    var obstacle = [];
    obstacle[0] = {
        x : 0,
        y : obstacleInitialY,
        lastY : obstacleInitialY,
        type : 1 //1 = tree, 2 = blue door, 3= red door
    }

    var initial = true; //If the background is the top of the mountain
    var keyPressed = 0; //retrieves the key pressed by player
    var leftKeyPressed = false;
    var rightKeyPressed = false;

    var score = 0;

    var bgY = 0;
    



    //key pressed (id 37 is left and 39 is right)
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    function keyDownHandler(event)
    {
        keyPressed = event.keyCode;
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

        //obstacle spawn iteration
        for(var i = (obstacle.length - 1); i > (obstacle.length - 3) && i >= 0; i--){
            if(obstacle[i].type == 1){
                ctx.drawImage(wood, obstacle[i].x, obstacle[i].y);
            }else if(obstacle[i].type == 2){
                ctx.drawImage(flagsBlue, obstacle[i].x, obstacle[i].y);
            }else{
                ctx.drawImage(flagsRed, obstacle[i].x, obstacle[i].y);
            }
            
            obstacle[i].lastY = obstacle[i].y; //sets previous y position
            obstacle[i].y -= player.speed; //sets next y position
            
            //Check if spawnPoint is reached
            if(obstacle[i].y <= obstableSpawnPoint
              && obstacle[i].lastY > obstableSpawnPoint){
                //Create a new obstacle, 1/5 door and 4/5 wood
                if(Math.floor(Math.random()*5) == 0){
                    newX = getRandomPosDoor();
                    // 1/2 red or blue
                    if(Math.floor(Math.random()*2) == 0){
                        //blue door creation
                        obstacle.push({
                            x : newX,
                            y : obstacleInitialY,
                            lastY : obstacleInitialY,
                            type : 2
                        }) 
                    }else{
                        //red door creation
                        obstacle.push({
                            x : newX,
                            y : obstacleInitialY,
                            lastY : obstacleInitialY,
                            type : 3
                        }) 
                    }
                }else{
                    newX = getRandomPosWood();
                    //wood creation
                    obstacle.push({
                        x : newX,
                        y : obstacleInitialY,
                        lastY : obstacleInitialY,
                        type : 1
                    });
                }
                
            }
        }

        bgY -= player.speed;
        score += player.speed;

        if(bgY <= -512){
            bgY = 0 - (-512 - bgY);
            initial = false;
        }

        if(leftKeyPressed && player.posX >= 0){
            player.posX -= player.speed/2;
            ctx.drawImage(skierLeft, player.posX, player.posY);
        }else if(rightKeyPressed){
            player.posX += player.speed/2;
            ctx.drawImage(skierRight, player.posX, player.posY);
        }else{
            ctx.drawImage(skierFront, player.posX, player.posY);
        }

        ctx.fillText("Score: " + score, 10,20); //Score display
        ctx.fillText("Speed: " + player.speed, 10, 40)

        requestAnimationFrame(draw);
    }

    function getRandomPosDoor()
    {
        return Math.floor(Math.random()*164) + 15;
    }
    function getRandomPosWood()
    {
        if(Math.floor(Math.random()*2) == 0){
            return Math.floor(Math.random()*90) - 80;
        }else{
            return Math.floor(Math.random()*90) + 88;
        }
    }
    
    //Checks if all images are loaded
    function imagesReady()
    {
        if(bgReady && bgStartReady && skierFrontReady && skierLeftReady && skierRightReady
          && bearReady && mammothReady && bunnyReady && flagsBlueReady && flagsRedReady
          && woodReady){
            return true; //images ready
        }else{
            return false; //images not loaded
        }
    }
        

    while(!(imagesReady)){
        //checks if images are ready
        //Do nothing in the meantime
    }
    draw(); //start drawing the canvas
})();

