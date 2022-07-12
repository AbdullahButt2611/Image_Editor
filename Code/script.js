const fileInput = document.querySelector(".file-input");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterValue = document.querySelector(".filter-info .value");
const filterSlider = document.querySelector(".slider input");
const rotateOptions = document.querySelectorAll(".rotate button");
const previewImg = document.querySelector(".preview-img img");
const resetFilterBtn = document.querySelector(".reset-filter");
const chooseImgBtn = document.querySelector(".choose-img");
const saveImgBtn = document.querySelector(".save-img");

let brighteness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal =1, flipVertical =1;


// This function will apply the filter on the image that has been selected by the user
const applyFilter = () => {
    previewImg.style.transform = 'rotate('+String(rotate)+'deg)  scale('+ String(flipHorizontal)+','+String(flipVertical)+')';
    previewImg.style.filter = 'brightness('+String(brighteness)+'%) saturate(' + String(saturation) + '%) invert('+ String(inversion) +'%) grayscale(' + String(grayscale) +'%) ';
}

// This function will load the image and will enable the editing section
const loadImage = ()=>{
    let file = fileInput.files[0];                      //Gets the User Selected Files
    if(!file) return;                                   //If user does not select any file then it simply return to the calling command
    previewImg.src = URL.createObjectURL(file);         //passing the file URL to open it up.
    
    /*  This will keep the element inactive untill some picture is chosen. Once the pic is chosen, then it will be enabled again*/
    previewImg.addEventListener("load", ()=>{
        resetFilterBtn.click();             //Clicking the reset button so that the values of the filters can be removed
        document.querySelector(".container").classList.remove("disable");
    });
}   

filterOptions.forEach(option => {

    // Adding click event listener to all filter buttons
    option.addEventListener("click", () => {

        // These two line will disbale the blue color fill of the active button and then add the active class 
        // in the selected button
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");

        filterName.innerText = option.innerText;

        if(option.id === "brightness")
        {
            filterSlider.max = "200";
              filterSlider.value = brighteness;
              filterValue.innerText = String(brighteness + '%');
        }
        else if(option.id === "saturation")
        {
            filterSlider.max = "200";
             filterSlider.value = saturation;
             filterValue.innerText = String(saturation + '%');
        }
        else if(option.id === "inversion")
        {
            filterSlider.max = "100";
             filterSlider.value = inversion;
             filterValue.innerText = String(inversion + '%');
        }
        else if(option.id === "grayscale")
        {
            filterSlider.max = "100";
             filterSlider.value = grayscale;
             filterValue.innerText = String(grayscale + '%');
        }
    }); 
})


// This will update the values of slider and their notations
const updateFilter = () =>{
    filterValue.innerText = String(filterSlider.value + '%') ;
    const selectedFilter = document.querySelector('.filter .active');
    
    if(selectedFilter.id === "brightness")
    {
        brighteness = filterSlider.value;
    }
    else if(selectedFilter.id === "saturation")
    {
        saturation = filterSlider.value;
    }
    else if(selectedFilter.id === "inversion")
    {
        inversion = filterSlider.value;
    }
    else if(selectedFilter.id === "grayscale")
    {
        grayscale = filterSlider.value;
    }

    applyFilter();
    
}


rotateOptions.forEach(option => {
    option.addEventListener("click", ()=>{          //Adding click event listener to the rotating buttons
        if(option.id === "left")
        {
            rotate -= 90;                   //If the left button is pressed then the current rotation value will be decremented by 90 deg

        }
        else if(option.id === "right")
        {
            rotate += 90;                   //If the right button is pressed then the current rotation value will be incremented by 90 deg

        }
        else if(option.id === "horizontal")
        {
            //If the flip horizontal value is set to 1, set it to -1, else set it to 1;
            flipHorizontal = flipHorizontal === 1? -1 : 1;                  

        }
        else if(option.id === "vertical")
        {
            //If the flip vertical value is set to 1, set it to -1, else set it to 1;
            flipVertical = flipVertical === 1? -1 : 1;

        }

        applyFilter();
    });
});

// This function is for resetting the picture on clicking the reset button
const resetFilter = () =>{
    // Resetting all variable values to its default values
    brighteness = 100, saturation = 100, inversion = 0, grayscale = 0;
    rotate = 0, flipHorizontal =1, flipVertical =1;
    filterOptions[0].click();       //Clicking the brighteness button so that the brighteness by default be selected
    applyFilter();
}

// This is a function for creating the canvas and then saving the image
const saveImage = () => {
    const canvas = document.createElement("canvas");            //Creating a canvas element
    const ctx = canvas.getContext("2d");                //Returns a drawing context
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    // Applying user selected filters to canvas
    ctx.filter = 'brightness('+String(brighteness)+'%) saturate(' + String(saturation) + '%) invert('+ String(inversion) +'%) grayscale(' + String(grayscale) +'%) ';
    ctx.translate(canvas.width / 2, canvas.height / 2);       //Translating canvas from center
    
    if(rotate !== 0)
    {
        ctx.rotate(rotate * Math.PI /180);
    }
    
    ctx.scale(flipHorizontal, flipVertical);
    
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    // Code for downloading the image
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();                 //passing a tag's href value to the canvas URL
    link.click();                                   //Clicking the link so that the image can be downloaded
    // document.body.appendChild(canvas);                  //This will show the final result in the webpage
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);

chooseImgBtn.addEventListener("click", () => fileInput.click());