class Voice {
    constructor(url) {
        this.voiceBtn = document.getElementById("voice");
        this.url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";
        this.word = document.querySelector(".search-word"); 
    }

    playAudio(){
        this.voiceBtn.addEventListener("click", ()=>{
            fetch(this.url + this.word.textContent)
                .then(async res => {
                    const data = await res.json();
                    const mp3 = data[0].phonetics[0].audio

                    const audio = new Audio(mp3);
                    audio.play();
                })
                .then(res => res.json)
                .catch(err => {
                    console.log(err);
                })
            }
        )
    }
}

export default Voice


