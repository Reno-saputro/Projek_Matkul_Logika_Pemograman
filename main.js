function getPilihanKomputer(){
    const comp = Math.random()
    if (comp < 0.34) return'batu';
    if (comp >= 0.34 && comp < 0.63) return 'kertas';
    return 'gunting'
}

function getHasil (comp, player){
    if (player == comp) return 'KAMU SERI 🫣';
    if (player == 'batu') return (comp == 'gunting') ? 'KAMU MENANG 🥳' : 'KAMU KALAH 😔';
    if (player == 'gunting') return (comp == 'batu') ? 'KAMU KALAH 😔'  : 'KAMU MENANG 🥳';
    if (player == 'kertas') return (comp == 'gunting') ? 'KAMU KALAH 😔' : 'KAMU MENANG 🥳';
}

function putar(){
    const imgComputer = document.querySelector('.img-computer');
    const gambar = ['kertas', 'batu', 'gunting']
    const waktuAwal = new Date().getTime()
    let i = 0;
    setInterval(function(){
        if (new Date().getTime() - waktuAwal > 1500){
            clearInterval;
            return;
        }
        imgComputer.setAttribute('src', 'img/' + gambar[i++] + '.png')
        if (i === gambar.length) i = 0
    }, 100)
}

const ops = document.querySelectorAll('li img')
ops.forEach(function (ops){
    ops.addEventListener('click', function(){
        const pilihanComputer = getPilihanKomputer();
        const pilihanPlayaer = ops.className;
        const hasil = getHasil(pilihanComputer, pilihanPlayaer)
        document.querySelector('.from-operation').style.display = 'flex'
        putar()

        const imgPlayer = document.querySelector('.img-player');
        imgPlayer.setAttribute('src', 'img/' + pilihanPlayaer + '.png');

        setTimeout(function(){
            const imgComputer = document.querySelector('.img-computer');
            imgComputer.setAttribute('src', 'img/' + pilihanComputer + '.png')

            document.querySelector('.from-hasil').style.display = 'block'

            const info = document.querySelector('.info');
            info.innerHTML = hasil
        }, 1500)
        
    })
    
})

const button = document.querySelector('.BtSuit');

button.addEventListener('click', function (){
document.querySelector('.Game-suit').style.display = 'flex';
document.querySelector('.conten-calculator').style.display = 'none';
document.getElementById('tictactoc').style.display = 'none';
})

const button2 = document.querySelector('.BtKal');
    
button2.addEventListener('click', function(){
    document.querySelector('.conten-calculator').style.display = 'flex';
    document.querySelector('.Game-suit').style.display = 'none';
    document.getElementById('tictactoc').style.display = 'none';
})

const button3 = document.querySelector('.BtTic');

button3.addEventListener('click', function (){
    document.getElementById('tictactoc').style.display = 'flex';
    document.querySelector('.conten-calculator').style.display = 'none';
    document.querySelector('.Game-suit').style.display = 'none';
})



// KALKU
const display = document.getElementById("display");
const opsion = document.querySelectorAll(".opsion");
const clear = document.querySelector(".clear");
const calculat = document.querySelector(".calculat");
const clearByToWan = document.querySelector(".clearBywan");

const opsion1 = [...opsion].map(m => {
    m.addEventListener('click' ,function (){
            display.value += m.textContent;
    })
})

clear.addEventListener('click', function() {
    display.value = ""
})

calculat.addEventListener('click', function(){
    try {
        // Check if the input is "1 + 1"
        if (display.value === "1+1") {
            display.value = "I LOVE YOU";
        }
        else {
            display.value = eval(display.value);
        }
    } catch {
        display.value = "error";
    }
})

clearByToWan.addEventListener('click', function (){
    display.value = display.value.slice(0, -1)
})

// game tictactoc
let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
boxes.forEach(e =>{
    e.innerHTML = ""
    e.addEventListener("click", ()=>{
        if(!isGameOver && e.innerHTML === ""){
            e.innerHTML = turn;
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    })
})
function changeTurn(){
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    }
    else{
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}
function cheakWin(){
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for(let i = 0; i<winConditions.length; i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;
        if(v0 != "" && v0 === v1 && v0 === v2){
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " win";
            document.querySelector("#play-again").style.display = "inline"
            for(j = 0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"
                boxes[winConditions[i][j]].style.color = "#000"
            }
        }
    }
}
function cheakDraw(){
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false;
        })
        if(isDraw){
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline"
        }
    }
}
document.querySelector("#play-again").addEventListener("click", ()=>{
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"
    })
})