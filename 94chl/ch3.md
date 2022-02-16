# 자바스크립트 숫자

## 숫자 체계

64비트 부동소수점 체계를 사용
![](https://images.velog.io/images/94chl/post/45229fbb-c322-48a4-88b1-23bafe344dd7/image.png)

### 계산법

![](https://images.velog.io/images/94chl/post/6f413d8e-3a39-4474-8fc6-c42349869e0a/image.png)

- 부호(sign): 음수 판별(1일 경우 음수)
- 지수(e)
- 소수(i): 분수값

### 반올림 오류

십진분수로 인해 부동소수점 체계에서 나타나는 반올림 오류
-> 이진 표기법으로 십진수를 표현할 때 무한 개의 수가 필요한 경우 발생

## 숫자 객체 Number

정수 반올림
자바스크립트는 모든 숫자에서 부동소수점을 사용(정수, 실수 구분이 없음)
-> 필요에 따라 적절한 `Number` 객체 메서드 사용

- 내림 : `Math.floor`
- 올림 : `Math.ceil`
- 반올림 : `Math.round`

## Number.EPSILON

표현 가능한 숫자 중 가장 작은 값
-> 2.220446049250313e-16
-> 2^(-52)
부동소수점 근사치를 활용해 분수가 제대로 표현되지 않는 부분을 체크하는데 유용

## 최대치, 최소치

- 최대 정수: `Number.MAX_SAFE_INTEGER`
  -> 부동소수점과 조합 시 정상 동작X
- 최대 부동소수점: `Number.MAX_VALUE`
- 최소 정수: `Number.MIN_SAFE_INTEGER`
  -> -9007199254740991
  -> 부동소수점과 조합 시 정상 동작X
- 최소 부동소수점: `Number.MIN_VALUE`
  -> 5e-324
  -> 최소 부동소수점은 음수가 아니다
- 무한: `Infinity`, `-Infinity`
  -> 최대(소) 정수보다 크(작)다

=> `-Infinity` < `Number.MIN_SAFE_INTEGER` < `0` < `Number.MIN_VALUE` < `Number.MAX_SAFE_INTEGER` < `Number.MAX_VALUE` < `Infinity`

## 숫자 알고리즘

### 소수 판별법

```js
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i = i + 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}
```

2와 3을 제외하고는 모든 소수는 `6k±1`
n의 제곱근이 소수가 아니면 n은 소수가 아님(수학적 정의)

### 범위 내 소수 찾기

**에라토스테네스의 체**
-> 1~n에서 소수를 제외한 √n 보다 작은 수의 배수를 지운다

```js
function solution(n) {
  let answer = 0;
  let arr = Array(n + 1)
    .fill(0)
    .map((_, index) => index);

  arr[0] = false;
  arr[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (arr[i]) {
      for (let j = i * i; j <= n; j += i) {
        arr[j] = false;
      }
    }
  }

  return arr.filter((e) => e).length;
}
```

### 소인수분해

```js
function primeFactors(n) {
  // 짝수 제거
  while (n % 2 === 0) {
    console.log(2);
    n = n / 2;
  }
  // 홀수이므로 i+=2 성립, 소수이므로 제곱근 탐색
  for (let i = 3; i * i <= n; i += 2) {
    while (n % i === 0) {
      console.log(i);
      n = n / i;
    }
  }
  // n>2의 소수를 위한 조건문
  if (n > 2) {
    console.log(n);
  }
}
```

### 난수 생성

`Math.random()` : 0~1 사이의 부동소수점 반환
