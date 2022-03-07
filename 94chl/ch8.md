# 재귀

자기자신을 호출하는 함수

## 재귀의 규칙

1. 기저조건 (종료조건)
2. 분할 정복 방식
   → 작은 문제로 분할하여 문제를 해결

## 대표예제

### 피보나치 수열

- 종료 조건: 첫번째 항목이 1일 경우
- 분할 정복: N = (n-1) + (n-2)

```js
function fibo(n, lastlast, last) {
  if (n == 1) return last;

  return fibo(n - 1, last, last + lastlast);
}
```

### 파스칼의 삼각형

- 종료 조건: 최상위 항목
- 분할 정복: 해당 수 위 쪽 수 2개의 합 → (row, col) = (row-1, col) + (row-1, col-1)

```js
function pascalT(row, col) {
  if (col == 0) return 1;
  if (row == 0) return 0;
  return pascalT(row - 1, col) + pascalT(row - 1, col - 1);
}
```

## 재귀의 빅오 분석

알고리즘이 어떤 식으로 반복되는지 점화식을 분석해야함

### 점화식

"종료조건에 대한 빅오" & "재귀 경우에 대한 빅오",
두 부분에 대한 분석으로 구성

### 마스터 정리

a>=1, b>=1
T(n) = aT(n/b) + O(n\*\*c)

a: 재귀 호출에 곱해지는 계수
b: 로그 항. 재귀 호출 시에 n을 나누는 항
c: 비재귀 구성 요소에 대한 다항식의 항

1. c < logb(a)인 경우, T(n) = O(n \*\* logb(a))

2. c == logb(a)인 경우, T(n) = O(n\**c*log(n))

3. c > logb(a)인 경우, T(n) = O(f(n))

## 재귀 호출 스택 메모리

재귀 호출은 종료 조건이 충족될때까지 메모리 차지
→ 추가적인 메모리 필요
