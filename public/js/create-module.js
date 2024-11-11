const selectImgBtn = document.querySelector('.select-image-btn');
const imgInputElement = document.querySelector('.create-module-input.file')
const imgInputErrorLabel = document.querySelector('.input-error-label')

selectImgBtn.addEventListener('click', (event) => {
        imgInputElement.click();
})
imgInputElement.addEventListener('change', (event) => {

        //check if img size is less than 1mb
        var img = event.target.files[0];
        console.log(img)
        const maxSize = 1 * 1024 * 1024; // 1 MB in bytes
        if (img && img.size > maxSize) {
                imgInputErrorLabel.style.opacity = 1;
                imgInputElement.value = ""; // Clear the input
        } else {
                //else hide error label as there is no error
                imgInputErrorLabel.style.opacity = 0;
                // display image
                selectImgBtn.src = URL.createObjectURL(img)
        }

})