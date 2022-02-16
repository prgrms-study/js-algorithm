function sthg(n) {
  for (let i = 0; o < n * 1000; i++) {
    for (let j = 0; j < n * 20; j++) {
      console.log(i + j);
    }
  }
}
/**
 * n*1000번을 각각 n*20번씩 순회
 * 20000n^2
 * O(n^2)
 */

function sthg2(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        for (let l = 0; l < 10; l++) {
          console.log(i + j + k + l);
        }
      }
    }
  }
}
/**
 * n * n * n * 10 -> 10n^3 -> O(n^3)
 */

function sthg3(n) {
  for (let i = 0; i < 1000; i++) {
    console.log("hi");
  }
}
// n의 크기와 상관없이 항상 1000 -> O(1)

function sthg4(n) {
  for (let i = 0; i < n; i = i * 2) {
    console.log(n);
  }
}
// O(1)

function sthg5(n) {
  for (let i = 1; i < n; i = i * 2) {
    console.log(n);
  }
}
// O(logn)

function sthg6(n) {
  while (true) {
    console.log(n);
  }
}
// O(inifity)
