// Initialize Firebase and Firestore
const db = firebase.firestore()

console.log(db)



const quizSubmitBtn = document.querySelector('form.quiz input[type=submit]')
quizSubmitBtn.addEventListener('click', (event) => {
        event.preventDefault()
        db.collection("research-quiz-en").add({
                        qn1 : document.querySelector('form.quiz input[name=qn1]').value,
                        qn2 : document.querySelector('form.quiz input[name=qn2]').value,
                        qn3 : document.querySelector('form.quiz input[name=qn3]').value,
                        qn4 : document.querySelector('form.quiz input[name=qn4]').value,
                        qn5 : document.querySelector('form.quiz input[name=qn5]').value,
                        qn6 : document.querySelector('form.quiz input[name=qn6]').value,
                        qn7 : document.querySelector('form.quiz input[name=qn7]').value,
                        qn8 : document.querySelector('form.quiz input[name=qn8]').value,
                        qn9 : document.querySelector('form.quiz input[name=qn9]').value,
                        qn10 : document.querySelector('form.quiz input[name=qn10]').value,
                        qn11 : document.querySelector('form.quiz input[name=qn11]').value,
                        qn12 : document.querySelector('form.quiz input[name=qn12]').value,
                        qn13 : document.querySelector('form.quiz input[name=qn13]').value,
                        qn14 : document.querySelector('form.quiz input[name=qn14]').value,
                        qn15 : document.querySelector('form.quiz input[name=qn15]').value
                })
                .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        alert('Answers submitted')
                })
                .catch((error) => {
                        console.error("Error adding document: ", error);
                });
})