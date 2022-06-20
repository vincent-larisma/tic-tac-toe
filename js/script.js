const boardContainer = document.querySelector('.grid-board-container')
const xChoice = document.querySelector('.xChoice')
const circleChoice = document.querySelector('.circleChoice')
const drawPoint = document.querySelector('.draw')
const undoBtn = document.querySelector('.undo')
const redoBtn = document.querySelector('.redo')
const restartBtn = document.querySelector('.restartButton')
const historyBtn = document.querySelector('[data-history]')
const homeBtn = document.querySelector('.fa-solid')
const historyDisplay = document.querySelector('.history-background-container')
const orderedList = document.querySelector('.ordered-list')

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
      checkWin()
      getHistory()
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
      orderedList.innerHTML = ''
    })

    undoBtn.addEventListener('click', () => {
      if (historyCounter <= historyState.length && historyCounter >= 1) {
        columnDiv.textContent =
          historyState[historyState.length - historyCounter][columnIndex][
            rowIndex
          ]
      } else {
        historyCounter = 1
      }
    })
    redoBtn.addEventListener('click', () => {
      if (historyCounter <= historyState.length && historyCounter >= 1) {
        columnDiv.textContent =
          historyState[historyState.length - historyCounter][columnIndex][
            rowIndex
          ]
        if (historyCounter === 0) {
          historyCounter = 1
        }
      }
    })

    columnDiv.addEventListener('click', inputClick, { once: true })
  })
  boardContainer.appendChild(rowDiv)
})

homeBtn.addEventListener('click', home)
historyBtn.addEventListener('click', historyDisplayNone)

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
  let createdList = document.createElement('li')
  if (h1 !== '' && isActive === true) {
    createdList.textContent = `${h1} - Top Left`
    orderedList.appendChild(createdList)
  } else if (h2 !== '' && isActive === true) {
    createdList.textContent = `${h2} - Top Mid`
    orderedList.appendChild(createdList)
  } else if (h3 !== '' && isActive === true) {
    createdList.textContent = `${h3} - Top Right`
    orderedList.appendChild(createdList)
  } else if (h4 !== '' && isActive === true) {
    createdList.textContent = `${h4} - Mid Left`
    orderedList.appendChild(createdList)
  } else if (h5 !== '' && isActive === true) {
    createdList.textContent = `${h5} - Mid`
    orderedList.appendChild(createdList)
  } else if (h6 !== '' && isActive === true) {
    createdList.textContent = `${h6} - Mid Right`
    orderedList.appendChild(createdList)
  } else if (h7 !== '' && isActive === true) {
    createdList.textContent = `${h7} - Bottom Left`
    orderedList.appendChild(createdList)
  } else if (h8 !== '' && isActive === true) {
    createdList.textContent = `${h8} - Bottom Mid`
    orderedList.appendChild(createdList)
  } else if (h9 !== '' && isActive === true) {
    createdList.textContent = `${h9} - Bottom Right`
    orderedList.appendChild(createdList)
  }
}

function home() {
  xPoint = 0
  circlePoint = 0
  draw = 0
  xChoice.textContent = `X : ${xPoint}`
  circleChoice.textContent = `O : ${circlePoint}`
  drawPoint.textContent = `DRAW : ${draw}`
}

function historyDisplayNone() {
  historyDisplay.classList.toggle('display-history')
}
