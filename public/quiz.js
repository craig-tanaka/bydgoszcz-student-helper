// Initialize Firebase and Firestore
const db = firebase.firestore()
quizTracker = 0;

// adds resizer event to textareas to keep the user input box as big as the user's input
document.querySelectorAll('form textarea').forEach(textarea => {
        textarea.addEventListener('input', event => {
                event.target.style.height = ''
                event.target.style.height = (event.target.scrollHeight) + 'px'
        })
})
//  oninput="this.style.height = ''; this.style.height = this.scrollHeight +'px'"

// Begin English Quiz button event handler
document.querySelector('#message .starting-message.en #message-begin-btn').addEventListener('click', event => {
        document.querySelector('#message').classList.add('hidden')
        document.querySelector('form.quiz.en').classList.remove('hidden')
        quizTracker ++
})
// Begin Ukrainian Quiz button event handler
document.querySelector('#message .starting-message.uk #message-begin-btn').addEventListener('click', event => {
        document.querySelector('#message').classList.add('hidden')
        document.querySelector('form.quiz.uk').classList.remove('hidden')
        quizTracker ++
})

// English language select button event handler
document.querySelector('#message .message-language-select button.en').addEventListener('click', event => {
        document.querySelector('#message .message-language-select').classList.add('hidden')
        document.querySelector('#message .starting-message.en').classList.remove('hidden')
})
// Ukranian language select button event handler
document.querySelector('#message .message-language-select button.uk').addEventListener('click', event => {
        document.querySelector('#message .message-language-select').classList.add('hidden')
        document.querySelector('#message .starting-message.uk').classList.remove('hidden')
})

// English Form Submit Handler
document.querySelector('form.quiz.en input[type=submit]').addEventListener('click', (event) => {
        event.preventDefault()

        if (quizTracker !== 16) {
                document.querySelector(`.quiz.en .form-row:nth-of-type(${quizTracker})`).classList.add('hidden')
                quizTracker++
                document.querySelector(`.quiz.en .form-row:nth-of-type(${quizTracker})`).classList.remove('hidden')
                if (quizTracker === 16) {
                        document.querySelector('.quiz.en input[type=submit]').value = "Submit"
                }
                document.querySelector('.quiz.en em.quiz-progress').style.paddingLeft = (6 * quizTracker) + '%'
                document.querySelector('.quiz.en em.quiz-progress').innerHTML = (quizTracker * 6) + '%'

                return
        }

        db.collection("research-quiz-en").add({
                        qn1: document.querySelector('form.quiz.en textarea[name=qn1]').value,
                        qn2: document.querySelector('form.quiz.en textarea[name=qn2]').value,
                        qn3: document.querySelector('form.quiz.en textarea[name=qn3]').value,
                        qn4: document.querySelector('form.quiz.en textarea[name=qn4]').value,
                        qn5: document.querySelector('form.quiz.en textarea[name=qn5]').value,
                        qn6: document.querySelector('form.quiz.en textarea[name=qn6]').value,
                        qn7: document.querySelector('form.quiz.en textarea[name=qn7]').value,
                        qn8: document.querySelector('form.quiz.en textarea[name=qn8]').value,
                        qn9: document.querySelector('form.quiz.en textarea[name=qn9]').value,
                        qn10: document.querySelector('form.quiz.en textarea[name=qn10]').value,
                        qn11: document.querySelector('form.quiz.en textarea[name=qn11]').value,
                        qn12: document.querySelector('form.quiz.en textarea[name=qn12]').value,
                        qn13: document.querySelector('form.quiz.en textarea[name=qn13]').value,
                        qn14: document.querySelector('form.quiz.en textarea[name=qn14]').value,
                        qn15: document.querySelector('form.quiz.en textarea[name=qn15]').value,
                        qn15: document.querySelector('form.quiz.en textarea[name=qn16]').value
                })
                .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        alert('Answers submitted')
                        document.querySelector('form.quiz.en').classList.add('hidden')
                        document.querySelector('#message .starting-message.en').classList.add('hidden')
                        document.querySelector('#message').classList.remove('hidden')
                        document.querySelector('#message .message-language-select').classList.add('hidden')
                        document.querySelector('#message .finishing-message.en').classList.remove('hidden')
                })
                .catch((error) => {
                        console.error("Error adding document: ", error);
                        alert('Failed to submit answers please try again')
                });


})
// Ukrainian Form Submit Handler
document.querySelector('form.quiz.uk input[type=submit]').addEventListener('click', (event) => {
        event.preventDefault()

        if (quizTracker !== 16) {
                document.querySelector(`.quiz.uk .form-row:nth-of-type(${quizTracker})`).classList.add('hidden')
                quizTracker++
                document.querySelector(`.quiz.uk .form-row:nth-of-type(${quizTracker})`).classList.remove('hidden')
                if (quizTracker === 16) {
                        document.querySelector('.quiz.uk input[type=submit]').value = "Надіслати"
                }
                document.querySelector('.quiz.uk em.quiz-progress').style.paddingLeft = (6 * quizTracker) + '%'
                document.querySelector('.quiz.uk em.quiz-progress').innerHTML = (quizTracker * 6) + '%'
                return
        }

        db.collection("research-quiz-uk").add({
                        qn1: document.querySelector('form.quiz.uk textarea[name=qn1]').value,
                        qn2: document.querySelector('form.quiz.uk textarea[name=qn2]').value,
                        qn3: document.querySelector('form.quiz.uk textarea[name=qn3]').value,
                        qn4: document.querySelector('form.quiz.uk textarea[name=qn4]').value,
                        qn5: document.querySelector('form.quiz.uk textarea[name=qn5]').value,
                        qn6: document.querySelector('form.quiz.uk textarea[name=qn6]').value,
                        qn7: document.querySelector('form.quiz.uk textarea[name=qn7]').value,
                        qn8: document.querySelector('form.quiz.uk textarea[name=qn8]').value,
                        qn9: document.querySelector('form.quiz.uk textarea[name=qn9]').value,
                        qn10: document.querySelector('form.quiz.uk textarea[name=qn10]').value,
                        qn11: document.querySelector('form.quiz.uk textarea[name=qn11]').value,
                        qn12: document.querySelector('form.quiz.uk textarea[name=qn12]').value,
                        qn13: document.querySelector('form.quiz.uk textarea[name=qn13]').value,
                        qn14: document.querySelector('form.quiz.uk textarea[name=qn14]').value,
                        qn15: document.querySelector('form.quiz.uk textarea[name=qn15]').value,
                        qn16: document.querySelector('form.quiz.uk textarea[name=qn16]').value
                })
                .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        alert('Відповіді надіслано')
                        document.querySelector('form.quiz.uk').classList.add('hidden')
                        document.querySelector('#message .starting-message.uk').classList.add('hidden')
                        document.querySelector('#message').classList.remove('hidden')
                        document.querySelector('#message .message-language-select').classList.add('hidden')
                        document.querySelector('#message .finishing-message.uk').classList.remove('hidden')
                })
                .catch((error) => {
                        console.error("Error adding document: ", error);
                        alert('Failed to submit answers please try again')
                });
})