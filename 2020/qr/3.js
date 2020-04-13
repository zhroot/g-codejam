const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function proc(index,n,activities){
    let c = null;
    let j = null;
    let ret = new Array(n);
    ret.fill('');
    activities.sort((a,b)=>a[0] - b[0])
    for(let i = 0;i<n;i++){
        let start = activities[i][0];
        let actNo = activities[i][2];
        if(c){
            if(c[1] <= start){
                c = null;
            }
        }
        if(j){
            if(j[1] <= start){
                j = null;
            }
        }
        if(!c){
            c = activities[i];
            ret[actNo] = 'C';
        } else if(!j){
            j = activities[i];
            ret[actNo]= 'J';
        } else {
            ret = null;
            break;
        }
    }
    let s = 'IMPOSSIBLE';
    if(ret){
        s = ret.join('');
    }
    console.log('Case #%d: %s',index,s);
}

let caseCnt;
let index=0;
let n = 0;
let activities = null;
let i = 0;
rl.on('line', function (line) {
    if(caseCnt == null){
        index = 0;
        caseCnt = parseInt(line);
    } else if(caseCnt > index) {
        if(n == 0){
            n = parseInt(line);
            i = 0;
            activities = new Array(n);
            return;
        }
        if(i < n){
            let arr = line.split(' ');
            activities[i] = [0,0,0];
            activities[i][0] = parseInt(arr[0])
            activities[i][1] = parseInt(arr[1])
            activities[i][2] = i
            i += 1;
        }
        if(i == n){
            index += 1;
            proc(index,n,activities);
            n = 0;
            i = 0;
        }
    } else {
        process.exit();
    }
});