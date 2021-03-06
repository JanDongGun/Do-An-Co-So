class LookUP {
    constructor(form) {
        this.form = form;
        this.searchDes = document.querySelector(".search-des");
        this.spinnerSearch = document.querySelector(".spinner-search");
        this.alertSearch = document.querySelector(".alert-search");
        this.searchWord = document.querySelector(".search-word");
        this.searchCategory = document.querySelector(".search-category");
        this.vietnameseMeaning = document.querySelector(".vietnameseMeaning");
        this.englishMeaning = document.querySelector(".englishMeaning");
        this.example = document.querySelector(".example");
        this.inputLookup = document.querySelector(".inputLookUp");
        this.worddisplay = document.getElementById("wordisplay");
        this.valueAPI = document.querySelector(".API")
    }
    init() {
        this.lookupSubmit();
        this.searchUpdate();

    }



    lookupSubmit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputSearch = this.inputLookup.value.trim();
            this.spinnerSearch.classList.remove("d-none");
            fetch(this.valueAPI.value)
                .then((d) => d.json())
                .then((d) => {
                    this.resetUI(d[0].data, inputSearch);

                })
                .catch((error) => {
                    console.log(error);
                });

        });
    }

    resetUI(dataArr, input) {
        let temp = 0;
        dataArr.forEach((data) => {
            if (data.Terms.toUpperCase() === input.toUpperCase()) {
                temp++;
                this.searchDes.classList.remove("d-none");
                this.spinnerSearch.classList.add("d-none");
                this.alertSearch.classList.add("d-none");
                this.searchWord.textContent = data.Terms;
                this.searchCategory.textContent = data.Category;
                this.vietnameseMeaning.textContent = data.VietnameseMeaning;
                this.englishMeaning.textContent = data.EnglishMeaning;
                this.example.textContent = data.Example;
                return;
            }
        });

        if (temp === 0) {
            this.searchDes.classList.add("d-none");
            this.spinnerSearch.classList.add("d-none");
            this.alertSearch.classList.remove("d-none");

            const alertWord = this.alertSearch.querySelector(".alert-word");
            alertWord.textContent = input;

            this.addWord(alertWord.textContent);

            setTimeout(()=>{
                this.alertSearch.classList.add("d-none");
            }, 3000)
        }
    }

    addWord(word) {
        const btnSearchAdd = document.querySelector(".btn-search-add");
        btnSearchAdd.addEventListener("click", (e) => {
            const inputAdd = document.querySelector(".inputAdd");
            inputAdd.value = word;

            const spinSearchAdd = document.querySelector("#btnSpin");
            const textSearchAdd = document.querySelector("#btnText");
            const addClick = document.querySelector(".add-click");

            textSearchAdd.textContent = "Adding...";
            spinSearchAdd.classList.remove("d-none");

            setTimeout(() => {
                textSearchAdd.textContent = "Add";
                spinSearchAdd.classList.add("d-none");
                addClick.click();
            }, 2000);
        });
    }

    searchUpdate() {
        const searchEdit = document.querySelectorAll(".search-edit");
        const btnCancel = document.querySelectorAll(".btnCancel");
        const btnUpdate = document.querySelectorAll(".btnUpdate");
        const lookupClear = document.getElementById("lookupClear");

        searchEdit.forEach((edit) => {
            edit.addEventListener("click", (e) => {
                this.changeUpdate(e);
            });
        });

        btnCancel.forEach((cancel) => {
            cancel.addEventListener("click", (e) => {
                this.cancelUpdate(e);
            });
        });

        btnUpdate.forEach((update) => {
            update.addEventListener("click", (e) => {
                this.dataUpdate(e);
            })
        })

        lookupClear.addEventListener("click", ()=>{
            this.searchDes.classList.add("d-none");
        })
    }

    changeUpdate(e) {
        let btnEdit = e.currentTarget;
        let update = btnEdit.dataset.edit;
        document.querySelector("#" + update).classList.remove("d-none");
        document.querySelector("#" + update + "Search").classList.add("d-none");
    }

    cancelUpdate(e) {
        let btnCancel = e.currentTarget;
        let update = btnCancel.dataset.edit;
        document.querySelector("#" + update).classList.add("d-none");
        document.querySelector("#" + update + "Search").classList.remove("d-none");
    }

    dataUpdate(e) {
        let btnUpdate = e.currentTarget;
        let update = btnUpdate.dataset.edit;
        let valueInput = "";
        const inputUpdate = document.querySelector("#" + update + "Input");

        if (update == "vnmMeaning") {
            valueInput = this.searchWord.textContent + ":" + this.searchCategory.textContent + ":" + inputUpdate.value + ":" + this.englishMeaning.textContent + ":" + this.example.textContent;
        } else if (update == "engMeaning") {
            valueInput = this.searchWord.textContent + ":" + this.searchCategory.textContent + ":" + this.vietnameseMeaning.textContent + ":" + inputUpdate.value + ":" + this.example.textContent;
        } else if (update == "exp") {
            valueInput = this.searchWord.textContent + ":" + this.searchCategory.textContent + ":" + this.vietnameseMeaning.textContent + ":" + this.englishMeaning.textContent + ":" + inputUpdate.value;
        }

        btnUpdate.textContent = "Updating...";

        fetch(this.valueAPI.value + `?func=edit&item=${valueInput}`, {
                method: 'POST',
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache',
                redirect: 'follow',
                body: JSON.stringify({})
            })
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            });

        setTimeout(() => {

            const inputSearch = this.searchWord.textContent;
            fetch(this.valueAPI.value)
                .then((d) => d.json())
                .then((d) => {
                    this.resetUI(d[0].data, inputSearch);
                    this.form.reset();
                })
                .catch((error) => {
                    console.log(error);
                });

            btnUpdate.textContent = "Update";
            document.querySelector("#" + update).classList.add("d-none");
            document.querySelector("#" + update + "Search").classList.remove("d-none");
        }, 2000);


    }
}

export default LookUP