//grabs the url query paramters and stores them in variables
const urlParams = new URLSearchParams(window.location.search)
const moduleID = urlParams.get('mid')
const chapterNumber = urlParams.get('cid')

let quiz;

db.collection('modules').doc(moduleID).collection('chapters').doc(chapterNumber).get()
        .then(doc => {
                quiz = doc.data().quiz
                
                let quizSorted = Object.fromEntries( Object.entries(quiz).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) )
                
                for (const questionData of Object.entries(quizSorted) ){
                        addQuestionToDom(questionData)
                        // console.log(questionData)
                }
        })
        .catch(error => {
                // todo: add error catch
        })

function addQuestionToDom( questionData ) {
        let questionContainer = document.createElement('div')
        questionContainer.className = 'question-cont'

        // create the element that has the actual question text
        let question = document.createElement('h4')
        question.className = 'question'
        question.innerHTML = "<em>" + questionData[0] + "</em>: " + questionData[1].Question
        
        //create the answers container/fieldset
        let answersContainer = document.createElement('fieldset')
        answersContainer.className = 'answers-cont'

        let answersSorted = Object.fromEntries( Object.entries(questionData[1].Answers).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) )

        for (answer of Object.entries( answersSorted ) ) {
                // console.log(answer)

                let AnswerCont = document.createElement('span')
                AnswerCont.className = 'answer-row'

                const inputName = questionData[0]
                const answerText = answer[1]
                let answerID = answer[0]
                AnswerCont.innerHTML = 
                        `<input type="radio" name="${inputName}" ans="${answerID}">
                        <label>${answerText}</label>`
                
                answersContainer.appendChild(AnswerCont)
        };

        // add answers and question to the container
        questionContainer.appendChild(question)
        questionContainer.appendChild(answersContainer)

        // add container to the dom
        document.querySelector('.confirm-quiz').appendChild(questionContainer)
}

const submitButton = document.querySelector('.confirm-quiz-submit')
submitButton.addEventListener('click', event => {
        if (formIsValid()) {
                submitButton.classList.add('hidden')
                document.querySelector('main').scrollTop = 0; // Scrolls to the top

                let answers = []
                const questions = document.querySelectorAll('.question-cont')
                questions.forEach(question => { 
                        let questionID = question.querySelector('input').name
                        let answerID = question.querySelector('input:checked').getAttribute('ans')

                        answers.push( { [questionID] : answerID } )
                })
                
                db.collection('modules').doc(moduleID).collection('chapters').doc(chapterNumber).update({
                        quizAnswers: answers
                }).then(() => {
                        showPassRequirements()
                }).catch(error => {
                        //todo create error catch
                })
        }
})

function formIsValid() { 
        const questions = document.querySelectorAll('.question-cont')
        let isValid = true

        for (let index = 0; index < questions.length; index++) {
                const question = questions[index];
                
                if (question.querySelector(`input[name="Question ${index + 1}"]:checked`) === null) {
                        isValid = false
                        question.querySelector('fieldset').style.border = '1px solid red'
                }else{
                        question.querySelector('fieldset').style.border = '1px solid white'
                }
        }
        if (!isValid) {
                document.querySelector('.error-label').classList.remove('hidden')
        }else{
                document.querySelector('.error-label').classList.add('hidden')
        }

        return isValid
}

function showPassRequirements() {
        let passRequirementsCont = document.createElement('section')
        passRequirementsCont.className = 'pass-requirements-overlay'

        const maxQuestions = document.querySelectorAll('.question-cont').length

        passRequirementsCont.innerHTML = 
                `<div class="pass-requirements-cont">
                        <h2 class="pass-requirements-header">Pass Requirements</h2>
                        <p class="pass-requirements-description">Please Input The Minimum Correct Number of Answers You Would Want From The Users, Before They Can Pass The Chapter.</p>
                        <span class="pass-requirements-input-row">
                                <input type="number" name="pass-requirements" max="${maxQuestions}" min="0" value="0">
                                <span class="pass-requirements-total">/  ${maxQuestions}</span>
                        </span>
                        <button class="pass-requirements-submit">Submit Pass Requirements</button>
                </div>`
        document.querySelector('main').appendChild(passRequirementsCont)

        const passRequirementsSubmit = document.querySelector('.pass-requirements-submit')
        passRequirementsSubmit.addEventListener('click', event => {
                
                        
                db.collection('modules').doc(moduleID).collection('chapters').doc(chapterNumber).update({
                        passRequirements: document.querySelector('input[name="pass-requirements"]').value
                }).then(() => {
                        document.querySelector('.pass-requirements-cont').remove()
                        showContinueForm()
                }).catch(error => {
                        //todo create error catch
                })
        })
}

function showContinueForm() { 
        let continueFormCont = document.createElement('form')
        continueFormCont.className = 'continue-creation-form'
        continueFormCont.style.position = 'absolute'
        continueFormCont.style.backgroundColor = '#265473de'
        continueFormCont.style.top = '20%'
        continueFormCont.style.left = '20%'
        continueFormCont.style.width = '60%'

        continueFormCont.innerHTML = 
                `<h2 class="continue-creation-header">Continue Creation</h2>
                <p>Chapter Quiz Created, Do You Want To Create Another Chapter?</p>
                <span class="form-row">
                        <button id="create-another-chapter-btn">Yes</button>
                        <button id="dont-create-another-chapter-btn">No</button>
                </span>`
        document.querySelector('main').appendChild(continueFormCont)

        const continueFormYes = document.querySelector('#create-another-chapter-btn')
        continueFormYes.addEventListener('click', event => {
                event.preventDefault()
                window.location.href = `./create-module-chapter.html?mid=${moduleID}&cid=${Number(chapterNumber) + 1}`
        })

        const continueFormNo = document.querySelector('#dont-create-another-chapter-btn')
        continueFormNo.addEventListener('click', event => {
                event.preventDefault()
                window.location.href = `./module.html?mid=${moduleID}`
        })
}