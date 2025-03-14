window.onload = function() {
    createEmptyArrays();
    showRandomCard();
}

let currentProjectName = JSON.parse(localStorage.getItem('currentProjectName'));
let projectData = JSON.parse(localStorage.getItem(currentProjectName));
let correctAnswers = JSON.parse(localStorage.getItem("correctAnswers") || "[]");
let wrongAnswers = JSON.parse(localStorage.getItem("wrongAnswers") || "[]");
let currentCard;


let createEmptyArrays = () => {
        localStorage.setItem("correctAnswers", JSON.stringify([]));
        localStorage.setItem("wrongAnswers", JSON.stringify([]));   
};


let moveToCategory = (category) => {

    if (category === "correctAnswers") {
        correctAnswers.push(currentCard);
    } 
    if (category === "wrongAnswers") {
        wrongAnswers.push(currentCard);
    }
    if (projectData.flips.includes(currentCard)) {
        projectData.flips = projectData.flips.filter(card => card !== currentCard);
    } else if (projectData.wrongAnswers.includes(currentCard)) {
        projectData.wrongAnswers = projectData.wrongAnswers.filter(card => card !== currentCard);
}


    localStorage.setItem("correctAnswers", JSON.stringify(correctAnswers));
    localStorage.setItem("wrongAnswers", JSON.stringify(wrongAnswers));
    localStorage.setItem(currentProjectName, JSON.stringify(projectData));

    showRandomCard();

}


let showRandomCard = () => {
    let cards = projectData.flips.length > 0 ? projectData.flips : projectData.wrongAnswers;
    currentCard = cards[Math.floor(Math.random() * cards.length)];
    console.log(currentCard)
    document.querySelector("#startLessonTitleFront").innerText = currentCard.titleFront;
    document.querySelector("#startLessonDescFront").innerText = currentCard.descriptionFront;
    document.querySelector("#startLessonTitleBack").innerText = currentCard.titleBack;
    document.querySelector("#startLessonDescBack").innerText = currentCard.descriptionBack;
}