window.onload = function() {
    createEmptyArrays();
    showRandomCard();
}

let currentProjectName = JSON.parse(localStorage.getItem('currentProjectName'));
let projectData = JSON.parse(localStorage.getItem(currentProjectName));
let correctAnswers = JSON.parse(localStorage.getItem("correctAnswers") || "[]");
let wrongAnswers = JSON.parse(localStorage.getItem("wrongAnswers") || "[]");
let randomIndex = Math.floor(Math.random() * projectData.flips.length);
let randomCard = projectData.flips[randomIndex];

let changeRandomCard = () => {
    let randomIndex = Math.floor(Math.random() * projectData.flips.length);
    let randomCard = projectData.flips[randomIndex];
}

let createEmptyArrays = () => {
    if (!localStorage.getItem("correctAnswers")) {
        localStorage.setItem("correctAnswers", JSON.stringify([]));
    }
    if (!localStorage.getItem("wrongAnswers")) {
        localStorage.setItem("wrongAnswers", JSON.stringify([]));
    }
};

let moveToCategory = (category) => {

    if (category === "correct") {
        correctAnswers.push(randomCard);
        localStorage.setItem("correctAnswers", JSON.stringify(correctAnswers));
    } else if (category === "wrong") {
        wrongAnswers.push(randomCard);
        localStorage.setItem("wrongAnswers", JSON.stringify(wrongAnswers));
    }
    projectData.flips = projectData.flips.filter(card => card !== randomCard);
    debugger;
    localStorage.setItem(currentProjectName, JSON.stringify(projectData));

    if (projectData.flips.length === 0 && wrongAnswers.length > 0) {
        projectData.flips = [...wrongAnswers];
        localStorage.setItem(currentProjectName, JSON.stringify(projectData));
        localStorage.setItem("wrongAnswers", JSON.stringify([])); 
    }
    changeRandomCard();
    showRandomCard();
}





let showRandomCard = () => {
    
    document.querySelector("#startLessonTitleFront").innerText = randomCard.titleFront;
    document.querySelector("#startLessonDescFront").innerText = randomCard.descriptionFront;
    document.querySelector("#startLessonTitleBack").innerText = randomCard.titleBack;
    document.querySelector("#startLessonDescBack").innerText = randomCard.descriptionBack;
}