let labirynt = [
    ['X','X','X','X','X','X','X','X','X','X','X','X'],
    ['.','.','.','X','.','.','.','X','.','.','.','X'],
    ['X','.','X','.','.','X','.','X','.','X','.','E'],
    ['X','.','X','.','X','X','.','X','.','X','.','X'],
    ['X','.','.','.','.','X','.','.','.','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X','X','X']
]
let x = 0;
let y = 1;
let width = 12;
let high = 6;
let buttons = [[65,0,-1],[68,0,1],[87,-1,0],[83,1,0]];
function update(){
    body = document.getElementById('grid-container');
    body.innerHTML = "";
    for (let i=0; i<width; i++){
    //console.log(cialo);
        body.innerHTML += '<div id="column'+i+'"></div>';
        body.style.gridTemplateColumns = "auto ".repeat(width);
        cialo = document.getElementById('column'+i);
        //console.log(cialo)
        
        for (let j=0; j<high; j++){
            if (labirynt[j][i] == 'X'){
            cialo.innerHTML += '    <svg width="100%" height="100%"> <rect width="100%" height="100%" fill="blue"  stroke-width="" stroke="black" /> </svg>';
            }
            else if (labirynt[j][i] == 'E'){
                cialo.innerHTML += '    <svg width="100%" height="100%"> <rect width="100%" height="100%" fill="black"  stroke-width="" stroke="red" /> </svg>';
                }
            else if (j == y & i == x){
                cialo.innerHTML += '    <svg width="100%" height="100%"> <circle r="40%" cx="50%" cy="50%" fill="lightgreen"  stroke-width="" stroke="green" /> </svg>';
                }
            else{
            cialo.innerHTML += '    <svg width="100%" height="100%"> <rect width="100%" height="100%" fill="black"  stroke-width="" stroke="black" /> </svg>';
            }
        }
        
    }
}
update();

document.onkeydown = function (e) {
    var keyCode = e.keyCode;
    buttons.forEach(element => {
        if (element[0] == keyCode){
            if (element[1]+y < high & element[1]+y >-1 & (labirynt[y+element[1]][x] == '.' || labirynt[y+element[1]][x] == 'E')){
                if (labirynt[y+element[1]][x] == 'E'){alert("WYGRAŁEŚ!")}
                y+=element[1];
                console.log(y);
            }
            if (element[2]+x < width & element[2]+x >-1 & (labirynt[y][x+element[2]] == '.' || labirynt[y][x+element[2]] == 'E')){
                if (labirynt[y][x+element[2]] == 'E'){alert("WYGRAŁEŚ!")}
                x+=element[2];
                console.log(x);
            }
            update();
        }
    });
    /*
    if(keyCode == 90) {
        clicked();
    }
    */
};
btnZ.onclick = clicked;