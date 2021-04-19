class Remove {
    constructor(url) {
        this.removeBtn = document.querySelector(".btnRemove");
        this.word = document.querySelector(".search-word");
        this.url = url;
    }

    removeItem(){
        this.removeBtn.addEventListener("click", ()=>{
            fetch(this.url + `?func=remove&item=${this.word.textContent}`, {
                method: 'POST',
                cache: 'no-cache',
                redirect: 'follow',
                body: JSON.stringify({})
            })
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            })
        })
    }
}

export default Remove