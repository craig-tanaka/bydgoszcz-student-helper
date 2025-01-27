const db = firebase.firestore()
let userID;
let userDetails;

const accountElementsContainer = document.querySelector('span.account-cont')

firebase.auth().onAuthStateChanged((user) => {
        if (user) {
                userID = user.uid
                db.collection('users').doc(userID).get()
                        .then(doc => {
                                userDetails = doc.data()
                                accountElementsContainer.innerHTML = 
                                        `<img src="./img/sample-profile-pic.webp" class="account-img">
                                        <span class="account-text">
                                                <span class="account-name">${userDetails.name}</span>
                                                <span class="account-email">${userDetails.email}</span>
                                                <button class="sign-out collasped">Sign Out</button>
                                        </span>`
                                
                                const accountText = accountElementsContainer.querySelector('.account-text')
                                addAccountEventListeners(accountText)
                                if( userDetails.isAdmin ) addAdminLinks()
                        })
                getUserContinueList()
                try { // this method is only available in the watchlist.js hence this should on run on watchlist page
                        getUserWatchlist(user.uid)
                } catch {}
        } else {
                // todo Show error if user not logged
                window.location.href = "./login.html"
        }
});

function addAccountEventListeners(element) {
        const signOutBtn = element.querySelector('.sign-out')
        element.addEventListener('mouseover', event => {
                signOutBtn.classList.remove('collasped')
        })
        element.addEventListener('mouseout', event => {
                signOutBtn.classList.add('collasped')
        })
        signOutBtn.addEventListener('click', event => {
                firebase.auth().signOut()
                        .then(() => {
                                window.location.href = './login.html'
                        }).catch((error) => {
                        //todo handle error
                                console.error('Error signing out:', error);
                        });
                })
}

async function getUserContinueList() {
        const doc = await db.collection('continue').doc(userID).get();
        if (doc.exists) {
                const data = doc.data();
                
                for (const [moduleID, chapterNum] of Object.entries(data)) {
                        const moduleDoc = await db.collection('modules').doc(moduleID).get();
                        const imgDoc = await db.collection('modules').doc(moduleID).collection('images').doc('module-img').get();
                        
                        // Add the module to the continue list
                        addModuleToContinueList(moduleDoc, imgDoc, chapterNum);
                }
        } else {
                // Todo: Handle case when the document doesn't exist
                console.log('No such document!');
        }
}

function addModuleToContinueList(moduleDoc, imgDoc, chapterNum) {
        let module = moduleDoc.data()

        // Convert the base64 string back into a data URL
        const imgType = imgDoc.data().imgType
        const imgData = imgDoc.data().imgData
        const imgSrc = `data:${imgType};base64,${imgData}`;

        // create module Element
        let moduleContainer = document.createElement('div')
        moduleContainer.className = 'continue-module-cont'
        moduleContainer.id = moduleDoc.id
        moduleContainer.innerHTML =
                `<span class="continue-module-details">
                        <img src="${imgSrc}" alt="" class="continue-module-img">
                        <span class="continue-module-text">
                                <h4 class="continue-module-name">${module.name}</h4>
                                <span class="module-bookmark-place">Chapter ${chapterNum}</span>
                        </span>
                </span>
                <img src="./img/play-icon.png" alt="" class="continue-module-play">`
        
        document.querySelector('.siderbar-continue-list').appendChild(moduleContainer)
}

function addAdminLinks() {
        const linksContainer = document.querySelector('.sidebar-links-list')

        let createModuleLink = document.createElement('a')
        
        createModuleLink.className = 'sidebar-link'
        createModuleLink.href = './create-module.html'
        createModuleLink.innerHTML = 
                `<img src="./img/create-module.png" class="sidebar-link-icon">
                <span>Create Module</span>`
        
        linksContainer.appendChild(createModuleLink)
}