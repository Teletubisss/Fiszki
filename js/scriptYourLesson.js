window.onload = function() {
    showRandomCard();
}

let currentProjectName = JSON.parse(localStorage.getItem('currentProjectName'));
let projectData = JSON.parse(localStorage.getItem(currentProjectName));
let correctAnswers = [];
let wrongAnswers = [];
let currentCard;

let moveToCategory = (category) => {
    if (category === "correctAnswers")
        correctAnswers.push(currentCard);
    
    if (category === "wrongAnswers")
        wrongAnswers.push(currentCard);
    
    if (projectData.flips.includes(currentCard))
        projectData.flips = projectData.flips.filter(card => card !== currentCard);
    
    if (projectData.flips.length === 0 && wrongAnswers.length > 0) {
        projectData.flips = [...wrongAnswers];
        wrongAnswers= [];
    }

    console.log('data: ' + projectData.flips.length + ', correct: ' + correctAnswers.length + 'wrong: ' + wrongAnswers.length);

    showRandomCard();
}

let showRandomCard = () => {
    let cards = projectData.flips.length > 0 ? projectData.flips : [];
    currentCard = cards[Math.floor(Math.random() * cards.length)];

    if (currentCard !== undefined) {
        document.querySelector("#startLessonTitleFront").innerText = currentCard.titleFront;
        document.querySelector("#startLessonDescFront").innerText = currentCard.descriptionFront;
        document.querySelector("#startLessonTitleBack").innerText = currentCard.titleBack;
        document.querySelector("#startLessonDescBack").innerText = currentCard.descriptionBack;
    } else {
        swal.fire('Endo :)'); 
    }
}