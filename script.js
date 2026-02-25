const board = document.getElementById("board");
const statusText = document.getElementById("status");

const game = new Chess();
let selectedSquare = null;

function renderBoard(){
    board.innerHTML = "";
    const boardState = game.board();

    for(let row = 0; row < 8; row++){
        for(let col = 0; col < 8; col++){

            const square = document.createElement("div");
            square.classList.add("square");

            const isLight = (row + col) % 2 === 0;
            square.classList.add(isLight ? "light" : "dark");

            square.dataset.row = row;
            square.dataset.col = col;

            const piece = boardState[row][col];
            if(piece){
                square.textContent = getPieceSymbol(piece);
            }

            square.addEventListener("click", handleClick);
            board.appendChild(square);
        }
    }

    updateStatus();
}

function handleClick(e){
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;

    const squareName =
        String.fromCharCode(97 + parseInt(col)) +
        (8 - row);

    if(selectedSquare){
        const move = game.move({
            from: selectedSquare,
            to: squareName,
            promotion: "q"
        });

        selectedSquare = null;

        if(move){
            renderBoard();
        }
    }else{
        selectedSquare = squareName;
    }
}

function getPieceSymbol(piece){
    const symbols = {
        p: { w: "♙", b: "♟" },
        r: { w: "♖", b: "♜" },
        n: { w: "♘", b: "♞" },
        b: { w: "♗", b: "♝" },
        q: { w: "♕", b: "♛" },
        k: { w: "♔", b: "♚" }
    };

    return symbols[piece.type][piece.color];
}

function updateStatus(){
    if(game.isCheckmate()){
        statusText.textContent = "Checkmate!";
    }
    else if(game.isDraw()){
        statusText.textContent = "Draw!";
    }
    else{
        statusText.textContent =
            "Turn: " + (game.turn() === "w" ? "White" : "Black");
    }
}

renderBoard();
