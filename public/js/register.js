const error_label = document.querySelector('#register-error-label')
const submit_btn = document.querySelector('#register-form-submit')

let email, password, repeat_password;
const db = firebase.firestore()

submit_btn.addEventListener('click', (e) => {
        e.preventDefault()

        userName = document.querySelector("input[name='name']").value;
        email = document.querySelector("input[name='email']").value;
        password = document.querySelector("input[name='password']").value;
        repeat_password = document.querySelector("input[name='repeat-password']").value;

        if (!validateForm()) return;

        submit_btn.classList.add('hidden')

        firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                        createUserDocument(userCredential.user)
                })
                .catch((error) => {
                        let errorCode = error.code;
                        let errorMessage = error.message;

                        // console.log('Error ' + errorCode + ': ' + errorMessage)

                        error_label.innerHTML = "Failed To Register, Please Try again after a while."
                        error_label.style.color = '#b14e4e';
                        submit_btn.classList.remove('hidden')
                });

})

function validateForm() {
        let userName = document.querySelector("input[name='name']")
        let userEmail = document.querySelector("input[name='email']")
        let password = document.querySelector("input[name='password']")
        let repeat_password = document.querySelector("input[name='repeat-password']")

        let isFormValid = true

        if (password.value !== repeat_password.value) {
                password.style.outline = "1px Solid #b14e4e"
                repeat_password.style.outline = "1px Solid #b14e4e"
                error_label.innerHTML = 'Passwords Must Match';
                isFormValid = false
        } else {
                password.style.outline = "initial"
                repeat_password.style.outline = "initial"
        }

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

        if (userName.value === "") {
                userName.style.outline = "1px Solid #b14e4e"
                error_label.innerHTML = 'Please Fill Out Missing Fields';
                isFormValid = false
        } else userName.style.outline = "initial"
        
        if (!isFormValid) error_label.style.color = '#b14e4e';
        else error_label.style.color = 'transparent'
        
        return isFormValid
}

function createUserDocument(user) {
        userName = document.querySelector("input[name='name']").value;
        userEmail = document.querySelector("input[name='email']").value;
        let isAdmin = document.querySelector("input[name='admin']").checked;

        db.collection('users').doc(user.uid).set({
                name: userName,
                email: userEmail,
                isAdmin: isAdmin
        }).then(doc => {
                window.location.href = './home.html'
        })
}