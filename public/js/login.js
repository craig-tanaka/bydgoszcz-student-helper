const error_label = document.querySelector('#register-error-label')
const submit_btn = document.querySelector('.form-submit')

let email, password

submit_btn.addEventListener('click', (e) => {
        e.preventDefault()

        email = document.querySelector("input[name='email']").value;
        password = document.querySelector("input[name='password']").value;
        
        if (!isFormValid()) return;
        error_label.style.color = 'red';
        error_label.classList.remove('hidden');

        firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                        // Signed in 
                        window.location.href = './index.html'
                })
                .catch((error) => {
                        //todo show different error msg based on error code
                        let errorCode = error.code;
                        let errorMessage = error.message;

                        error_label.innerHTML = 'Login Failed. Please Try Again.';
                        // ..
                });

})

function isFormValid() {
        const userEmail = document.querySelector("input[name='email']")
        const password = document.querySelector("input[name='password']")

        let isFormValid = true

        if (password.value.length < 8) {
                password.style.outline = "1px Solid #b14e4e"
                error_label.innerHTML = 'Password must be at least 8 characters';
                isFormValid = false
        } else password.style.outline = "initial"

        if ( !userEmail.value.includes('@') || !userEmail.value.includes('.') || userEmail.value === "") {
                userEmail.style.outline = "1px Solid #b14e4e"
                error_label.innerHTML = 'Please Enter A valid Email';
                isFormValid = false
        } else userEmail.style.outline = "initial"
        
        if (!isFormValid) error_label.style.color = '#b14e4e';
        else error_label.style.color = 'transparent'
        
        return isFormValid
}