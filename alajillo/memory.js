function memory() {
  return [1, 2, 3, 4, 5]; // 5kb
}
const foo = {
  bar1: memory(), //5kb
  bar2: memory(), //5kb
};

function clickEvent() {
  console.log(foo.bar1[0]); // 10kb
}

const one = document.getElementById("one");
// const two = document.getElementById("two");

const ca = () => {
  const two = document.getElementById("two");
  two.remove();
  console.log("제거");
  one.removeEventListener("click", ca);
};
one.addEventListener("click", ca);

// 전역 변수로 선언된 two는 삭제된 이후에도 메모리에 남아서 메모리 누수가 발생
// 해결하기 위해서는 two 변수를 콜백함수 내부에서 정의
// 실행한뒤에는 제거하는 것이 메모리에 좋음

//1. function params memory leak

function someLargeArray() {
  return new Array(1000000);
}

const exampleObject = {
  prop1: someLargeArray(),
  pro2: someLargeArray(),
};

function printProperty(prop) {
  console.log(prop.prop1);
}

printProperty(exampleObject);

//2 global variable memory leak
let RED = 0;
let GREEN = 1;
let BLUE = 2;
function redGreenBlueCount(arr) {
  const counter = new Array(3).fill(0);
  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    if (curr === RED) {
      counter[RED]++;
    } else if (curr === GREEN) {
      counter[GREEN]++;
    } else if (curr === BLUE) {
      counter[BLUE]++;
    }
  }
  return counter;
}

redGreenBlueCount([0, 1, 1, 1, 2, 2, 2, 2]);

//3. Dom memory leak
const one = document.getElementById("one");
const two = document.getElementById("two");

one.addEventListener("hover", () => {
  two.remove();
});

two.addEventListener("hover", () => {
  one.remove();
});
