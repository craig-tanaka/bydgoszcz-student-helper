const videoLinkInput = document.querySelector('#youtube-video-link-input')
const linkedVideoIframe = document.querySelector('.linked-video-iframe')
const linkedVideoErrorLabel = document.querySelector('.linked-video-error-label')
const formSubmitBtn = document.querySelector('.create-module-submit')
const titleInput = document.querySelector('#chapter-title-input')
const descriptionInput = document.querySelector('#chapter-description')
const descriptionErrorlabel = document.querySelector('.input-error-label#create-module')
const addQuizRadioInput = document.querySelector('.add-quiz-radio-option[value="Yes"]')
const continueChapterCreationForm = document.querySelector('.continue-creation-form')

const db = firebase.firestore();
let videoLinkID = '';

//grabs the url query paramters and stores them in variables
const urlParams = new URLSearchParams(window.location.search)
const moduleID = urlParams.get('mid')
const chapterNumber = urlParams.get('cid')

//adds the chapter number to page header ie. the H2 tag in the main element
const pageHeader = document.querySelector('main h2')
pageHeader.innerHTML = pageHeader.innerHTML + " " + chapterNumber

videoLinkInput.addEventListener('blur', (event) => {
        event.preventDefault()
        validateYoutubeLink(videoLinkInput.value)
})

function extractVideoIDFromLink(userLink) {
        let extractedID;
        
        if (userLink.length == 11) {
                // if string is just 11 chars long maybe the user has just input the video ID and hence no need to trim the string
                extractedID = userLink
        } else if (userLink.length > 11) {
                let identifyingSubstring;
                if (userLink.includes('embed')) { // Check if User provided an embed link
                        identifyingSubstring = 'embed/'
                } else if (userLink.includes('youtu.be')) { // check if user provided a shortened link
                        identifyingSubstring = 'youtu.be/';
                } else if (userLink.includes('?v=')) { // check if user provided normal link
                        identifyingSubstring = '?v='
                } else {
                        // TODO: Link is cut off and hence extracting correct id is not certain
                        
                }

                // Finding the index of the last letter before the video id which comes after the substring eg 'embed/'
                const startIndexOfSubstring = userLink.indexOf(identifyingSubstring);
                if (startIndexOfSubstring !== -1) {
                        let endIndexOfSubstring = startIndexOfSubstring + identifyingSubstring.length;
                        // get the 11 characters after the identifying substring as they are video id
                        extractedID = userLink.substr(endIndexOfSubstring, 11);
                }
        }
        if (extractedID && extractedID.length == 11) return extractedID;
        
        // TODO: Else Generate error message or maybe until user trys to submit form to show error message
        return null;
}

function validateYoutubeLink(userLink) {
        return new Promise((resolve, reject) => {
                let isVideoLinkValid = false;
                const videoID = extractVideoIDFromLink(userLink);

                const tempImg = new Image();
                tempImg.src = `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`;

                tempImg.onload = function () {
                if (tempImg.width === 120) {
                        linkedVideoErrorLabel.innerHTML = "Youtube video not found, Please make sure you copied the link correctly.";
                        linkedVideoErrorLabel.style.color = "#cb6666";
                        if (linkedVideoErrorLabel.classList.contains("hidden")) linkedVideoErrorLabel.classList.remove("hidden");
                        if (!linkedVideoIframe.classList.contains("hidden")) linkedVideoIframe.classList.add("hidden");
                        resolve(false); // Link is invalid
                } else {
                        linkedVideoIframe.src = `https://www.youtube.com/embed/${videoID}`;
                        linkedVideoIframe.classList.remove('hidden');
                        if (!linkedVideoErrorLabel.classList.contains("hidden")) linkedVideoErrorLabel.classList.add("hidden");
                        isVideoLinkValid = true;
                        videoLinkID = videoID
                        resolve(true); // Link is valid
                }
                };

                tempImg.onerror = function (error) {
                        linkedVideoErrorLabel.innerHTML = "Youtube did not respond. Please Try Again Later and if the problem still persists please contact the website administrator.";
                        linkedVideoErrorLabel.style.color = "#cb6666";
                        if (linkedVideoErrorLabel.classList.contains("hidden")) linkedVideoErrorLabel.classList.remove("hidden");
                        if (!linkedVideoIframe.classList.contains("hidden")) linkedVideoIframe.classList.add("hidden");
                        resolve(false); // Link maybe be valid but img.youtube.com is not responding
                };
        });
}




formSubmitBtn.addEventListener('click', (event) => {
        event.preventDefault()
        if (!validateForm()) return;
        
        formSubmitBtn.classList.add
        let hasQuiz = false
        if(addQuizRadioInput.checked) hasQuiz = true
        db.collection('modules').doc(moduleID).collection('chapters').doc(chapterNumber).set({
                title: titleInput.value,
                description: descriptionInput.value,
                videoLinkID: videoLinkID,
                hasQuiz: addQuizRadioInput.checked
        }).then((docRef) => {
                if (addQuizRadioInput.checked) {
                        window.location.href = `./create-chapter-quiz.html?mid=${moduleID}&cid=${chapterNumber}`
                } else {
                        document.querySelector('.create-module-main').classList.add('hidden')
                        continueChapterCreationForm.classList.remove('hidden')
                }
        }).catch((error) => {
                // alert(error)
                // console.log(error)
                //todo create error catch
        })
})

async function validateForm() {
        let isFormValid = false

        // The validation only returns true if the video is valid
        if (await validateYoutubeLink(videoLinkInput.value)) {
                isFormValid = true
                videoLinkInput.style.outline = 'none'
        } else
                videoLinkInput.style.outline = '1px solid red'
        
        //checking if description is empty and hence validation is false
        if (descriptionInput.value === "") {
                isFormValid = false
                descriptionInput.style.outline = '1px solid red'
                descriptionErrorlabel.style.opacity = '1'
        } else
                descriptionInput.style.outline = 'none'
        if (titleInput.value === "") {
                isFormValid = false
                titleInput.style.outline = '1px solid red'
                descriptionErrorlabel.style.opacity = '1'
        } else
                titleInput.style.outline = 'none'
        
        if(isFormValid) descriptionErrorlabel.style.opacity = '0'

        return isFormValid
}

document.querySelector('#create-another-chapter-btn').addEventListener('click', (event) => {
        event.preventDefault()
        window.location.href = `./create-module-chapter.html?mid=${moduleID}&cid=${Number(chapterNumber) + 1}`
})
document.querySelector('#dont-create-another-chapter-btn').addEventListener('click', (event) => {
        event.preventDefault()
        window.location.href = `./module.html?mid=${moduleID}`
})

//todo: remove all console.logins