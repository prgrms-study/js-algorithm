# 배열의 내장 기능

## 삽입

```tsx
const array = [1];

array.push(2); // 뒤에 추가 할때
array.unshift(0); // 앞에 추가 할때
console.log(array); // [0,1,2]
```

## 삭제

```tsx
const array = [1, 2, 3, 4];

array.pop(); // 뒤에서 삭제 할때
array.shift(); // 앞에서 삭제 할때
console.log(array); // [2,3]
```

## 접근

```tsx
const array3 = [1, 2, 3, 4, 5];

array[0]; // 배열의 첫번째 요소인 1
```

## 반복

```tsx
const array = [1, 2, 3, 4, 5];

for (let i = 0; i < array.length; i++) {
  // 변수 i를 증가시키면서 직접 접근할때
  console.log(array[i]);
}

for (let index in array) {
  // 배열에 인덱스를 반환받아서 접근할때
  console.log(array[index]);
}

for (let item of array) {
  // 배열의 아이템을 직접적으로 뽑아서 사용할때
  console.log(item);
}

array.forEach((item, index) => {
  // 내장 메서드인 forEach를 사용할때
  console.log(item, index);
});
```

## 도움 함수

### Array.slice(begin,end)

slice를 해도 기존 배열에는 영향이 없다.

```tsx
const array = [1, 2, 3, 4, 5];

const newArray = array.slice(0, 3); // 0번째(포함)부터 3번째(미포함)을 다른 배열로 반환

console.log(newArray); // [1,2,3]
```

### Array.splice(begin,size,element1,element2,...)

splice는 기존 배열에 영향을 받는다.

```tsx
const array = [1, 2, 3, 4, 5];

array.splice(1, 1, 123); // 1번째(포함)부터 1개의 요소를 잘라내고 그 자리에 123을 삽입
console.log(array);
```

### Arrray.concat()

기존 배열에 영향 없음

```tsx
const array = [1, 2, 3, 4, 5];
const array2 = ["a", "b", "c"];

const newArray = array.concat(array2); // 뒤에 새로운 배열을 합친다.

console.log(newArray); // [1,2,3,4,5,"a", "b", "c"]
```

## 함수형 메서드

### Array.map

```tsx
const array = [1, 2, 3, 4, 5];

const newArray = array.map((item) => {
  // forEach와 동일하지만 다른점이 있다면 반환값으로 이루어진 새로운 배열을 반환한다.
  return item * 2;
});

console.log(newArray); //[ 2, 4, 6, 8, 10 ]
```

### Array.filter

```tsx
const array = [1, 2, 3, 4, 5];

const newArray = array.filter((item) => {
  // forEach와 동일하지만 true가 반환될때만 해당 아이템을 배열에 포함시킨다.
  return item % 2;
});

console.log(newArray); // [1,3,5]
```

### Array.reduce

```tsx
const array = [1, 2, 3, 4, 5];

const newArray = array.reduce((prev, item) => {
  // 첫번째로 이전에 리턴받은 값이고 두번째는 배열의 아이템으로 중첩적으로 계산한뒤에 최종값을 반환한다.
  return prev + item;
}, 0); // 두번째 인자는 초기값

console.log(newArray); // 15
```
