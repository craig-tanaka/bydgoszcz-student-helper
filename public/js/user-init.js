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
                                                <span class="account-name">${userDetails.email}</span>
                                                <button class="sign-out collasped">Sign Out</button>
                                        </span>`
                                
                                const accountText = accountElementsContainer.querySelector('.account-text')
                                addAccountEventListeners(accountText)
                        })
                try { // this method is only available in the watchlist.js hence this should on run on watchlist page
                        getUserWatchlist(user.uid)
                } catch {}
        } else {
                // todo Show error if user not logged
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