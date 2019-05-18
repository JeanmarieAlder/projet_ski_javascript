window.onload = function() {
    
    //Objet player
    function Player(pseudo, score){
        var pseudo = pseudo;
        var score = score;
    }
    
    
    //PARTIE DISPLAY ---------------------------------------------
    //Masquer ce qu'il faut au début
    document.getElementById("regleJeu").style.display = "none";
    document.getElementById("jeu").style.display = "none";
    document.getElementById("reglage").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("ouskier").style.display = "none";
    document.getElementById("player").style.display = "none";

    //Variables
    var redCross = document.getElementById("redCrossRegle");
    var redCrossGame = document.getElementById("redCrossGame");
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
    var camera = document.getElementById("camera");
    
    var avatar1 = document.getElementById("avatar1");
    
    //Initialisation listener
    redCross.addEventListener("click", clicRedCross);
    btnRegleJeu.addEventListener("click", clicRegleJeuBtn);
    btnReglage.addEventListener("click", clicReglageBtn);
    btnPlay.addEventListener("click", clicPlayBtn);
    btnScore.addEventListener("click", clicScoreBtn);
    btnouskier.addEventListener("click", clicOuSkier);
    redCrossGame.addEventListener("click", clicRedCrossGame);
    redCrossReglage.addEventListener("click", clicRedCrossReglage);
    redCrossScore.addEventListener("click", clicRedCrossScore);
    redCossOuSkier.addEventListener("click", clicRedCrossOuSkier);
    btnvaliderplayer.addEventListener("click", clicValiderPlayer);
    btnfin.addEventListener("click", clicFin);
    
    //DRAG AND DROP - MARCHE PAS POUR LE MOMENT 
    camera.addEventListener("drop", function(e){
        e.preventDefault;        
        
        var target = e.target,
        draggedElement = dndHandler.draggedElement, 
        clonedElement = draggedElement.cloneNode(true);
        
    });
    
    
    //Simuler la fin du jeu - TEMPORAIRE
    function clicFin(){
        document.getElementById("player").style.display = "";
        document.getElementById("jeu").style.display = "none";
        
        //Recupération du score et affichage
        inputScore.value = score;
    }
    
    //Fermer player
    function clicValiderPlayer(){
        document.getElementById("player").style.display = "none";
        document.getElementById("blocDemarrage").style.display = "";
        
        //Gestion score
        var pseudo = document.getElementById("pseudo").value;
        
        //Création du player
        var player = new Player(pseudo, score);
        //Enregistrement dans la BDD
        localStorage.setItem('player', JSON.stringify(player));
        
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
        document.getElementById("score").style.display = "none";
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
        
        //Display les scores dans le tableau
        
        
        document.getElementById("score").style.display = "";
        document.getElementById("blocDemarrage").style.display = "none";
    }
    
    //Ouvrir le jeu
    function clicPlayBtn(){
        document.getElementById("jeu").style.display = "";
        document.getElementById("blocDemarrage").style.display = "none";
    }
    
    //Ouvrir réglages
    function clicReglageBtn(){
        document.getElementById("reglage").style.display = "";
        document.getElementById("blocDemarrage").style.display = "none";
    }
        
    //Fermer game
    function clicRedCrossGame()
    {
        document.getElementById("game").style.display = "none";
        document.getElementById("blocDemarrage").style.display = "";
    }
//--------------------------------------------------------------------------    
    
//PARTIE JEU -------------------------------------------------------

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
    
    
}