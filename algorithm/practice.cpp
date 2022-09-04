#include <iostream>
#include <vector>
#include<algorithm>
#include<queue>
using namespace std;
int arr[100003];
int arr2[100003];
int main() {

    //freopen_s(new FILE*, "exam.txt", "r", stdin);
    
    int N;
    cin >> N;

    for (int i = 1; i < N+1; i++) {
        cin >> arr[i];
    }
    for (int i = 1; i < N + 1; i++) {
        arr2[i] = arr2[i - 1] + arr[i];
    }

    //right
    int maxx = 0;
    for (int i = 1; i <= N - 2; i++) {
        int g = (arr2[N] - arr2[i + 1]) * 2 + (arr2[i] - arr[1]);
        maxx = max(g, maxx);
    }

    //mid
    for (int i = 2; i <= N - 2; i++) {
        int t = arr2[N - 2] - arr[1] + arr[i];
        maxx = max(t, maxx);
    }

    //left
    for (int i = N - 2; i >= 1; i--) {
        int k = arr2[i] * 2 + (arr2[N - 1] - arr2[i + 1]);
        maxx = max(k, maxx);
    }

    cout << maxx;
}