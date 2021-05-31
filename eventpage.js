const itemMenu = {
    "id": "esheet",
    "title": "Add '%s'",
    "contexts": ["selection"]
}

chrome.contextMenus.create(itemMenu);


chrome.contextMenus.onClicked.addListener((clickWord) => {
    localStorage.setItem(clickWord.selectionText, clickWord.selectionText)
});