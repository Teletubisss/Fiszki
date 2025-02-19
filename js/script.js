let cardRow = document.querySelector('#cardRow');
currentTask = undefined;

window.onload = function() {

}

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
    saveToStorage();
}

let flipCard = (activeClass, noneClass) => {
    let active = document.querySelector(activeClass);
    let none = document.querySelector(noneClass);
    active.classList.add('hidden');
    none.classList.remove('hidden');
}

let editCard = (element) => {
    
    document.querySelector('#editPopupContainer').style.display = "flex"
    document.querySelector('#titleInputPopup').value = document.querySelector('#titleFrontSmall').innerText;
    document.querySelector('#descriptionInputPopup').value = element.querySelector('#descriptionFrontSmall').innerText;
    document.querySelector('#titleInputPopupBack').value = element.querySelector('#titleBackSmall').innerText;
    document.querySelector('#descriptionInputPopupBack').value = element.querySelector('#descriptionBackSmall').innerText;
    element.remove();
    saveToStorage();
}



let saveToStorage = () => {

    const cards = Array.from(document.querySelectorAll('#smallCards .smallCard')).map(smallCardStorage => ({
        titleFront: smallCardStorage.querySelector("#titleFrontSmall").innerText,
        descriptionFront: smallCardStorage.querySelector('#descriptionFrontSmall').innerText,
        titleBack: smallCardStorage.querySelector('#titleBackSmall').innerText,
        descriptionBack: smallCardStorage.querySelector('#descriptionBackSmall').innerText
    }));;
    localStorage.setItem("Project1", JSON.stringify(cards));
}


let closePopup = () => {
    document.querySelector("#editPopupContainer").style.display = "none";
}




document.querySelectorAll('.flip-card').forEach(card => {
    const button = card.querySelector('.flip-trigger');
    const innerCard = card.querySelector('.flip-card-inner');

    if (button) {
        button.addEventListener('click', () => {
            if (innerCard.style.transform === 'rotateY(180deg)') {
                innerCard.style.transform = 'rotateY(0deg)'; // Cofnięcie obrotu
            } else {
                innerCard.style.transform = 'rotateY(180deg)'; // Obrót
            }
        });
    }
});




document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
        const innerCard = card.querySelector('.flip-card-inner');
        innerCard.classList.toggle('flipped'); // Dodajemy/Usuwamy klasę
    });
});

