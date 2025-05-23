const moduleRow = document.querySelector('.module-row')

async function getModulesFromDB() {
        try {
                const docs = await db.collection('modules').get()
                setHeroModule(docs.docs)
                for (const doc of docs.docs) {
                        moduleDoc = doc
                        const imgDoc = await db.collection('modules').doc(doc.id).collection('images').doc('module-img').get()
                        addModuleToDOM(moduleDoc, imgDoc);
                }
                addModuleEventListeners()
        }
        catch (error) {
                //todo catch error
        }
}
getModulesFromDB()

// Sets random module from collection as Hero Moduels
async function setHeroModule(modules) {
        const randomNum = Math.floor(Math.random() * modules.length)
        let homeModule = modules[randomNum].data()

        document.querySelector('.hero-module-name').innerHTML = homeModule.name
        document.querySelector('.hero-module-description').innerHTML = homeModule.description

        const imgDoc = await db.collection('modules').doc(modules[randomNum].id).collection('images').doc('module-img').get()
        const imgType = imgDoc.data().imgType
        const imgData = imgDoc.data().imgData
        const imgSrc = `data:${imgType};base64,${imgData}`;
        document.querySelector('div.hero-module').style.backgroundImage = `url(${imgSrc})`
        
        const heroAddToWatchlist = document.querySelector('.hero-button.watchlist')
        heroAddToWatchlist.id = modules[randomNum].id
        heroAddToWatchlist.addEventListener('click', event => {
                checkIfModuleInWatchlist(event)
        })

        const startNow = document.querySelector('.hero-button.start-now')
        startNow.id = modules[randomNum].id
        startNow.addEventListener('click', event => {
                const mid = event.target.id
                window.location.href = `./module.html?mid=${mid}`
        })
}

function addModuleToDOM(moduleDoc, imgDoc) {
        let module = moduleDoc.data()
        let moduleContainer = document.createElement('div')

        // Convert the base64 string back into a data URL
        const imgType = imgDoc.data().imgType
        const imgData = imgDoc.data().imgData
        const imgSrc = `data:${imgType};base64,${imgData}`;

        // todo fix the number of likes to maybe enrolled and completers
        // todo fix the styling of the module as a whole

        moduleContainer.className = 'module'
        moduleContainer.id = moduleDoc.id
        moduleContainer.innerHTML =
                `<img src="${imgSrc}" alt="" class="module-img">
                <h3 class="module-name">${module.name}</h3>
                <p class="module-description hidden">${module.description}</p>
                <span class="module-details">
                        <span class="module-likes">
                                <img src="./img/likes-icon.png" class="likes-img">
                                <span class="number-of-likes">62</span>
                        </span>
                        <span class="module-views">
                                <img src="./img/views-icon.png" class="views-img">
                                <span class="number-of-views">1546</span>
                        </span>
                </span>`
        moduleRow.appendChild(moduleContainer)
}
function addModuleEventListeners() {
        document.querySelectorAll('.module-img').forEach((el) => {
                el.addEventListener('click', (event) => {
                        // Firstly this gets info about the specific module from the image that was click and its surronding elements instead of requerying the db
                        const moduleElement = event.target.parentElement
                        const moduleID = moduleElement.id
                        const moduleTitle = moduleElement.querySelector('.module-name').innerHTML
                        const moduleDescription = moduleElement.querySelector('.module-description').innerHTML

                        const modulePreviewCont = document.querySelector('.module-preview')

                        const moduleCont = document.createElement('div')
                        moduleCont.className = 'module-preview-main'
                        moduleCont.innerHTML = 
                                `<span class="module-preview-tags">
                                        <span class="tag">For Starters</span>
                                        <span class="tag">Most Recommended</span>
                                </span>
                                <h2 class="module-preview-name">${moduleTitle}</h2>
                                <p class="module-preview-description">${moduleDescription}</p>
                                <span class="module-preview-button-row">
                                        <button id="${moduleID}" class="module-preview-button start-now">Start-Now</button>
                                        <button id="${moduleID}" class="module-preview-button watchlist">Add to Watchlist</button>
                                </span>`

                        modulePreviewCont.appendChild(moduleCont)
                        document.querySelector('.module-preview-cont').style.display = 'initial';
                        addModulePreviewButtonEventListeners()
                });
        });
}

function addModulePreviewButtonEventListeners(){
        const modulePreviewContainer = document.querySelector('.module-preview-cont')
        const startbtn = modulePreviewContainer.querySelector('.start-now')

        startbtn.addEventListener('click', event => {
                const mid = event.target.id
                window.location.href = `./module.html?mid=${mid}`
        })
        document.querySelector('.module-preview-button.watchlist').addEventListener('click', checkIfModuleInWatchlist)
}

function checkIfModuleInWatchlist(event) {
        try { // in try block as the hero watchlist button wont work
                document.querySelector('.module-preview-button.watchlist').removeEventListener('click', checkIfModuleInWatchlist)
        } catch{}
        const moduleID = event.target.id
        const clickedBtn = event.target

        db.collection('users').doc(userID).get()
                .then(doc => {
                        if (doc.exists) {
                                const arrayField = doc.data().watchlist;
                                if (arrayField.includes(moduleID)) {
                                        clickedBtn.innerHTML = 'Module already in watchlist'
                                } else {
                                        addToWatchlist(moduleID, clickedBtn)
                                }
                        } else {
                                clickedBtn.innerHTML = 'User Does Not Exist'
                        }
                }).catch(error => {
                        // todo: error watever
                        console.error(error);
                });
}

function addToWatchlist(moduleID, clickedBtn) {
        db.collection('users').doc(userID).update({
                        watchlist: firebase.firestore.FieldValue.arrayUnion(moduleID)
                }).then(() => {
                        clickedBtn.innerHTML = 'Module Added To WatchList'
                }).catch(error => {
                        // todo make error 
                        console.error('Error adding value to array:', error);
                });
}

document.querySelector('.exit-module-preview').addEventListener('click', event => {
        //hides the preview windo and then removes the module info from the preview cont so that when module preview is reenabled that module info is gone
        const modulePreviewCont = document.querySelector('.module-preview-cont')
        modulePreviewCont.style.display = 'none';

        moduleContainer = modulePreviewCont.querySelector('.module-preview-main')
        moduleContainer.remove()
})

//todo add functionality for the module-preview add to watchlist button