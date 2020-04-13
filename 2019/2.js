
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function check(str1,str2,mazeSize){
    const lydiaPath = {}
    let x = 0;
    let y = 0;
    for(let i = 0;i<str1.length;i++){
        let nextX,nextY;
        if(str1[i] == 'E'){
            nextX = x + 1;
            nextY = y;
        } else {
            nextX = x;
            nextY = y + 1;
        }
        lydiaPath[x*mazeSize+y] = nextX*mazeSize+nextY;
        x = nextX;
        y = nextY;
    }
    x = 0;
    y = 0;
    for(let i = 0;i<str2.length;i++){
        let nextX,nextY;
        if(str2[i] == 'E'){
            nextX = x + 1;
            nextY = y;
        } else {
            nextX = x;
            nextY = y + 1;
        }
        if(lydiaPath[x*mazeSize+y] == nextX*mazeSize+nextY){
            console.log({x,y});
            return false;
        }
        x = nextX;
        y = nextY;
    }
    return true;
}


function proc(index,str){
    let ret = '';
    for(let i = 0;i<str.length;i++){
        if(str[i]=='E'){
            ret += 'S';
        } else {
            ret += 'E';
        }
    }
    console.log('Case #%d %s',index,ret);
}

function test(){
    let size = 50000;
    let eNum = 0;
    let sNum = 0;
    let str='';
    for(let i = 0;i<2*size-2;i++){
        if(Math.random() > 0.5){
            if(eNum < size-1){
                str += 'E';
                eNum ++;
            } else {
                str += 'S';
                sNum ++;
            }
        } else {
            if(sNum < size-1){
                str += 'S';
                sNum ++;
            } else {
                str += 'E';
                eNum ++;
            }
        }
    }
    proc(0,str);
}
let n;
let index=0;
let mazeSize = 0;
rl.on('line', function (line) {
    if(n == null){
        index = 0;
        mazeSize = 0;
        n = parseInt(line);
    } else if(n >= index) {
        if(mazeSize == 0){
            mazeSize = parseInt(line);
        } else {
            index += 1;
            proc(index,line);
            mazeSize = 0;
        }
    } else {
        process.exit();
    }
});
/*
for(let i = 0;i<1000;i++){
    test();
}
console.log('over');
*/