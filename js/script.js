let cardRow = document.querySelector('#cardRow');

let keyDownTitle = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();

        let newProjectDesc = document.querySelector("#NewProDesc");
        newProjectDesc.focus();
    }
}

let smallCard = (value, descr) => {
    return `<div class="col-lg-3 col-md-4 col-6">
                    <div class="card p-1 mb-3">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center p-3">
                                <button type="button" onclick="Popup()" class="btn btn-secondary d-flex justify-content-between m-2">EDIT</button>
                              <h5 class="card-title m-3">${value}</h5>
                              <p class="card-text">${descr}</p>
                            </div>
                    </div>
                </div>`;
}

let addCard = (value, descr) => {
    if (value !== '') {
        cardRow.innerHTML += smallCard(value, descr);
    }
}

let keyDownCardTitle = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();

        let bigCardDesc = document.querySelector("#descriptionInput");
        bigCardDesc.focus();
    }
}

let keyDown = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        let bigCardText = document.querySelector("#titleInput");
        let bigCardDesc = document.querySelector("#descriptionInput");

        addCard(bigCardText.value, bigCardDesc.value);
        bigCardDesc.value = '';
        bigCardText.value = '';
        bigCardText.focus();
    }
}
let SaveButton = () => {
        let bigCardText = document.querySelector("#titleInput");
        let bigCardDesc = document.querySelector("#descriptionInput");

        addCard(bigCardText.value, bigCardDesc.value);
        bigCardDesc.value = '';
        bigCardText.value = '';
        bigCardText.focus();
}

window.onload = function() {

}

let flipCardBack = () => {
    let back = document.getElementById("back");
    let front = document.getElementById("front");
    back.classList.remove("hidden");
    front.classList.add('hidden');
}
let flipCardFront = () => {
    let back = document.getElementById("back");
    let front = document.getElementById("front");
    front.classList.remove("hidden");
    back.classList.add('hidden');
}



let Popup = () => {
    
} 