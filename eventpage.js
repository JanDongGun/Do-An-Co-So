const itemMenu = {
    "id": "esheet",
    "title": "Add '%s'",
    "contexts": ["selection"]
}

chrome.contextMenus.create(itemMenu)


const arr = []
chrome.contextMenus.onClicked.addListener((clickWord) => {
    arr.push(clickWord.selectionText)
    localStorage.setItem("list", JSON.stringify(arr))
})