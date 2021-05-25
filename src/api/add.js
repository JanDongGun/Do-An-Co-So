class Add {
    constructor(urlSheet, form) {
        this.urlSheet = urlSheet;
        this.urlEng = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";
        this.form = form;
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

            fetch(this.urlSheet)
                .then(async res => {
                    const datas = await res.json()
                    let n = 0
                    datas[0].data.forEach(element => {
                        if (element.Terms.toLowerCase() == this.form.addInput.value.toLowerCase()) {
                            n += 1
                        }
                    });

                    if (n == 0) {
                        fetch(this.urlEng + this.form.addInput.value)
                            .then(async res => {
                                let en = "";
                                let ex = "";

                                const data = await res.json();
                                en = data[0].meanings[0].definitions[0].definition;
                                ex = data[0].meanings[0].definitions[0].example;

                                const info = {
                                    Terms: this.form.addInput.value,
                                    Category: this.form.category.value,
                                    VietnameseMeaning: this.form.VIEinput.value,
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
                    } else {
                        this.error.innerHTML = "This word already exists!"
                        this.error.classList.remove("d-none")
                        setTimeout(() => {
                            this.error.classList.add("d-none")
                        }, 3000)
                    }
                })
        })

    }

    fetchAPI() {

    }

}

export default Add