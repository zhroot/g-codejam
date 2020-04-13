const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function proc(index,strs){
    const n = strs.length;
    let ret = '';
    let retL = '';
    let retR = '';
    let procLeft = 1;
    let procRight = 1;
    while(1){
        let lastLeftChar = '*';
        let lastRightChar = '*';
        let bad = false;
        let end = true;
        for(let i = 0;i<n;i++){
            if(strs[i].length == 0){
                continue;
            }
            end = false;
            if(procLeft == 1){
                if(strs[i][0] != '*'){
                    if(lastLeftChar != '*' && lastLeftChar !=strs[i][0]){
                        bad = true;
                        break;
                    }  else {
                        lastLeftChar = strs[i][0];
                    }
                    strs[i]=strs[i].substring(1);
                }
            } 
            if(procRight == 1) {
                if(strs[i][strs[i].length-1] != '*'){
                    if(lastRightChar != '*' && lastRightChar !=strs[i][strs[i].length-1]){
                        bad = true;
                        break;
                    }  else {
                        lastRightChar = strs[i][strs[i].length-1];
                    }
                    strs[i] = strs[i].substring(0,strs[i].length-1);
                }
            }
        }
        if(bad){
            ret = '*';
            break;
        }
        if(lastLeftChar == '*'){
            procLeft = 0;
        } else {
            retL += lastLeftChar;
        }
        if(lastRightChar == '*'){
            procRight = 0;
        } else {
            retR = lastRightChar + retR;
        }
        if(end){
            ret = retL + retR;
            break;
        }

        if(procLeft == 0 && procRight == 0){
             //find max str remove one char
             let maxLen = 0;
             let maxIndex = 0;
             for(let i = 0;i<n;i++){
                 if(strs[i].length > maxLen){
                    maxLen = strs[i].length;
                    maxIndex =  i;
                 }
             }
             strs[maxIndex] = strs[maxIndex].substring(1);
             procLeft = 1;
        }
    }
    console.log('Case #%d: %s',index,ret);
}

let caseCnt;
let index=0;
let strCnt = 0;
let curStrCnt = 0;
let strs;
rl.on('line', function (line) {
    if(caseCnt == null){
        index = 0;
        caseCnt = parseInt(line);
    } else if(caseCnt > index) {
        if(strCnt == 0){
            strCnt = parseInt(line);
            curStrCnt = 0;
            strs = [];
        } else if(strCnt > curStrCnt){
            curStrCnt ++;
            strs.push(line);
            if(curStrCnt == strCnt){
                proc(index+1,strs);
                index += 1;
                strCnt = 0;
            }
        } 
       // proc(index,line);
    } else {
        process.exit();
    }
});

/*
let testcase = [
    "*CONUTS",
    "*COCONUTS",
    "*OCONUTS",
    "*CONUTS",
    "*S"
];

proc(1,testcase);

testcase = [
    "*XZ",
    "*XYZ",
];

proc(2,testcase);

testcase = [
    "H*O",
  "HELLO*",
  "*HELLO",
  "HE*"
];

proc(3,testcase);

testcase = [
"CO*DE",
  "J*AM",
]
proc(4,testcase);

testcase = [
    "A*C*E",
    "*B*D",
]
proc(5,testcase);
*/