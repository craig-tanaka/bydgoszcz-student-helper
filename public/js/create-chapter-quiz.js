const allQuestionsContainer = document.querySelector('.all-questions-container')
const addQuestionBtn = document.querySelector('.add-question-btn')
const submitQuizBtn = document.querySelector('input.create-module-submit')
const quizErrorLabel = document.querySelector('.quiz-form-error-label')
const continueChapterCreationForm = document.querySelector('.continue-creation-form')

let numOfQuestions = 1
let currentQuestion = 1

//grabs the url query paramters and stores them in variables
const urlParams = new URLSearchParams(window.location.search)
const moduleID = urlParams.get('mid')
const chapterNumber = urlParams.get('cid')

allQuestionsContainer.addEventListener('click', function (event) {
        event.preventDefault()
        if (event.target.classList.contains('add-answer-btn')) addAnswerToQuestion(event.target)
        if (event.target.classList.contains('maximize-question-btn')) maximizeQuestion(event.target)
        //todo add logic for removing an answer
})
allQuestionsContainer.addEventListener('input', (event)=> {
        updatePreview(event.target)
})

function addAnswerToQuestion(pressedElement) {
        const questionAnswersContainer = pressedElement.closest('.question-answers-container')

        //create new answer container element
        const newAnswerCont = document.createElement('span')
        newAnswerCont.classList.add('added-answer-input-cont')

        // Create input element wher user will enter answer text
        const answerInput = document.createElement('input')
        answerInput.type = 'text'
        answerInput.classList.add('answer-input')
        answerInput.classList.add('added')

        // find the number of the last answer element to determine the number the next should have
        const answerNumber = questionAnswersContainer.querySelectorAll('input.answer-input').length
        answerInput.id = `qn-${currentQuestion}-answer-input-${answerNumber + 1}`

        //create remove answer element
        const removeAnswerBtn = document.createElement('button')
        removeAnswerBtn.classList.add('remove-answer-btn')
        removeAnswerBtn.textContent = '-'

        //Add the last two cretaed elements (the input and the button) to the container created fist
        newAnswerCont.appendChild(answerInput)
        newAnswerCont.appendChild(removeAnswerBtn)

        // add the new answer container to the dom right before the add answer element
        questionAnswersContainer.insertBefore(newAnswerCont, pressedElement)
        addanswerToPreview()
        // TODO: add remove answer event listener to remove answer button
}
function addanswerToPreview() {
        const previewQuestionsContainer = document.querySelector('.questions-preview-cont')
        const questionPreviewCont = previewQuestionsContainer.querySelector(`#preview-qn-${currentQuestion}`)
        const answersContainer = questionPreviewCont.querySelector('.question-answers-preview')
        
        // the number of the new answer being made
        const answerNumber = answersContainer.childElementCount + 1

        const newAnswerElement = document.createElement('div')
        newAnswerElement.classList.add('preview-answer-cont')
        newAnswerElement.innerHTML =
                `<div class="preview-answer-cont">
                        <input type="radio" class="radio-answer-input" ansNum="${answerNumber}" name="preview-ans-${currentQuestion}" value="" />
                        <label class="radio-answer-label">...</label>
                </div>`
        answersContainer.appendChild(newAnswerElement)
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
                                        <input type="text" class="answer-input" id="qn-${numOfQuestions}-answer-input-1">
                                        <input type="text" class="answer-input" id="qn-${numOfQuestions}-answer-input-1">
                                        <button class="add-answer-btn">+</button>
                                </div>
                        </fieldset>
                </div>`;

        // append the new question to the dom
        allQuestionsContainer.appendChild(newQuestion)
        minmizePreviousQuestion()
        currentQuestion = numOfQuestions
        addQuestionToPreview();
})
function addQuestionToPreview(){
        const previewQuestionsContainer = document.querySelector('.questions-preview-cont')

        //create new question preview element
        const questionContainer = document.createElement('div')
        questionContainer.classList.add('question-preview-single')
        questionContainer.id = `preview-qn-${currentQuestion}`
        questionContainer.innerHTML =
                `<p class="question"></p>
                <fieldset class="question-answers-preview">
                        <div class="preview-answer-cont">
                                <input type="radio" class="radio-answer-input" ansNum="1" name="preview-ans-${currentQuestion}" value="" />
                                <label class="radio-answer-label">...</label>
                        </div>
                        <div class="preview-answer-cont">
                                <input type="radio" class="radio-answer-input" ansNum="2" name="preview-ans-${currentQuestion}" value="" />
                                <label class="radio-answer-label">...</label>
                        </div>
                </fieldset>`
        
        previewQuestionsContainer.append(questionContainer)

}

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

function updatePreview(typedElement) {
        const previewQuestionsContainer = document.querySelector('.questions-preview-cont')
        const questionPreviewCont = previewQuestionsContainer.querySelector(`#preview-qn-${currentQuestion}`)

        if (typedElement.classList.contains('quiz-question-input')) {
                questionPreviewCont.querySelector('.question').innerHTML = typedElement.value
        } else if (typedElement.classList.contains('answer-input')) {
                const answerlabels = questionPreviewCont.querySelectorAll('.radio-answer-label');
                const answerNumber = typedElement.id[typedElement.id.length -1]
                
                answerlabels[answerNumber - 1].innerHTML = typedElement.value
        }
}

submitQuizBtn.addEventListener('click', (event) => {
        event.preventDefault()
        if (!validateForm()) return
        
        let data = {}

        const questionContainers = document.querySelectorAll('.question-container')
        
        for (let i = 0; i < questionContainers.length; i++){
                const currentQuestionKey = "Question " + (i +1)
                const question = questionContainers[i].querySelector('.quiz-question-input').value

        
                let questionData = {
                        "Question" : question
                }
                
                let answersData = {}
                const answersContainer = questionContainers[i].querySelectorAll('.answer-input')
                for (let index = 0; index < answersContainer.length; index++) {
                        const currentAnswerkey = "Answer " + (index + 1)
                        const answer = answersContainer[index].value
                        
                        
                        answersData = {
                                ...answersData,
                                [currentAnswerkey] : answer
                        }
                }
                questionData = {
                        ...questionData,
                        "Answers": answersData
                }
                data = {
                        ...data,
                        [currentQuestionKey] : questionData
                }
        }
        
        db.collection('modules').doc(moduleID).collection('chapters').doc(chapterNumber).update({
                quiz: data
        }).then((docRef) => {
                window.location.href = `/confirm-quiz.html?mid=${moduleID}&cid=${chapterNumber}` 
        }).catch((error) => {
                // alert(error)
                // console.log(error)
                //todo create error catch
        })
})

function validateForm() {
        let isFormValid = true

        document.querySelectorAll('.question-container').forEach((element) => {
                const question = element.querySelector('.quiz-question-input')
                if (question.value === '') {
                        isFormValid = false
                        question.style.outline = '1px solid red'
                        quizErrorLabel.classList.remove('hidden')
                }else question.style.outline = 'none'
                
                element.querySelectorAll('.answer-input').forEach((element) => {
                        if (element.value === '') {
                                isFormValid = false
                                element.style.outline = '1px solid red'
                                quizErrorLabel.classList.remove('hidden')
                        }else element.style.outline = 'none'
                })
        })

        // updatePreview()
        if (isFormValid) quizErrorLabel.classList.add('hidden')
        return isFormValid
}