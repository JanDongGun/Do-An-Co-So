import ListWord from "./listword";
class Add {
    constructor(form) {
        this.urlEng = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";
        this.form = form;
        this.buttonAdd = document.getElementById('btnAdd');
        this.btnSpin = document.getElementById('btnSpin');
        this.btnText = document.querySelector('.btnText');
        this.error = document.getElementById("er");
        this.notifyAdd = document.getElementById("notifyAdd");
        this.valueAPI = document.querySelector(".API")
    }

    afterSubmit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this.form.checkValidity() === false) {
                e.stopPropagation()
            }

            fetch(this.valueAPI.value)
                .then(async res => {
                    const datas = await res.json()
                    let n = 0
                    datas[0].data.forEach(element => {
                        if (element.Terms.toLowerCase().trim() == this.form.addInput.value.toLowerCase().trim()) {
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

                                const termWord = this.form.addInput.value.charAt(0).toUpperCase() + this.form.addInput.value.slice(1).toLowerCase()

                                const info = {
                                    Terms: termWord.trim(),
                                    Category: this.form.category.value,
                                    VietnameseMeaning: this.form.VIEinput.value,
                                    EnglishMeaning: en,
                                    Example: ex
                                };

                                this.btnText.innerHTML = "Adding..";
                                this.btnSpin.classList.remove("d-none");
                                this.buttonAdd.disabled = true;

                                fetch(this.valueAPI.value, {
                                        method: 'POST',
                                        cache: 'no-cache',
                                        redirect: 'follow',
                                        body: JSON.stringify(info)
                                    })
                                    .then(res => res.json())
                                    .then(res => {
                                        this.btnText.innerHTML = "Add";
                                        this.btnSpin.classList.add("d-none");
                                        this.buttonAdd.disabled = false;
                                    })
                                    .then(()=>{
                                        this.notifyAdd.classList.remove("d-none");
                                        this.notifyAdd.innerHTML = "Added Word successfully!"

                                        setTimeout(()=>{
                                            this.notifyAdd.classList.add("d-none");
                                        }, 2000)
                                    })
                                    .then(()=>{
                                        const data = JSON.parse(localStorage.getItem("list"));
                                        const list = document.querySelector(".listWord");
                                        const inputAdd = document.querySelector(".inputAdd");
                                        const listWord = new ListWord();
                                        if (data.length == 0){
                                            this.form.reset();
                                        }
                                        data.forEach(element => {
                                            if (element == inputAdd.value.trim()) {
                                                data.splice(data.indexOf(element), 1);
                                                localStorage.setItem("list", JSON.stringify(data));
                                                this.form.reset();
                                                list.innerHTML = "";
                                                listWord.getItem();
                                            }
                                        });
                                        
                                        
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        this.form.reset();
                                    })
                            })
                            .catch(err => {
                                this.error.classList.remove("d-none");
                                this.form.reset();
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
                            this.form.reset();
                        }, 2000)
                    }
                })
        })

    }

}

export default Add