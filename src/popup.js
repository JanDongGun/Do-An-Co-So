import Tabs from "./ui/tabs";
import Add from "../src/api/add";
import LookUP from "../src/api/lookup";
import Remove from "../src/api/remove";
import Voice from "../src/api/voice";
import ChangeAPI from "../src/api/change-api";
import ListWord from "../src/api/listword";

const tabs = new Tabs(document.querySelector(".function"));
tabs.init();

const changeAPI = new ChangeAPI();
changeAPI.setAPI();

const listWord = new ListWord();
listWord.getItem();
listWord.removeItem();

const add = new Add(document.querySelector(".addForm"));
add.afterSubmit();

const lookup = new LookUP(document.querySelector(".form-lookup"));
lookup.init();

const remove = new Remove();
remove.removeItem();

const voice = new Voice();
voice.playAudio();