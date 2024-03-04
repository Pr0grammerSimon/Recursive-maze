/*
let labirynt = [
    ['X','X','X','X','X','X','X','X','X','X','X','X'],
    ['.','.','.','X','.','.','.','X','.','.','.','X'],
    ['X','.','X','.','.','X','.','X','.','X','.','E'],
    ['X','.','X','.','X','X','.','X','.','X','.','X'],
    ['X','.','.','.','.','X','.','.','.','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X','X','X']
]
*/
let x = 0;
let y = 1;
const width = 17;
const height = 27;
let oldX = x;
let oldY = y;


const [NORTH,SOUTH,EAST,WEST]= ["n","s","e","w"];

const WALL = 'X';
const EMPTY = '.';
let visited = [];
let labirynt = [];
for (let i = 0; i<height; i++){
    labirynt.push([]);
    visited.push([]);
    for (let j = 0; j < width; j++){
        labirynt[i].push('X');
        visited[i].push(false);
    }
}

function visit(y,x){
    labirynt[y][x] = EMPTY;
    while (true){
        let unvisited = [];
        if (y > 1 && !visited[y-2][x]){
            unvisited.push(NORTH);
        }
        if (y < height-2 && !visited[y+2][x]){
            unvisited.push(SOUTH);
        }
        if (x > 1 && !visited[y][x-2]){
            unvisited.push(WEST);
        }
        if (x < width-2 && !visited[y][x+2]){
            unvisited.push(EAST);
        }


        if (unvisited.length === 0){
            return;
        }
        let next = unvisited[Math.floor(Math.random()*unvisited.length)];
        let NextX,NextY;
        if (next === NORTH){
            NextX = x;
            NextY = y-2;
            labirynt[y-1][x] = EMPTY;
        }
        else if (next === SOUTH){
            NextX = x;
            NextY = y+2;
            labirynt[y+1][x] = EMPTY;
        }
        else if (next === WEST){
            NextX = x - 2;
            NextY = y;
            labirynt[y][x-1] = EMPTY;
        }
        else if (next === EAST){
            NextX = x+2;
            NextY = y;
            labirynt[y][x+1] = EMPTY;
        }
        visited[NextY][NextX] = true;
        visit(NextY,NextX);

    }
}

visited[1][1] = true;
visit(1,1);
console.log(labirynt);


let cost = [];
visited = [];
const dy = [0,0,-1,1];
const dx = [1,-1,0,0];

for (let i = 0; i<height; i++){
    visited.push([]);
    cost.push([]);
    for (let j = 0; j < width; j++){
        visited[i].push(false);
        cost[i].push(10000000000);
    }
}
maxi = [0,1,1];
function graph(y,x){
    if (maxi[0] < cost[y][x]){
        maxi = [cost[y][x],y,x]
    }
    visited[y][x] = true;
    for (let i = 0; i<4; i++){
        if (y+dy[i]<height && y+dy[i] > -1 && x+dx[i] < width && x+dx[i] > -1){
            //console.log("UWU");
            if (labirynt[y+dy[i]][x+dx[i]] == '.' && cost[y+dy[i]][x+dx[i]] > cost[y][x] + 1){
                cost[y+dy[i]][x+dx[i]] = cost[y][x] + 1;
                graph(y+dy[i],x+dx[i]);
            }
        }
    }
    return;
}
cost[1][1] = 0;
graph(1,1);
//console.log(maxi);
//console.log(cost);
labirynt[maxi[1]][maxi[2]] = 'E';




/////////////
//USER GAME//
/////////////


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
        
        for (let j=0; j<height; j++){
            if (labirynt[j][i] == 'X'){
            cialo.innerHTML += '    <svg id="'+i+j+'" width="100%" height="100%"> <rect width="100%" height="100%" fill="blue"  stroke-width="" stroke="black" /> </svg>';
            }
            else if (labirynt[j][i] == 'E'){
                cialo.innerHTML += '    <svg id="'+i+j+'" width="100%" height="100%"> <rect width="100%" height="100%" fill="black"  stroke-width="" stroke="red" /> </svg>';
                }
            else if (j == y & i == x){
                cialo.innerHTML += '    <svg id="'+i+j+'" width="100%" height="100%"> <circle r="35%" cx="50%" cy="50%" fill="lightgreen"  stroke-width="" stroke="green" /> </svg>';
                }
            else{
            cialo.innerHTML += '    <svg id="'+i+j+'"width="100%" height="100%"> <rect width="100%" height="100%" fill="black"  stroke-width="" stroke="black" /> </svg>';
            }
        }
        
    }
}
function edit(){
    let column = document.getElementById(oldX.toString()+oldY.toString());
    //console.log(column,oldX.toString()+oldY.toString());
    if (labirynt[oldY][oldX] == 'X'){
        column.innerHTML = '    <svg id="'+oldX+oldY+'" width="100%" height="100%"> <rect width="100%" height="100%" fill="blue"  stroke-width="" stroke="black" /> </svg>';
        }
    else{
        column.innerHTML = '    <svg id="'+oldX+oldY+'"width="100%" height="100%"> <rect width="100%" height="100%" fill="black"  stroke-width="" stroke="black" /> </svg>';
        }  
    
    column = document.getElementById(x.toString()+y.toString());
    column.innerHTML = '    <svg id="'+x+y+'" width="100%" height="100%"> <circle r="35%" cx="50%" cy="50%" fill="lightgreen"  stroke-width="" stroke="green" /> </svg>';
}


update();

document.onkeydown = function (e) {
    var keyCode = e.keyCode;
    oldY = y;
    oldX = x;
    buttons.forEach(element => {
        if (element[0] == keyCode){
            if (element[1]+y < height & element[1]+y >-1 & (labirynt[y+element[1]][x] == '.' || labirynt[y+element[1]][x] == 'E')){
                if (labirynt[y+element[1]][x] == 'E'){alert("WYGRAŁEŚ!")}
                y+=element[1];
                //console.log(y,labirynt);
            }
            if (element[2]+x < width & element[2]+x >-1 & (labirynt[y][x+element[2]] == '.' || labirynt[y][x+element[2]] == 'E')){
                if (labirynt[y][x+element[2]] == 'E'){alert("WYGRAŁEŚ!")}
                x+=element[2];
                //console.log(x,labirynt);
            }
            edit();
            console.log(labirynt);
        }
    });
    /*
    if(keyCode == 90) {
        clicked();
    }
    */
};