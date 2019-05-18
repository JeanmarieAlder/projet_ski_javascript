window.onload = function(){
    
    var imgTemporaire = document.getElementById('camera');

    imgTemporaire.addEventListener('dragenter', noopHandler, false);
    imgTemporaire.addEventListener('dragexit', noopHandler, false);
    imgTemporaire.addEventListener('dragover', noopHandler, false);
    imgTemporaire.addEventListener('drop', drop, false);

    function noopHandler(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    }
    
    function drop(evt) {
        evt.stopPropagation();
        evt.preventDefault(); 
        var imageUrl = evt.dataTransfer.getData('Text');
        alert(imageUrl);
    }
    
}