
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

function getHue(maxVal, minVal, RED, GREEN, BLUE){

    let hueVal = 0;

    if (minVal == maxVal){
        hueVal = 0;
    }
    else if (maxVal == RED){
         hueVal = ((GREEN - BLUE)/(maxVal - minVal));
    }

    else if (maxVal == GREEN){
         hueVal = (2.0 + ((BLUE - RED)/(maxVal - minVal)));
    }

    else{
         hueVal = (4.0 + ((RED - GREEN)/(maxVal - minVal)));
    }

    


    let hueAngle = (Number)(hueVal * 60);
    if(hueAngle < 0){
        return (hueAngle + 360);
    }

    else{
        return hueAngle;
    }
}

//uses the formula (minRgb+maxRgb/2) to get the luminance
function getLuminance(minRgb, maxRgb){
    return Math.round(((minRgb+maxRgb)/2) * 100);
}

function getSat(minRgb, maxRgb, luminance){
    if(minRgb == maxRgb){
        return 0;
    }

    //if minRgb and maxRgb are not equal
    else if(luminance <= 0.5){
        return Math.round((maxRgb-minRgb)/(maxRgb+minRgb)*100);
    }

    else{
        return Math.round((maxRgb-minRgb)/(2.0-maxRgb-minRgb) * 100);
    }
}




function createGrid(gridDimension){
for(let i = 0; i < gridDimension; i++){
    for(let j = 0; j < gridDimension; j++){
        const gridBlock = document.createElement('div');
        gridBlock.classList.add("gridCell");
        gridBlock.addEventListener('mousedown', function(e){
            switch(inputType){
                case 'color':
                    resetGridCell(gridBlock);
                   
                    gridBlock.style.background = `${penColor}`;
                    break;

                case 'rainbow':
                    resetGridCell(gridBlock);
                    let Red = randomRGB();
                    let Green = randomRGB();
                    let Blue = randomRGB();

                    gridBlock.style.background = `rgb(${Red}, ${Green}, ${Blue})`
                    break;

                case 'darken':
                    let bgColor = gridBlock.style.background;
                    /**
                     * No matter what, style.background/(Color) returns rgb() format
                     * So it is safe to modify it using hsl and then expect an rgb
                     * value when extracting color
                     */
                    //regex to extract the r,g,b values
                    let rgbArray = bgColor.match(/rgb\((\d+), (\d+), (\d+)\)/)

                    if(rgbArray == null){
                        break;
                    }

                    let red = (Number)(rgbArray[1]);
                    let green = (Number)(rgbArray[2]);
                    let blue = (Number)(rgbArray[3]);

                    //calculating r/255, g/255, b/255
                    let redDec = red/255;
                    let greenDec = green/255;
                    let blueDec = blue/255;
                    minRgb = Math.min(redDec, greenDec, blueDec);
                    maxRgb = Math.max(redDec, greenDec, blueDec);
                    let lumi = getLuminance(minRgb, maxRgb);
                    let sat = getSat(minRgb, maxRgb, lumi);
                    let hue = getHue(maxRgb, minRgb, redDec, greenDec, blueDec);

                    if(gridBlock.classList.contains("started")){
                        //convert the class list to an actual array
                        let classArray = Array.from(gridBlock.classList);
                        //create a string of all classes out of the array
                        //to be able to match a regex
                        let classString = classArray.join("_");
                        //use regex to extract the tenPercentLum value stored as a class.
                        let tenPercentValArr = classString.match(/tenPercent\-(\d+)/);

                        let lumDecrement = (Number)(tenPercentValArr[1]);

                        if(lumi <= 0){

                        }

                        else{
                            gridBlock.style.background = `hsl(${hue}, ${sat}%, ${lumi - lumDecrement}%)`;
                        }

                    }

                    else{

                        //this class indicates the grid has been darkened at least once
                        gridBlock.classList.add("started");

                        //value that will be decremented from the hue
                        //everytime.
                        let tenPercentLum = Math.round(lumi * 0.1);

                        //if started is found in classList, this value
                        // wil be extracted to decrease from the current lum.
                        // (10% of what it is before darkening started)
                        gridBlock.classList.add(`tenPercent-${tenPercentLum}`);

                        gridBlock.style.background = `hsl(${hue}, ${sat}%, ${lumi - tenPercentLum}%)`;
                    }

                    break;
                case 'eraser':
                    resetGridCell(gridBlock);
                    gridBlock.style.background = "none";
                    break;
                case 'texture':
                    resetGridCell(gridBlock);
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
                switch(inputType){
                    case 'color':
                        resetGridCell(gridBlock);
                        gridBlock.style.background = `${penColor}`;
                        break;
                    case 'rainbow':
                        resetGridCell(gridBlock);
                        let Red = randomRGB();
                        let Green = randomRGB();
                        let Blue = randomRGB();
                        gridBlock.style.background = `rgb(${Red}, ${Green}, ${Blue})`
                        break;
                    case 'eraser':
                        resetGridCell(gridBlock);
                        gridBlock.style.background = "none";
                        break;
                    
                    case 'darken':
                        let bgColor = gridBlock.style.background;
                        /**
                         * No matter what, style.background/(Color) returns rgb() format
                         * So it is safe to modify it using hsl and then expect an rgb
                         * value when extracting color
                         */
                        //regex to extract the r,g,b values
                        let rgbArray = bgColor.match(/rgb\((\d+), (\d+), (\d+)\)/)
                        if(rgbArray == null){
                            break;
                        }

                        let red = (Number)(rgbArray[1]);
                        let green = (Number)(rgbArray[2]);
                        let blue = (Number)(rgbArray[3]);

                        //calculating r/255, g/255, b/255
                        let redDec = red/255;
                        let greenDec = green/255;
                        let blueDec = blue/255;
                        minRgb = Math.min(redDec, greenDec, blueDec);
                        maxRgb = Math.max(redDec, greenDec, blueDec);
                        let lumi = getLuminance(minRgb, maxRgb);
                        let sat = getSat(minRgb, maxRgb, lumi);
                        let hue = getHue(maxRgb, minRgb, redDec, greenDec, blueDec);

                        if(gridBlock.classList.contains("started")){
                            //convert the class list to an actual array
                            let classArray = Array.from(gridBlock.classList);
                            //create a string of all classes out of the array
                            //to be able to match a regex
                            let classString = classArray.join("_");
                            //use regex to extract the tenPercentLum value stored as a class.
                            let tenPercentValArr = classString.match(/tenPercent\-(\d+)/);

                            let lumDecrement = (Number)(tenPercentValArr[1]);

                            if(lumi <= 0){

                            }

                            else{
                                gridBlock.style.background = `hsl(${hue}, ${sat}%, ${lumi - lumDecrement}%)`
                            }

                        }

                        else{

                            //this class indicates the grid has been darkened at least once
                            gridBlock.classList.add("started");

                            //value that will be decremented from the hue
                            //everytime.
                            let tenPercentLum = Math.round(lumi * 0.1);

                            //if started is found in classList, this value
                            // wil be extracted to decrease from the current lum.
                            // (10% of what it is before darkening started)
                            gridBlock.classList.add(`tenPercent-${tenPercentLum}`);

                            gridBlock.style.background = `hsl(${hue}, ${sat}%, ${lumi - tenPercentLum}%)`;
                        }


                        break;
                    case 'texture':
                        resetGridCell(gridBlock);
                        let bgImage = getTextureType();
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



