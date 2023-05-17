const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const ScoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Qual interface JS que nos permite construir pares chave/valor a partir dos campos de um formulário HTML?',
        choice1: 'ErrorEvent',
        choice2: 'FormData', 
        choice3: 'DataTransfer',
        choice4: 'PointerEvent',
        answer: 2,
    },
    {
        question: 'Qual é a tag de HTML para colocar um artigo na parte lateral do site?',
        choice1: '<div>',
        choice2: '<Main>',
        choice3: '<Nav>',
        choice4: '<Aside>',
        answer: 4,
    },
    {
        question: 'Que função de CSS podemos utilizar para mudar o cursor do mouse?',
        choice1: 'Cursor: pointer;',
        choice2: ':hover',
        choice3: '* {',
        choice4: 'input[',
        answer: 1,
    },
    {
        question: 'Qual dessas tags não faz parte do HTML semântico?',
        choice1: '<header>',
        choice2: '<footer>',
        choice3: '<div>',
        choice4: '<main>',
        answer: 3,
    },
    {
        question: 'Qual dessas tecnologias é orientada ao Back-end?',
        choice1: 'HTML',
        choice2: 'Python',
        choice3: 'CSS',
        choice4: 'React',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    ScoreText.innerText = score
}

startGame()