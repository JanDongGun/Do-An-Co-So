class ListWord {
    constructor() {
        this.list = document.querySelector(".listWord")
    }

    getItem() {
        const listWord = JSON.parse(localStorage.getItem("list"))
        listWord.forEach(element => {
            this.list.innerHTML += `<li class="remove">${element}</li>`
        });
    }

    removeItem() {
        const arr = document.querySelector(".listWord")
        arr.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove')) {
                let todoObject;
                const getData = localStorage.getItem("list");
                todoObject = JSON.parse(getData);

                todoObject.forEach((item) => {
                    if (e.target.parentElement.textContent.includes(item)) {
                        todoObject.splice(todoObject.indexOf(item), 1);
                        localStorage.setItem("list", JSON.stringify(todoObject));
                    };
                })
                e.target.parentElement.remove();
            }
        })

    }
}

export default ListWord