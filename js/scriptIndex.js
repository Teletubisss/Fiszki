window.onload = function() {
    initData();

    let XP = JSON.parse(localStorage.getItem('playerXP'));
    document.querySelector('.XP').innerText = XP;
}

let initData = () => {
    const isDataInitialized = JSON.parse(localStorage.getItem('isDataInitialized'));
    if (isDataInitialized !== null) {
        console.log('data already initialized');
        return;
    }    
    console.log('initializing demo project');
    
    fetch('./data/init.json')
    .then(response => response.text())
    .then(jsonString => {
        console.log('saving data');
        localStorage.setItem('Demo', jsonString);
        localStorage.setItem('isDataInitialized', 'true');
    })
    .catch(error => console.error('Error loading JSON:', error));
    
}
