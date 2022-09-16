import { CELL_VALUE, GAME_STATUS, TURN } from "./constant.js";
import {
  getReplayBtn,
  getCellElementList,
  getCurrentTurnElement,
  getCellElementAtIdx,
  getGameStatusElement,
} from "./selecter.js";
import { checkGameStatus } from "./ultil.js";

console.log(checkGameStatus(["X", "0", "O", "", "X", "", "", "O", "X"]));

let currentTurn = TURN.CROSS;
let gameStatus = GAME_STATUS.PLAYING;
let isGameEnded = false;
let cellValues = new Array(9).fill("");

function toggleTurn() {
  currentTurn = currentTurn === TURN.CIRCLE ? TURN.CROSS : TURN.CIRCLE;

  const currentTurnElelment = getCurrentTurnElement();
  if (currentTurnElelment) {
    currentTurnElelment.classList.remove(TURN.CIRCLE, TURN.CROSS);
    currentTurnElelment.classList.add(currentTurn);
  }
}

function updateGameStatus(newGameStatus) {
  gameStatus = newGameStatus;
  const gameStatusElement = getGameStatusElement();
  if (gameStatusElement) gameStatusElement.textContent = newGameStatus;
}
function showReplayBtn() {
  const replayBtn = getReplayBtn();
  replayBtn.classList.add("show");
}

function hightReplayBtn() {
  const replayBtn = getReplayBtn();
  replayBtn.classList.remove("show");
}
function highlightWinCell(winPositions) {
  if (!Array.isArray(winPositions) || winPositions.length !== 3) {
    throw new Error("Gma loi");
  }
  for (const position of winPositions) {
    const cell = getCellElementAtIdx(position);
    if (cell) cell.classList.add("win");
  }
}

function handleCellClick(cell, index) {
  const isClick = cell.classList.contains(TURN.CIRCLE) || cell.classList.contains(TURN.CROSS);

  const isEndGame = gameStatus !== GAME_STATUS.PLAYING;
  if (isClick || isEndGame) return;
  cell.classList.add(currentTurn);

  cellValues[index] = currentTurn === TURN.CIRCLE ? CELL_VALUE.CIRCLE : CELL_VALUE.CROSS;

  toggleTurn();
  //check game
  const game = checkGameStatus(cellValues);
  switch (game.status) {
    case GAME_STATUS.ENDED: {
      updateGameStatus(game.status);
      showReplayBtn();
      break;
    }
    case GAME_STATUS.X_WIN:
    case GAME_STATUS.O_WIN: {
      updateGameStatus(game.status);
      showReplayBtn();
      highlightWinCell(game.winPositions);
      break;
    }
    default:
      //palying
      break;
  }
}

function initCellElement() {
  const cellElementList = getCellElementList();

  cellElementList.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index));
  });
}
function resetGame() {
  currentTurn = TURN.CROSS;
  gameStatus = GAME_STATUS.PLAYING;
  cellValues = cellValues.map((x) => "");

  updateGameStatus(GAME_STATUS.PLAYING);

  const currentTurnElelment = getCurrentTurnElement();
  if (currentTurnElelment) {
    currentTurnElelment.classList.remove(TURN.CIRCLE, TURN.CROSS);
    currentTurnElelment.classList.add(TURN.CROSS);
  }

  const cellElementList = getCellElementList()

  for(let cellElemnt of cellElementList) {
    cellElemnt.className = '';
  }


  hightReplayBtn()
}

function initReplayBtn() {
  const replayBtn = getReplayBtn();
  replayBtn.addEventListener("click", resetGame);
}

(() => {
  initCellElement();

  initReplayBtn();
})();
