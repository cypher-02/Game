const PlayBtn = document.getElementById('play');
const container = document.querySelector('.container');

let count = 0;
let score = 0;
let HighScore = 0;
let questionTimer;
let timeLeft = 30;

let parent, task, heading, para, num1, num2, ans, opt1, opt2, opt3, a, b, c, btn, d, timerDisplay;

function updateTimerDisplay() {
    timerDisplay.textContent = `Time: ${timeLeft}s`;
}

function createNewQuestion() {
    // Reset timer
    timeLeft = 30;
    
    // Clear any existing timer
    if (questionTimer) {
        clearInterval(questionTimer);
    }

    num1 = Math.floor(Math.random() * (10 - 1) + 1);
    num2 = Math.floor(Math.random() * (10 - 1) + 1);
    
    // Clear previous question content
    task.innerHTML = '';
    
    // Create timer display (added this element)
    timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer');
    updateTimerDisplay();
    task.append(timerDisplay);
    
    heading = document.createElement('h1');
    heading.textContent = 'MATHS-QUIZ';
    task.append(heading);
    
    para = document.createElement('p');
    para.textContent = num1 + ' ' + '+' + ' ' + num2 + ' = ?';
    task.append(para);
    
    btn = document.createElement('div');
    btn.classList.add('btn');
    task.append(btn);
    CreateNextBtn();
    
    ans = num1 + num2;
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;
    d = Math.floor(Math.random() * 3) + 1;

    opt1 = document.createElement('button');
    opt1.classList.add('opt1');
    opt2 = document.createElement('button');
    opt2.classList.add('opt2');
    opt3 = document.createElement('button');
    opt3.classList.add('opt3');
    

    if (d == 3) {
        opt1.textContent = ans;
        opt2.textContent = b;
        opt3.textContent = a;
    }
    else if (d == 2) {
        opt2.textContent = ans;
        opt1.textContent = a;
        opt3.textContent = b;
    }
    else if (d == 1) {
        opt3.textContent = ans;
        opt2.textContent = a;
        opt1.textContent = b;
    }
    btn.append(opt1, opt2, opt3);

    // Start countdown timer (using interval instead of timeout)
    questionTimer = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(questionTimer);
            // Count as wrong answer if time runs out
            if (score > 0) {
                score--;
            }
            count++;
            console.log("Time's up! Moving to next question");
            console.log(score);
            console.log(count);
            
            createNewQuestion();
        }
    }, 1000); // Update every second

    btn.addEventListener('click', function(event) {
        clearInterval(questionTimer); // Stop the timer when an option is clicked
        
        if (event.target.classList.contains('opt1')) {
            if (opt1.textContent == ans) {
                score++;
            }
            else {
                if (score > 0) {
                    score--;
                }
            }
            count++;
        }   
        else if (event.target.classList.contains('opt2')) {
            if (opt2.textContent == ans) {
                score++;
            }
            else {
                if (score > 0) {
                    score--;
                }
            }
            count++;
        }
        else if (event.target.classList.contains('opt3')) {
            if (opt3.textContent == ans) {
                score++;
            }
            else {
                if (score > 0) {
                    score--;
                }
            }
            count++;
        }
        if(count == 10){
            task.remove();
            let thanks = document.createElement('div');
            thanks.classList.add("thanks");
            container.append(thanks);
            let heading2 = document.createElement('h2');
            heading2.textContent = 'THANKS FOR PLAYING';
            let paragraph = document.createElement('p');
            paragraph.textContent = "YOUR SCORE:" + score;
            if(score>HighScore){
                HighScore = score ;
                localStorage.setItem('HighScore', JSON.stringify(HighScore));
            }
            let paragraph1 = document.createElement('p');
            paragraph1.textContent = "HIGH SCORE:" + HighScore;
            thanks.append(heading2,paragraph,paragraph1);
            let PA = document.createElement('button');
            PA.textContent = 'Retry ?';
            thanks.append(PA);
            PA.addEventListener('click',call());
        }   
        console.log(score);
        console.log(count);
        
        
        // Move to next question immediately when an option is clicked
        createNewQuestion();
    });
}

function CreateNextBtn(){
    let btn2 = document.createElement('div');
    btn2.classList.add('btn2');
    task.append(btn2);
    let next = document.createElement('button');
    next.textContent = 'Next';
    let PlayAgain = document.createElement('button');
    PlayAgain.textContent = 'PLAY AGAIN';
    btn2.append(next,PlayAgain);
    next.addEventListener('click',function(){
        createNewQuestion();
    })
    PlayAgain.addEventListener('click',function(){
        createNewQuestion();
        score = 0;
        count = 0;
    })
    let ScoreDiv = document.createElement('div');
    ScoreDiv.classList.add('ScoreDiv');
    let ScoreDiv1 = document.createElement('div');
    ScoreDiv1.classList.add('ScoreDiv1');
    let ScoreDiv2 = document.createElement('div');
    ScoreDiv2.classList.add('ScoreDiv2');
    task.append(ScoreDiv,ScoreDiv1,ScoreDiv2);
    console.log(count);
    console.log(score);
    console.log(HighScore);
    let HScore = document.createElement('p');
    HScore.classList.add('HScore');
    HScore.textContent = 'High Score: ' + JSON.parse(localStorage.getItem('HighScore'));
    let SScore = document.createElement('p');
    SScore.classList.add('SScore');
    SScore.textContent = 'Score: '+ score;
    let QNum = document.createElement('p');
    QNum.classList.add('QNum');
    QNum.textContent = 'Question Number: '+ count;
    ScoreDiv.append(QNum);
    ScoreDiv1.append(HScore);
    ScoreDiv2.append(SScore);
}
function call(){
    createNewQuestion();
}

PlayBtn.addEventListener('click', function() {
    parent = PlayBtn.parentNode;
    parent.remove();
    task = document.createElement('div');
    task.classList.add('task');
    container.append(task);
    
    // Create first question
    createNewQuestion();
});