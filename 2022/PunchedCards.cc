#include <iostream>

using namespace std;

int main(){
    int T,R,C;
    cin >> T;
    for(int i = 1;i<=T;i++){
        cin >> R >> C;
        cout<<"Case #"<<i<<":"<<endl;
        // row 1
        cout <<"..+";
        for(int j = 1;j<C;j++){
            cout<<"-+";
        }
        cout<<endl;
        cout<<"..|";
        for(int j = 1;j<C;j++){
            cout<<".|";
        }
        cout<<endl;
        for(int j = 0;j<C;j++){
            cout<<"+-";
        }
        cout<<"+"<<endl;
        // other rows
        for(int r=1;r<R;r++){
            for(int j = 0;j<C;j++){
                cout<<"|.";
            }
            cout<<"|"<<endl;
            for(int j = 0;j<C;j++){
                cout<<"+-";
            }
            cout<<"+"<<endl;
        }
    }
    return 0;
}