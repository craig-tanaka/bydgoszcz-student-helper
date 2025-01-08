const error_label = document.querySelector('#register-error-label')
const submit_btn = document.querySelector('.form-submit')

let email, password

submit_btn.addEventListener('click', (e) => {
        e.preventDefault()

        email = document.querySelector("input[name='email']").value;
        password = document.querySelector("input[name='password']").value;
        
        error_label.style.color = 'red';
        error_label.classList.remove('hidden');

        firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                        // Signed in 
                        window.location.href = './index.html'
                })
                .catch((error) => {
                        //todo handle error
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        alert('user login failed');
                        // ..
                });

})