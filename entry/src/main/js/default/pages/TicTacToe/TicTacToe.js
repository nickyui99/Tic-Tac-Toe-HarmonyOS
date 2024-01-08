import prompt from '@system.prompt';

export default {
    data: {
        current: "X",
        board: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ],
        border: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    },
    onInit() {
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                const attribute = this.setBoardBorder(i, j)
                console.log("Attribute: " + attribute)
                this.border[i][j] = attribute
            }
        }
    },
    isRow(index, row) {
        prompt.showToast({
            message: (index == row),
            duration: 2000,
        })
        return (index == row)
    },
    setBoardBorder(row, col) {
        let classArr = []

        if(row == 0) {
            switch (col) {
                case 0:
                    classArr.push("borderRight")
                    classArr.push("borderBottom")
                    break;
                case 1:
                    classArr.push("borderLeft")
                    classArr.push("borderRight")
                    classArr.push("borderBottom")
                    break;
                case 2:
                    classArr.push("borderLeft")
                    classArr.push("borderBottom")
                    break;
                default:
                    break;
            }
        } else if(row == 1) {
            switch (col) {
                case 0:
                    classArr.push("borderTop")
                    classArr.push("borderRight")
                    classArr.push("borderBottom")
                    break;
                case 1:
                    classArr.push("borderTop")
                    classArr.push("borderLeft")
                    classArr.push("borderRight")
                    classArr.push("borderBottom")
                    break;
                case 2:
                    classArr.push("borderTop")
                    classArr.push("borderLeft")
                    classArr.push("borderBottom")
                    break;
                default:
                    break;
            }
        } else if(row == 2) {
            switch (col) {
                case 0:
                    classArr.push("borderTop")
                    classArr.push("borderRight")
                    break;
                case 1:
                    classArr.push("borderTop")
                    classArr.push("borderLeft")
                    classArr.push("borderRight")
                    break;
                case 2:
                    classArr.push("borderTop")
                    classArr.push("borderLeft")
                    break;
                default:
                    break;
            }
        }

        if(classArr.length == 0) {
            return null
        } else {
            return classArr.join(" ")
        }
    },
    onTileClicked(row, col) {
        //Check if the tile is not empty
        if(this.board[row][col] != ''){
            prompt.showToast({
                message: "Please choose another tile"
            })
            return
        }

        let temp = this.board
        temp[row][col] = this.current
        this.board = [...temp]

        console.log("Board: " + this.board.toString())

        if(this.checkWinner()){
            prompt.showToast({
                message: "Winner Player " + this.current
            })
            this.resetGame();
        }

        this.current = this.current == "X" ? "O" : "X"
    },
    checkWinner(){
        for(let i=0; i<3; i++){
            if(
                this.checkLine(this.board[i][0], this.board[i][1], this.board[i][2]) || //Check main rows
                this.checkLine(this.board[0][i], this.board[1][i], this.board[2][i]) || //Check main cols
                this.checkLine(this.board[0][0], this.board[1][1], this.board[2][2]) || //Check main diagonal
                this.checkLine(this.board[0][2], this.board[1][1], this.board[2][0]) //Check anti diagonal
            ) {
                return true
            }
        }

        // Check for a tie
        if (!this.board.flat().includes('')) {
            prompt.showToast({
                message: "It's a tie"
            })
            this.resetGame();
        }


        return false
    },
    checkLine(a, b, c) {
        return (a !== "" && a == b && b==c)
    },
    resetGame() {
        this.current = 'X';
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }
}

