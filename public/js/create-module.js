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
const imgInputSubmit = document.querySelector('.create-img-cont .img-submit')

let documentReferenceNumber = null; // id used to identfy module in database

selectImgBtn.addEventListener('click', (event) => {
        imgInputElement.click();
})
imgInputElement.addEventListener('change', (event) => {

        //check if img size is less than 1mb
        let img = event.target.files[0];
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
                        enrolled: 0,
                        completers: 0,
                        numOfChapters: 0
                }).then((docRef) => {
                        documentReferenceNumber = docRef.id;
                        // Hide main module details form and show picture select form
                        document.querySelector('#create-module-main-details').classList.add('hidden')
                        document.querySelector('.create-img-cont').classList.remove('hidden')
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
        let allfilled = true; 
        if (moduleNameInput.value == "") {
                moduleNameInput.style.outline = "1px solid red";
                allfilled = false;
        }else moduleNameInput.style.outline = "none";

        if (moduleDifficultyInput.value == "") {
                moduleDifficultyInput.style.outline = "1px solid red";
                allfilled = false;
        }else moduleDifficultyInput.style.outline = "none"; //Todo limit the text to a spoecific number here and in the chapter description

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


// _______The following functions are executed when submitting module after select module image_____________
imgInputSubmit.addEventListener('click', () => {
        if (imgInputElement.value == "") {
                imgInputElement.innerHTML = "Please select an image for the module";
                imgInputErrorLabel.style.opacity = 1;
                return;
        }

        const file = imgInputElement.files[0];
        if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                        let base64ImgString = reader.result.split(',')[1];
                        let imgType = reader.result.split(',')[0].match(/:(.*?);/)[1];
                        db.collection('modules').doc(documentReferenceNumber).collection('images').doc('module-img').set({
                                imgData: base64ImgString,
                                imgType: imgType
                        }).then((docRef) => {
                                window.location.href = `./create-module-chapter.html?mid=${documentReferenceNumber}&cid=1`
                        }).catch((error) => {
                                alert('error')
                                // if there is a field not filled shown error message else hide it
                                imgInputErrorLabel.innerHTML = "Failed to submit image please try again later, or contact out support team";
                                imgInputErrorLabel.style.opacity = 1;
                        });
                }
        }
})
