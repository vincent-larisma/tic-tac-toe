const boardContainer = document.querySelector('.grid-board-container')
const xChoice = document.querySelector('.xChoice')
const circleChoice = document.querySelector('.circleChoice')
const drawPoint = document.querySelector('.draw')
const undoBtn = document.querySelector('.undo')
const redoBtn = document.querySelector('.redo')
const restartBtn = document.querySelector('.restartButton')
let xOrO = 'X'
let boardStates = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
]
let historyState = []
let xPoint = 0
let circlePoint = 0
let draw = 0
let isActive = true

getChoice()

// to access the boardStates variable and createElement
boardStates.forEach((rows, rowIndex) => {
	// created a new div element for row
	const rowDiv = document.createElement('div')
	// used for each to access each column in each row
	rows.forEach((columns, columnIndex) => {
		// created a new div element for column
		const columnDiv = document.createElement('div')
		columnDiv.textContent = columns
		columnDiv.classList.add('block-columns')
		rowDiv.appendChild(columnDiv)
		const inputClick = (event) => {
			let block = event.target
			if (xOrO === 'X' && isActive) {
				block.textContent = xOrO
				boardStates[columnIndex][rowIndex] = block.textContent
				xOrO = 'O'
			} else if (xOrO === 'O' && isActive) {
				block.textContent = xOrO
				boardStates[columnIndex][rowIndex] = block.textContent
				xOrO = 'X'
			}
			getHistory()
			checkWin()
		}

		restartBtn.addEventListener('click', () => {
			columnDiv.textContent = ''
			isActive = true
			columnDiv.addEventListener('click', inputClick, { once: true })
			xOrO = 'X'
			redoBtn.textContent = ''
			undoBtn.textContent = ''
			restartBtn.textContent = ''
		})

		undoBtn.addEventListener('click', () => {
			console.log(historyState)
		})

		columnDiv.addEventListener('click', inputClick, { once: true })
	})
	boardContainer.appendChild(rowDiv)
})

pointer()

function pointer() {
	xChoice.textContent = `X : 0`
	circleChoice.textContent = `O : 0`
	drawPoint.textContent = `DRAW : 0`
}

function knowWinner() {
	if (xOrO == 'O') {
		console.log('X WINS!')
	} else if (xOrO == 'X') {
		console.log('O WINS!')
	}
}

function addPoint() {
	if (xOrO == 'O') {
		xPoint += 1
		xChoice.textContent = `X : ${xPoint}`
	} else if (xOrO == 'X') {
		circlePoint += 1
		circleChoice.textContent = `O : ${circlePoint}`
	}
}

function compiledCheckWinFunc() {
	knowWinner()
	addPoint()
	undoOrRedo()
	reset()
}

function checkWin() {
	let [[b1, b2, b3], [b4, b5, b6], [b7, b8, b9]] = boardStates
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

	for (let i = 0; i < winningCombination.length; i++) {
		let a = winningCombination[i][0]
		let b = winningCombination[i][1]
		let c = winningCombination[i][2]

		if (a !== '' && a === b && b === c && isActive === true) {
			compiledCheckWinFunc()
			isActive = false
			break
		} else if (b1 !== '' && b1 === b5 && b5 === b9 && isActive === true) {
			compiledCheckWinFunc()
			isActive = false
			break
		} else if (b3 !== '' && b3 === b5 && b5 === b7 && isActive === true) {
			compiledCheckWinFunc()
			isActive = false
			break
		} else if (
			a !== '' &&
			a !== b &&
			b !== c &&
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
			break
		}
	}
}

function getChoice() {
	xChoice.addEventListener('click', () => {
		xOrO = 'X'
		console.log(xOrO)
	})
	circleChoice.addEventListener('click', () => {
		xOrO = 'O'
		console.log(xOrO)
	})
}

function getHistory() {
	historyState.push(JSON.parse(JSON.stringify(boardStates)))
	console.log(historyState)
}

function undoOrRedo() {
	redoBtn.textContent = 'REDO'
	undoBtn.textContent = 'UNDO'
	redoBtn.addEventListener('click', () => {})
}

function reset() {
	restartBtn.textContent = 'RESTART'
	restartBtn.addEventListener('click', () => {
		boardStates = [
			['', '', ''],
			['', '', ''],
			['', '', ''],
		]
		isActive = true
	})
}
