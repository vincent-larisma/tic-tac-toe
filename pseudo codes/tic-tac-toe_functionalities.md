<!-- Input x or o -->

if I press the block it should put x in it
create a function that power the game
use add event listener to click block

// boardStates.forEach((rows) => {
// const rowDiv = document.createElement('div')
// rows.forEach((columns) => {
// const columnDiv = document.createElement('div')
// columnDiv.textContent = columns
// columnDiv.classList.add('block-columns')
// rowDiv.appendChild(columnDiv)
// const inputClick = () => {
// if (xOrO === 'X') {
// columnDiv.textContent = xOrO
// xOrO = 'O'
// } else {
// columnDiv.textContent = xOrO
// xOrO = 'X'
// }
// }

// columnDiv.addEventListener('click', inputClick, { once: true })
// })

// boardContainer.appendChild(rowDiv)
// })

// combinations of winning
const winningCombination = [
[b1, b2, b3],
[b4, b5, b6],
[b7, b8, b9],
[b1, b4, b7],
[b2, b5, b8],
[b3, b6, b9],
[b1, b5, b9],
[b3, b5, b7],
]

// destructuring the boardState
let [[b1, b2, b3], [b4, b5, b6], [b7, b8, b9]] = boardStates

for (let i = 0; i < boardStates.length; i++) {
if (
boardStates[i][0] !== '' &&
boardStates[i][0] === boardStates[i][1] &&
boardStates[i][1] === boardStates[i][2] &&
isActive === true
) {
knowWinner()
addPoint()
undoOrRedo()
reset()
isActive = false

    		return
    	} else if (
    		boardStates[0][i] !== '' &&
    		boardStates[0][i] === boardStates[1][i] &&
    		boardStates[1][i] === boardStates[2][i] &&
    		isActive === true
    	) {
    		knowWinner()
    		addPoint()
    		undoOrRedo()
    		reset()
    		isActive = false

    		return
    	} else if (b1 !== '' && b1 === b5 && b5 === b9 && isActive === true) {
    		knowWinner()
    		addPoint()
    		undoOrRedo()
    		reset()
    		isActive = false

    		return
    	} else if (b3 !== '' && b3 === b5 && b5 === b7 && isActive === true) {
    		knowWinner()
    		addPoint()
    		undoOrRedo()
    		reset()
    		isActive = false

    		return
    	} else if (
    		b1 !== '' &&
    		b2 !== '' &&
    		b3 !== '' &&
    		b4 !== '' &&
    		b5 !== '' &&
    		b6 !== '' &&
    		b7 !== '' &&
    		b8 !== '' &&
    		b9 !== '' &&
    		isActive === true
    	) {
    		draw += 1
    		drawPoint.textContent = `DRAW : ${draw}`
    		undoOrRedo()
    		reset()
    		isActive = false

    		return
    	}
    }
