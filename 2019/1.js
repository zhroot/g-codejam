
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function proc(index,numStr){
    let a = '';
    let b = '';
    for(let i = 0;i<numStr.length;i++){
        if(numStr[i] == 4){
            a += '2';
            b += '2';
        } else {
            a += numStr[i];
            if(b != ''){
                b += '0'
            }
        }
    }
    console.log('Case #%d: %s %s',index,a,b);
}

let n;
let index=0;
rl.on('line', function (line) {
    if(n == null){
        index = 0;
        n = parseInt(line);
    } else if(n > index) {
        index += 1;
        proc(index,line);
    } else {
        process.exit();
    }
});