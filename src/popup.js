import Tabs from "./ui/tabs";
import Add from "../src/api/add";
import LookUP from "../src/api/lookup";
import Remove from "../src/api/remove";
import Voice from "../src/api/voice";

const tabs = new Tabs(document.querySelector(".function"));
tabs.init();

const url = "https://script.google.com/macros/s/AKfycbwGPsyjpmLlpW-36ouvVSslGQgc73EJz30qDo4w8PZonTwnwsNxr78g-o52y4ZdEcU1/exec";
const add = new Add(url, document.querySelector(".addForm"));
add.afterSubmit();

const lookup = new LookUP(document.querySelector(".form-lookup"),url);
lookup.init();

const remove = new Remove(url);
remove.removeItem();

const voice = new Voice();
voice.playAudio();
