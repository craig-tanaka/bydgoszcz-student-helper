const enrollBtn = document.querySelector('.module-enroll')

const db = firebase.firestore()

//grabs the url query paramters and stores them in variables
const urlParams = new URLSearchParams(window.location.search)
const moduleID = urlParams.get('mid')

//Gets Module info from database then calls the method that adds info to dom
db.collection('modules').doc(moduleID).get()
        .then((doc) => {
                if (doc.exists) {
                        console.log(doc.data())
                        addModuleInfoToDOM(doc.data())
                } else {
                        //todo handle doc not found problem
                }
        })
        .catch((error) => {
                //todo handle error
        })
function addModuleInfoToDOM(moduleData) {
        const moduleNameElement = document.querySelector('.module-title')
        const moduleDescriptionElement = document.querySelector('.module-description')
        const moduleDiffucultyElement = document.querySelector('.difficulty-level')
        const moduleEnrolledElement = document.querySelector('.number-of-enrolled')
        const moduleCompletersElement = document.querySelector('.number-of-completers')
        const moduleChaptersElement = document.querySelector('.number-of-lessons')

        moduleNameElement.innerHTML = moduleData.name
        moduleDescriptionElement.innerHTML = moduleData.description
        moduleDiffucultyElement.innerHTML = moduleData.difficulty
        moduleEnrolledElement.innerHTML = moduleData.enrolled
        moduleCompletersElement.innerHTML = moduleData.completers
        moduleChaptersElement.innerHTML = moduleData.numOfChapters
        getModuleImageFromDB()
}

//Gets Module img from database then calls the method that adds img to dom
function getModuleImageFromDB() {
        db.collection('modules').doc(moduleID).collection('images').doc('module-img').get()
                .then((doc) => {
                        if (doc.exists) {
                                console.log(doc.data())
                                addImageToDOM(doc.data())
                        } else {
                                //todo handle doc not found problem
                        }
                })
                .catch( (error) => {
                        //todo handle error
                })
}
function addImageToDOM(imgDoc) {
        // Convert the base64 string back into a data URL
        const imgType = imgDoc.imgType
        const imgData = imgDoc.imgData
        const imgSrc = `data:${imgType};base64,${imgData}`;

        // Set the src attribute of your img element
        const imgElement = document.querySelector('.module-hero-img');
        imgElement.src = imgSrc;
}

enrollBtn.addEventListener('click', event => {
        //Todo enroll student in modules
        window.location.href = `./module-view.html?mid=${moduleID}&cid=1`
})