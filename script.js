const winningcombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

//since getElementsByClassName return a query with all the elements by default
//we are using following as we need an array
const grid = () => Array.from(document.getElementsByClassName('q'));
const qNumId = (qE) => Number.parseInt(qE.id.replace('q', ''));
const emptyQs = () => grid().filter(qE => qE.innerText === '');
const allSame = (arr) => arr.every(qE => qE.innerText === arr[0].innerText && qE.innerText !== '');

const takeTurn = (index, letter) => grid()[index].innerText = letter;
const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs.length)]);
const endGame = (winningSequence) => {
    winningSequence.forEach(qE =>  qE.classList.add('winner'));
    disableListeners();
}
const checkForVictory = () => {
    let victory = false;
    winningcombos.forEach(c => {
        const _grid = grid();
        const sequence = [_grid[c[0]], _grid[c[1]], _grid[c[2]]];
        if(allSame(sequence)){
            victory = true;
            endGame(sequence);
        }
    });
    return victory;
}

const opponentTurn = () => {
    disableListeners();
    setTimeout(() => {
        takeTurn(opponentChoice(), "O");
        if(!checkForVictory()){
            enableListeners();
        }
    }, 1000);
}

const clickFn = (event) => {
    takeTurn(qNumId(event.target), "X");
    if(!checkForVictory()){
        opponentTurn();
    }
}

//grab all the divs from the html, loop through them and add event listeners
const enableListeners = () => grid().forEach(qE => qE.addEventListener('click', clickFn));
const disableListeners = () => grid().forEach(qE => qE.removeEventListener('click', clickFn));

enableListeners();