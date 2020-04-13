#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <math.h>

#define MIN(a,b) (((a)<(b))?(a):(b))
#define MAX(a,b) (((a)>(b))?(a):(b))

int findTrace(int num,int max,int n, int size,char *ret){
    int i;
    if(n == 0){
        if(num != 0){
            return 0;
        }
        for(i=0;i<size;i++){
            if(ret[i] == size - 1){
                return 0;
            } 
        }
        return 1;
    }
    for(i=MIN(max,num);i>0;i--){
        if(num-i>=(n-1)){
            ret[i-1] += 1;
            if(findTrace(num-i,MIN(max,i),n-1,size,ret)){
                return 1;
            } 
            ret[i-1] -= 1;
        }
    }
    return 0;
}

int judge(int row,int col,int size, int num,char *flag){
    if(flag[(num-1) * size * 2 + 2 * row]){
        return 0;
    }
    if(flag[(num-1) * size * 2 + 2 * col + 1]){
        return 0;
    }
    return 1;
}

int genMatrixDFS(int row,int col, int size, char *matrix, char *flag){
    int i;
    if(col == size){
        col = 0;
        row += 1;
    }
    if(row == size){
        return 1;
    }
    if(matrix[row*size+col] == 0){
        for(i = size;i>0;i--){
            if(judge(row,col,size,i,flag)){
                matrix[row*size+col] = i;
                flag[(i-1)*2*size + 2*row] = 1;
                flag[(i-1)*2*size + 2*col + 1] = 1;
                if(genMatrixDFS(row,col+1,size,matrix,flag)){
                    return 1;
                }
                matrix[row*size+col] = 0;
                flag[(i-1)*2*size + 2*row] = 0;
                flag[(i-1)*2*size + 2*col + 1] = 0;
            }
        }
        return 0;
    } else {
        return genMatrixDFS(row,col+1,size,matrix,flag);
    }
}
int n;
int a[51][51] ;
int match[51] ;
char vis[51] ;
char used[51][51] ;
int dfs(int x)
{
	int i , j ;
	for(i = 1 ; i <= n ; i ++)
	{
		if(!used[x][i] && !vis[i])
		{
			vis[i] = 1 ;
			if(match[i] == -1 || dfs(match[i]))
			{
				match[i] = x ;
				return 1 ;
			}
		}
	}
	return 0 ;
}


void genMatrix(char * eles,int size){
    int i,j;
    int matrixRow = 1;
    n = size;
    memset(used , 0 , sizeof(used));
    memset(a,0,sizeof(a));
    for(i=0;i<size;i++){
        if(eles[i] > 0){
            for(j=0;j<eles[i];j++){
                int index = matrixRow + j;
                a[index][index] = i+1;
                used[index][i+1] = 1;
            }
            matrixRow += eles[i];
        }
    }
    /*
    for(i=1;i<=n;i++){
        a[1][i] = i;
        used[i][i] = 1;
    }*/


    for(i = n ; i > 0 ; i --)
	{
		int ans = 0 ;
        int first = a[i][i];
		memset(match , -1 , sizeof(match)) ;
        match[first] = i; 
		for(j = 1 ; j <= n ; j ++)
		{
            if(j == i){
                ans ++ ;
                continue;
            }
            memset(vis , 0 , sizeof(vis)) ;
            if(dfs(j))
                ans ++ ;	
		}
		if(ans < n)
	    {
	    	printf("sorry %d %d!!\n",ans,i);
	    	break ;
		}
		for(j = 1 ; j <= n ; j ++)
		  a[i][match[j]] = j ;
		for(j = 1 ; j <= n ; j ++)
		   used[j][a[i][j]] = 1 ;	
	}

    for(i=1;i<=n;i++){
        for(j=1;j<=n;j++){
            printf("%d ",a[i][j]);
        }
         printf("\n");
    }
}

void proc(int index,int n, int k){
    int ret = 1;
    char * eles;
    if(n == 3){
        if(k != 6 && k >=4 && k <= 8){
            ret = 0;
        }
    } else {
        if(n+1 == k || n*n - 1 == k){
            ret = 0;
        }
    }
    if(ret == 0){
        printf("Case #%d: IMPOSSIBLE\n",index);
        return;
    }
    printf("Case #%d: POSSIBLE\n",index);
    eles = (char *)malloc(n);
    memset(eles,0,n);
    findTrace(k,n,n,n,eles);
    genMatrix(eles,n);
    free(eles);
}

int main(){
    int T=0;
    int i;
    setvbuf(stdout, NULL, _IONBF, 0);
    setvbuf(stdin, NULL, _IONBF, 0);
    scanf("%d",&T);
    for(i = 0;i<T;i++){
        int n,k;
        scanf("%d%d",&n,&k);
        proc(i+1,n,k);
    }
    return 0;
}