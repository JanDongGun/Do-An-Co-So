import Tabs from "./ui/tabs";
import Add from "../src/api/add";
import LookUP from "../src/api/lookup";
const tabs = new Tabs(document.querySelector(".function"));
tabs.init();

const url = "https://script.google.com/macros/s/AKfycbzT7M4Oy1mSuFnSVrp5142ZbWrz1UlSfU9LFEQL5NlPvc0ymUX-ITuLxNjugyXFePfZ/exec";
const add = new Add(url, document.querySelector(".addForm"));
add.afterSubmit();

const lookup = new LookUP(document.querySelector(".form-lookup"),url);
lookup.init();