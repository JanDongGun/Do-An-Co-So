class Tabs {
    constructor(container) {
        this.container = container;
        this.tabs = container.querySelectorAll(".function__item");
        this.content = container.querySelectorAll(".contentTab");
    }
    init() {
        this.tabs.forEach((tab) => {
            tab.addEventListener("click", (e) => {
                this.changeTabs(e);
                this.changeContent(e);
            });
        });
    }

    changeTabs(e) {
        this.tabs.forEach((tab) => {
            tab.classList.remove("active");
        });
    }

    changeContent(e) {

    }   
}

export {
    Tabs as default
}