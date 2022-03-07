// 재귀의 규칙
// 기저 조건
function countDownToZero(n) {
  if (n < 0) return;
  console.log(n);
  countDownToZero(n - 1);
}

// countDownToZero(10);

// 분할 정복 방식

// 피보나치 수열

//for문 이용
function getNthFibo(n) {
  if (n < -1) return n;
  let sum = 0;
  let last = 1;
  let lastlast = 0;

  for (let i = 0; i < n; i++) {
    sum = last + lastlast;
    lastlast = last;
    last = sum;
  }
  return sum;
}

// 재귀 활용
function getNthFiboRe(n) {
  if (n <= 1) return n;
  return getNthFibo(n - 1) + getNthFibo(n - 2);
}

// console.log(getNthFiboRe(10));

// 꼬리 재귀
function getNthFiboTail(n) {
  if (n <= 1) return;
  let sum = 0;
  let last = 1;
  let lastlast = 0;

  for (let i = 0; i < n; i++) {
    sum;
  }
}

function pascalTriangle(row, col) {
  if (col === 0) {
    return 1;
  } else if (row === 0) {
    console.log("not valid");
    return 0;
  } else {
    return pascalTriangle(row - 1, col) + pascalTriangle(row - 1, col - 1);
  }
}

console.log(pascalTriangle(5, 2));
// [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1]];
// 인덱스는 0부터 시작
// array[row][col]
// 51 각 내부 배열의 0번째 인덱스는 1이기 때문에 1반환
// 53 범위에 벗아난 값을 반환할 경우 0반환, 초기값을 이상하게 넣거나 끝부분에 있는 숫자들 예외 케이스 처리

// 점화식
function getNthFibo(n) {
  if (n <= 1) {
    return 1;
  } else {
    return getNthFibo(n - 1) + getNthFibo(n - 2);
  }
}
console.log(getNthFibo(2));
// (3)
// (2) + (1)
// (1) + (0) + 1
//

// 마스터 정리 스킵

// 재귀 호출 스택 메모리

function base10ToString(n) {
  let result = "";

  function Base10ToStringHeler(n) {
    if (n < 2) {
      result += n;
      return;
    } else {
      Base10ToStringHeler(Math.floor(n / 2));
      Base10ToStringHeler(n % 2);
    }
  }
  Base10ToStringHeler(n);
  return result;
}

console.log("base10ToString : ", base10ToString(8));
// (8)
// (4)(0)
// (2)(0)(0)
// (1)(0)(0)(0)
// 1000
