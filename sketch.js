//Starting variables
const colorRadioButton = document.querySelector("#color");
const textureRadioButton = document.querySelector("#texture");
const rainbowRadioButton = document.querySelector("#rainbow");
const darkenRadioButton = document.querySelector("#darken");
const eraserRadioButton = document.querySelector("#eraser");
const colorpicker = document.querySelector(".colorpicker");
const container = document.querySelector('#container');
const num = Number(prompt("n = ?"));
const bod = document.querySelector("body");
const sunButton = document.querySelector(".light");
const moonButton = document.querySelector(".dark");


//Event Listeners for pen buttons



bod.classList.add("lightTheme");
//Event Listeners for theme buttons
sunButton.addEventListener("click", function(e){
    bod.classList.remove("lightTheme");
    sunButton.classList.toggle("invisible");
    moonButton.classList.toggle("invisible");
    bod.classList.add("darkTheme");
    bod.classList.toggle("lightFont")
})
moonButton.addEventListener("click", function(){
    bod.classList.remove("darkTheme");
    moonButton.classList.toggle("invisible");
    sunButton.classList.toggle("invisible");
    bod.classList.add("lightTheme");
    bod.classList.toggle("lightFont");
})



//to detect when the mouse is held down
let mouseDown = false;
document.addEventListener('mousedown', function(e){
    mouseDown = true;
});
document.addEventListener('mouseup', function(e){
    mouseDown = false;
});



//grid starting variables
let stylesheet = getComputedStyle(container);
let heightString = (stylesheet.getPropertyValue('height'));
let widthString = (stylesheet.getPropertyValue('width'));
let height = (heightString.match(/\d+/))[0];
let width = (widthString.match(/\d+/))[0];




function createGrid(num){
for(let i = 0; i < num; i++){
    for(let j = 0; j < num; j++){
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
        
        gridBlock.style.height = `calc(100%/${num})`;
        gridBlock.style.width = `calc(100%/${num})`;
        gridBlock.style.userSelect = "none";
        container.appendChild(gridBlock);

    }
}
}


createGrid(num);
const cells = document.querySelectorAll(".gridCell");
