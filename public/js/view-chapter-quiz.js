//grabs the url query paramters and stores them in variables
const urlParams = new URLSearchParams(window.location.search)
const moduleID = urlParams.get('mid')
const chapterNumber = urlParams.get('cid')

let quiz;
let quizAnswers;
let passRequirements;

let numOfChapters;

db.collection('modules').doc(moduleID).collection('chapters').doc(chapterNumber).get()
        .then(doc => {
                quiz = doc.data().quiz
                quizAnswers = doc.data().quizAnswers
                passRequirements = doc.data().passRequirements
                numOfChapters = doc.data().numOfChapters
                
                let quizSorted = Object.fromEntries( Object.entries(quiz).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) )
                
                for (const questionData of Object.entries(quizSorted) ){
                        addQuestionToDom(questionData)
                        // console.log(questionData)
                }
        })
        .catch(error => {
                // todo: add error catch
        })

db.collection('modules').doc(moduleID).get()
        .then(doc => {
                numOfChapters = doc.data().numOfChapters
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

                document.querySelector('main').scrollTop = 0;

                let answers = []
                const questions = document.querySelectorAll('.question-cont')
                questions.forEach(question => { 
                        let questionID = question.querySelector('input').name
                        let answerID = question.querySelector('input:checked').getAttribute('ans')

                        answers.push( { [questionID] : answerID } )
                })
                
                gradeQuiz(answers)
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

function gradeQuiz(userAnswers) {

        let score = 0

        for (let index = 0; index < userAnswers.length; index++) {
                const userAnswer = userAnswers[index];
                const correctAnswer = quizAnswers[index]

                if (Object.values(userAnswer)[0] === correctAnswer[Object.keys(correctAnswer)[0]]) {
                        score++
                }
        }

        document.querySelector('.quiz-results-cont').classList.remove('hidden')
        if (score >= passRequirements) {
                document.querySelector('.quiz-pass').classList.remove('hidden')
        } else{
                document.querySelector('#user-score').innerHTML = score
                document.querySelector('#pass-requirement').innerHTML = passRequirements
                document.querySelector('.quiz-fail').classList.remove('hidden')
        }
}

document.querySelector('.quiz-fail-try-again').addEventListener('click', event => {
        document.querySelector('.quiz-results-cont').classList.add('hidden')
        document.querySelector('.quiz-fail').classList.add('hidden')

        submitButton.classList.remove('hidden')
})
document.querySelector('.quiz-pass-next').addEventListener('click', event => {
        if (numOfChapters && numOfChapters === chapterNumber) window.location.href = `./module-complete.html?mid=${moduleID}`
        else window.location.href = `./chapter-view.html?mid=${moduleID}&cid=${Number(chapterNumber) + 1}`
})
