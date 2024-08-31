const answerContainer = document.getElementById("answer-container")
const questionContainer = document.getElementById("question-container")
const addition = document.getElementById("Addition")
const subtraction = document.getElementById("Subtraction")
const multiplication = document.getElementById("Multiplication")
const division = document.getElementById("Division")
const additionMobile = document.getElementById("Addition-mobile")
const subtractionMobile = document.getElementById("Subtraction-mobile")
const multiplicationMobile = document.getElementById("Multiplication-mobile")
const divisionMobile = document.getElementById("Division-mobile")
const scores = document.getElementById("Scores")
const scoresMobile = document.getElementById("Scores-mobile")
const score = document.getElementById("score")
const myScores = document.getElementById("my-score")
const settings = document.getElementById("Settings")
const settingsMobile = document.getElementById("settings-mobile")
const timeLeft= document.getElementById("time")
const trialsLeft = document.getElementById("trials")
const trial = document.getElementById("trial")
const okay = document.getElementById("okay")
const container = document.getElementById("container")
const okayy = document.getElementById("okayy")
const failedMessage = document.getElementById("failed-message")
const timeIsUpMessage = document.getElementById("time-message")
const setting = document.getElementById("settings")
const saveDifficulty = document.getElementById("save")
const difficultyValue = document.getElementById("select")
const difficultyChooser = document.getElementById("difficulty")
const overlayMethods = document.getElementById("overlay-methods")
const burgerBtn = document.getElementById("burger-btn")
const closeBtn = document.getElementById("close-btn")
const wrongSound = document.getElementById("wrong")
const youFailedSound = document.getElementById("failed")
const timeIsUpSound = document.getElementById("times-up")
const clickSound = document.getElementById("click")
const correctSound = document.getElementById("correct")
const backgroundMusic = document.getElementById("background-music")
const beginApp = document.getElementById("start-game")

function generateClickSound() {
    if(!clickSound.paused) {
        clickSound.pause()
        clickSound.currentTime  = 0
    }
    clickSound.play()
}
function playAudio() {
    backgroundMusic.play()
    generateClickSound()
    beginApp.style.transform = "scale(0)"
    container.style.transform = "scale(1)"

}
let time = 30;
let _score = 0;
let trials = 5;
let numberLimit;
var myAccount = {
    score: [],
    settings,
    difficulty: "Easy"
}
burgerBtn.addEventListener("click",()=> {
    overlayMethods.style.opacity = "1"
    overlayMethods.style.transform = "scale(1)"
    closeBtn.style.display = "block"
    burgerBtn.style.display = "none"
    generateClickSound()
    // alert("asdfasdf")
})
closeBtn.addEventListener("click",()=> {
    overlayMethods.style.opacity = "0"
    overlayMethods.style.transform = "scale(0)"
    burgerBtn.style.display = "block"
    closeBtn.style.display = "none"
    generateClickSound()

})
function hideScore() {
     myScores.style.display = "none";
    questionContainer.style.display = "flex"
    answerContainer.style.display = "flex"
}
var thisAccount = localStorage.getItem("myAccount")
if(thisAccount == null || thisAccount == "") {
    localStorage.setItem("myAccount",JSON.stringify(myAccount))
    var updatedData = JSON.parse(localStorage.getItem("myAccount"))
    switch(updatedData.difficulty) {
        case "Easy":
            numberLimit = 10
            break;
        case "Normal":
            numberLimit = 20
            break
        case "Hard":
            numberLimit = 30
            break
        default:
            numberLimit = 10
            break
    }
}else {
    thisAccount = JSON.parse(localStorage.getItem("myAccount"))
    switch(thisAccount.difficulty) {
        case "Easy":
            numberLimit = 10
            break;
        case "Normal":
            numberLimit = 20
            break
        case "Hard":
            numberLimit = 30
            break
        default:
            numberLimit = 10
            break
    }
}

function saveDifficulties() {
    if(difficultyValue.value =="") {
        alert("choose difficulty first!!")
    }else {
        var myData =JSON.parse(localStorage.getItem("myAccount"))
        myData.score = myData.score
        myData.difficulty = difficultyValue.value
        localStorage.setItem("myAccount",JSON.stringify(myData))
        showMyScore()
        difficultyChooser.style.display = "none"
    }
}

