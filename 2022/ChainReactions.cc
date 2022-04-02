#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

#define MAX_VALUE 1000000000

int main(){
    int T,N;
    cin >> T;
    for(int t=1;t<=T;t++){
        cin >> N;
        vector<int> FV;
        FV.reserve(N);
        vector< vector<int> > PV;
        vector< int > NV;
        PV.resize(N);
        NV.reserve(N);
        for(int i=0;i<N;i++){
            int F;
            cin>>F;
            FV.push_back(F);
        }
        for(int i=0;i<N;i++){
            int P;
            cin>>P;
            NV.push_back(P);
            if(P > 0){
                PV[P-1].push_back(i);
            }
        }
        int result = 0;
        for(int i=N-1;i>=0;i--){ 
            if(PV[i].size() > 1){
                int minVal = MAX_VALUE;
                int sum = 0;
                for (int j = 0;j < PV[i].size(); j++){
                    sum += FV[PV[i][j]];
                    if(minVal > FV[PV[i][j]]){
                        minVal = FV[PV[i][j]];
                    }
                }
                result += sum - minVal;
                FV[i] = max(minVal,FV[i]);
            }
            int next = NV[i];
            if(next == 0){
                result += FV[i];
            } else if(PV[next-1].size() == 1){
                FV[next-1] = max(FV[next-1],FV[i]);
            } 
        }
        cout<<"Case #"<<t<<": "<<result<<endl;
    }
    return 1;
}