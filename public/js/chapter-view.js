const nextChapterBtn = document.querySelector('.next-chapter-btn')

//grabs the url query paramters and stores them in variables
const urlParams = new URLSearchParams(window.location.search)
const moduleID = urlParams.get('mid')
const chapterNumber = urlParams.get('cid')

const db = firebase.firestore()

db.collection('modules').doc(moduleID).collection('chapters').doc(chapterNumber).get()
        .then(doc => {
                const title = document.querySelector('.module-description-cont h2')
                const description = document.querySelector('.module-actual-description')
                const tempImg = document.querySelector('img.video')
                const video = document.querySelector('.linked-video-iframe')

                title.innerHTML = doc.data().title
                description.innerHTML = doc.data().description
                video.src = `https://www.youtube.com/embed/${doc.data().videoLinkID}`

                tempImg.classList.add('hidden')
                video.classList.remove('hidden')
        })

nextChapterBtn.addEventListener('click', event => {
        window.location.href = `./chapter-view.html?mid=${moduleID}&cid=${Number(chapterNumber) + 1}`
})