class ChangeAPI {
    constructor() {
        this.inputAPI = document.querySelector(".API")
        this.btnAPI = document.querySelector(".btnAPI")
    }

    setAPI() {
        this.inputAPI.value = JSON.parse(localStorage.getItem("apiKey"))

        this.btnAPI.addEventListener("click", () => {
            const valueAPI = this.inputAPI.value
            localStorage.setItem("apiKey", JSON.stringify(valueAPI))
        })
    }
}

export default ChangeAPI