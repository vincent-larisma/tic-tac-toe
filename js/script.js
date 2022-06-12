const boardContainer = document.querySelector('.grid-board-container')
let xOrO = 'X'
let boardStates = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
]

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
			if (xOrO === 'X') {
				block.textContent = xOrO
				boardStates[columnIndex][rowIndex] = block.textContent
				xOrO = 'O'
			} else {
				block.textContent = xOrO
				boardStates[columnIndex][rowIndex] = block.textContent
				xOrO = 'X'
			}
			checkWin()
		}

		columnDiv.addEventListener('click', inputClick, { once: true })
	})
	boardContainer.appendChild(rowDiv)
})

function checkWin() {
	let [[b1, b2, b3], [b4, b5, b6], [b7, b8, b9]] = boardStates

	for (let i = 0; i < boardStates.length; i++) {
		if (
			boardStates[i][0] !== '' &&
			boardStates[i][0] === boardStates[i][1] &&
			boardStates[i][1] === boardStates[i][2]
		) {
			console.log('Winner')
		} else if (
			boardStates[0][i] !== '' &&
			boardStates[0][i] === boardStates[1][i] &&
			boardStates[1][i] === boardStates[2][i]
		) {
			console.log('Winner')
		}
	}

	if (b1 !== '' && b1 === b5 && b5 === b9) {
		console.log('Winner')
	} else if (b3 !== '' && b3 === b5 && b5 === b7) {
		console.log('Winner')
	}
}
