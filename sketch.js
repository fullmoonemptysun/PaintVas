const container = document.querySelector('#container');

//to detect when the mouse is held down
let mouseDown = false;
document.addEventListener('mousedown', function(e){
    mouseDown = true;
});

document.addEventListener('mouseup', function(e){
    mouseDown = false;
});

let stylesheet = getComputedStyle(container);
let height = (stylesheet.getPropertyValue('height'));
let width = (stylesheet.getPropertyValue('width'));

let cellHeight = (height/100);
let cellWidth = (height/100);


//detect if the left button is pressed
for(let i = 0; i < 64; i++){
    for(let j = 0; j < 64; j++){
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

        

        
        gridBlock.style.cssText = "height:calc(640px/64); width:calc(640px/64);";
        container.appendChild(gridBlock);

    }
}

