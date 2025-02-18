let cardRow = document.querySelector('#cardRow');

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
                    <div class="card d-flex justify-content-center align-items-center p-4 mb-3">
                        <div>
                            <div class="card-body d-flex flex-column justify-content-center align-items-center p-5">
                                    <button onclick="editCard(this.parentElement.parentElement.parentElement)" type="button" class="btn btn-primary d-flex justify-content-between m-2">EDIT</button>
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

    addCard(bigCardTextFront.value, bigCardDescFront.value, bigCardTextBack.value, bigCardDescBack.value);
    bigCardDescFront.value = '';
    bigCardTextFront.value = '';
    bigCardDescBack.value = '';
    bigCardTextBack.value = '';
    bigCardText.focus();
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
}



let saveToStorage = () => {

    const tasks = Array.from(document.querySelectorAll('#taskList li')).map(task => ({
        text: task.querySelector("span").innerText,
        done: task.querySelector("span").classList.contains("done")
    }));;
    console.log(tasks)

    
    localStorage.setItem("stardrewData", JSON.stringify(tasks));
}
let saveEdit = () => {
    if (currentTask) {
        currentTask.innerText = document.getElementById("editInput").value;
    }
    saveToStorage();
    closePopup();
}

let closePopup = () => {
    document.querySelector("#editPopupContainer").style.display = "none";
}

let keyDownSave = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        saveEdit();
    }
    else if (e.keyCode === 27) {
        e.preventDefault();
        closePopup();
    }
}