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
                                <button class="checkButton"><i class='fas fa-check'></i></button>
                                <button class="removeButton"><i class='fas fa-trash'></i></button>
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
                inputAdd.value = e.target.parentElement.innerText;
                addClick.click(); 
            }

            if (e.target.classList.contains("removeButton")) {
      
                const todoObject = JSON.parse(localStorage.getItem("list"));

                todoObject.forEach(element => {
                    if (e.target.parentElement.textContent.includes(element)) {
                        todoObject.splice(todoObject.indexOf(element), 1);
                        localStorage.setItem("list", JSON.stringify(todoObject));
                    }
                });
                e.target.parentElement.remove();
            }

        })
    }
}


export default ListWord

