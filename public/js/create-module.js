// Grabbing main-details form elements
const moduleNameInput = document.querySelector('input#module-name')
const moduleDifficultyInput = document.querySelector('select#module-difficulty')
const moduleDescriptionInput = document.querySelector('textarea#module-description')
const mainDetailsErrorLabel = document.querySelector('#create-module-main-details .input-error-label')
const createModuleSubmit = document.querySelector('.create-module-submit')

//Grabbing img select elements
const selectImgBtn = document.querySelector('.select-image-btn');
const imgInputElement = document.querySelector('.create-module-input.file')
const imgInputErrorLabel = document.querySelector('.create-img-cont .input-error-label')

const db = firebase.firestore();
var documentReferenceNumber = null; // id used to identfy module in database

selectImgBtn.addEventListener('click', (event) => {
        imgInputElement.click();
})
imgInputElement.addEventListener('change', (event) => {

        //check if img size is less than 1mb
        var img = event.target.files[0];
        const maxSize = 750 * 1024; // 1 MB in bytes
        if (img && img.size > maxSize) {
                imgInputErrorLabel.innerHTML = "Image size must not be greater than 750kb";
                imgInputErrorLabel.style.opacity = 1;
                imgInputElement.value = ""; // Clear the input
        } else {
                //else hide error label as there is no error
                imgInputErrorLabel.style.opacity = 0;
                // display image
                selectImgBtn.src = URL.createObjectURL(img)
        }

})

// __The following functions are executed when submitting module after filling in main details_____________
createModuleSubmit.addEventListener('click', (event) => {
        event.preventDefault();

        if (allFieldsFilled()) {
                createModuleSubmit.classList.add("hidden");
                db.collection("modules").add({
                        name: moduleNameInput.value,
                        difficulty: moduleDifficultyInput.value,
                        description: moduleDescriptionInput.value,
                }).then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        alert('document Added To DB')
                        // documentReferenceNumber = 
                }).catch((error) => {
                        // if there is a field not filled shown error message else hide it
                        mainDetailsErrorLabel.innerHTML = "Failed to submit please try again later, or contact out support team";
                        mainDetailsErrorLabel.style.opacity = 1;
                        createModuleSubmit.classList.remove("hidden");
                        // console.error("Error adding document: ", error);
                });
        }
})
function allFieldsFilled() {
        var allfilled = true; 
        if (moduleNameInput.value == "") {
                moduleNameInput.style.outline = "1px solid red";
                allfilled = false;
        }else moduleNameInput.style.outline = "none";

        if (moduleDifficultyInput.value == "") {
                moduleDifficultyInput.style.outline = "1px solid red";
                allfilled = false;
        }else moduleDifficultyInput.style.outline = "none";

        if (moduleDescriptionInput.value == "") {
                moduleDescriptionInput.style.outline = "1px solid red";
                allfilled = false;
        }else moduleDescriptionInput.style.outline = "none";

        // if there is a field not filled shown error message else hide it
        mainDetailsErrorLabel.innerHTML = "Please fill in all highlighted fields";
        if (allfilled) mainDetailsErrorLabel.style.opacity = 0;
        else mainDetailsErrorLabel.style.opacity = 1;
        
        return allfilled;
}


