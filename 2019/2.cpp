#include<iostream>
#include<map>
#include<vector>

using namespace std;

bool loop(int x,int y,vector<char> *s, const int size, const int index, map<int,int>* lydiaPath, int eNum, int sNum){
    if(x == size-1 && y == size-1){
        string str(s->begin(), s->end());
        cout << "Case #"<<index<<": "<<str<<endl;
        return true;
    }
    map<int,int>::iterator it = lydiaPath->find(x*size+y);
    int nextIndex = -1;
    if(it != lydiaPath->end()){
        nextIndex = it->second;
    }
    if(x < size-1 && nextIndex!= (x+1)*size+y && eNum < size-1){
        s->push_back('E');
        eNum ++;
        if(loop(x+1,y,s,size,index,lydiaPath,eNum,sNum)){
            return true;
        }
        eNum --;
        s->pop_back();
    }
    if(y < size-1 && nextIndex!= x*size+y+1 && sNum < size -1){
        s->push_back('S');
        sNum ++;
        if(loop(x,y+1,s,size,index,lydiaPath,eNum,sNum)){
            return true;
        }
        sNum --;
        s->pop_back();
    }
    return false;
}

void proc(int index,int size, string s){
    map<int,int> *lydiaPath = new map<int,int>();
    int x = 0;
    int y = 0;
    for(int i = 0;i<s.length();i++){
        int nextX = x;
        int nextY = y;
        if(s[i] == 'E'){
            nextX = x+1;
        } else {
            nextY = y+1;
        }
        lydiaPath->insert(pair<int,int>(x*size+y,nextX*size+nextY));
        x = nextX;
        y = nextY;
    }
    vector<char> *vec = new vector<char>(size*2-2);
    loop(0,0,vec,size,index,lydiaPath,0,0);
    delete lydiaPath;
    delete vec;
    
}

int test(){
    int size = 10000;
    char *chs = new char[2*size-1];
    chs[2*size-2] = '\0';
    srand(time(nullptr)); // 以当前时间为随机生成器的种子
    int eNum = 0;
    int sNum = 0;
    for(int i = 0; i< 2*size-2;i++){
        int random = rand() % 2;
        if(random == 0){
            if(eNum < size-1){
                chs[i] = 'E';
                eNum ++;
            } else {
                chs[i] = 'S';
                sNum ++;
            }
        } else{
            if(sNum < size-1){
                chs[i] = 'S';
                sNum ++;
            } else {
                chs[i] = 'E';
                eNum ++;
            }
        }
    }
    string *s = new string(chs);
    int start = time(nullptr);
    cout << "start:"<<start<<endl;
    proc(0,size,*s);
    int end = time(nullptr);
    cout << "end:"<<end<<endl;
    delete s;
    cout<< "Cost:"<<end-start<<"s"<<endl;
    return 0;
}

int main(){
    /*int t;
    cin >> t;
    for(int i=0;i<t;i++){
        int n;
        string s;
        cin >> n;
        cin >> s;
        proc(i+1,n,s);
    }*/
    test();
    return 0;
}