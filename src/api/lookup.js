class LookUP {
    constructor(form,url) {
            this.form = form;
            this.url = url;
            this.searchDes = document.querySelector(".search-des");
            this.spinnerSearch = document.querySelector(".spinner-search");
            this.alertSearch = document.querySelector(".alert-search");
            this.searchWord = document.querySelector(".search-word");
            this.searchCategory = document.querySelector(".search-category");
            this.vietnameseMeaning = document.querySelector(".vietnameseMeaning");
            this.englishMeaning = document.querySelector(".englishMeaning");
            this.example = document.querySelector(".example");
            this.inputLookup = document.querySelector(".inputLookUp");
    }
    init() {
       this.lookupSubmit();
    }

    lookupSubmit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputSearch = this.inputLookup.value;
            this.spinnerSearch.classList.remove("d-none");
            fetch(this.url)
            .then((d) => d.json())
            .then((d) => {
                this.resetUI(d[0].data, inputSearch);
                this.form.reset();
            })
            .catch((error) => {
                console.log(error);
            });
        });
    }

    resetUI(dataArr, input) {
        let temp = 0;
        dataArr.forEach((data) => {
            if (data.Terms === input) {
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

        if(temp === 0) {
            this.searchDes.classList.add("d-none");
            this.spinnerSearch.classList.add("d-none");
            this.alertSearch.classList.remove("d-none");

            const alertWord = this.alertSearch.querySelector(".alert-word");
            alertWord.textContent = input;

            this.addWord(alertWord.textContent);
        }
    }

    addWord(word) {
        const btnSearchAdd = document.querySelector(".btn-search-add");
            btnSearchAdd.addEventListener("click", (e) => {
            const inputAdd = document.querySelector(".inputAdd");
            inputAdd.value = word;

            const spinSearchAdd = document.querySelector("#btnSpin");
            const textSearchAdd = document.querySelector("#btnText");

            textSearchAdd.textContent = "Adding...";
            spinSearchAdd.classList.remove("d-none");

            setTimeout(() => {
                textSearchAdd.textContent = "Add";
                spinSearchAdd.classList.add("d-none");
              }, 2000);
        });
    }
}

export default LookUP