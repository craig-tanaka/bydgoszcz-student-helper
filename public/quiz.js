// Initialize Firebase and Firestore
const db = firebase.firestore()

// Begin Quiz button event handler
document.querySelector('#message #message-begin-btn').addEventListener('click', event => {
        document.querySelector('#message .starting-message').classList.add('hidden')
        document.querySelector('#message .message-language-select ').classList.remove('hidden')
})

// English language select button event handler
document.querySelector('#message .message-language-select button.en').addEventListener('click', event => {
        document.querySelector('#message').classList.add('hidden')
        document.querySelector('form.quiz.en').classList.remove('hidden')
})
// Ukranian language select button event handler
document.querySelector('#message .message-language-select button.uk').addEventListener('click', event => {
        document.querySelector('#message').classList.add('hidden')
        document.querySelector('form.quiz.uk').classList.remove('hidden')
})

// English Form Submit Handler
document.querySelector('form.quiz.en input[type=submit]').addEventListener('click', (event) => {
        event.preventDefault()
        db.collection("research-quiz-en").add({
                        qn1: document.querySelector('form.quiz.en input[name=qn1]').value,
                        qn2: document.querySelector('form.quiz.en input[name=qn2]').value,
                        qn3: document.querySelector('form.quiz.en input[name=qn3]').value,
                        qn4: document.querySelector('form.quiz.en input[name=qn4]').value,
                        qn5: document.querySelector('form.quiz.en input[name=qn5]').value,
                        qn6: document.querySelector('form.quiz.en input[name=qn6]').value,
                        qn7: document.querySelector('form.quiz.en input[name=qn7]').value,
                        qn8: document.querySelector('form.quiz.en input[name=qn8]').value,
                        qn9: document.querySelector('form.quiz.en input[name=qn9]').value,
                        qn10: document.querySelector('form.quiz.en input[name=qn10]').value,
                        qn11: document.querySelector('form.quiz.en input[name=qn11]').value,
                        qn12: document.querySelector('form.quiz.en input[name=qn12]').value,
                        qn13: document.querySelector('form.quiz.en input[name=qn13]').value,
                        qn14: document.querySelector('form.quiz.en input[name=qn14]').value,
                        qn15: document.querySelector('form.quiz.en input[name=qn15]').value
                })
                .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        alert('Answers submitted')
                        document.querySelector('form.quiz.en').classList.add('hidden')
                        document.querySelector('#message').classList.remove('hidden')
                        document.querySelector('#message .message-language-select').classList.add('hidden')
                        document.querySelector('#message .finishing-message').classList.remove('hidden')
                })
                .catch((error) => {
                        console.error("Error adding document: ", error);
                        alert('Failed to submit answers please try again')
                });


})
// Ukrainian Form Submit Handler
document.querySelector('form.quiz.uk input[type=submit]').addEventListener('click', (event) => {
        event.preventDefault()
        db.collection("research-quiz-uk").add({
                        qn1: document.querySelector('form.quiz.uk input[name=qn1]').value,
                        qn2: document.querySelector('form.quiz.uk input[name=qn2]').value,
                        qn3: document.querySelector('form.quiz.uk input[name=qn3]').value,
                        qn4: document.querySelector('form.quiz.uk input[name=qn4]').value,
                        qn5: document.querySelector('form.quiz.uk input[name=qn5]').value,
                        qn6: document.querySelector('form.quiz.uk input[name=qn6]').value,
                        qn7: document.querySelector('form.quiz.uk input[name=qn7]').value,
                        qn8: document.querySelector('form.quiz.uk input[name=qn8]').value,
                        qn9: document.querySelector('form.quiz.uk input[name=qn9]').value,
                        qn10: document.querySelector('form.quiz.uk input[name=qn10]').value,
                        qn11: document.querySelector('form.quiz.uk input[name=qn11]').value,
                        qn12: document.querySelector('form.quiz.uk input[name=qn12]').value,
                        qn13: document.querySelector('form.quiz.uk input[name=qn13]').value,
                        qn14: document.querySelector('form.quiz.uk input[name=qn14]').value,
                        qn15: document.querySelector('form.quiz.uk input[name=qn15]').value
                })
                .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        alert('Answers submitted')
                        document.querySelector('form.quiz.uk').classList.add('hidden')
                        document.querySelector('#message').classList.remove('hidden')
                        document.querySelector('#message .message-language-select').classList.add('hidden')
                        document.querySelector('#message .finishing-message').classList.remove('hidden')
                })
                .catch((error) => {
                        console.error("Error adding document: ", error);
                        alert('Failed to submit answers please try again')
                });


})