function intervalClear() {
    for (let i = 0; i < 1000; i++) {
        clearInterval(i);
    }
}
console.log(numberLimit)
function showMyScore() {
    intervalClear()
    generateClickSound()
    var element = document.getElementById("score-list");
    if(element) {
        myScores.removeChild(element)
    }
    var scorelists = document.createElement("div")
    scorelists = document.createElement("div")
    scorelists.setAttribute("id","score-list")
    trial.style.display = "none"
    questionContainer.style.display = "none"
    answerContainer.style.display = "none"
    myScores.style.display = "flex"
    // console.log(thisAccount.score.length)
    var myData = JSON.parse(localStorage.getItem("myAccount"))
    var descendingOrder = myData.score.sort((a, b)=> b - a)
    for(let i = 0; i < descendingOrder.length; i++) {
        var score = document.createElement("div");
        score.setAttribute("id","myscore")
        score.innerHTML = "Score: "+ descendingOrder[i];
        if(i == 0) {

            score.innerHTML = "🥳🎉High Score: "+ descendingOrder[i]+"🥳🎉";
            score.style.background = "rgb(0, 255, 119)";
        }
        scorelists.appendChild(score)
        myScores.appendChild(scorelists)
    }

}

function startGame() {
    hideScore()
    time = 30;
    _score = 0;
    score.innerText = "Score: 0";
    trials = 5;
    intervalClear()
    setInterval(startTimer, 1000);
    generateClickSound()
}

// console.log(thisAccount.score)
// console.log(thisAccount.difficulty)
function checkTrialsLeft() {
    if(trials > 1) {
        trials--
        trialsLeft.innerText = "Trials left: " + trials
        if (!wrongSound.paused) {
            wrongSound.pause(); 
            wrongSound.currentTime = 0;
          }
          wrongSound.play();
    }else {
        trials--
        if(_score == 0) {
            failedMessage.style.display = "flex"
            intervalClear()
        }else {
            if(!youFailedSound.paused || !timeIsUpSound.paused){
                youFailedSound.pause();
                timeIsUpSound.pause()
                youFailedSound.currentTime = 0;
            }
            youFailedSound.currentTime = 0;
            youFailedSound.play();
            var myData =JSON.parse(localStorage.getItem("myAccount"))
            myData.score.push(_score)
            myData.difficulty = thisAccount.difficulty
            localStorage.setItem("myAccount",JSON.stringify(myData))
            failedMessage.style.display = "flex"
            intervalClear()
        }
    }
}
function startTimer() {
    trial.style.display = "block"
    trialsLeft.innerText = "Trials left: " + trials
    if(time <=10){
        if (!correctSound.paused) {
            correctSound.pause()
            correctSound.currentTime = "0"
        }
        timeIsUpSound.play()
    }
    if(time < 1) {
        if(_score == 0) {
            timeIsUpMessage.style.display = "flex"
            intervalClear()
        }else {
            var myData =JSON.parse(localStorage.getItem("myAccount"))
            myData.score.push(_score)
            myData.difficulty = myData.difficulty
            localStorage.setItem("myAccount",JSON.stringify(myData))
            timeIsUpMessage.style.display = "flex"
            intervalClear()
        }
    }else {
        timeLeft.innerText = "Time left: " + time
        time--
    }
}
function generateQuestion(operation) {
    var myDifficulty =  JSON.parse(localStorage.getItem("myAccount"))
    switch(myDifficulty.difficulty) {
        case "Easy":
            numberLimit = 10
            break;
        case "Normal":
            numberLimit = 20
            break
        case "Hard":
            numberLimit = 30
            break
        default:
            numberLimit = 10
            break
    }
    let numberOne = document.createElement("p")
    let Operation = document.createElement("p")
    let numberTwo = document.createElement("p")
    let equalSign = document.createElement("p")
    let question = document.createElement("div")
    question.setAttribute("id","question")
    let answers = document.createElement("div")
    answers.setAttribute("id","answers")
    randomNumberOne = Math.floor(Math.random()*numberLimit)
    randomNumberTwo = Math.floor(Math.random()*numberLimit)
    if(randomNumberOne > randomNumberTwo) {
        numberOne.innerText = randomNumberOne;
        numberTwo.innerText = randomNumberTwo ;
    }else {
        numberTwo.innerText = randomNumberOne;
        numberOne.innerText = randomNumberTwo ;
    }
    Operation.innerText = operation;
    equalSign.innerText = "=?"
    question.appendChild(numberOne);
    question.appendChild(Operation);
    question.appendChild(numberTwo);
    question.appendChild(equalSign)
    questionContainer.appendChild(question)
    let correctAnswer = document.createElement("button")
    let randomAnswerOne = document.createElement("button")
    let randomAnswerTwo = document.createElement("button")
    switch(operation) {
        case "+":
            correctAnswer.innerText = randomNumberOne + randomNumberTwo
            break
            case "-":
                correctAnswer.innerText = randomNumberOne - randomNumberTwo
                break
            case "X":
                correctAnswer.innerText = randomNumberOne * randomNumberTwo
                break
            case "/":
                if(randomNumberOne > randomNumberTwo) {
                    correctAnswer.innerText = Math.round((randomNumberOne / randomNumberTwo)*10)/10

                }else {
                    correctAnswer.innerText = Math.round(randomNumberTwo / randomNumberOne)

                }
                break
    }
    randomAnswerOne.innerText =  Number(correctAnswer.innerText) + Number(3)
    randomAnswerTwo.innerText =  correctAnswer.innerText - 3
    var randomOptions = [[2,0,1],[1,0,2],[0,1,2],[2,1,0],[0,2,1],[1,2,0]]
    var options = [correctAnswer,randomAnswerOne,randomAnswerTwo]
    thisRandomOption = Math.floor(Math.random()* randomOptions.length)
    for(let i = 0; i< randomOptions[thisRandomOption].length; i++ ) {
        thisOption = randomOptions[thisRandomOption][i]
        answers.appendChild(options[thisOption])
    }
    answerContainer.appendChild(answers)
    randomAnswerOne.addEventListener("click",checkTrialsLeft)
    randomAnswerTwo.addEventListener("click",checkTrialsLeft)
    correctAnswer.addEventListener("click",()=>{
        if (!correctSound.paused) {
            correctSound.pause(); 
            correctSound.currentTime = 0;
          }
          correctSound.play();
        questionContainer.removeChild(question)
        answerContainer.removeChild(answers)
        generateQuestion(operation,numberLimit)
        _score++;
        score.innerText = "Score: " + _score
    })
}
addition.addEventListener("click",()=>{
    questionContainer.removeChild(question)
    answerContainer.removeChild(answers)
    generateQuestion("+")
    startGame()
})

