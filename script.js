// Grab all the DOM elements we'll need
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");
const paper6 = document.querySelector("#p6");
const paper7 = document.querySelector("#p7");
const paper8 = document.querySelector("#p8");
const themeToggle = document.querySelector("#theme-toggle");
const autoBtn = document.querySelector("#auto-btn");
const questionText = document.querySelector("#question-text");
const optionsContainer = document.querySelector("#options");
const quizNextBtn = document.querySelector("#quiz-next-btn");
const startBookBtn = document.querySelector("#start-book-btn");
const feedback = document.querySelector("#feedback");
const quizContainer = document.querySelector("#quiz-container");
const resultContainer = document.querySelector("#result-container");
const resultText = document.querySelector("#result-text");
const retryBtn = document.querySelector("#retry-btn");
const progress = document.querySelector("#progress");
const firstPage = document.querySelector(".first-page");
const bookSection = document.querySelector(".Book-Section");
const startQuizBtn = document.querySelector("#start-quiz-btn");

// Quick check to make sure key elements are loaded
if (!startQuizBtn) console.error("Couldn't find startQuizBtn in DOM");
if (!firstPage) console.error("firstPage element missing");
if (!bookSection) console.error("bookSection not found");
if (!resultContainer) console.error("resultContainer not in DOM");
console.log("Script running, startQuizBtn found:", startQuizBtn);

// Quiz data with questions, options, and answers
const quizData = [
    {
        question: "Where was Shivaji Maharaj born?",
        options: ["Raigad Fort", "Shivneri Fort", "Panhala Fort", "Torna Fort"],
        answer: "Shivneri Fort"
    },
    {
        question: "On what date was Shivaji Maharaj born?",
        options: ["February 19, 1630", "June 6, 1674", "April 3, 1680", "March 12, 1646"],
        answer: "February 19, 1630"
    },
    {
        question: "Who was Shivaji’s mother?",
        options: ["Tarabai", "Jijabai", "Putalabai", "Soyarabai"],
        answer: "Jijabai"
    },
    {
        question: "What inspired Shivaji’s vision of Swaraj?",
        options: ["Mughal conquests", "Jijabai’s teachings", "British trade", "Portuguese alliances"],
        answer: "Jijabai’s teachings"
    },
    {
        question: "Which fort did Shivaji capture at age 16?",
        options: ["Raigad", "Kondana", "Torna", "Pratapgad"],
        answer: "Torna"
    },
    {
        question: "In which year did Shivaji capture Torna Fort?",
        options: ["1646", "1659", "1660", "1674"],
        answer: "1646"
    },
    {
        question: "What was the name of Shivaji’s loyal warriors from the Sahyadri hills?",
        options: ["Mavalas", "Rajputs", "Pathans", "Sikhs"],
        answer: "Mavalas"
    },
    {
        question: "Who was sent by Bijapur to crush Shivaji in 1659?",
        options: ["Shaista Khan", "Aurangzeb", "Afzal Khan", "Baji Rao"],
        answer: "Afzal Khan"
    },
    {
        question: "At which fort did Shivaji defeat Afzal Khan?",
        options: ["Raigad", "Pratapgad", "Panhala", "Sinhagad"],
        answer: "Pratapgad"
    },
    {
        question: "What weapon did Shivaji use against Afzal Khan?",
        options: ["Sword", "Spear", "Tiger claw", "Bow"],
        answer: "Tiger claw"
    },
    {
        question: "Which fort was Shivaji besieged at in 1660?",
        options: ["Panhala", "Raigad", "Torna", "Shivneri"],
        answer: "Panhala"
    },
    {
        question: "Who defended Ghod Khind during Shivaji’s escape from Panhala?",
        options: ["Tanaji Malusare", "Baji Prabhu Deshpande", "Dadaji Kondadev", "Sambhaji"],
        answer: "Baji Prabhu Deshpande"
    },
    {
        question: "Which Mughal port did Shivaji raid in 1664?",
        options: ["Surat", "Goa", "Bombay", "Diu"],
        answer: "Surat"
    },
    {
        question: "Who did Shivaji attack in a night raid in Pune in 1663?",
        options: ["Aurangzeb", "Shaista Khan", "Afzal Khan", "Mirza Raja Jai Singh"],
        answer: "Shaista Khan"
    },
    {
        question: "How did Shivaji escape from Agra in 1666?",
        options: ["Disguised as a soldier", "Hidden in a basket", "Bribed guards", "Fought his way out"],
        answer: "Hidden in a basket"
    },
    {
        question: "When was Shivaji crowned Chhatrapati?",
        options: ["June 6, 1674", "February 19, 1630", "April 3, 1680", "March 12, 1646"],
        answer: "June 6, 1674"
    },
    {
        question: "What was Shivaji’s council of ministers called?",
        options: ["Ashta Siddhi", "Ashta Pradhan", "Navratna", "Panchayat"],
        answer: "Ashta Pradhan"
    },
    {
        question: "What title did Shivaji take during his coronation?",
        options: ["Haindava Dharmoddharak", "Samrat", "Sultan", "Raja"],
        answer: "Haindava Dharmoddharak"
    },
    {
        question: "What was Shivaji’s guerrilla tactic called?",
        options: ["Ganimi Kava", "Chakravyuh", "Hit-and-run", "Blitzkrieg"],
        answer: "Ganimi Kava"
    },
    {
        question: "How many forts did Shivaji control at his death?",
        options: ["Over 100", "Over 300", "50", "500"],
        answer: "Over 300"
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let isQuizActive = false;
let shuffledQuestions = [];

// Shuffle questions to mix things up
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Update progress bar
function updateProgress() {
    progress.textContent = `Question ${currentQuestion + 1} of ${shuffledQuestions.length}`;
}

// Load the current question
function loadQuestion() {
    console.log(`Loading question ${currentQuestion + 1}`);
    const currentQuiz = shuffledQuestions[currentQuestion];
    questionText.textContent = currentQuiz.question;
    optionsContainer.innerHTML = '';
    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.setAttribute('aria-label', `Option ${option}`);
        button.addEventListener('click', () => selectOption(option, button));
        optionsContainer.appendChild(button);
    });
    quizNextBtn.classList.add('hidden');
    feedback.classList.add('hidden');
    selectedOption = null;
    updateProgress();
    startQuizBtn.style.pointerEvents = 'auto';
    startQuizBtn.style.zIndex = '1000';
}

