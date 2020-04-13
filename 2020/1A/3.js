const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let caseCnt;
let index=0;
rl.on('line', function (line) {
    if(caseCnt == null){
        index = 0;
        caseCnt = parseInt(line);
    } else if(caseCnt > index) {
        index += 1;
       // proc(index,line);
    } else {
        process.exit();
    }
});