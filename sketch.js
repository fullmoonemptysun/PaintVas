//Starting variables
const texturepicker = document.querySelector('.texturepicker');
const inputTypes = document.querySelectorAll("input[name='pen']");
const penConfig = document.querySelector(".penConfig");
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
const themeButtons = document.querySelector(".buttons");
var inputType = inputSelection();
var penColor = document.getElementById("picker").value;


function inputSelection(){
    var selected;
    for (const Rbtn of inputTypes){
        if(Rbtn.checked){
            return Rbtn.id;
        }
    }
}
//Event Listeners for pen buttons
colorRadioButton.addEventListener('click', function(e){
    if(inputType == "texture"){
        penConfig.removeChild(texturepicker);
        penConfig.appendChild(colorpicker);
    }

    else if(inputType == "darken" || inputType == "rainbow" || inputType == "eraser"){
        penConfig.appendChild(colorpicker);
    }

    inputType = inputSelection();

});
textureRadioButton.addEventListener('click', function(){
    if(inputType == "color"){
        penConfig.removeChild(colorpicker);
        penConfig.appendChild(texturepicker);
    }

    else if(inputType == "darken" || inputType == "rainbow" || inputType == "eraser"){
        penConfig.appendChild(texturepicker);
    }

    inputType = inputSelection();

});
rainbowRadioButton.addEventListener('click', function(){
    if(inputType == "color"){
        penConfig.removeChild(colorpicker);
    }

    else if(inputType = "texture"){
        penConfig.removeChild(texturepicker);
    }

    inputType = inputSelection();
});
darkenRadioButton.addEventListener('click', function(){
    if(inputType == "color"){
        penConfig.removeChild(colorpicker);
    }

    else if(inputType = "texture"){
        penConfig.removeChild(texturepicker);
    }

    inputType = inputSelection();
});
eraserRadioButton.addEventListener('click', function(){
    if(inputType == "color"){
        penConfig.removeChild(colorpicker);
    }

    else if(inputType = "texture"){
        penConfig.removeChild(texturepicker);
    }

    inputType = inputSelection();
})





bod.classList.add("lightTheme");
themeButtons.removeChild(moonButton);
//Event Listeners for theme buttons
sunButton.addEventListener("click", function(e){
    bod.classList.remove("lightTheme");
    themeButtons.removeChild(sunButton);
    themeButtons.appendChild(moonButton);
    bod.classList.add("darkTheme");
    bod.classList.toggle("lightFont")
})
moonButton.addEventListener("click", function(){
    bod.classList.remove("darkTheme");
    themeButtons.removeChild(moonButton);
    themeButtons.appendChild(sunButton);
    bod.classList.add("lightTheme");
    bod.classList.toggle("lightFont");
})

//color pen events
const htmlColor = document.querySelector('#picker');
htmlColor.addEventListener('change', function(e){
    penColor = document.getElementById("picker").value;
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
            switch(inputType){
                case 'color':
                    gridBlock.style.backgroundColor = `${penColor}`;
                    break;
                case 'eraser':
                    gridBlock.style.backgroundColor = "white";
                    break;
            }
        })
        gridBlock.addEventListener('mouseover', function(event){
            if(mouseDown){
                switch(inputType){
                    case 'color':
                        gridBlock.style.backgroundColor = `${penColor}`;
                        break;
                    case 'eraser':
                        gridBlock.style.backgroundColor = "white";
                        break;
                }
                     
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


