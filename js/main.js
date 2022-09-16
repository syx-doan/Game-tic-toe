import { getCellElementList, getCurrentElement, getGameStatusElement, getComputedStyle } from "./selecter.js";
getCurrentElement();
getCellElementList();
getGameStatusElement();
getComputedStyle();



let currentTurn = "cross";
let isGameEnded = false;
let cellValues = new Array(9).fill("");
