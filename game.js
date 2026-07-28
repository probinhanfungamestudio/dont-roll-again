let score = 0;
let number = 0;

let canNext = false;

let time = 3;
let timer;

let gameOver = false;
let paused = false;



// SETTINGS

let difficulty = "normal";

let maxNumber = 10;

let startTime = 3;



let highScore =
Number(localStorage.getItem("highScore")) || 0;



function startTimer(){


clearInterval(timer);


time = startTime;

updateTime();



timer=setInterval(()=>{


if(paused || gameOver)
return;



time -= 0.01;


updateTime();



if(time <= 0){

clearInterval(timer);

lose("TIME'S UP!");

}


},10);


}





function updateTime(){

document.getElementById("time").innerHTML =
"TIME: "+time.toFixed(2);

}





function roll(){


if(gameOver || paused)
return;



if(canNext){


canNext=false;


document.getElementById("nextBtn").disabled=true;



document.getElementById("msg").innerHTML =
"TOO LATE!";


// không reset thời gian nữa

}





let chance =
Math.random();



if(luckUnlocked && chance < luck/100){


number=10;


}

else{


number =
Math.floor(Math.random()*maxNumber)+1;


}



document.getElementById("screen").innerHTML =
number;



if(number==10){


canNext=true;



document.getElementById("nextBtn").disabled=false;


document.getElementById("msg").innerHTML =
"STOP! PRESS NEXT!";


}



}








function next(){


if(!canNext || gameOver)
return;



score++;



if(score > highScore){

highScore = score;

localStorage.setItem(
"highScore",
highScore
);

}




document.getElementById("score").innerHTML =
"Score: "+score;



canNext=false;


document.getElementById("nextBtn").disabled=true;



document.getElementById("screen").innerHTML="0";



document.getElementById("msg").innerHTML =
"KEEP ROLLING!";



startTimer();


}








function lose(text){


gameOver=true;


clearInterval(timer);


document.getElementById("msg").innerHTML =
text+" | Score: "+score;



document.getElementById("retryBtn")
.style.display="inline-block";



document.getElementById("nextBtn")
.disabled=true;


}






function retry(){


number=0;


gameOver=false;


canNext=false;



document.getElementById("screen").innerHTML="0";



document.getElementById("msg").innerHTML =
"Continue!";



document.getElementById("retryBtn")
.style.display="none";



document.getElementById("nextBtn")
.disabled=true;



startTimer();


}








// PAUSE



function pauseGame(){


if(gameOver)
return;


paused=true;


document.getElementById("pauseBox")
.style.display="flex";


}





function continueGame(){


paused=false;


document.getElementById("pauseBox")
.style.display="none";


}










// SETTINGS



function openSettings(){
    paused=true;
    settingsBox.style.display="flex";
}

function closeSettings(){
    paused=false;
    settingsBox.style.display="none";
}







function setDifficulty(level){



difficulty=level;



if(level=="easy"){

startTime=6;
maxNumber=10;

}



if(level=="normal"){

startTime=3;
maxNumber=10;

}



if(level=="hard"){

startTime=2;
maxNumber=20;

}



if(level=="insane"){

startTime=6;
maxNumber=50;

}



if(level=="extreme"){

startTime=10;
maxNumber=80;

}




document.getElementById("diffText")
.innerHTML =
level.toUpperCase();



closeSettings();



startTimer();



}










// THEMES



function openThemes(){


document.getElementById("settingsBox")
.style.display="none";



document.getElementById("themeBox")
.style.display="flex";


}







function closeThemes(){


document.getElementById("themeBox")
.style.display="none";



document.getElementById("settingsBox")
.style.display="flex";


}







function setTheme(name){



document.body.className="";



if(name!="lcd"){

document.body.classList.add(name);

}



localStorage.setItem(
"theme",
name
);



closeThemes();


}








function loadTheme(){


let t =
localStorage.getItem("theme");



if(t){

setTheme(t);

}


}







function resetHighScore(){


highScore=0;


localStorage.removeItem("highScore");


alert("High Score Reset!");



}







loadTheme();


startTimer();

// PERSONALIZATION


let timeUnlocked =
localStorage.getItem("timeUnlocked")=="true";


let luckUnlocked =
localStorage.getItem("luckUnlocked")=="true";


let luck = 1;




function openPersonal(){


document.getElementById("settingsBox")
.style.display="none";


document.getElementById("personalBox")
.style.display="flex";



updatePersonal();

}




function closePersonal(){


document.getElementById("personalBox")
.style.display="none";


document.getElementById("settingsBox")
.style.display="flex";


}




function updatePersonal(){



let ts =
document.getElementById("timeSlider");


let ls =
document.getElementById("luckSlider");



ts.disabled=!timeUnlocked;

ls.disabled=!luckUnlocked;



document.getElementById("timeValue")
.innerHTML =
startTime+"s";



document.getElementById("luckValue")
.innerHTML =
luck;



if(timeUnlocked){

ts.value=startTime;

}


if(luckUnlocked){

ls.value=luck;

}



}




document.getElementById("timeSlider")
.oninput=function(){


startTime =
Number(this.value);


updatePersonal();

}





document.getElementById("luckSlider")
.oninput=function(){


luck =
Number(this.value);


updatePersonal();

}







function unlockTime(){


if(score>=30 && !timeUnlocked){


timeUnlocked=true;


localStorage.setItem(
"timeUnlocked",
true
);


alert("Countdown unlocked!");



updatePersonal();


}

else{

alert("Need 30 Score!");

}


}







function unlockLuck(){


if(score>=50 && !luckUnlocked){


luckUnlocked=true;


localStorage.setItem(
"luckUnlocked",
true
);


alert("Luck unlocked!");



updatePersonal();


}

else{

alert("Need 50 Score!");

}


}

window.onload = function(){

    document.getElementById("pauseBox").style.display="none";
    document.getElementById("settingsBox").style.display="none";
    document.getElementById("themeBox").style.display="none";
    document.getElementById("personalBox").style.display="none";

    loadTheme();
    startTimer();

}

function openHowTo(){

    paused=true;

    document.getElementById("howToBox")
    .style.display="flex";

}


function closeHowTo(){

    paused=false;

    document.getElementById("howToBox")
    .style.display="none";

}