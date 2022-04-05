#include<iostream>
#include<vector>
#include<cstdlib>

using namespace std;

void proc(int N,int K){
    vector<int> rooms;
    rooms.resize(N,-1);
    
    int R,P;
    cin >> R >> P;
    rooms[R-1] = P;

    if(K > N){
        K = N;
    }
    K = K / 2;
    long totalPassages = 0;
    int totalRoom = 0;
    while(K -- ){
        int randIndex = -1;
        int randTimes = 0;
        while(randIndex == -1 && randTimes < N){
            randIndex = rand() % N;
            if(rooms[randIndex] == -1){
                break;
            } else {
                randIndex = -1;
            }
            randTimes ++ ;
        }
        if(randIndex == -1){
            break;
        }

        cout<<"T "<<randIndex+1<<endl;

        cin >> R >> P;
        if(rooms[R-1] == -1){
            rooms[R-1] = P;
            totalPassages += P;
            totalRoom ++;
        }
        
        cout<<"W"<<endl;
        cin >> R >> P;
        if(rooms[R-1] == -1){
            rooms[R-1] = P;
            //totalPassages += P;
            //totalRoom ++;
        }
    }
    double avgPassages = totalPassages * 1.0 / totalRoom;

    double resultPassages = 0.0;
    for(int i=0;i<rooms.size();i++){
        if(rooms[i] != -1){
            resultPassages += rooms[i];
        } else {
            resultPassages += avgPassages;
        }
    }
    
        
    cout << "E " <<(long)(resultPassages/2)<<endl;
    return;
}

int main(){
    int T;
    cin >> T;
    while(T--){
        int N,K;
        cin >> N >> K;
        proc(N,K);
    }
    return 0;
}