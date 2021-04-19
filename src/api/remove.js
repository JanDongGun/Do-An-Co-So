
const removeBtn = document.querySelector(".btnRemove");
const word = document.querySelector(".search-word");
const url = "https://script.google.com/macros/s/AKfycbwGPsyjpmLlpW-36ouvVSslGQgc73EJz30qDo4w8PZonTwnwsNxr78g-o52y4ZdEcU1/exec"

function removeItem() {
    fetch(url + `?func=remove&item=${word.textContent}`, {
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow',
        body: JSON.stringify({})
    })
    .then(res => res.json())
}

removeBtn.addEventListener("click", removeItem);