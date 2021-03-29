const addForm = document.querySelector('.addForm');
const inputAdd = document.querySelector('.inputAdd');
const category = document.querySelector('.categories');
const inputVIE = document.querySelector('.inputVIE');
const buttonAdd = document.getElementById('btnAdd');
const btnSpin = document.getElementById('btnSpin');
const btnText = document.querySelector('.btnText');
const error = document.getElementById("er");

class Add {
    constructor(url) {
        this.url = url;
    }

    afterSubmit() {
        addForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (addForm.checkValidity() === false) {
                e.stopPropagation()
                for (let field of addForm.elements) {
                    if (!field.checkValidity()) {
                        field.classList.add("is-invalid");
                    }
                    return;
                }
            }

            for (let field of addForm.elements) {
                field.classList.remove("is-invalid");
            }

            const url2 = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${inputAdd.value}`;

            fetch(url2)
                .then(async res => {
                    let en = "";
                    let ex = "";

                    const data = await res.json();
                    en = data[0].meanings[0].definitions[0].definition;
                    ex = data[0].meanings[0].definitions[0].example;

                    const info = {
                        Terms: inputAdd.value,
                        Category: category.value,
                        VietnameseMeaning: inputVIE.value,
                        EnglishMeaning: en,
                        Example: ex
                    };

                    btnText.innerHTML = "Adding..";
                    btnSpin.classList.remove("d-none");
                    btnAdd.disabled = true;

                    fetch(this.url, {
                            method: 'POST',
                            cache: 'no-cache',
                            redirect: 'follow',
                            body: JSON.stringify(info)
                        })
                        .then(res => res.json())
                        .then(res => {
                            addForm.reset();
                            btnText.innerHTML = "Add";
                            btnSpin.classList.add("d-none");
                            btnAdd.disabled = false;
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    error.classList.remove("d-none");
                    setTimeout(() => {
                        error.classList.add("d-none");
                        btnText.innerHTML = "Add";
                        btnSpin.classList.add("d-none");
                        buttonAdd.disabled = false;
                    }, 3000);
                })
        })
    }
}

const url = "https://script.google.com/macros/s/AKfycbzT7M4Oy1mSuFnSVrp5142ZbWrz1UlSfU9LFEQL5NlPvc0ymUX-ITuLxNjugyXFePfZ/exec";
const add = new Add(url);
add.afterSubmit();