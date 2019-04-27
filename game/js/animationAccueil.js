var position = 0;
var right = false;
var left = true;

function moveOneSkieur(){
    
    var skiRight = document.getElementById("skiRight");
    var skiLeft = document.getElementById("skiLeft");
    var fin = position + 20;
    
    //Quand on arrive au bout du déplacement
    if(position == fin){
        
        //On change le skieur d'apparence (virage)
        if(right = true){
            right = false;
            left = true;
            document.querySelector('#skiLeft').display = "";
            document.querySelector('#skiRight').display = "none";
        }else{
            right = true;
            left = false;
            document.querySelector('#skiLeft').display = "none";
            document.querySelector('#skiRight').display = "";
        }
        
    }else{
        
        //On avance 
        position++;
        
        //Déplacement si droite 
        if(right){
            document.querySelector('#skiRight').style.top = position + "px"; 
            document.querySelector('#skiRight').style.right = position + "px";
        //Déplacement si gauche    
        }else{
            document.querySelector('#skiLeft').style.top = position + "px"; 
            document.querySelector('#skiLeft').style.left = position + "px";  
        }
    }
    
    //On rappelle la fonction
    moveOneSkieur();
}

this.onmouseover = moveOneSkieur();