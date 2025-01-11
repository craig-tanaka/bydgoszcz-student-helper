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
                                        </span>`
                        })
                
        } else {
                // todo Show error if user not logged
        }
});