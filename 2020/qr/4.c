#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

//调试信息输出到以下文件
#define DEBUG_FILE "./debugmsg"
//调试信息的缓冲长度
#define DEBUG_BUFFER_MAX 4096
//将调试信息输出到文件中
#define printDebugMsg(format, ...) {\
    char buffer[DEBUG_BUFFER_MAX+1]={0};\
    snprintf( buffer, DEBUG_BUFFER_MAX \
            , format, ##__VA_ARGS__ );\
    FILE* fd = fopen(DEBUG_FILE, "a");\
    if ( fd != NULL ) {\
        fwrite( buffer, strlen(buffer), 1, fd );\
        fflush( fd );\
        fclose( fd );\
    }\
}

void complemented(char * bit, int bSize, int max){
    for(int i=0;i<max; i++){
        bit[i] = (bit[i] == '0')?'1':'0';
        bit[bSize - i - 1] = (bit[bSize - i - 1] == '0')?'1':'0';
    }
}



void revert(char * bit, int bSize, int max){
    for(int i=0;i<max; i++){
        char tmp = bit[i];
        bit[i] = bit[bSize - i - 1];
        bit[bSize - i - 1] = tmp;
    }
}

void revertAndComplemented(char * bit, int bSize, int max){
    for(int i=0;i<max; i++){
        char tmp = (bit[i] == '0')?'1':'0';
        bit[i] = (bit[bSize - i - 1] == '0')?'1':'0';
        bit[bSize - i - 1] = tmp;
    }
}
char * testBit;
int queryNum = 0;

int testSize;

void test(int bSize){
    testBit = (char *)malloc(bSize+1);
    memset(testBit,0,bSize);
    testSize = bSize;
    srand(time(0)); 
    queryNum = 0;
    for(int i = 0;i<bSize;i++){
        if(rand() % 2){
            testBit[i] = '0';
        } else {
            testBit[i] = '1';
        }
    }
    printf("gen test %s\n",testBit);
}

void freeTest(){
    if(testBit){
        free(testBit);
        testBit = NULL;
    }
}

void randTest(){
    int randType = rand() % 4;
    if(randType == 1){
        complemented(testBit,testSize,testSize/2);
    } else if(randType == 2){
        revert(testBit,testSize,testSize/2);
    } else if(randType == 3){
        revertAndComplemented(testBit,testSize,testSize/2);
    }
    printf("test rand %d %s\n",randType,testBit);
}

char queryChar(pos){
    if(testBit != NULL){
        queryNum ++;
        if(queryNum % 10 ==1){
            randTest();
        }
        printf("index %d query %d result %c \n",queryNum, pos,testBit[pos-1]);
        return testBit[pos-1];
    } else {
        char answer;
        printf("%d\n",pos);
        // flush(stdout);
        scanf("\n%c",&answer);
        printDebugMsg("pos %d %c\n",pos,answer);
        return answer;
    }
}

int judgeRandType(char * bit,int bSize,int diffPos,int samePos){
    char answer1,answer2;
    if(diffPos == -1){
        diffPos = samePos;
    }
    if(samePos == -1){
        samePos = diffPos;
    }
    answer1 = queryChar(diffPos+1);
    answer2 = queryChar(samePos+1);

    // judge random
    if(bit[diffPos] != answer1){
        if(bit[samePos] != answer2){
            return 1; // complemented
        } else {
            return 2; // revert
        }
    } else {
        if(bit[samePos] != answer2){
            return 3;  //revert and complemented
        }
    }
    return 0;
}

int query(char *bit,int start,int end,int bSize){
    char answer;
    int realEnd;
    int i;
    int midSize = bSize/2;
    realEnd = end > midSize?midSize:end;
    for(i = start;i<realEnd; i++){
        bit[i] = queryChar(i+1);
        bit[bSize - i - 1] = queryChar(bSize - i);
    }
    for(i = realEnd;i<end;i++){
        queryChar(1);
        queryChar(1);
    }
    return realEnd - start;
}


int proc(int bSize){
    int queryNum = 0;
    int i,j,k;
    char result;
    int maxIndex = 0;
    int flagDiff = -1;
    int flagSame = -1;
    char *bit = (char *)malloc(bSize*sizeof(char) + 1);
    memset(bit, 0, bSize+1);

    maxIndex += query(bit,0,5,bSize);
    for(i = 0;i<14;i++){ // 14 round
        if(flagDiff == -1 || flagSame == -1){
            for(j=0;j<maxIndex;j++){
                if(bit[j] == bit[bSize - j - 1]){
                    flagSame = j;
                } else {
                    flagDiff = j;
                }
                if(flagSame != -1 && flagDiff != -1){
                    break;
                }
            }
        }

        int randType = judgeRandType(bit, bSize,flagDiff,flagSame);
        if(randType == 1){
            complemented(bit,bSize,maxIndex);
        } else if(randType == 2){
            revert(bit,bSize,maxIndex);
        } else if(randType == 3){
            revertAndComplemented(bit,bSize,maxIndex);
        }
        maxIndex += query(bit,maxIndex,maxIndex+4,bSize);
    }
    printf("%s\n",bit);
    scanf("\n%c",&result);
    free(bit);
    return result == 'Y';
}


int main(){
    int T=0;
    int B=0;
    int i = 0;
    setvbuf(stdout, NULL, _IONBF, 0);
    setvbuf(stdin, NULL, _IONBF, 0);
    scanf("%d%d",&T,&B);
    for(i = 0;i<T;i++){
        // test(B);
        int result = proc(B);
        // freeTest();
        if(result == 0){
            break;
        }
    }
    return 0;
}