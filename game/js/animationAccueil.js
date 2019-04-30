window.onload = function() {
    
    //Masquer ce qu'il faut au début
    document.getElementById("regleJeu").style.display = "none";
    document.getElementById("jeu").style.display = "none";
    document.getElementById("reglage").style.display = "none";
    
    //Variables
    var redCross = document.getElementById("redCrossRegle");
    var redCrossGame = document.getElementById("redCrossGame")
    var btnRegleJeu = document.getElementById("regleJeubtn");
    var btnReglage = document.getElementById("reglagebtn");
    var btnPlay = document.getElementById("playbtn");
    
    //Initialisation listener
    redCross.addEventListener("click", clicRedCross);
    btnRegleJeu.addEventListener("click", clicRegleJeuBtn);
    btnReglage.addEventListener("click", clicReglageBtn);
    btnPlay.addEventListener("click", clicPlayBtn);
    redCrossGame.addEventListener("click", clicRedCrossGame);
    
    //Listener
    
    //Fermer le bloc de règle de jeu
    function clicRedCross()
    {
        document.getElementById("regleJeu").style.display = "none";
        document.getElementById("blocDemarrage").style.display = "";
    }
    
    //Ouvrir règle du jeu
    function clicRegleJeuBtn()
    {
        document.getElementById("regleJeu").style.display = "";
        document.getElementById("blocDemarrage").style.display = "none";
    }
    
    //Ouvrir le jeu
    function clicPlayBtn(){
        document.getElementById("jeu").style.display = "";
        document.getElementById("blocDemarrage").style.display = "none";
    }
    
    //Ouvrir les réglages
    function clicReglageBtn(){
        document.getElementById("reglage").style.display = "";
        document.getElementById("blocDemarrage").style.display = "none";
    }
    
    //Ouvrir les réglages
    function clicRedCrossGame(){
        document.getElementById("blocDemarrage").style.display = "";
        document.getElementById("jeu").style.display = "none";
    }
}   




