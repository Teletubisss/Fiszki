let cardRow = document.querySelector('#cardRow');
currentTask = undefined;



let keyDownTitle = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();

        let newProjectDesc = document.querySelector("#NewProDesc");
        newProjectDesc.focus();
    }
}

let smallCard = (valueFront, descrFront, valueBack, descrBack) => {
    return `<div class="col-lg-3 col-md-4 col-6">
                <div class="card d-flex justify-content-center align-items-center smallCard p-4 mb-3">
                    <div>
                        <div class="card-body d-flex flex-column justify-content-center align-items-center p-5">
                                <button onclick="editCard(this.parentElement.parentElement.parentElement.parentElement)" type="button" class="btn btn-primary d-flex justify-content-between m-2">EDIT</button>
                            <h5 id="titleFrontSmall">${valueFront}</h5>
                            <p id="descriptionFrontSmall">${descrFront}</p>
                        </div>
                    </div>
                    <div class="hidden">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center p-5">
                            <h5 id="titleBackSmall">${valueBack}</h5>
                            <p id="descriptionBackSmall">${descrBack}</p>
                        </div>
                    </div>
                </div>
            </div>`;
}


let addCard = (valueFront, descrFront, valueBack, descrBack) => {
    if (valueFront !== '' && valueBack !== '') {
        cardRow.innerHTML += smallCard(valueFront, descrFront, valueBack, descrBack);
    }
}

let titleKeyDown = (e, descriptionSelectorId) => {
    if (e.keyCode === 13) {
        let bigCardDesc = document.querySelector(descriptionSelectorId);
        bigCardDesc.focus();
    }
}

let descriptionKeyDown = (e, titleSelectorId, decriptionSelectorId) => {
    if (e.keyCode === 13) {
        saveCard(titleSelectorId, decriptionSelectorId)
    }
}

let saveCard = (titleSelectorIdFront, decriptionSelectorIdFront, titleSelectorIdBack, descriptionSelectorIdBack) => {
    let bigCardTextFront = document.querySelector(titleSelectorIdFront);
    let bigCardDescFront = document.querySelector(decriptionSelectorIdFront);
    let bigCardTextBack = document.querySelector(titleSelectorIdBack);
    let bigCardDescBack = document.querySelector(descriptionSelectorIdBack);
    closePopup();

    addCard(bigCardTextFront.value, bigCardDescFront.value, bigCardTextBack.value, bigCardDescBack.value);
    bigCardDescFront.value = '';
    bigCardTextFront.value = '';
    bigCardDescBack.value = '';
    bigCardTextBack.value = '';
    bigCardTextFront.focus();
    saveProject();
}

let fliptCard = (activeClass, noneClass) => {
    let active = document.querySelector(activeClass);
    let none = document.querySelector(noneClass);
    active.classList.add('hidden');
    none.classList.remove('hidden');
}

let editCard = (element) => {
    
    document.querySelector('#editPopupContainer').style.display = "flex"
    document.querySelector('#titleInputPopup').value = element.querySelector('#titleFrontSmall').innerText;
    document.querySelector('#descriptionInputPopup').value = element.querySelector('#descriptionFrontSmall').innerText;
    document.querySelector('#titleInputPopupBack').value = element.querySelector('#titleBackSmall').innerText;
    document.querySelector('#descriptionInputPopupBack').value = element.querySelector('#descriptionBackSmall').innerText;
    element.remove();
    saveProject();
}



let saveLastProjectName = (lastTitle) => {
    if (lastTitle === '') {
        Swal.fire("Fill up the title area!");
    }
    else {
        localStorage.setItem('lastProjectTitle', JSON.stringify(lastTitle));
    }
}

let loadLatestFromStorage = () => {
    const latestName = JSON.parse(localStorage.getItem('lastProjectTitle'));
    if (latestName === undefined) {
        return;
    }
    
    loadFromStorage(latestName);
}


let loadFromStorage = (projectName) => {
    const project = JSON.parse(localStorage.getItem(projectName)) || [];
    const cards = project.flips;
    cards.forEach(card => {
        addCard(card.titleFront, card.descriptionFront || "", card.titleBack, card.descriptionBack || "");
    });
    document.getElementById('NewProTitle').value = projectName;
}

let saveProject = () => {
    let lastTitle = document.getElementById('NewProTitle').value;
    saveLastProjectName(lastTitle);
    const cards = getCards();
    const project = {
        projectName: lastTitle,
        projectDecription: 'tutaj desc',
        flips: cards
    }
    localStorage.setItem(lastTitle, JSON.stringify(project));
};




let getCards = () => {
    return Array.from(document.querySelectorAll('#smallCards .smallCard')).map(smallCardStorage => ({
        titleFront: smallCardStorage.querySelector("#titleFrontSmall").innerText,
        descriptionFront: smallCardStorage.querySelector('#descriptionFrontSmall').innerText,
        titleBack: smallCardStorage.querySelector('#titleBackSmall').innerText,
        descriptionBack: smallCardStorage.querySelector('#descriptionBackSmall').innerText   
    }));
}

let closePopup = () => {
    document.querySelector("#editPopupContainer").style.display = "none";
}

let flipCard3D = (flipCard) => {
    const card = document.getElementById(flipCard);
    card.classList.toggle('active');
}



let createEmptyArrays = () => {
    localStorage.setItem("correctAnswers", [])
    localStorage.setItem("wrongAnswers", [])
}




let yourProject = (number, projectName) => {
    return `
            <button type="button" class="btn btn-secondary d-flex justify-content-between m-3" onclick="loadLesson('${projectName}')" >
                <div class="roundBtn h5">${number}</div>
                <span class="h5" id = '${projectName}'>${projectName}</span>
            </button>`;
}

let createYourProjects = () => {
    let row = document.getElementById('YourProjects');
    let keys = Object.keys(localStorage);
    let tableCount = 1;
    keys.forEach(key => {
        if (key !== 'stardrewData' & key !== 'lastProjectTitle') {
            console.log(key)
            let data = JSON.parse(localStorage.getItem(key));
                let buttonHTML = yourProject(tableCount, key);
                row.innerHTML += buttonHTML; 
                tableCount++;
        }
});

}
