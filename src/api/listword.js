class ListWord {
    constructor() {
        this.list = document.querySelector(".listWord");
    }

    getItem() {
        let arr;
        const data = localStorage.getItem("list");
        if (data){
            arr = JSON.parse(data)
            arr.forEach((element) => {
                this.list.innerHTML += `
                        <li class="Word">
                                ${element}
                                <span>
                                <button class="btnList checkButton"><i class="fas fa-check-square"></i></button>
                                <button class="btnList removeButton"><i class="fas fa-trash"></i></button>
                                </span>
                        </li>
                        `;
                });
        }
        else{
            arr = []
        }
        
    }

    removeItem() {
        const inputAdd = document.querySelector(".inputAdd");
        const addClick = document.querySelector(".add-click");
        
        this.list.addEventListener("click", (e)=>{
            if (e.target.classList.contains("checkButton")) {
                inputAdd.value = e.target.parentElement.parentElement.innerText;
                addClick.click(); 
            }

            if (e.target.classList.contains("removeButton")) {
      
                const todoObject = JSON.parse(localStorage.getItem("list"));

                todoObject.forEach(element => {
                    if (e.target.parentElement.parentElement.textContent.includes(element)) {
                        todoObject.splice(todoObject.indexOf(element), 1);
                        localStorage.setItem("list", JSON.stringify(todoObject));
                    }
                });
                e.target.parentElement.parentElement.remove();
            }

        })
    }
}


export default ListWord

