const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function gcd(a,b){
    if(b>0){
        while((a%=b)!=0 && (b%=a)!=0);
    }
    return a+b;
}

function proc(index,lArr,maxNums){
    let cipherTextArr = new Array(lArr.length+1);
    let letters = {};
    cipherTextArr[1] = gcd(lArr[0],lArr[1]);
    cipherTextArr[0] = lArr[0]/cipherTextArr[1];
    letters[cipherTextArr[1]] = true;
    letters[cipherTextArr[0]] = true;
    for(let i = 2;i<lArr.length+1;i++){
        cipherTextArr[i] = lArr[i-1]/cipherTextArr[i-1];
        letters[cipherTextArr[i]] = true;
    }
    
    let lettersArr = Object.keys(letters);
    lettersArr = lettersArr.map(letterStr=>parseInt(letterStr));
    lettersArr.sort((a,b)=> a-b);
    let letterMap = {};
    for(let i = 0;i<lettersArr.length;i++){
        letterMap[lettersArr[i]] = String.fromCharCode(65+i);
    }
    let ret = '';
    for(let i = 0;i<cipherTextArr.length;i++){
        ret += letterMap[cipherTextArr[i]];
    }
    console.log('Case #%d: %s',index,ret);
}


let n;
let index=0;
let maxNums = 0;
//let lLen = 0;
rl.on('line', function (line) {
    if(n == null){
        index = 0;
        n = parseInt(line);
        maxNums = 0
    } else if(n >= index) {
        let lines = line.split(' ');
        if(maxNums == 0){
            maxNums = parseInt(lines[0]);
            //lLen = parseInt(lines[1]);
        } else {
            index ++;
            let lArr = lines.map((l=> parseInt(l)));
            proc(index,lArr,maxNums);
            maxNums = 0;
        }
    } else {
        process.exit();
    }
});
/*
function test(){
    let case1 = "217 1891 4819 2291 2987 3811 1739 2491 4717 445 65 1079 8383 5353 901 187 649 1003 697 3239 7663 291 123 779 1007 3551 1943 2117 1679 989 3053";
    let case2 = "3292937 175597 18779 50429 375469 1651121 2102 3722 2376497 611683 489059 2328901 3150061 829981 421301 76409 38477 291931 730241 959821 1664197 3057407 4267589 4729181 5335543";
    proc(1,case1.split(' '),103);
    proc(2,case2.split(' '),10000);
}

test();
*/