subtraction.addEventListener("click",()=>{
    questionContainer.removeChild(question)
    answerContainer.removeChild(answers)
    generateQuestion("-")
    startGame()
})

multiplication.addEventListener("click",()=>{
    questionContainer.removeChild(question)
    answerContainer.removeChild(answers)
    generateQuestion("X")
    startGame()
})

division.addEventListener("click",()=>{
    questionContainer.removeChild(question)
    answerContainer.removeChild(answers)
    generateQuestion("/")
    startGame()
})
divisionMobile.addEventListener("click",()=>{
    questionContainer.removeChild(question)
    answerContainer.removeChild(answers)
    overlayMethods.style.transform = "scale(0)"
    generateQuestion("/")
    startGame()
    burgerBtn.style.display = "block"
    closeBtn.style.display = "none"
})
additionMobile.addEventListener("click",()=>{
    questionContainer.removeChild(question)
    answerContainer.removeChild(answers)
    overlayMethods.style.transform = "scale(0)"
    generateQuestion("+")
    startGame()
    burgerBtn.style.display = "block"
    closeBtn.style.display = "none"
})
subtractionMobile.addEventListener("click",()=>{
    questionContainer.removeChild(question)
    answerContainer.removeChild(answers)
    overlayMethods.style.transform = "scale(0)"
    generateQuestion("-")
    startGame()
    burgerBtn.style.display = "block"
    closeBtn.style.display = "none"
})
multiplicationMobile.addEventListener("click",()=>{
    questionContainer.removeChild(question)
    answerContainer.removeChild(answers)
    overlayMethods.style.transform = "scale(0)"
    generateQuestion("X")
    startGame()
    burgerBtn.style.display = "block"
    closeBtn.style.display = "none"
})
okay.addEventListener("click",()=> {
    showMyScore()
    failedMessage.style.display = "none"
})
okayy.addEventListener("click",()=> {
    showMyScore()
    timeIsUpMessage.style.display = "none"
})
setting.addEventListener("click",()=>{
    difficultyChooser.style.display = "flex"
    generateClickSound()
})
settingsMobile.addEventListener("click",()=>{
    generateClickSound()
    overlayMethods.style.transform = "scale(0)"
    difficultyChooser.style.display = "flex"
    burgerBtn.style.display = "block"
    closeBtn.style.display = "none"
})
scores.addEventListener("click",showMyScore)
scoresMobile.addEventListener("click",()=> {
    showMyScore()
    burgerBtn.style.display = "block"
    closeBtn.style.display = "none"
    overlayMethods.style.transform = "scale(0)"

})
saveDifficulty.addEventListener("click",()=> saveDifficulties())