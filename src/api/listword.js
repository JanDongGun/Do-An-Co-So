class ListWord {
  constructor() {
    this.list = document.querySelector(".listWord");
  }

  getItem() {
    const listWord = localStorage.length;
    for (let i = 0; i < listWord; i++) {
      const getValue = localStorage.getItem(localStorage.key(i));
      this.list.innerHTML += `
        <li class="Word">
                ${getValue}
                <button class="checkButton"><i class='fas fa-check'></i></button>
        </li>
        `;
    }
  }

  removeItem() {
    const input = document.querySelector(".inputAdd");
    this.list.addEventListener("click", (e)=>{
        if (e.target.classList.contains("checkButton")) {
            input.value = e.target.parentElement.innerText
            for (let i = 0; i < localStorage.length; i++) {
                const getValue = localStorage.getItem(localStorage.key(i));
                if (getValue == e.target.parentElement.innerText){
                    localStorage.removeItem(getValue);
                    e.target.parentElement.remove();
                }
              }
            
        }
    })
    
  }
}

export default ListWord;
