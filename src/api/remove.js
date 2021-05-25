class Remove {
    constructor() {
        this.removeBtn = document.getElementById("removeBtn");
        this.word = document.querySelector(".search-word");
        this.spinner = document.getElementById("spinnerRemove")
        this.removeTab = document.querySelector(".search-des")
        this.alertRemove = document.getElementById("alertRemove")
        this.alert = document.getElementById("confirm")
        this.confirmBtn = document.getElementById("confirmBtn")
        this.content = document.getElementById("contentRemove")
        this.cancelBtn = document.getElementById("cancelBtn")
        this.valueAPI = document.querySelector(".API")
        this.inputLookup = document.querySelector(".inputLookUp")
    }

    removeItem() {
        this.removeBtn.addEventListener("click", () => {

            this.alert.style.display = 'block'
            this.content.innerHTML = `Do you want to remove "${this.word.textContent}"?`

            this.cancelBtn.addEventListener("click", () => {
                this.alert.style.display = 'none'
            })

            this.confirmBtn.addEventListener("click", () => {

                this.alert.style.display = 'none'

                this.removeBtn.classList.add("d-none")
                this.spinner.classList.remove("d-none")

                fetch(this.valueAPI.value + `?func=remove&item=${this.word.textContent}`, {
                        method: 'POST',
                        cache: 'no-cache',
                        redirect: 'follow',
                        body: JSON.stringify({})
                    })
                    .then(res => res.json())
                    .then(res => {
                        this.removeTab.classList.add("d-none")
                        this.removeBtn.classList.remove("d-none")
                        this.spinner.classList.add("d-none")
                        this.alertRemove.classList.remove("d-none")
                        this.inputLookup.value = ""
                    })
                    .then(res => {
                        setTimeout(() => {
                            this.alertRemove.classList.add("d-none")
                        }, 2000)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        })
    }
}

export default Remove