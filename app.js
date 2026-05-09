let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let turnO = true;

let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

const wp = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if(turnO){
            box.innerText = "O";
            turnO = false;
        } 
        else{
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgcontainer.classList.remove("hide");

    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "Match Draw";
    msgcontainer.classList.remove("hide");
};

const checkWinner = () => {

    let isWinner = false;

    for(let pattern of wp){

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){

            if(pos1Val === pos2Val && pos2Val === pos3Val){

                showWinner(pos1Val);

                isWinner = true;
            }
        }
    }

    // Draw Match Logic
    let count = 0;

    for(let box of boxes){
        if(box.innerText != ""){
            count++;
        }
    }

    if(count === 9 && !isWinner){
        showDraw();
    }
};

const resetGame = () => {

    turnO = true;

    enableBoxes();

    msgcontainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);