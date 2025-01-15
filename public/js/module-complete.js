//grabs the url query paramters and stores them in variables
const urlParams = new URLSearchParams(window.location.search)
const moduleID = urlParams.get('mid')

const continueBtn = document.querySelector('.module-complete-cont .continue')

db.collection('modules').doc(moduleID).get()
.then(doc => {
        document.querySelector('.module-complete-cont .module-name').innerHTML = doc.data().name
})
db.collection('modules').doc(moduleID).collection('images').doc('module-img').get()
        .then(doc => {
                const imgType = doc.data().imgType
                const imgData = doc.data().imgData
                const imgSrc = `data:${imgType};base64,${imgData}`;
                
                const imgElement = document.querySelector('.module-complete-cont .module-img')
                imgElement.src = imgSrc
                imgElement.classList.remove('hidden')
        })

continueBtn.addEventListener('click', checkIfModuleInCompleteList)

function checkIfModuleInCompleteList() {
        continueBtn.classList.add('hidden')

        db.collection('users').doc(userID).get()
                .then(doc => {
                        if (doc.exists) {
                                const arrayField = doc.data().completed;

                                if (arrayField.includes(moduleID)) window.location.href = './index.html'
                                else addToCompletelist()

                        } else {
                                continueBtn.innerHTML = 'Please Login'
                                continueBtn.classList.remove('hidden')
                                // todo: maybe better error message
                        }
                }).catch(error => {
                        // todo: error watever
                        continueBtn.innerHTML = 'Site Error'
                        continueBtn.classList.remove('hidden')
                });
}

function addToCompletelist() {
        db.collection('users').doc(userID).update({
                completed: firebase.firestore.FieldValue.arrayUnion(moduleID)
        }).then(() => {
                window.location.href = './index.html'
        }).catch(error => {
                // todo make error 
                console.error('Error adding value to array:', error);
        });
}