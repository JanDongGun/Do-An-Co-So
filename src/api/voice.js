class Voice {
    constructor(url) {
        this.voiceBtn = document.getElementById("voice");
        this.engVoice = document.getElementById("engVoice");
        this.exVoice = document.getElementById("exVoice")
        this.word = document.querySelector(".search-word");
        this.engMean = document.querySelector(".englishMeaning") 
        this.example = document.querySelector(".example")
    }
    
    playAudio(){

        const msg = new SpeechSynthesisUtterance(); 

        this.voiceBtn.addEventListener("click", ()=>{
            msg.text = this.word.textContent;
            window.speechSynthesis.speak(msg)
        }
        )

        this.engVoice.addEventListener("click", ()=>{
            msg.text = this.engMean.textContent;
            window.speechSynthesis.speak(msg)
        })

        this.exVoice.addEventListener("click", ()=>{
            msg.text = this.example.textContent;
            window.speechSynthesis.speak(msg)
        })
    }
}

export default Voice


