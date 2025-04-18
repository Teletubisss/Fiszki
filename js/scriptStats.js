window.onload = function () {
    let results = JSON.parse(localStorage.getItem("lessonResults"));

    document.getElementById("correctAnswers").innerText = results.correctPercentage;
    document.getElementById("XPGained").innerText = results.xpGained;
    document.getElementById("timeLesson").innerText = results.elapsedTime;

    

};
