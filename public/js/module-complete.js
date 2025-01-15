//grabs the url query paramters and stores them in variables
const urlParams = new URLSearchParams(window.location.search)
const moduleID = urlParams.get('mid')

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