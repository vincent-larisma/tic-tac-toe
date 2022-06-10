const boardContainer = document.querySelector('.grid-board-container')
let xOrO = 'X'
let boardStates = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
]

boardStates.forEach((rows) => {
	const rowDiv = document.createElement('div')
	rows.forEach((columns) => {
		const columnDiv = document.createElement('div')
		columnDiv.textContent = columns
		columnDiv.classList.add('block-columns')
		rowDiv.appendChild(columnDiv)
	})
	boardContainer.appendChild(rowDiv)
})

// function game() {
// 	blockUnits.forEach((items) => {
// 		const inputClick = () => {
// 			if (xOrO === 'X') {
// 				items.textContent = xOrO
// 				xOrO = 'O'
// 			} else {
// 				items.textContent = xOrO
// 				xOrO = 'X'
// 			}
// 		}

// 		items.addEventListener('click', inputClick, { once: true })
// 	})
// }
