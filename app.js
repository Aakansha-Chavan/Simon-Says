let gameSeq=[];
let userSeq=[];

let btns=["red","yellow","purple","green"];

let started=false;
let level=0;
let highScore=0;

let h3=document.querySelector("h3");
let h2=document.querySelector(".highest");

//to start the game
document.addEventListener("keydown",function(){
    if(started==false){
        console.log("game is started");
        started=true;
    }
   levelUp();
})

//button flash function
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },600)
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },350)
}

function gameOverFlash(){
    let body1=document.querySelector("body");
    body1.classList.add("gameover");
    setTimeout(function(){
        body1.classList.remove("gameover")
    },350)
}


//levelUp function
function levelUp() {
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`;
    //randon button code
    let randIndx=Math.floor(Math.random()*4);
    let randColor=btns[randIndx];
    gameSeq.push(randColor);
    console.log(randIndx);
    console.log(gameSeq);

    let randBtn=document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
}

//check answer function
function checkAns(idx){
    // let idx=level -1; 
    if(userSeq[idx]===gameSeq[idx]){   //here it checks color at that index.
        // console.log("same value"); It has two cases
        if(userSeq.length==gameSeq.length){ //(for last value)checks length and if true then level up
            setTimeout(levelUp(),1000);
        }
    }
    else {
        h3.innerHTML=`Game over! Your score was <b>${level}</b> <br> Press any key to start the game`;
        gameOverFlash();
        reset();
    }
}

function btnPress(){
    // console.log(this);
    let btn=this;
    userFlash(btn);

    let userColor=btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    let idx=userSeq.length-1; //to check the current index or button
    checkAns(idx);
}

let allBtns=document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click",btnPress)
}

function reset(){
   let newhighScore=level;
   highestScore(newhighScore)
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

function highestScore(newhighScore) {
    if(newhighScore>highScore){
        document.querySelector("h2").innerHTML=`Highest score: ${newhighScore}`;
        highScore=newhighScore;
        
    }
    else {
        document.querySelector("h2").innerHTML=`Highest score: ${highScore}`;
    }
}



