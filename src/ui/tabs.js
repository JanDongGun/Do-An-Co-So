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
            });
        });
    }

    changeTabs(e) {
        var btn = e.currentTarget;
        var tab = btn.dataset.tab;
        this.tabs.forEach((el) => {
            el.classList.remove("active");
        });
        this.content.forEach((el) => {
            el.classList.remove("active");
        });
        document.querySelector("#" + tab).classList.add("active");
        btn.classList.add("active");
    }
}

export {
    Tabs as default
}