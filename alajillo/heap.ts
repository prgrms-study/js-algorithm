class Heap {
  items: number[];
  constructor() {
    this.items = [];
  }
  swap(index1: number, index2: number) {
    const temp = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = temp;
  }
  parentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }
  leftChildIndex(index: number) {
    return index * 2 + 1;
  }
  rightChildIndex(index: number) {
    return index * 2 + 2;
  }
  parent(index: number) {
    return this.items[this.parentIndex(index)];
  }
  leftChild(index: number) {
    return this.items[this.leftChildIndex(index)];
  }
  rightChild(index: number) {
    return this.items[this.rightChildIndex(index)];
  }
  peak() {
    return this.items[0];
  }
  size() {
    return this.items.length;
  }
}

class MinHeap extends Heap {
  constructor() {
    super();
  }
  bubbleDown() {
    let index = 0;
    while (
      (this.leftChild(index) && this.leftChild(index) < this.items[index]) ||
      this.rightChild(index) < this.items[index]
    ) {
      let smallerIndex = this.leftChildIndex(index);
      if (
        this.rightChild(index) &&
        this.rightChild(index) < this.items[smallerIndex]
      ) {
        smallerIndex = this.rightChildIndex(index);
      }
      this.swap(smallerIndex, index);
      index = smallerIndex;
    }
  }
  bubbleUp() {
    let index = this.items.length - 1;
    while (this.parent(index) && this.parent(index) > this.items[index]) {
      this.swap(this.parentIndex(index), index);
      index = this.parentIndex(index);
    }
  }
  add(item: number) {
    this.items[this.items.length] = item;
    this.bubbleUp();
  }
  poll() {
    const item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
  }
}
const minHeap = new MinHeap();

minHeap.add(1);
minHeap.add(10);
minHeap.add(5);
minHeap.add(100);
minHeap.add(8);

console.log(minHeap.poll());
console.log(minHeap.poll());
console.log(minHeap.poll());
console.log(minHeap.poll());
console.log(minHeap.poll());

class MaxHeap extends Heap {
  constructor() {
    super();
  }
  bubbleDown() {
    let index = 0;
    while (
      (this.leftChild(index) && this.leftChild(index) > this.items[index]) ||
      this.rightChild(index) > this.items[index]
    ) {
      let smallerIndex = this.leftChildIndex(index);
      if (
        this.rightChild(index) &&
        this.rightChild(index) > this.items[smallerIndex]
      ) {
        smallerIndex = this.rightChildIndex(index);
      }
      this.swap(smallerIndex, index);
      index = smallerIndex;
    }
  }
  bubbleUp() {
    let index = this.items.length - 1;
    while (this.parent(index) && this.parent(index) < this.items[index]) {
      this.swap(this.parentIndex(index), index);
      index = this.parentIndex(index);
    }
  }
  add(item: number) {
    this.items[this.items.length] = item;
    this.bubbleUp();
  }
  poll() {
    const item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
  }
}

const max = new MaxHeap();

function sortIncrease(arr: number[]): number[] {
  const minHeap = new MinHeap();
  const sortedArray = [];
  arr.forEach((item: number) => {
    minHeap.add(item);
  });
  while (true) {
    const item = minHeap.poll();
    if (!item) break;
    sortedArray.push(item);
  }
  return sortedArray;
}
function sortDecrease(arr: number[]): number[] {
  const maxHeap = new MaxHeap();
  const sortedArray = [];
  arr.forEach((item: number) => {
    maxHeap.add(item);
  });
  while (true) {
    const item = maxHeap.poll();
    if (!item) break;
    sortedArray.push(item);
  }
  return sortedArray;
}

function findMiddle(arr: number[]) {
  return sortDecrease(arr)[Math.floor(arr.length / 2)];
}
function findNthBig(arr: number[], n: number) {
  return sortDecrease(arr)[n];
}
function findNthSmall(arr: number[], n: number) {
  return sortIncrease(arr)[n];
}
console.log(sortIncrease([4, 5, 2, 3]));
console.log(sortDecrease([4, 5, 2, 3]));
console.log(findMiddle([1, 2, 3, 4, 5]));
console.log(findNthBig([1, 2, 3, 4, 5], 1));
console.log(findNthSmall([1, 2, 3, 4, 5], 1));
