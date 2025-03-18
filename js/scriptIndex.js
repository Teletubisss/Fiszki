window.onload = function() {
    let XP = JSON.parse(localStorage.getItem('playerXP'));
    document.querySelector('.XP').innerText = XP;
}