const quizAnswersContainer = document.querySelector('.quiz-answers-answers')
const addAnswerBtn = document.querySelector('.add-answer-btn')

addAnswerBtn.addEventListener('click', (event) => {
        // alert('bho here')
        event.preventDefault()
        
        //create new answer container element
        const newAnswerCont = document.createElement('span')
        newAnswerCont.classList.add('added-answer-input-cont')

        // Create input element wher user will enter answer text
        const answerInput = document.createElement('input')
        answerInput.type = 'text'
        answerInput.classList.add('answer-input')
        answerInput.classList.add('added')

        //create remove answer element
        const removeAnswerBtn = document.createElement('button')
        removeAnswerBtn.classList.add('remove-answer-btn')
        removeAnswerBtn.textContent = '-'

        //Add the last two cretaed elements (the input and the button) to the container created fist
        newAnswerCont.appendChild(answerInput)
        newAnswerCont.appendChild(removeAnswerBtn)

        // add the new answer container to the dom right before the add answer element
        quizAnswersContainer.insertBefore(newAnswerCont, addAnswerBtn)

        // TODO: add remove answer event listener to remove answer button
})