// Handle option selection
function selectOption(option, button) {
    if (selectedOption) return;
    selectedOption = option;
    const isCorrect = option === shuffledQuestions[currentQuestion].answer;
    if (isCorrect) {
        score++;
        button.classList.add('correct');
        feedback.textContent = 'Nice one!';
        feedback.style.color = '#28a745';
    } else {
        button.classList.add('wrong');
        feedback.textContent = `Nope, it's ${shuffledQuestions[currentQuestion].answer}.`;
        feedback.style.color = '#dc3545';
    }
    feedback.classList.remove('hidden');
    quizNextBtn.classList.remove('hidden');
    optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
}

// Show final score
function showResult() {
    console.log(`Quiz done, score: ${score}/${currentQuestion + 1}`);
    quizContainer.querySelector('#question-container').classList.add('hidden');
    quizContainer.querySelector('#feedback').classList.add('hidden');
    quizContainer.querySelector('#quiz-next-btn').classList.add('hidden');
    resultContainer.classList.remove('hidden');
    startBookBtn.classList.remove('hidden');
    resultText.textContent = `You got ${score} out of ${currentQuestion + 1}!`;
    isQuizActive = false;
    startQuizBtn.textContent = 'Start Quiz';
    startQuizBtn.style.pointerEvents = 'auto';
    startQuizBtn.style.zIndex = '1000';
}

// Quit quiz and show score
function quitQuiz() {
    console.log("Quitting quiz");
    showResult();
}

