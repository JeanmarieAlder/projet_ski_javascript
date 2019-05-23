window.onload = function() {
    
    //PARTIE DISPLAY ---------------------------------------------
    //Masquer ce qu'il faut au début
    document.getElementById("regleJeu").style.display = "none";
    document.getElementById("jeu").style.display = "none";
    document.getElementById("reglage").style.display = "none";
    document.getElementById("scorediv").style.display = "none";
    document.getElementById("ouskier").style.display = "none";
    document.getElementById("playerdiv").style.display = "none";

    //Variables
    var redCross = document.getElementById("redCrossRegle");
    var redCrossReglage = document.getElementById("redCrossReglage");
    var redCrossScore = document.getElementById("redCrossScore")
    var redCossOuSkier = document.getElementById("redCrossOuSkier");
    var btnRegleJeu = document.getElementById("regleJeubtn");
    var btnReglage = document.getElementById("reglagebtn");
    var btnPlay = document.getElementById("playbtn");
    var btnScore = document.getElementById("scoresbtn");
    var btnouskier = document.getElementById("ouskierbtn");
    var btnvaliderplayer = document.getElementById("validerPlayer");
    var btnfin = document.getElementById("finbtn");
    var inputScore = document.getElementById("scoreField");
    var inputPseudo = document.getElementById("pseudo");
    
    //Initialisation listener
    redCross.addEventListener("click", clicRedCross);
    btnRegleJeu.addEventListener("click", clicRegleJeuBtn);
    btnReglage.addEventListener("click", clicReglageBtn);
    btnPlay.addEventListener("click", clicPlayBtn);
    btnScore.addEventListener("click", clicScoreBtn);
    btnouskier.addEventListener("click", clicOuSkier);
    redCrossReglage.addEventListener("click", clicRedCrossReglage);
    redCrossScore.addEventListener("click", clicRedCrossScore);
    redCossOuSkier.addEventListener("click", clicRedCrossOuSkier);
    btnvaliderplayer.addEventListener("click", clicValiderPlayer);
    
    //Fin du jeu
    function ClicFin(){
        document.getElementById("playerdiv").style.display = "";
        document.getElementById("jeu").style.display = "none";

        //Recupération du score et affichage
        inputScore.value = score;
    }
    
    //Fermer player
    function clicValiderPlayer(){
        document.getElementById("blocDemarrage").style.display = "";
        document.getElementById("playerdiv").style.display = "none";
        
        //Création de l'objet
        var s = {
            pseudo : inputPseudo.value,
            score : score,
            niveau : getDifficulty(),
        }
        
        //On met en JSON
        var s_serizalized = JSON.stringify(s);     
        
        //On Stock
        localStorage.setItem("user"+localStorage.length, s_serizalized);
        
        inputPseudo.value = "";
        
    }
    
    //Fermer ou skier
    function clicRedCrossOuSkier(){
        document.getElementById("ouskier").style.display = "none";
        document.getElementById("blocDemarrage").style.display = "";
    }
    
    //Ouvrir ou skier 
    function clicOuSkier(){
        document.getElementById("ouskier").style.display = "";
        document.getElementById("blocDemarrage").style.display = "none";
        
        
         /*Geolocation part*/
var geoUser = "";
var generalInformation = "";
var userLatitude = "";
var userLongitude = "";


if (localStorage.getItem("geoUserMemo") === null) { //if palmares is null we create it
        localStorage.setItem("geoUserMemo", JSON.stringify(geoUser));
}

if (localStorage.getItem("generalInformation") === null) { //if palmares is null we create it
        localStorage.setItem("generalInformation", JSON.stringify(generalInformation));
}

if (localStorage.getItem("userLatitude") === null) { //if palmares is null we create it
        localStorage.setItem("userLatitude", JSON.stringify(userLatitude));
}

if (localStorage.getItem("userLongitude") === null) { //if palmares is null we create it
        localStorage.setItem("userLongitude", JSON.stringify(userLongitude));
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
   console.log("goeloc not supported");
  }
}


function showPosition(position) {

        var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if(status === 200){
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
        };

        getJSON('http://open.mapquestapi.com/geocoding/v1/reverse?key=A5AOlcOT3M0rfeqBbrwMLBfHMZWDF1vZ&location='+position.coords.latitude+','+position.coords.longitude+'&includeRoadMetadata=true&includeNearestIntersection=true', function(err, data) {
            if(err !== null){
                alert('Something went wrong: ' + err);
            } else {
                console.log(data);
                var thisLatitude = data["results"]["0"]["locations"]["0"]["latLng"]["lat"]; //Latitude
                var thisLongitude = data["results"]["0"]["locations"]["0"]["latLng"]["lng"];//longitude
                var thisCanton = data["results"]["0"]["locations"]["0"]["adminArea3"];//canton
                var thisCommune = data["results"]["0"]["locations"]["0"]["adminArea5"];//commune
                var thisNPA = data["results"]["0"]["locations"]["0"]["postalCode"];//npa
                var thisService = data["info"]["copyright"]["text"];//name service

                function convertLatLng(lat,long){
                                // =>deg = 3600 * seconde
                                lat = lat * 3600;
                                long = long * 3600;

                                // latitude:  φ =>lat  ( φ' =>lat2)
                                lat2 = (lat - 169028.66)/10000;

                                // longitude:  λ =>long  ( λ' =>long2)
                                long2 = (long - 26782.5)/10000;

                                var y = 600072.37 + (211455.93 * long2) - (10938.51 * long2 * lat2) - (0.36 * long2 * (lat2*lat2)) - (44.54 * (long2*long2*long2));
                                y = Math.round(y);

                                var x = 200147.07 + (308807.95 * lat2) + (3745.25 * long2*long2) + (76.63 * lat2*lat2) - (194.56 * long2*long2 * lat2) + (119.79 * lat2*lat2*lat2);
                                x = Math.round(x);

                                return [y,x];  // 600000,200000
                            }

                var getSwissValue = convertLatLng(thisLatitude, thisLongitude);

                /*Mise en forme*/
                document.getElementById("latitude").append(thisLatitude+" | CH1903: "+getSwissValue[0]);
                document.getElementById("longitude").append(thisLongitude+" | CH1903: "+getSwissValue[1]);
                document.getElementById("canton").append(thisCanton);
                document.getElementById("commune").append(thisCommune);// plus NPA entre ()
                document.getElementById("commune").append("("+thisNPA+")");
                document.getElementById("service").append(thisService);

               
                var thisGeoUser = data["results"]["0"]["locations"]["0"]["adminArea5"]+"-"+data["results"]["0"]["locations"]["0"]["adminArea1"];
                localStorage.setItem("geoUserMemo", JSON.stringify(thisGeoUser));
                //localStorage.setItem("generalInformation", JSON.stringify(generalInfos));

            }
            
            
            //initialisation of the map
            //center on sierre
            //default zoom level : 8
        
            var mymap = L.map('mapOuSkier').setView([thisLatitude, thisLongitude], 16);
            
            
            //Adding a map tile URL with contribution to MapQuest, maxzoom is 18
            L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Data, imagery and map information provided by MapQuest, <a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a> and contributors, OdBl.',
                maxZoom: 18
            }).addTo(mymap);
            
       
            //Adding a marker 
       
            var marker = L.marker([thisLatitude, thisLongitude]).addTo(mymap);
            
            
            
            //Using getjson ajax jquery method to read the file
            $.getJSON( "../leaflet/data.json", function( data ) { //file URL
                
              $.each( data, function(key, val) { //loop on data
                  
                console.log(val);
                  //creating the marker with data from json file
                  var marker = L.marker([latitude,longitude]).addTo(mymap);
                  
                  //using circleMarker object
                  var marker = L.circleMarker([thisLatitude,thisLongitude]).addTo(mymap);
                 
                  console.log(latitude, longitude);
                  
              });
            });
        
        
       
            
        });
}

