/*
## dp 규칙
- 동적프로그래밍은 재계산을 피하기 위해 이미 계산된 값들을 저장하고 해당 값들을 사용하는 방법.
- 중복 부분 문제와 채적 부분 구조가 존재하는 문제에만 적용 가능
    - 중복 부분 문제 : 부분 문제의 해결책이 여러 번 중복되어 사용되는 경우 dp를 사용함
        - 부분 문제의 해결책을 해시테이블의 배열, 행렬에 저장함(메모이제이션)
    - 최적 부분 구조 : 문제의 최적의 해결책이 부분 문제들의 최적의 해결책들을 포함하는 구조
*/


// n걸음 수를 채우는 방법
const waysToCoverSteps = (step) => {
    if (step < 0) return 0;

    if (step === 0) return 1;

    return waysToCoverSteps(step - 1) + waysToCoverSteps(step - 2) + waysToCoverSteps(step - 3);
}

const waysToCoverStepsDP = (step) => {
    let cache = {};

    if (step < 0) return 0;
    if (step === 0) return 1;

    if (cache[step]) {
        return cache[step];
    } else {
        cache[step] = waysToCoverStepsDP(step - 1) + waysToCoverSteps(step - 2) + waysToCoverSteps(step - 3);

        return cache[step];
    }
}


// 동전 교환 알고리즘
// S: 동전 종류, M: 동전 종류의 개수, N: 목표로 하는 금액
// N을 만들기 위해 필요한 동전의 최소 개수
let n = 3;
let coins = [1, 2, 5];
let target = 15;
 
console.log(solution(n, coins, target));
 
function solution(n, coins, target){
  // 큰 수로 초기화
  let dp = Array.from({length: target + 1}, () => 1000);

  // 0원을 거슬러 주는 경우의 수
  dp[0]=0;
 
  for (let i = 0; i < n; i++){
    for (let j = coins[i]; j <= target; j++){
      dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
    }
  }
  return dp[target];
}
