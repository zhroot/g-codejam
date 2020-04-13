const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let B = null;
let status = 0;
let T,sizeB;
let queryNum = 0;

function queryResult(num){
    queryNum ++;

}

function init(){
    let B = new Array();
    B.fill(-1);
    queryNum = 0;
    status = 1;
}
rl.on('line', function (line) {
    if(status == 0){
        const input = line.split(' ');
        T = parseInt(input[0]);
        sizeB = parseInt(input[1]);
        init()
    } else if (status == 1){    // query ans
        queryResult(line);
    } else if (status == 2){    //
        T --;
        if(T == 0){ 
            process.exit();
            return;
        }
    }
});