const displayController = DisplayController()
const player = Player()
const ai = AI()

const gameBoardFactory = () => {

    this.remainingPieces = 8
    this.gameBoard = [
        [''],[''],[''],
        [''],[''],[''],
        [''],[''],['']
    ]


    const checkForWinner = (gameBoard,gamePiece) => {
        if (gameBoard[0] === gamePiece && gameBoard[1] === gamePiece && gameBoard[2] === gamePiece) {
            displayController.displayWinner(gamePiece)
            return true
        }
        else if (gameBoard[3] === gamePiece && gameBoard[4] === gamePiece && gameBoard[5] === gamePiece) {
            displayController.displayWinner(gamePiece)
            return true
        }
        else if (gameBoard[6] === gamePiece && gameBoard[7] === gamePiece && gameBoard[8] === gamePiece) {
            displayController.displayWinner(gamePiece)
            return true
        }
        else if (gameBoard[0] === gamePiece && gameBoard[3] === gamePiece && gameBoard[6] === gamePiece) {
            displayController.displayWinner(gamePiece)
            return true
        }
        else if (gameBoard[1] === gamePiece && gameBoard[4] === gamePiece && gameBoard[7] === gamePiece) {
            displayController.displayWinner(gamePiece)
            return true
        }
        else if (gameBoard[2] === gamePiece && gameBoard[5] === gamePiece && gameBoard[8] === gamePiece) {
            displayController.displayWinner(gamePiece)
            return true
        }
        else if (gameBoard[0] === gamePiece && gameBoard[4] === gamePiece && gameBoard[8] === gamePiece) {
            displayController.displayWinner(gamePiece)
            return true
        }
        else if (gameBoard[6] === gamePiece && gameBoard[4] === gamePiece && gameBoard[2] === gamePiece) {
            displayController.displayWinner(gamePiece)
            return true
        }
        else if(checkRemainingPieces() === true){
            displayController.displayTie()
        } 
    }

    const _subtractRemainingPieces = () => {
        remainingPieces--
    }
    const checkRemainingPieces = () => {

        while(remainingPieces >=0){
            if(remainingPieces ===0) {
                return true
            }
            return false
        }
    }

    const setRamainingPieces = () => {
        remainingPieces = 8
    }

    const addOccupiedClassToDiv = () => {
        for(let i = 0; i < gameBoard.length; i++) {
            if(gameBoard[i] != "") {
                var occupiedSpace = document.getElementById("block_" + i)
                occupiedSpace.className += " occupied"
            }
            else {
                var occupiedSpace = document.getElementById("block_" + i)
                occupiedSpace.className = "block"
            }
        }
    }

    const getNewMoveIfOccupied = (move) => {
        if(gameBoard[move] != "") {
            return false
        }
        return true
    }

    const resetGameBoardData = () => {
        addOccupiedClassToDiv()
        displayController.resetGameBoard()
        gameBoard = [
            [''],[''],[''],
            [''],[''],[''],
            [''],[''],['']
        ]
    }

    const sendToPlayer = (storeUserPieceID) => {
        player.playerPiece(storeUserPieceID)
        AIPiece()
        displayController.showGameBoard()
    }

    const AIPiece = () => {
       if(player.returnPlayerPiece() === "X") {
           ai.getAIPiece("O")
        }
        else {
            ai.getAIPiece("X")
        }
    }

    const printGameBoard = () =>  {
        addOccupiedClassToDiv()
        displayController.printGameBoard(gameBoard)
    }
    
    const returnGameBoard = () => {
        return gameBoard
    }

    let insertPlayerChoice = (valueToAddToGameBoard) => {
        gameBoard[valueToAddToGameBoard] = player.returnPlayerPiece() 
        _subtractRemainingPieces()
    }

    const insertAIChoice = (valueToAddToGameBoard) => {
        gameBoard[valueToAddToGameBoard] = ai.returnAI()
        _subtractRemainingPieces()
    }
    

    return {
        printGameBoard, 
        insertPlayerChoice, 
        sendToPlayer,
        resetGameBoardData,
        insertAIChoice,
        getNewMoveIfOccupied,
        checkRemainingPieces,
        setRamainingPieces,
        checkForWinner,
        returnGameBoard
    }

}

const intializeGameBoard = gameBoardFactory()

function sendBlockChoiceToGameBoard(e) {
    let storeE = e.id
    // returns the value of the dom element
    let clicked = true
    let getValue = document.getElementById(storeE).getAttributeNode("value").value
    if (clicked) {
        clicked = false
        if (intializeGameBoard.getNewMoveIfOccupied(getValue) === true) {
            intializeGameBoard.insertPlayerChoice(getValue)
            intializeGameBoard.checkForWinner(intializeGameBoard.returnGameBoard(),player.returnPlayerPiece())
            if (intializeGameBoard.checkRemainingPieces() === false) {
                let AILoop = false
                while (AILoop === false) {
                    let AIPiece = Math.floor((Math.random() * 9))
                    if (intializeGameBoard.getNewMoveIfOccupied(AIPiece) === true) {
                        intializeGameBoard.insertAIChoice(AIPiece)
                        intializeGameBoard.checkForWinner(intializeGameBoard.returnGameBoard(),ai.returnAI())
                        AILoop = true
                    }
                }
            }
        }
        intializeGameBoard.printGameBoard()
    }
    
}
function sendUserPieceToPlayer(e) {
    let storeUserPieceID = e.id
    intializeGameBoard.sendToPlayer(storeUserPieceID)
}

function callResetBoard() {
    intializeGameBoard.resetGameBoardData()
    intializeGameBoard.setRamainingPieces()
    intializeGameBoard.printGameBoard()
}

intializeGameBoard.resetGameBoardData()

