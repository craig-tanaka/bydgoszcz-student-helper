const error_label = document.querySelector('#register-error-label')
const submit_btn = document.querySelector('#register-form-submit')

let email, password, repeat_password;

submit_btn.addEventListener('click', (e) => {
        e.preventDefault()

        email = document.querySelector("input[name='email']").value;
        password = document.querySelector("input[name='password']").value;
        repeat_password = document.querySelector("input[name='repeat-password']").value;

        if (password !== repeat_password) {
                error_label.innerHTML = 'Passwords Must Match';
                error_label.style.color = 'red';
                error_label.classList.remove('hidden');
                return;
        }
        if (password.length < 8 ) {
                error_label.innerHTML = 'Password must be at least 8 characters';
                error_label.style.color = 'red';
                error_label.classList.remove('hidden');
                return;
        }
        
        error_label.style.color = 'red';
        error_label.classList.remove('hidden');

        firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                        // Signed in 
                        console.log(userCredential)
                        alert('user created');
                        // ...
                })
                .catch((error) => {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        alert('user creation failed');
                        // ..
                });

})