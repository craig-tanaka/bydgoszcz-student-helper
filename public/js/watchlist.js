const db = firebase.firestore()
let userID;

firebase.auth().onAuthStateChanged((user) => {
        if (user) {
                userID = user.uid
                getUserWatchlist(user.uid)
        } else {
                // todo Show error if user not logged
        }
});

function getUserWatchlist(userID) {
        db.collection('users').doc(userID).get()
                .then(doc => {
                        if (doc.exists) {
                                getModules(doc.data().watchlist)
                        } else {
                                //todo handle doc not found problem
                        }
                })
                .catch((error) => {
                        //todo handle error
                })
}

async function getModules(watchlist) {
        try {
                for (const moduleID of watchlist) {
                        const moduleDoc = await db.collection('modules').doc(moduleID).get()
                        const imgDoc = await db.collection('modules').doc(moduleID).collection('images').doc('module-img').get()

                        addModuleToDOM(moduleDoc, imgDoc);
                }
                addModuleEventListener()
        }
        catch (error) {
                //todo catch error
        }
}

function addModuleToDOM(moduleDoc, imgDoc) {
        const moduleRow = document.querySelector('.watchlist-modules')
        const module = moduleDoc.data()
        const moduleContainer = document.createElement('div')

        // Convert the base64 string back into a data URL
        const imgType = imgDoc.data().imgType
        const imgData = imgDoc.data().imgData
        const imgSrc = `data:${imgType};base64,${imgData}`;

        // todo fix the number of likes to maybe enrolled and completers
        // todo fix the styling of the module as a whole

        moduleContainer.className = 'module-cont'
        moduleContainer.id = moduleDoc.id
        moduleContainer.innerHTML =
                `<img src="${imgSrc}" class="module-img">
                <h4 class="module-title">${module.name}</h4>
                <div class="overlay hidden"></div>
                <button id="${moduleDoc.id}" class="module-btn start hidden">Start</button>
                <button id="${moduleDoc.id}" class="module-btn remove hidden">Remove</button>`
        
        moduleRow.prepend(moduleContainer)
}

function addModuleEventListener() {
        const moduleElements = document.querySelectorAll('.module-cont')

        moduleElements.forEach(module => {
                module.addEventListener('mouseenter', event => {
                        const startBtn = module.querySelector('.start')
                        const removeBtn = module.querySelector('.remove')
                        const overlay = module.querySelector('.overlay')

                        startBtn.classList.remove('hidden')
                        removeBtn.classList.remove('hidden')
                        overlay.classList.remove('hidden')
                })
                module.addEventListener('mouseleave', event => {
                        const startBtn = module.querySelector('.start')
                        const removeBtn = module.querySelector('.remove')
                        const overlay = module.querySelector('.overlay')

                        startBtn.classList.add('hidden')
                        removeBtn.classList.add('hidden')
                        overlay.classList.add('hidden')
                })
                module.querySelector('.start').addEventListener('click', event => {
                        window.location.href = `./module.html?mid=${module.id}`
                })
                module.querySelector('.remove').addEventListener('click', event => {
                        module.classList.add('hidden')
                        db.collection('users').doc(userID).update({
                                watchlist: firebase.firestore.FieldValue.arrayRemove(module.id) // Object must match exactly
                        }).then(doc => {
                                const moduleRow = document.querySelector('.watchlist-modules')
                                moduleRow.removeChild(module)
                        }).catch(error => {
                                // todo handle failed to remove error
                                module.classList.remove('hidden')
                        })
                })
        })
}