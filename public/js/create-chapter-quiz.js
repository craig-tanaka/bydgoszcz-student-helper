const allQuestionsContainer = document.querySelector('.all-questions-container')
const addQuestionBtn = document.querySelector('.add-question-btn')

let numOfQuestions = 1
let currentQuestion = 1

allQuestionsContainer.addEventListener('click', function (event) {
        event.preventDefault()
        if (event.target.classList.contains('add-answer-btn')) addAnswerToQuestion(event.target)
        if(event.target.classList.contains('maximize-question-btn')) maximizeQuestion(event.target)
})
function addAnswerToQuestion(pressedElement) {
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
        const questionAnswersContainer = pressedElement.closest('.question-answers-container')
        questionAnswersContainer.insertBefore(newAnswerCont, pressedElement)

        // TODO: add remove answer event listener to remove answer button
}

addQuestionBtn.addEventListener('click', (event) => {
        event.preventDefault()
        
        numOfQuestions += 1
        //create new questions element
        const newQuestion = document.createElement('div')
        newQuestion.classList.add('question-container')
        newQuestion.id = `qn-${numOfQuestions}`

        //set the inner html  of new element
        newQuestion.innerHTML = 
                `<div class="question-expanded">
                        <div class="form-row">
                                <label class="form-label">Question <span class="question-number">${numOfQuestions}</span></label>
                                <input type="text" class="quiz-question-input">
                        </div>
                        <fieldset class="quiz-answers">
                                <legend>Answers:</legend>
                                <div class="question-answers-container">
                                        <input type="text" class="answer-input">
                                        <input type="text" class="answer-input">
                                        <button class="add-answer-btn">+</button>
                                </div>
                        </fieldset>
                </div>`;

        // append the new question to the dom
        allQuestionsContainer.appendChild(newQuestion)
        minmizePreviousQuestion()
        currentQuestion = numOfQuestions
})
function minmizePreviousQuestion() {
        const currentQuestionElement = document.querySelector(`#qn-${currentQuestion}`)

        if (!currentQuestionElement.querySelector('.question-minimized')) {
                // if the element does not already posess a minimized question element create it and add it DOM
                const previousQuesionMimizedCont = document.createElement('span')
                previousQuesionMimizedCont.classList.add('question-minimized')
                previousQuesionMimizedCont.innerHTML =
                        `<label>Question <span class="question-number">${currentQuestion}</span>:</label>
                        <p class="question-preview"></p>
                        <button class="maximize-question-btn">&#9660;</button>`
                currentQuestionElement.appendChild(previousQuesionMimizedCont)
        }
        
        // set or update the preview question
        // Todo: please set an error for if a person tries to minize an empty question
        // Todo this error check might need to be done before adding another question again
        const updatedQuestion = currentQuestionElement.querySelector('.quiz-question-input').value
        currentQuestionElement.querySelector('.question-preview').innerHTML = updatedQuestion

        //hide the maximized question and unhide the minimized
        currentQuestionElement.querySelector('.question-expanded').classList.add('hidden')
        currentQuestionElement.querySelector('.question-minimized').classList.remove('hidden')
        
}
function maximizeQuestion(pressedElement) {
        const questionContainer = pressedElement.closest('.question-container')

        // minimize previous question and update current question variable
        minmizePreviousQuestion()
        currentQuestion = questionContainer.querySelector('.question-number').innerHTML

        // hide the minimized version of the question and unhide the expanded one
        questionContainer.querySelector('.question-expanded').classList.remove('hidden')
        questionContainer.querySelector('.question-minimized').classList.add('hidden')
}