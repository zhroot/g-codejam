#include <iostream>

using namespace std;

#define TARGET 1000000

int main(){
    int T;
    int Color[3][4];
    int Result[4];
    cin >> T;
    for(int t = 1;t<=T;t++){
        for(int r =0;r<3;r++){
            for(int c=0;c<4;c++){
                cin>>Color[r][c];
            }
        }
        for(int c=0;c<4;c++){
            Result[c] = TARGET;
            for(int r =0;r<3;r++){
                if(Result[c] > Color[r][c]){
                    Result[c] = Color[r][c];
                }
            }
        }
        int total = 0;
        for(int c=0;c<4;c++){
            total += Result[c];
        }
        cout<<"Case #"<<t<<":";
        if(total < TARGET){
            cout<<" IMPOSSIBLE"<<endl;
        } else {
            int diff = total - TARGET;
            for(int c=0;c<4;c++){
                if(Result[c] < diff){
                    diff -= Result[c];
                    Result[c] = 0;
                } else {
                    Result[c] -= diff;
                    diff = 0;
                }
                cout<<" "<<Result[c];
            }
            cout<<endl;
        }
    }
    return 0;
}