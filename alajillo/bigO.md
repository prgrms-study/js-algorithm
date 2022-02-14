# 빅오 표기법이란

알고리즘을 구현할때 얼마나 효율적인지를 나타내는 지표

# 빅오 표기법의 예시

## O(1)

```jsx
function test1(n) {
  return n;
}

function test2(n) {
  const result = [n];
  for (let i = 0; i < 1000000000000000000; i++) {
    result.push(i);
  }
  return reuslt;
}
```

알고리즘을 수행하는데 걸리는시간이 입력값에 상관없이 상수인 알고리즘을 표기할때는 O(1)으로 표기를 합니다.

test1의 경우에는 납득이 가지만 test2는 시간이 매우 오래걸리는 알고리즘이지만 입력된 값과 무관하게 일관적인 상수시간이 걸리기때문에 O(1)으로 표기됩니다.

## O(n)

```jsx
function makeArray(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(n);
  }
  return result;
}
```

알고리즘을 수행하는 걸리는 시간이 입력값에 따라 선형적으로 증가할때 O(n)으로 표기합니다. makeArray함수의 인자로 1을 넣게되면 test2함수보다 더 적은 시간이 걸리지만 빅오 표기법은 n의 값이 무한할때를 가정으로 표기하기 때문에 makeArray보다는 test2함수가 빅오 표기법에서는 더 효율적이라고 말합니다.

## O(n^2)

```jsx
function make2DArray(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    const innerArray = [];
    for (let j = 0; j < n; j++) {
      innerArray.push(j);
    }
    result.push(innerArray);
  }
  return result;
}
```

반복문이 두개가 중첩되어 있기 때문에 n이 늘어난만큼 제곱으로 늘어나는 알고리즘을 O(n^2)으로 표기합니다.

## O(logN)

```jsx
function logTest(n) {
  const result = [];
  for (let i = 2; i <= n; i = i * 2) {
    result.push(i);
  }
  return result;
}

const result = logTest(10000000);
console.log(result.length); // 23
```

O(log N)의 경우에는 n의 값이 크더라도 log값을 취하기 때문에 시간복잡도가 완만하게 증가합니다.

# 빅오 표기법 규칙

## 계수 법칙

어떤 알고리즘이 있을때 시간 복잡도가 O(n)이라고 할때 해당 알고리즘의 상수 k배만큼 더 걸리는 알고리즘이
있다고 했을때 n의 값이 무한히 클 경우 k의 값은 시간 복잡도에 큰 영향을 끼치지 않기 때문에 상수를 제거하고
두 알고리즘 모두 O(n)만큼의 시간복잡도가 걸립니다..

물리학에서도 이런 계수 법칙이 존재하는데 구글에 ‘지구의 질량’이라고 검색하면 5.972 × 10^24kg 라고 나옵니다.그럼 우주로 부터 운석이 날라와서 질량이 증가하고 우주선을 쏘아서 질량이 감소하는 이런 것들도 감안한 것일까요? 아닙니다 그런 미미한 질량은 지구의 궤적을 계산할때 미묘한 오차를 발생시키기때문에 무시합니다.

```jsx
function a(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}

function b(n) {
  //5배 더 시간이 소요되지만 동일한 O(n)으로 표기된다.
  for (let i = 0; i < 5; i++) {
    a(i);
  }
}
```

## 합의 법칙

두개의 다른 알고리즘을 포함하는 알고리즘이 있을때 합쳐진 알고리즘의 시간 복잡도는 두개의 알고리즘의 시간복잡도를 합친 결과와 같습니다.

```jsx
function a(n) {
  // O(n)
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}
function b(n) {
  // O(n)
  let max = 5000;
  for (let i = 0; i < n; i++) {
    max = max - i;
  }
  if (max > 0) return true;
  return false;
}
function c(n) {
  // O(n+n) -> O(2n) --계수법칙 적용 --> O(n)
  const resultA = a(n);
  const resultB = b(n);
  return [resultA, resultB];
}
```

## 곱의 법칙 & 다항 법칙

for문이 중첩될때마다 각각의 logic에서 걸리는 시간복잡도를 각각 곱한 결과가 나온다.

```jsx
function g(n) {
  for (let i = 0; i < n; i++) {
    // 해당 for문의 시간복잡도 O(n)
    for (let j = 0; j < n + 1; j++) {
      // 해당 for문의 시간복잡도 O(n+1)
      for (let k = 0; k < n * 6; k++) {
        // 해당 for문의 시간복잡도 O(6n)
        // some logic
      }
    }
  }
}
// O(n *(n+1) *(6n)) --> O(n * (n) * n) ---> O(n^3)
```
