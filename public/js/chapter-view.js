const nextChapterBtn = document.querySelector('.next-chapter-btn')

//grabs the url query paramters and stores them in variables
const urlParams = new URLSearchParams(window.location.search)
const moduleID = urlParams.get('mid')
const chapterNumber = urlParams.get('cid')

let numOfChapters;
let hasQuiz = false;

db.collection('modules').doc(moduleID).collection('chapters').doc(chapterNumber).get()
        .then(doc => {
                const title = document.querySelector('.module-description-cont h2')
                const description = document.querySelector('.module-actual-description')
                const tempImg = document.querySelector('img.video')
                const video = document.querySelector('.linked-video-iframe')

                title.innerHTML = doc.data().title
                description.innerHTML = doc.data().description
                video.src = `https://www.youtube.com/embed/${doc.data().videoLinkID}`

                hasQuiz = doc.data().hasQuiz

                tempImg.classList.add('hidden')
                video.classList.remove('hidden')
        })

db.collection('modules').doc(moduleID).get()
        .then(doc => {
                numOfChapters = doc.data().numOfChapters
        } )

nextChapterBtn.addEventListener('click', event => {
        if (hasQuiz) window.location.href = `./view-chapter-quiz.html?mid=${moduleID}&cid=${chapterNumber}`
        else {
                if (numOfChapters && numOfChapters === chapterNumber) window.location.href = `./module-complete.html?mid=${moduleID}`
                else window.location.href = `./chapter-view.html?mid=${moduleID}&cid=${Number(chapterNumber) + 1}`
        }
})

// Adds and/or updates the user's continue list to have this module and chapter boomark
firebase.auth().onAuthStateChanged((user) => {
        db.collection('continue').doc(userID)
                .set(
                        { [moduleID]: chapterNumber },
                        { merge: true })
                .catch((error) => {
                        //todo: maybe redo the function or something if it fails
                });
})