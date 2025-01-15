function getUserWatchlist(userID) {
        db.collection('users').doc(userID).get()
                .then(doc => {
                        if (doc.exists) {
                                getModules(doc.data().completed)
                        } else {
                                //todo handle doc not found problem
                        }
                })
                .catch((error) => {
                        //todo handle error
                })
}

async function getModules(completed) {
        try {
                if (completed.length === 0) {
                        document.querySelector('.watchlist-modules').innerHTML = 'You have not completed any modules'
                }
                for (const moduleID of completed) {
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
                <button id="${moduleDoc.id}" class="module-btn start hidden">View</button>`
        
        moduleRow.prepend(moduleContainer)
}

function addModuleEventListener() {
        const moduleElements = document.querySelectorAll('.module-cont')

        moduleElements.forEach(module => {
                module.addEventListener('mouseenter', event => {
                        const startBtn = module.querySelector('.start')
                        const overlay = module.querySelector('.overlay')

                        startBtn.classList.remove('hidden')
                        overlay.classList.remove('hidden')
                })
                module.addEventListener('mouseleave', event => {
                        const startBtn = module.querySelector('.start')
                        const overlay = module.querySelector('.overlay')

                        startBtn.classList.add('hidden')
                        overlay.classList.add('hidden')
                })
                module.querySelector('.start').addEventListener('click', event => {
                        window.location.href = `./module.html?mid=${module.id}`
                })
        })
}