// Next question button
quizNextBtn.addEventListener('click', () => {
    console.log("Moving to next question");
    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Start book from result screen
startBookBtn.addEventListener('click', () => {
    console.log("Switching to book view");
    firstPage.classList.add('hidden');
    bookSection.classList.add('active');
    bookSection.classList.remove('hidden');
});

// Retry quiz
retryBtn.addEventListener('click', () => {
    console.log("Restarting quiz");
    currentQuestion = 0;
    score = 0;
    shuffledQuestions = shuffleArray(quizData);
    quizContainer.querySelector('#question-container').classList.remove('hidden');
    resultContainer.classList.add('hidden');
    startBookBtn.classList.add('hidden');
    loadQuestion();
});

// Start or quit quiz
startQuizBtn.addEventListener('click', (e) => {
    console.log(`Quiz button clicked, isQuizActive: ${isQuizActive}`);
    e.preventDefault();
    if (isQuizActive) {
        quitQuiz();
    } else {
        isQuizActive = true;
        startQuizBtn.textContent = 'Quit Quiz';
        bookSection.classList.remove('active');
        bookSection.classList.add('hidden');
        firstPage.classList.remove('hidden');
        currentQuestion = 0;
        score = 0;
        shuffledQuestions = shuffleArray(quizData);
        quizContainer.querySelector('#question-container').classList.remove('hidden');
        resultContainer.classList.add('hidden');
        startBookBtn.classList.add('hidden');
        loadQuestion();
    }
});

// Book page flipping logic
let currentLocation = 1;
let numOfPapers = 8;
let maxLocation = numOfPapers + 1;
let autoFlipping = false;
let autoInterval;

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        switch (currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                break;
            case 4:
                paper4.classList.add("flipped");
                paper4.style.zIndex = 4;
                break;
            case 5:
                paper5.classList.add("flipped");
                paper5.style.zIndex = 5;
                break;
            case 6:
                paper6.classList.add("flipped");
                paper6.style.zIndex = 6;
                break;
            case 7:
                paper7.classList.add("flipped");
                paper7.style.zIndex = 7;
                break;
            case 8:
                paper8.classList.add("flipped");
                paper8.style.zIndex = 8;
                closeBook(false);
                book.style.boxShadow = "none";
                break;
            default:
                throw new Error("Invalid page state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        switch (currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 8;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 7;
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 6;
                break;
            case 5:
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 5;
                break;
            case 6:
                paper5.classList.remove("flipped");
                paper5.style.zIndex = 4;
                break;
            case 7:
                paper6.classList.remove("flipped");
                paper6.style.zIndex = 3;
                break;
            case 8:
                paper7.classList.remove("flipped");
                paper7.style.zIndex = 2;
                break;
            case 9:
                openBook();
                paper8.classList.remove("flipped");
                paper8.style.zIndex = 1;
                break;
            default:
                throw new Error("Invalid page state");
        }
        currentLocation--;
    }
}

// Set up event listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Keyboard controls for book
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goPrevPage();
    if (e.key === 'ArrowRight') goNextPage();
});

// Toggle dark/light theme
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? 'Light Theme' : 'Dark Theme';
});

// Auto-flip pages
autoBtn.addEventListener('click', () => {
    autoFlipping = !autoFlipping;
    autoBtn.textContent = autoFlipping ? 'Stop Auto-Flip' : 'Auto-Flip';
    if (autoFlipping) {
        autoInterval = setInterval(() => {
            if (currentLocation < maxLocation) {
                goNextPage();
            } else {
                currentLocation = 1;
                closeBook(true);
                paper1.classList.remove('flipped');
                paper2.classList.remove('flipped');
                paper3.classList.remove('flipped');
                paper4.classList.remove('flipped');
                paper5.classList.remove('flipped');
                paper6.classList.remove('flipped');
                paper7.classList.remove('flipped');
                paper8.classList.remove('flipped');
                paper1.style.zIndex = 8;
                paper2.style.zIndex = 7;
                paper3.style.zIndex = 6;
                paper4.style.zIndex = 5;
                paper5.style.zIndex = 4;
                paper6.style.zIndex = 3;
                paper7.style.zIndex = 2;
                paper8.style.zIndex = 1;
            }
        }, 2000);
    } else {
        clearInterval(autoInterval);
    }
});