getLocation();

geoUser = localStorage.getItem("geoUserMemo");
geoUser = geoUser.substring(1,geoUser.length); //Delete first character
geoUser = geoUser.slice(0,-1); //Delete last character

latitude = localStorage.getItem("userLatitude");
longitude = localStorage.getItem("userLongitude");



/*End geolocations part*/
         
    }
    
    //Fermer le bloc de règle de jeu
    function clicRedCross()
    {
        document.getElementById("regleJeu").style.display = "none";
        document.getElementById("blocDemarrage").style.display = "";
    }
    
    //Fermer Réglages
    function clicRedCrossReglage()
    {
        document.getElementById("reglage").style.display = "none";
        document.getElementById("blocDemarrage").style.display = "";
    }
    
    //Fermer scores
    function clicRedCrossScore()
    {
        document.getElementById("scorediv").style.display = "none";
        document.getElementById("blocDemarrage").style.display = "";
    }
    
    //Ouvrir règle du jeu
    function clicRegleJeuBtn()
    {
        document.getElementById("regleJeu").style.display = "";
        document.getElementById("blocDemarrage").style.display = "none";
    }
    
    //Ouvrir score
    function clicScoreBtn()
    {
        document.getElementById("scorediv").style.display = "";
        document.getElementById("blocDemarrage").style.display = "none";
        
        tableau = document.getElementById("scoreTableau");
        tbody = document.getElementById("tbodyScore");
        tbody.innerHTML = "";
        
        var arrayObj = trieScore();
        var n = arrayObj.length;
        console.log(arrayObj);
        console.log(n);
        
        for(var i=0; i<n; i++){ //Lignes
            var tr = document.createElement("tr");
            var obj = arrayObj[i];
            
            for(var j=0; j<3; j++){ //Colonnes
                
                var td = document.createElement("td");
                
                switch(j){
                    case 0 :
                        td.appendChild(document.createTextNode(i+1));
                        break;
                    case 1 :
                        td.appendChild(document.createTextNode(obj.pseudo))
                        break;
                    case 2 :
                        td.appendChild(document.createTextNode(obj.score))
                        break;
                }
                
                tr.appendChild(td);
            }
            
            tbody.appendChild(tr);
        }
        
    }
    
    //Ouvrir le jeu
    function clicPlayBtn(){
        document.getElementById("jeu").style.display = "";
        document.getElementById("blocDemarrage").style.display = "none";
        Game();
    }
    
    //Ouvrir réglages
    function clicReglageBtn(){
        document.getElementById("reglage").style.display = "";
        document.getElementById("blocDemarrage").style.display = "none";
    }
    
    //----------------------------------------------------------------------;
    //PARTIE GESTION DES SCORES---------------------------------------------;
    
    //Trie des scores pour déterminer le meilleur 
    
    //Event Listener sur choix niveau
    var choixNiveau = document.getElementById("choixNiveau");
    choixNiveau.addEventListener("click", function(){
        clicScoreBtn();
    });
    
    //Trie des scores 
    function trieScore(){
        var arrayScore = [];
        var n = localStorage.length;
        var level = 0;
        var niv = choixNiveau.value;
        
        switch(niv){
            case "Facile" :
                level = 4;
                break;
            case "Moyen" :
                level = 6;
                break;
            case "Difficile" :
                level = 8;
                break;
            case "Expert" :
                level = 10;
        }
        
        //Récupération des objets  du bon niveau dans local storage
        for(var i=0; i<n; i++){
            var obj = JSON.parse(localStorage.getItem("user"+i))
            console.log(obj);
            
            if(obj != null){
                if(obj.niveau == level){
                    arrayScore[i] = obj;
                }
            }
        }
        
        arrayScore.sort(function (a,b) {
            return b.score-a.score;
        });
        
        return arrayScore;
        
    }
    
    //----------------------------------------------------------------------
    //PARTIE JEU -----------------------------------------------------------
    var resultSpeed;
    function getDifficulty(){
        var formulaire = document.getElementById("formDifficulty");
        var inputDifficulty = formulaire.getElementsByTagName("input");
        var n = inputDifficulty.length;
        
        for(i=0; i<n; i++){
            if(inputDifficulty[i].type.toLowerCase()=="radio"){
                if(inputDifficulty[i].checked){
                    switch(inputDifficulty[i].getAttribute("value")){
                        case "facile" :
                            resultSpeed = 4;
                            break;
                        case "moyen" :
                            resultSpeed = 6;
                            break;
                        case "difficile" :
                            resultSpeed = 8;
                            break;
                        case "expert" :
                            resultSpeed = 10;
                            break;
                    } 
                }
            }
        }
        return resultSpeed;
    }

    var score = 0;  
    var cvas = document.getElementById("canvas"); //get reference to canvas
    
    cvas.addEventListener("click", function(){
       ClicFin(); 
    });
    
    function Game() {
        
    window.onload;    
        
    score = 0;
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
    var skierTFront = new Image();
    var skierTFrontReady = false;
    var skierTLeft = new Image();
    var skierTLeftReady = false;
    var skierTRight = new Image();
    var skierTRightReady = false;
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
    skierTFront.onload = function () {
        skierTFrontReady = true;
    };
    skierTLeft.onload = function () {
        skierTLeftReady = true;
    };
    skierTRight.onload = function () {
        skierTRightReady = true;
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
    
    //Get image by URI
    bg.src = "./images/game/background.png";
    bgStart.src = "./images/game/background_start.png";
    skierFront.src = "./images/game/skier_front.png";
    skierLeft.src = "./images/game/skier_left.png";
    skierRight.src = "./images/game/skier_right.png"
    skierTFront.src = "./images/game/skier_top_front.png";
    skierTLeft.src = "./images/game/skier_top_left.png";
    skierTRight.src = "./images/game/skier_top_right.png";
    bear.src = "./images/game/bear.png";
    mammoth.src = "./images/game/mammoth.png";
    bunny.src = "./images/game/bunny.png";
    flagsBlue.src = "./images/game/flags_blue.png";
    flagsRed.src = "./images/game/flags_red.png";
    wood.src = "./images/game/wood.png";
    
    //-------------------------------------------------------------------------
    //Variables and objects
    
    //Player object
    function Player(speed, posX, posY)
    {
        this.speed = speed;
        this.posX = posX; //player's position from left side
        this.posY = posY; //player's position from top, constant
        this.gameOver = false;
        this.breakSpeed = 0;
        this.goFrame = 0;
    }
    var player = new Player(getDifficulty(), 145, 80); //player instanciation (only one per game)
    
    var obstacleInitialY = 600; //Y position of spawning objects
    var distBetweenObstacles = 410; //Distance between obstacles
    //Y position of last obstacle where a new obstacle is created
    var obstacleSpawnPoint = obstacleInitialY - distBetweenObstacles;
    //Y position of last obstacle where a monster has a chance to be created
    var monsterSpawnPoint = obstacleInitialY - (Math.floor(distBetweenObstacles/2));
    var mammothConstraint; // to determine which side is the mammoth
    var newX; //used to determine next x spawn position
    var obstacle = []; //Stores all obstacles (trees and doors)
    obstacle[0] = { //First obstacle (always static)
        x : -10,
        y : obstacleInitialY,
        lastY : obstacleInitialY,
        type : 1 //1 = tree, 2 = blue door, 3= red door
    }
    
    var monster = [];

    var initial = true; //If the background is the top of the mountain
    var initialWait = 0;
    var keyPressed = 0; //retrieves the key pressed by player
    var leftKeyPressed = false;
    var rightKeyPressed = false;

    //var score = 0;
    var scoreCap = 10000;
    var bgY = 0; //background Y position (x is always 0)
    



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
                                x : Math.floor(Math.random()*50) + mammothConstraint,
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
        if(initialWait > 3 && initialWait < 5){
            wait(2000);
        }

        if(bgY <= -512){
            bgY = 0 - (-512 - bgY);
            initial = false;
        }
        if(player.speed < 10 && !(player.gameOver) && scoreCap < score){
            player.speed ++;
            scoreCap += 10000;
        }
        if(player.gameOver){
            //game over side
            //console.log(Math.floor(player.goFrame));
            switch(Math.floor(player.goFrame)) {
                case 0:
                    ctx.drawImage(skierFront, player.posX, player.posY)
                    break;
                case 1:
                    ctx.drawImage(skierRight, player.posX, player.posY)
                    break;
                case 2:
                    ctx.drawImage(skierTLeft, player.posX, player.posY)
                    break;
                case 3:
                    ctx.drawImage(skierTFront, player.posX, player.posY)
                    break;
                case 4:
                    ctx.drawImage(skierTRight, player.posX, player.posY)
                    break;
                case 5:
                    ctx.drawImage(skierLeft, player.posX, player.posY)
                    break;
            }
            player.breakSpeed += 0.5
            player.posY += Math.ceil(player.breakSpeed);
            player.goFrame += 0.2; //changes game over frame to next one
            if(player.goFrame >= 6){
                player.goFrame = 0; //reset player frame at 6 or more
            }
            if(player.posY >= 600) {
                gameOver();
            }
        }else{
            //normal game side
            if(leftKeyPressed && player.posX >= 0){
                player.posX -= player.speed/2;
                ctx.drawImage(skierLeft, player.posX, player.posY);
            }else if(rightKeyPressed && (player.posX + skierFront.width) <= bg.width){
                player.posX += player.speed/2;
                ctx.drawImage(skierRight, player.posX, player.posY);
            }else{
                ctx.drawImage(skierFront, player.posX, player.posY);
            }
            //Check if player is game over
            if(checkGameOver()){
                //console.log("GO");
                player.gameOver = true;
                player.breakSpeed = player.speed;
                player.speed = 0;
            }
        }
        
        //Display score and speed
        ctx.fillText("Score: " + score, 10,20); //Score display
        ctx.fillText("Speed: " + player.speed, 10, 40);
        if(initialWait < 6){
            initialWait++;
        }
        
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
    
    function gameOver() 
    {
        ctx.fillText("GAME OVER", 97, 240);
        
        requestAnimationFrame(gameOver);
        
    }
    
    //checks if the player touches an obstacle or doesn't pass on a door
    function checkGameOver()
    {
        var isGameOver = false;
        var j;
        for(j = monster.length - 1; j >= 0 && j >= (monster.length - 3); j--){
            //console.log(monster[j].type + " - " + j);
            switch(monster[j].type){
                    
                case 1:
                    if(!isGameOver){
                        isGameOver = checkHitBox(monster[j].x, monster[j].y, bunny.width, bunny.height);
                    }
                    break;
                case 2:
                    if(!isGameOver){
                        isGameOver = checkHitBox(monster[j].x, monster[j].y, bear.width, bear.height);
                    }
                    break;
                case 3:
                    if(!isGameOver){
                        isGameOver =  checkHitBox(monster[j].x, monster[j].y, mammoth.width, mammoth.height);
                    }
                    break;
            }
        }
        
        for(j = obstacle.length - 1; j >= 0 && j > (obstacle.length - 3); j--){
            switch(obstacle[j].type){
                case 1:
                    if(!isGameOver){
                        isGameOver = checkHitBox(obstacle[j].x, obstacle[j].y, wood.width, wood.height);
                    }
                    break;
                default:
                    if(!isGameOver){
                        isGameOver = checkHitBoxDoor(obstacle[j].x, obstacle[j].y, obstacle[j].lastY);
                    }
                    break;
            }
        }
        return isGameOver;
    }
    
    var px; //player bottom left X
    var py; //player bottom left and right Y 
    var plx; //player bottom right X
    function checkHitBox(mx, my, mlx, mly){
        //console.log("mx:" + mx + " my:" + my + " mlx:" + mlx + " mly:" + mly);
        //Monster hitbox : mx and my = top left corner position,
        //      pmx and pmy: length
        px = player.posX;
        py = player.posY + skierFront.height;
        plx = player.posX + skierFront.width;
        
        //console.log("px: "+ px + " py:" + py + " plx:" + plx);
        
        //Game over Logic
        if((py >= my && py <= my + mly)
          && ((px >= mx && px <= mx + mlx) || 
              (plx >= mx && plx <= mx + mlx) ||
              (px <= mx && plx >= mx + mlx))){
            //console.log("GAME OVER !!!!!!!!!!!!!!!");
            return true; //this is game over
        }
        return false; //this is ok!
    }
    function checkHitBoxDoor(mx, my, mly){
        px = player.posX;
        py = player.posY + skierFront.height;
        plx = player.posX + skierFront.width;
        
        my += flagsBlue.height;
        mly += flagsBlue.height;
        
        //Game over Logic
        if(py <= mly && py >= my){
            if(px >= mx && plx <= mx + flagsBlue.width) {
                score += 2000;
                return false; //this is ok!
            }else{
                //console.log("GAME OVER !!!!!!");
                return true; //this is game over
            }
        }
        return false; //this is ok!
            
    }
    
    //Checks if all images are loaded
    function imagesReady()
    {
        if(bgReady && bgStartReady && skierFrontReady && skierLeftReady && skierRightReady
          && bearReady && mammothReady && bunnyReady && flagsBlueReady && flagsRedReady
          && woodReady && skierTFrontReady && skierTLeftReady && skierTRightReady){
            return true; //images ready
        }else{
            return false; //images not loaded
        }
    }
    function wait(ms)
    {
        var d = new Date();
        var d2 = null;
        do { d2 = new Date(); }
        while(d2-d < ms);
    }

    while(!(imagesReady)){
        //checks if images are ready
        //Do nothing in the meantime
    }
    draw(); //start drawing the canvas
};
}
