const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const IMPOSSIBLE_TAB = {
    '2': [3],
    '3': [4,5,7,8]
}

function loop(num,max,n,size,ret){
    if(n == 0){
        if(num != 0){
            return false;
        }
        for(let b of ret){
            if(b == size - 1){
                return false;
            }
        }
        return true;
    }
    for(let i=Math.min(max,num);i>0;i--){
        if(num-i>=(n-1)){
            ret[i] += 1;
            if(loop(num-i,Math.min(max,i),n-1,size,ret)){
                return true;
            } 
            ret[i] -= 1;
        }
    }
    return false;
}
let size,matrix,flag;
function judge(row,col,num){
    if(flag[num-1][0][row]){
        return false;
    }
    if(flag[num-1][1][col]){
        return false;
    }
    return true;
}

function genMatrixDFS(row,col){
    if(col == size){
        row += 1;
    }
    if(row == size){
        return true;
    }
    if(matrix[row][col] == 0){
        for(let i = 1;i<size+1;i++){
            if(judge(row,col,i)){
                matrix[row][col] = i;
                flag[i-1][0][row] = 1;
                flag[i-1][1][col] = 1;
                let ret = genMatrixDFS(row,col+1)
                if(ret){
                    return true;
                }
                matrix[row][col] = 0;
                flag[i-1][0][row] = 0;
                flag[i-1][1][col] = 0;
            }
        }
        return false;
    } else {
        return genMatrixDFS(row,col+1)
    }
}

function genMatrix(eles){
    matrix = new Array(size);
    flag = new Array(size);
    
    for(let i=0;i<size;i++){
        matrix[i] = new Array(size);
        matrix[i].fill(0);
        flag[i] = new Array(2);
        flag[i][0] = new Array(size);
        flag[i][0].fill(0);
        flag[i][1] = new Array(size);
        flag[i][1].fill(0);
    }
    let matrixRow = 0;
    for(let i=1;i<=size;i++){
        if(eles[i] > 0){
            for(let j=0;j<eles[i];j++){
                const index = matrixRow + j;
                matrix[index][index] = i;
                flag[i-1][0][index] = 1;
                flag[i-1][1][index] = 1;
            }
            matrixRow += eles[i];
        }
    }
    genMatrixDFS(0,0);
    console.log(matrix);
}

function proc(index, n, k){
    if(IMPOSSIBLE_TAB[n]){
        if(IMPOSSIBLE_TAB[n].includes(k)){
            console.log('Case #%d: k %d IMPOSSIBLE',index,k);
            return;
        }
    } else {
        if(n+1 == k || n*n -1 == k){
            console.log('Case #%d: k %d IMPOSSIBLE',index,k);
            return;
        }
    }

    const eles = new Array(n+1);
    eles.fill(0);
    const ret = loop(k,n,n,n,eles);
    if(!ret){
        console.log('Case #%d: k %d IMPOSSIBLE',index,k);
    } else {
        console.log('Case #%d: k %d POSSIBLE',index,k);
        // gen matrix
        //size = n;
        // genMatrix(eles);
        let str = '';
        for(let i = 1;i<=n;i++){
            if(eles[i] > 0){
                str += (i+' ').repeat(eles[i])
            }
        }
        console.log(str);
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
        let arr = line.split(' ');
        proc(index,parseInt(arr[0]),parseInt(arr[1]));
    } else {
        process.exit();
    }
});


for(let i=2;i<10;i++){
    for(let j = i;j<i*i+1;j++){
        proc(i,i,j);
    }
}