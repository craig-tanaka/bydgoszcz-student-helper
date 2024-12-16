const moduleRow = document.querySelector('.module-row')
const db = firebase.firestore()

async function getModulesFromDB() {
        try {
                const docs = await db.collection('modules').get()
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
        const watchlistBtn = modulePreviewContainer.querySelector('.watchlist')

        startbtn.addEventListener('click', event => {
                const mid = event.target.id
                window.location.href = `./module.html?mid=${mid}`
        })
}

document.querySelector('.exit-module-preview').addEventListener('click', event => {
        //hides the preview windo and then removes the module info from the preview cont so that when module preview is reenabled that module info is gone
        const modulePreviewCont = document.querySelector('.module-preview-cont')
        modulePreviewCont.style.display = 'none';

        moduleContainer = modulePreviewCont.querySelector('.module-preview-main')
        moduleContainer.remove()
})

//todo add functionality for the module-preview add to watchlist button