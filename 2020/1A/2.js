const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function zoreNum(num){
    let zore = 0;
    while(num>0){
        if((num & 0x1) == 0){
            zore ++;
        }
        num = num >> 1;
    }
    return zore;
}

function proc(index,num){
    console.log('Case #%d:',index);
    //let bits = bitNum(num);
    let find = null;
    let diff = 0;
    for(let i = num; i>=num-30;i--){
        let zores = zoreNum(i);
        if(zores + i <= num){
            find = i;
            diff = num - (zores + i)
            break;
        }
    }
    let left = 1;
    let i = 1;
    while(find > 0){
        if(find & 1){
            if(left){
                for(let j = 1;j<=i;j++){
                    console.log('%d %d',i,j);
                }
            } else {
                for(let j = i;j>0;j--){
                    console.log('%d %d',i,j);
                }  
            }
            left = (left+1) % 2;
        } else {
            if(left){
                console.log('%d 1',i);
            } else {
                console.log('%d %d',i,i);
            }
        }
        i++;
        find = find >> 1;
    }
    while(diff > 0){   
        if(left){
                console.log('%d %d',i,1);
        } else {
                console.log('%d %d',i,i);
        }
        i++;
        diff --;
    }
}

let caseCnt;
let index=0;
rl.on('line', function (line) {
    if(caseCnt == null){
        index = 0;
        caseCnt = parseInt(line);
    } else if(caseCnt > index) {
        index += 1;
        proc(index,parseInt(line));
    } else {
        process.exit();
    }
});

for(let i = 1;i<100;i++){
    proc(1,i);
}
