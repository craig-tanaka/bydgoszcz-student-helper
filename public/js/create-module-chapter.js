const videoLinkInput = document.querySelector('#youtube-video-link-input')
const linkedVideoIframe = document.querySelector('.linked-video-iframe')

let videoLinkID = '';

videoLinkInput.addEventListener('blur', (event) => {
        previewYoutubeLink(videoLinkInput.value)
})


async function checkLinkValidity(userLink) {
        let videoID = extractVideoIDFromLink(userLink);

        if (videoID) {
                let tempImg = new Image();
                tempImg.src = `http://img.youtube.com/vi/${videoID}/mqdefault.jpg`;
                tempImg.onload = function() {
                        if (tempImg.width === 120) {
                                alert("Error: Invalid video id");
                                // TODO: video deos not exist show error message
                        } else {
                                // TODO: showVideoEmbed
                        }
                }
                tempImg.onerror = function (error) {
                        // TODO: failed to get response from server
                }
        }
}
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
function previewYoutubeLink(userLink) {
        videoID = extractVideoIDFromLink(userLink);

        
}