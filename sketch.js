
//Select relevant nodes
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
const bod = document.querySelector("body");
const sunButton = document.querySelector(".light");
const moonButton = document.querySelector(".dark");
const themeButtons = document.querySelector(".buttons");
const slider = document.querySelector("#slider");
let gridDimension = slider.value;
const sliderLabel = document.querySelector(".slider-label");
sliderLabel.textContent = `${gridDimension} x ${gridDimension}`;

//rainbow functionality
function randomRGB(){
    let colorValue = Math.floor(Math.random()*256);

    return colorValue;
}



//Grid configuration/reset functionality
function removeAllCells(){
    let gridList = document.querySelectorAll(".gridCell");
    gridList.forEach((gridCell) => {
        gridCell.parentNode.removeChild(gridCell);
    })
}
function resetGrid(gridDimension){
    removeAllCells();
    createGrid(gridDimension);
}
slider.addEventListener("click", function(){
    sliderLabel.textContent = `${gridDimension} x ${gridDimension}`;

})
slider.addEvent
slider.addEventListener("change", function(e){
    gridDimension = slider.value;
    sliderLabel.textContent = `${gridDimension} x ${gridDimension}`;
    resetGrid(gridDimension);

})

//Initialize interface with default setup
colorRadioButton.checked = true; //ensuring inputType starts with 'color' as default regardless of the last choice.
var inputType = inputSelection();
var penColor = document.getElementById("picker").value;
bod.classList.add("lightTheme");
container.classList.add("lightElement");
themeButtons.removeChild(moonButton);
penConfig.removeChild(texturepicker);

//Return the id of the radio button that is selected
function inputSelection(){
    for (const Rbtn of inputTypes){
        if(Rbtn.checked){
            return Rbtn.id;
        }
    }
}

//Event Listeners for pen radio buttons
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

    else if(inputType == "texture"){
        penConfig.removeChild(texturepicker);
    }

    inputType = inputSelection();
});
darkenRadioButton.addEventListener('click', function(){
    if(inputType == "color"){
        penConfig.removeChild(colorpicker);
    }

    else if(inputType == "texture"){
        penConfig.removeChild(texturepicker);
    }

    inputType = inputSelection();
});
eraserRadioButton.addEventListener('click', function(){
    if(inputType == "color"){
        penConfig.removeChild(colorpicker);
    }

    else if(inputType == "texture"){
        penConfig.removeChild(texturepicker);
    }

    inputType = inputSelection();
})

//Returns the selected texture type
function getTextureType(){
    var texturelist = document.querySelector("select[name= 'texture']");

    var textureChosen = texturelist.value;

    return textureChosen;

}



//Event Listeners for theme buttons
sunButton.addEventListener("click", function(e){
    bod.classList.remove("lightTheme");
    themeButtons.removeChild(sunButton);
    themeButtons.appendChild(moonButton);
    bod.classList.add("darkTheme");
    bod.classList.toggle("lightFont")
    container.classList.toggle("darkElement");
    container.classList.toggle("lightElement")
})
moonButton.addEventListener("click", function(){
    bod.classList.remove("darkTheme");
    themeButtons.removeChild(moonButton);
    themeButtons.appendChild(sunButton);
    bod.classList.add("lightTheme");
    bod.classList.toggle("lightFont");
    container.classList.toggle("lightElement");
    container.classList.toggle("darkElement");
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



//removes all texture classes from a cell
function removetextureClasses(gridNode){
    const classes = gridNode.classList;
    const classesArr = Array.from(classes);

    classesArr.forEach(function(className){
        if(className!="gridCell"){
            classes.remove(className);
        }
    });

};

//Resets grid cell for next interaction
function resetGridCell(gridNode){
    removetextureClasses(gridNode)

    gridNode.style.background = "none";
    
}




function createGrid(gridDimension){
for(let i = 0; i < gridDimension; i++){
    for(let j = 0; j < gridDimension; j++){
        const gridBlock = document.createElement('div');
        gridBlock.classList.add("gridCell");
        gridBlock.addEventListener('mousedown', function(e){
            resetGridCell(gridBlock);
            switch(inputType){
                case 'color':
                   
                    gridBlock.style.background = `${penColor}`;
                    break;

                case 'rainbow':
                    let Red = randomRGB();
                    let Green = randomRGB();
                    let Blue = randomRGB();

                    gridBlock.style.background = `rgb(${Red}, ${Green}, ${Blue})`
                    break;
                case 'eraser':
                    
                    gridBlock.style.background = "none";
                    break;
                case 'texture':
                    var bgImage = getTextureType();
                    switch(bgImage){
                        case 'dirt':
                            gridBlock.classList.add("dirt");
                            break;
                        case 'fire':
                            gridBlock.classList.add("fire");
                            break;
                        case 'grass':
                            gridBlock.classList.add("grass");
                            break;
                        case 'brick':
                            gridBlock.classList.add("brick");
                            break;
                    }
                    break;

            }
        })
        gridBlock.addEventListener('mouseover', function(event){
            if(mouseDown){
                resetGridCell(gridBlock);
                switch(inputType){
                    case 'color':
                        gridBlock.style.background = `${penColor}`;
                        break;
                    case 'rainbow':
                        let Red = randomRGB();
                        let Green = randomRGB();
                        let Blue = randomRGB();
                        gridBlock.style.background = `rgb(${Red}, ${Green}, ${Blue})`
                        break;
                    case 'eraser':
                        gridBlock.style.background = "none";
                        break;
                    case 'texture':
                        var bgImage = getTextureType();
                        switch(bgImage){
                            case 'dirt':
                                gridBlock.classList.add("dirt");
                                break;
                            case 'fire':
                                gridBlock.classList.add("fire");
                                break;
                            case 'grass':
                                gridBlock.classList.add("grass");
                                break;
                            case 'brick':
                                gridBlock.classList.add("brick");
                                break;
                            }
                            break;

                }
                     
            }
        })
        
        gridBlock.style.height = `calc(100%/${gridDimension})`;
        gridBlock.style.width = `calc(100%/${gridDimension})`;
        gridBlock.style.userSelect = "none";
        container.appendChild(gridBlock);

    }
}
}


createGrid(gridDimension);



