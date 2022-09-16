export function getCellElementList(){
     return document.querySelectorAll('#sellList> li')
}

export function getCurrentElement(){
    return document.getElementById('currentTurn')
}

export function getCellElementAtIdx(index){
    return document.querySelectorAll(`#sellList> li:nth-child(${index +1})`)


}
export function getGameStatusElement(){
    return document.getElementById('gameStatus')
    
}