class ChangeAPI {
    constructor() {
        this.inputAPI = document.querySelector(".API");
        this.btnAPI = document.querySelector(".btnAPI");
        this.alertAddAPI = document.getElementById("alertAddAPI");
        this.btnTextAPI = document.querySelector(".btnTextAPI");
        this.btnSpinAPI = document.getElementById("btnSpinAPI");

    }

    setAPI() {
        this.inputAPI.value = JSON.parse(localStorage.getItem("apiKey"))

        this.btnAPI.addEventListener("click", () => {

            this.btnTextAPI.innerHTML = "Adding...";
            this.btnSpinAPI.classList.remove("d-none");
            this.btnAPI.disabled = true;

            const valueAPI = this.inputAPI.value
            localStorage.setItem("apiKey", JSON.stringify(valueAPI))

            setTimeout(()=>{
                this.btnTextAPI.innerHTML = "Add API";
                this.btnSpinAPI.classList.add("d-none");
                this.btnAPI.disabled = false;
                this.alertAddAPI.classList.remove("d-none");
                setTimeout(()=>{
                    this.alertAddAPI.classList.add("d-none");
                }, 2000);
            }, 2000);

            
        })
    }
}

export default ChangeAPI