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
let historyCounter = 1

getChoice()
pointer()
undoOrRedo()

boardStates.forEach((rows, rowIndex) => {
  const rowDiv = document.createElement('div')

  rows.forEach((columns, columnIndex) => {
    const columnDiv = document.createElement('div')
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

      updateHistory()
      getHistory()
      checkWin()
    }

    restartBtn.addEventListener('click', () => {
      columnDiv.textContent = ''
      isActive = true
      historyCounter = 1
      historyState = []
      columnDiv.addEventListener('click', inputClick, { once: true })
      xOrO = 'X'
      redoBtn.classList.remove('fa-solid', 'fa-circle-arrow-right')
      undoBtn.classList.remove('fa-solid', 'fa-circle-arrow-left')
      restartBtn.classList.remove('fa-solid', 'fa-rotate-right')
    })

    undoBtn.addEventListener('click', () => {
      if (historyCounter <= historyState.length && historyCounter >= 1) {
        columnDiv.textContent =
          historyState[historyState.length - historyCounter][columnIndex][
            rowIndex
          ]
      } else {
        historyCounter = 2
      }
    })
    redoBtn.addEventListener('click', () => {
      if (historyCounter <= historyState.length && historyCounter >= 1) {
        columnDiv.textContent =
          historyState[historyState.length - historyCounter][columnIndex][
            rowIndex
          ]
        if (historyCounter === 0) {
          historyCounter = 2
        }
      }
    })

    columnDiv.addEventListener('click', inputClick, { once: true })
  })

  boardContainer.appendChild(rowDiv)
})

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
  undoOrRedoText()
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
      undoOrRedoText()
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

function updateHistory() {
  historyState.push(JSON.parse(JSON.stringify(boardStates)))
}

function undoOrRedoText() {
  redoBtn.classList.add('fa-solid', 'fa-circle-arrow-right')
  undoBtn.classList.add('fa-solid', 'fa-circle-arrow-left')
}

function undoOrRedo() {
  undoBtn.addEventListener('click', () => {
    if (historyCounter < historyState.length) {
      historyCounter++
    }
  })

  redoBtn.addEventListener('click', () => {
    if (historyCounter > 0) {
      historyCounter--
    }
  })
}

function reset() {
  restartBtn.classList.add('fa-solid', 'fa-rotate-right')
  restartBtn.addEventListener('click', () => {
    boardStates = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
    isActive = true
  })
}

function getHistory() {
  let [[h1, h2, h3], [h4, h5, h6], [h7, h8, h9]] = boardStates
  if (h1 !== '') {
    console.log('Top Left')
    once = false
  } else if (h2 !== '') {
    console.log('Top Mid')
  } else if (h3 !== '') {
    console.log('Top Right')
  } else if (h4 !== '') {
    console.log('Mid Left')
  } else if (h5 !== '') {
    console.log('Mid')
  } else if (h6 !== '') {
    console.log('Mid Right')
  } else if (h7 !== '') {
    console.log('Bottom Left')
  } else if (h8 !== '') {
    console.log('Bottom Mid')
  } else if (h9 !== '') {
    console.log('Bottom Right')
  }
}
