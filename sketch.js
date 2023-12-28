const container = document.querySelector('#container');

//to detect when the mouse is held down
let mouseDown = false;
document.addEventListener('mousedown', function(e){
    mouseDown = true;
});

document.addEventListener('mouseup', function(e){
    mouseDown = false;
});


//detect if the left button is pressed
for(let i = 0; i < 100; i++){
    for(let j = 0; j < 100; j++){
        const gridBlock = document.createElement('div');
        gridBlock.classList.add('gridCell');
        gridBlock.addEventListener('mousedown', function(e){
            gridBlock.classList.add('activeCell')
        })
        gridBlock.addEventListener('mouseover', function(event){
            if(mouseDown){
               gridBlock.classList.add('activeCell') 
            }
        })

        


        gridBlock.style.cssText = "border: 0.5px solid black; height: 8px; width: 8px;";

        container.appendChild(gridBlock);

    }
}

