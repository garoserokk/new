#include <iostream>
#include <vector>
#include<algorithm>
using namespace std;
int N, R;
int arr[1000000];
int DAT[1000000];
vector<int>v;
int check(int i) {
    for (int g = 0; g < 1000000;g++) {
        DAT[g] = 0;
    }
    for (int k = i - R; k <= i + R; k++) {
        DAT[v[k]]++;
        if (DAT[v[k]] >= 3)return 1;
    }

    return 0;
}
void init() {

    for (int i = 0; i < 1000000; i++) {
        arr[i] = 0;
    }
}
int main() {

    //freopen_s(new FILE*, "exam.txt", "r", stdin);

    int T;
    cin >> T;


    for (int cas = 1; cas < T + 1; cas++) {

        cin >> N >> R;

        init();
        v.clear();
        for (int i = 0; i < N; i++) {
            cin >> arr[i];
        }

        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < N; j++) {
                v.push_back(arr[j]);
            }
        }
        int maxi = -5;
        for (int i = R; i < N + R; i++) {
            int ret = check(i);
            maxi = max(ret, maxi);
        }

        if (maxi == 1) {
            cout << "#" << cas << " " << "NO" << "\n";
        }
        else {
            cout << "#" << cas << " " << "YES" << "\n";
        }

    }


}