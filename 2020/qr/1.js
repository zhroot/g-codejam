const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function proc(index,n,matrix){
    let trace = 0;
    let repeatedRow = 0;
    let repeatedCol = 0;
    for(let i=0;i<n;i++){
        let record = new Array(n);
        record.fill(0);
        let repeated = false;
        for(let j=0;j<n;j++){
            matrix[i][j] = parseInt(matrix[i][j]);
            let ele = matrix[i][j];
            if(i==j){
                trace += ele
            }
            if(!repeated){
                if(record[ele-1] != 0){
                    repeated = true;
                    repeatedRow += 1;
                }
                record[ele-1] = 1;
            }
        }
    }

    for(let i=0;i<n;i++){
        let record = new Array(n);
        record.fill(0);
        let repeated = false;
        for(let j=0;j<n;j++){
            let ele = matrix[j][i];
            if(!repeated){
                if(record[ele-1] != 0){
                    repeated = true;
                    repeatedCol += 1;
                }
                record[ele-1] = 1;
            }
        }
    }

    console.log('Case #%d: %d %d %d',index,trace,repeatedRow,repeatedCol);
}

let caseCnt;
let index=0;
let n = 0;
let matrix = null;
let i = 0;
rl.on('line', function (line) {
    if(caseCnt == null){
        index = 0;
        caseCnt = parseInt(line);
    } else if(caseCnt > index) {
        if(n == 0){
            n = parseInt(line);
            i = 0;
            matrix = new Array(n);
            return;
        }
        if(i < n){
            let arr = line.split(' ');
            matrix[i] = arr;
            i += 1;
        }
        if(i == n){
            index += 1;
            proc(index,n,matrix);
            n = 0;
            i = 0;
        }
    } else {
        process.exit();
    }
});