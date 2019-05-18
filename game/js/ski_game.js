/*eslint-env browser*/

(function () {
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



    

    //Variables and objects
    
    function Player(speed, posX, posY)
    {
        this.speed = speed;
        this.posX = posX; //player's position from left side
        this.posY = posY; //player's position from top, constant
    }
    var player = new Player(6, 145, 80);
    
    var obstacleInitialY = 600;
    var distBetweenObstacles = 400;
    var obstacleSpawnPoint = obstacleInitialY - distBetweenObstacles;
    var monsterSpawnPoint = obstacleInitialY - (Math.floor(distBetweenObstacles/2));
    var mammothConstraint; // to determine which side is the mammoth
    var newX; //used to determine next x spawn position
    var obstacle = [];
    obstacle[0] = {
        x : 0,
        y : obstacleInitialY,
        lastY : obstacleInitialY,
        type : 1 //1 = tree, 2 = blue door, 3= red door
    }
    
    var monster = [];

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
        for(var i = (obstacle.length - 1); i >= 0 && i > (obstacle.length - 3); i--){
            if(obstacle[i].type == 1){
                ctx.drawImage(wood, obstacle[i].x, obstacle[i].y);
            }else if(obstacle[i].type == 2){
                ctx.drawImage(flagsBlue, obstacle[i].x, obstacle[i].y);
            }else{
                ctx.drawImage(flagsRed, obstacle[i].x, obstacle[i].y);
            }
            
            obstacle[i].lastY = obstacle[i].y; //sets previous y position
            obstacle[i].y -= player.speed; //sets next y position
            
            //Check if spawnPoint is reached for obstacle
            if(obstacle[i].y <= obstacleSpawnPoint
              && obstacle[i].lastY > obstacleSpawnPoint){
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
                        }) ;
                    }else{
                        //red door creation
                        obstacle.push({
                            x : newX,
                            y : obstacleInitialY,
                            lastY : obstacleInitialY,
                            type : 3
                        }) ;
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
            //Check if spawn point is reached for monsters
            if(obstacle[i].y <= monsterSpawnPoint
              && obstacle[i].lastY > monsterSpawnPoint){
                if(Math.floor(Math.random()*5) == 0){
                    switch(Math.floor(Math.random()*3) + 1){
                        case 1:
                            monster.push({
                                x : Math.floor(Math.random()*189) + 35,
                                y : obstacleInitialY,
                                type : 1 //1 = bunny
                            });
                            break;
                        case 2:
                            monster.push({
                                x : Math.floor(Math.random()*189) + 35,
                                y : obstacleInitialY,
                                type : 2 //2 = bear
                            });
                            break;
                        case 3:
                            if(Math.floor(Math.random()*2) == 0){
                                mammothConstraint = 30;
                            }else{
                                mammothConstraint = 190;
                            }
                            monster.push({
                                x : Math.floor(Math.random()*50) + 35,
                                y : obstacleInitialY,
                                type : 3 //3 = mammoth
                            });
                            break;
                    }
                }
            }
        }
        
        //Iteration for all monsters movements (only the two last are updated)
        for(i = monster.length - 1; i >= 0 && i > (monster.length - 3); i--){
            switch(monster[i].type){
                case 1 :
                    ctx.drawImage(bunny, monster[i].x, monster[i].y);
                    break;
                case 2 :
                    ctx.drawImage(bear, monster[i].x, monster[i].y);
                    break;
                case 3 :
                    ctx.drawImage(mammoth, monster[i].x, monster[i].y);
                    break;
            }
            monster[i].lastY = monster[i].y;
            monster[i].y -= player.speed;
            
        }

        bgY -= player.speed;
        score += Math.ceil(player.speed / 2);

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
        
        //Check if player is game over
        checkGameOver();

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
    
    
    
    //checks if the player touches an obstacle or doesn't pass on a door
    function checkGameOver()
    {
        for(var i = monster.length - 1; i >= 0 && i > (monster.length - 3); i--){
            switch(monster[i].type){
                case 1:
                    checkHitBox(monster[i].x, monster[i].y, bunny.width, bunny.height);
                    break;
                case 2:
                    checkHitBox(monster[i].x, monster[i].y, bear.width, bear.height);
                    break;
                case 3:
                    checkHitBox(monster[i].x, monster[i].y, mammoth.width, mammoth.height);
            }
        }
        
        for(i = obstacle.length - 1; i >= 0 && i > (obstacle.length - 3); i--){
            switch(obstacle[i].type){
                case 1:
                    checkHitBox(obstacle[i].x, obstacle[i].y, wood.width, wood.height);
                    break;
                default:
                    checkHitBoxDoor(obstacle[i].x, obstacle[i].y, obstacle[i].lastY);
                    break;
            }
        }
    }
    
    var px; //player bottom left X
    var py; //player bottom left and right Y 
    var plx; //player bottom right X
    function checkHitBox(mx, my, mlx, mly){
        //console.log(mx + " " + my + " " + mlx + " " + mly);
        //Monster hitbox : mx and my = top left corner position,
        //      pmx and pmy: length
        px = player.posX;
        py = player.posY + skierFront.height;
        plx = player.posX + skierFront.width;
        
        if((py >= my && py <= my + mly)
          && ((px >= mx && px <= mx + mlx) || 
              (plx >= mx && plx <= mx + mlx) ||
              (px <= mx && plx >= mx + mlx))){
            console.log("GAME OVER !!!!!!!!!!!!!!!");
        }
    }
    function checkHitBoxDoor(mx, my, mly){
        px = player.posX;
        py = player.posY + skierFront.height;
        plx = player.posX + skierFront.width;        
        
        
        if(py <= mly && py >= my){
            if(px >= mx && plx <= mx + flagsBlue.width) {
            console.log("passed");
            }else{
            console.log("GAME OVER !!!!!!");
            }
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

