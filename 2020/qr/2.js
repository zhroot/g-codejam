const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function proc(index,input){
    let ret = '';
    let left = 0;
    for(let i=0;i<input.length;i++){
        const num = input.charCodeAt(i)-48;
        if(left > num){
            ret += ')'.repeat(left - num);    
        } else if(left < num){
            ret += '('.repeat(num-left);
        }
        left = num;
        ret += input[i];
    }
    if(left != 0){
        ret += ')'.repeat(left);
    }
    console.log('Case #%d: %s',index, ret);
}

let caseCnt;
let index=0;
rl.on('line', function (line) {
    if(caseCnt == null){
        index = 0;
        caseCnt = parseInt(line);
    } else if(caseCnt > index) {
        index += 1;
        proc(index,line);
    } else {
        process.exit();
    }
});

let s = '221'
proc(index++,s)
s = '4'
proc(index++,s)
s = '021'
proc(index++,s)
s = '312'
proc(index++,s)