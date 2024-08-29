const error_label = document.querySelector('#register-error-label')
const submit_btn = document.querySelector('.form-submit')

var email, password, repeat_password;

submit_btn.addEventListener('click', (e) => {
        e.preventDefault()

        email = document.querySelector("input[name='email']").value;
        password = document.querySelector("input[name='password']").value;
        
        error_label.style.color = 'red';
        error_label.classList.remove('hidden');

        console.log('yooo');

        firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                        // Signed in 
                        console.log(userCredential)
                        alert('user logged in');
                        // ...
                })
                .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert('user login failed');
                        // ..
                });

})