window.addEventListener("load", function(event){
    
    var hautimage = 0;
    var gaucheimage = 0;
    
    
    while(true){
        
        //Descendre à droite
        for(i=0; i<50; i++){
            if(document.getElementById){
            hautimage++;
            gaucheimage = gaucheimage+2;
            document.getElementById("skiRight").style.top = hautimage + "px";
            document.getElementById("skiRight").style.left = gaucheimage + "px";
            console.log(hautimage);
            console.log(gaucheimage);
            }   
        }
        
        //Descendre à gauche
        for(i=0; i<50; i++){
            if(document.getElementById){
            hautimage++;
            gaucheimage = gaucheimage-2;
            document.getElementById("skiRight").style.top = hautimage + "px";
            document.getElementById("skiRight").style.left = gaucheimage + "px";
            console.log(hautimage);
            console.log(gaucheimage);
            }   
        }
        
    }
    
})

