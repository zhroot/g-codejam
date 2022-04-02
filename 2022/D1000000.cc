#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

int main(){
    int T,N,S;
    cin >> T;
    for(int t=1;t<=T;t++){
        cin >> N;
        vector<int> dices;
        dices.reserve(N);
        for(int i=0;i<N;i++){
            cin >> S;
            dices.push_back(S);
        }
        sort(dices.begin(), dices.end());
        
        int result = 0;
        for(int i=0;i<N;i++){
            if(result < dices[i]){
                result ++;
            }
        }
        cout<<"Case #"<<t<<": "<<result<<endl;
    }
}