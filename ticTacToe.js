const ticTacToe = {
    board: ['', '', '', '', '', '', '', '', ''],
    simbols: {
        options: ['O', 'X'],
        turnIndex: 0,
        change(){
            this.turnIndex = (this.turnIndex === 0 ? 1 : 0)
        }
    },
    elementContainer: null,
    gameover: false,
    winnerSequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    

    init(container){
        this.elementContainer = container
    },

    play(position){
        if (this.gameover || this.board[position] !== '') return false

        const currentSimbol = this.simbols.options[this.simbols.turnIndex]
        this.board[position] = currentSimbol
        this.draw()

        const winnerSequencesIndex = this.checkWinner(currentSimbol)
        if(this.isGameOver()){
            this.gameIsOver
        }
        if(winnerSequencesIndex >= 0){
            this.gameIsOver()
            this.stylizeWinnerSequence(this.winnerSequences[winnerSequencesIndex])
        } else {
            this.simbols.change()
        }       
            return true
    },

    stylizeWinnerSequence(winnerSequence){
        winnerSequence.forEach((position) => {
          this
            .elementContainer
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner')
        })
      },

      checkWinner(simbol){
        for (i in this.winnerSequences){
            if (this.board[this.winnerSequences[i][0]] == simbol &&
                this.board[this.winnerSequences[i][1]] == simbol &&
                this.board[this.winnerSequences[i][2]] == simbol) {
                return i
            }
        }
        return -1
    },

    gameIsOver(){
        this.gameover = true;
    },

    isGameOver(){
        return !this.board.includes('')
    },

    start(){
        this.board.fill('')
        this.draw()
        this.gameover = false
    },

    restart(){
        if(this.isGameOver() || this.gameover){
            this.start()
        } else if (confirm('Are you sure you want to restart this game?')) {
            this.start()
        }
    },

    draw(){
        this.elementContainer.innerHTML = this.board.map((element, index) => `<div onclick="ticTacToe.play('${index}')"> ${element} </div>`).reduce((content, current) => content + current)
    },
};