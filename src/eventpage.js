const itemMenu = {
    id: "esheet",
    title: "Add '%s'",
    contexts: ["selection"],
};

chrome.contextMenus.create(itemMenu);

chrome.contextMenus.onClicked.addListener((clickWord) => {
    let listWord;
    const data = JSON.parse(localStorage.getItem("list"));
    if (data){
        listWord = data
    } else {
        listWord = [];
    }
    const word = clickWord.selectionText;
    const word1 = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    if (!listWord.includes(word1.trim())){
        listWord.push(word1);
        localStorage.setItem("list", JSON.stringify(listWord));
    } else {
        window.alert("This word already exists!")
    }
});
