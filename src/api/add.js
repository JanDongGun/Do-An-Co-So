class Add {
    constructor(urlSheet, form) {
        this.urlSheet = urlSheet;
        this.urlEng = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";
        this.form = document.querySelector(form);
        this.inputAdd = this.form.querySelector(".inputAdd");
        this.category = this.form.querySelector(".categories");
        this.inputVIE = this.form.querySelector(".inputVIE");
        this.buttonAdd = document.getElementById('btnAdd');
        this.btnSpin = document.getElementById('btnSpin');
        this.btnText = document.querySelector('.btnText');
        this.error = document.getElementById("er");
    }

    afterSubmit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this.form.checkValidity() === false) {
                e.stopPropagation()
                for (let field of this.form.elements) {
                    if (!field.checkValidity()) {
                        field.classList.add("is-invalid");
                    }
                    return;
                }
            }

            for (let field of this.form.elements) {
                field.classList.remove("is-invalid");
            }

            fetch(this.urlEng.concat(this.inputAdd.value))
                .then(async res => {
                    let en = "";
                    let ex = "";

                    const data = await res.json();
                    en = data[0].meanings[0].definitions[0].definition;
                    ex = data[0].meanings[0].definitions[0].example;

                    const info = {
                        Terms: this.inputAdd.value,
                        Category: this.category.value,
                        VietnameseMeaning: this.inputVIE.value,
                        EnglishMeaning: en,
                        Example: ex
                    };

                    this.btnText.innerHTML = "Adding..";
                    this.btnSpin.classList.remove("d-none");
                    this.buttonAdd.disabled = true;

                    fetch(this.urlSheet, {
                            method: 'POST',
                            cache: 'no-cache',
                            redirect: 'follow',
                            body: JSON.stringify(info)
                        })
                        .then(res => res.json())
                        .then(res => {
                            this.form.reset();
                            this.btnText.innerHTML = "Add";
                            this.btnSpin.classList.add("d-none");
                            this.buttonAdd.disabled = false;
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    this.error.classList.remove("d-none");
                    setTimeout(() => {
                        this.error.classList.add("d-none");
                        this.btnText.innerHTML = "Add";
                        this.btnSpin.classList.add("d-none");
                        this.buttonAdd.disabled = false;
                    }, 3000);
                })
        })
    }
}

export default Add