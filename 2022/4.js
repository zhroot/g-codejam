const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const MAX_VALUE = 1000000000;

function proc(index,readN,readLine1,readLine2){
    let FVStr = readLine1.split(' ');
    let FV = FVStr.map(str => parseInt(str));
    let NVStr = readLine2.split(' ');
    let NV = NVStr.map(str => parseInt(str));

    let PV = {};

    for(let i=0;i<NV.length;i++){
        if(NV[i] != 0){
            if(PV[NV[i]] == null){
                PV[NV[i]] = []
            }
            PV[NV[i]].push(i);
        }
    }
    let result = 0;
    for(let i=readN;i>0;i--){
        if(PV[i] && PV[i].length > 1){
            let minVal = MAX_VALUE;
            let sum = 0;
            for (let j = 0;j < PV[i].length; j++){
                    sum += FV[PV[i][j]];
                    if(minVal > FV[PV[i][j]]){
                        minVal = FV[PV[i][j]];
                    }
            }
            result += sum - minVal;
            FV[i-1] = Math.max(minVal,FV[i-1]);
        }
        let next = NV[i-1];
        if(next == 0){
            result += FV[i-1];
        } else if(PV[next] && PV[next].length == 1){
            FV[next-1] = Math.max(FV[next-1],FV[i-1]);
        } 
    }
    console.log('Case #%d: %d',index,result); 
}

let caseCnt;
let index=0;
let readN = null;
let readLine1 = null;
let readLine2 = null;
rl.on('line', function (line) {
    if(caseCnt == null){
        index = 0;
        caseCnt = parseInt(line);
    } else if(readN == null) {
        index += 1;
        readN = parseInt(line);
        readLine1 = null;
        readLine2 = null;
    } else if(readLine1 == null){
        readLine1 = line;
    } else if(readLine2 == null){
        readLine2 = line;
        proc(index,readN,readLine1,readLine2);
        if(index == caseCnt){
            process.exit();
        } else {
            readN = null;
            readLine1 = null;
            readLine2 = null;
        }
    }   
});
