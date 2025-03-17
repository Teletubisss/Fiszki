window.onload = function() {
    showRandomCard();
    updateLessonStats();
}

let startTime = new Date().getTime();
let currentProjectName = JSON.parse(localStorage.getItem('currentProjectName'));
let projectData = JSON.parse(localStorage.getItem(currentProjectName));
let correctAnswers = [];
let wrongAnswers = [];
let currentCard;
let totalClicks = JSON.parse(localStorage.getItem("totalClicks")) || 0;
let correctClicks = JSON.parse(localStorage.getItem("correctClicks")) || 0;

let moveToCategory = (category) => {

    totalClicks++;
    
    if (category === "correctAnswers") {
        correctAnswers.push(currentCard);
        correctClicks++;
    }
    
    if (category === "wrongAnswers")
        wrongAnswers.push(currentCard);
    
    if (projectData.flips.includes(currentCard))
        projectData.flips = projectData.flips.filter(card => card !== currentCard);
    
    if (projectData.flips.length === 0 && wrongAnswers.length > 0) {
        projectData.flips = [...wrongAnswers];
        wrongAnswers= [];
    }

    if (document.getElementById('cardLesson').classList.contains('active')) {
        document.getElementById('cardLesson').classList.remove('active');
    }
    console.log('data: ' + projectData.flips.length + ', correct: ' + correctAnswers.length + 'wrong: ' + wrongAnswers.length);

    showRandomCard();
    updateLessonStats();
}

let showRandomCard = () => {
    let cards = projectData.flips.length > 0 ? projectData.flips : [];
    currentCard = cards[Math.floor(Math.random() * cards.length)];

    if (currentCard !== undefined) {
        document.querySelector("#startLessonTitleFront").innerText = currentCard.titleFront;
        document.querySelector("#startLessonDescFront").innerText = currentCard.descriptionFront;
        document.querySelector("#startLessonTitleBack").innerText = currentCard.titleBack;
        document.querySelector("#startLessonDescBack").innerText = currentCard.descriptionBack;
    } 
    else {
        let correctPercentage = totalClicks > 0 ? (correctClicks / totalClicks) * 100 : 0;
        let xpGained = correctPercentage * 2.5;

        let endTime = new Date().getTime();
        let elapsedTime = Math.floor((endTime - startTime) / 1000); 

        localStorage.setItem("lessonResults", JSON.stringify({
            correctPercentage: correctPercentage.toFixed(2) + "%",
            xpGained: xpGained.toFixed(0) + "XP",
            elapsedTime: elapsedTime + " sekund"

        }));

        let playerXP = parseFloat(localStorage.getItem("playerXP")) || 0;
        playerXP += xpGained;
        localStorage.setItem("playerXP", JSON.stringify(playerXP));


        window.location.href = "MyStats.html";
    }
}


let updateLessonStats = () => {
    document.getElementById('correctAnswersDisplay').innerText = correctAnswers.length;
    document.getElementById('wrongAnswersDisplay').innerText = wrongAnswers.length;
    document.getElementById('cardsLeftDisplay').innerText = projectData.flips.length;
}
