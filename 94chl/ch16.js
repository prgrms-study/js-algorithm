function Heap() {
  this.items = [];
}

Heap.prototype.swap = function (idx1, idx2) {
  let temp = this.items[idx1];
  this.items[idx1] = this.items[idx2];
  this.items[idx2] = temp;
};

Heap.prototype.parentIndex = function (idx) {
  return Math.floor((idx - 1) / 2);
};

Heap.prototype.leftChildIndex = function (idx) {
  return idx * 2 + 1;
};

Heap.prototype.rightChildIndex = function (idx) {
  return idx * 2 + 2;
};

Heap.prototype.parent = function (idx) {
  return this.items[this.parentIndex(idx)];
};

Heap.prototype.leftChild = function (idx) {
  return this.items[this.leftChildIndex(idx)];
};

Heap.prototype.rightChild = function (idx) {
  return this.items[this.rightChildIndex(idx)];
};

Heap.prototype.peek = function () {
  return this.items[0];
};

Heap.prototype.size = function () {
  return this.items.length;
};

function MinHeap() {
  this.items = [];
}

MinHeap.prototype = Object.create(Heap.prototype);

MinHeap.prototype.add = function (item) {
  this.items[this.items.length] = item;
  this.bubbleUp();
};

MinHeap.prototype.poll = function () {
  let item = this.items[0];
  this.items[0] = this.items[this.items.length - 1];

  this.items.pop();

  this.bubbleDown(item);
  return item;
};

MinHeap.prototype.bubbleUp = function () {
  let idx = this.items.length - 1;

  while (this.parent(idx) && this.parent(idx) > this.items[idx]) {
    this.swap(this.parentIndex(idx), idx);
    idx = this.parentIndex(idx);
  }
};

MinHeap.prototype.bubbleDown = function () {
  let idx = 0;

  while (this.leftChild(idx) && this.leftChild(idx) < this.items[idx]) {
    let smallerIdx = this.leftChildIndex(idx);
    if (this.rightChild(idx) && this.rightChild(idx) < this.items[smallerIdx]) {
      smallerIdx = this.rightChildIndex(idx);
    }

    this.swap(smallerIdx, idx);
    idx = smallerIdx;
  }
};

function MaxHeap() {
  this.items = [];
}

MaxHeap.prototype = Object.create(Heap.prototype);

MaxHeap.prototype.add = function (item) {
  this.items[this.items.length] = item;
  this.bubbleUp();
};

MaxHeap.prototype.poll = function () {
  let item = this.items[0];
  this.items[0] = this.items[this.items.length - 1];

  this.items.pop();
  this.bubbleDown();
  return item;
};

MaxHeap.prototype.bubbleUp = function () {
  let idx = this.items.length - 1;
  while (this.parent(idx) && this.parent(idx) < this.items[idx]) {
    this.swap(this.parentIndex(idx), idx);
    idx = this.parentIndex(idx);
  }
};

MaxHeap.prototype.bubbleDown = function () {
  let idx = 0;

  while (this.leftChild(idx) && this.leftChild(idx) > this.items[idx]) {
    let smallerIdx = this.leftChildIndex(idx);
    if (this.rightChild(idx) && this.rightChild(idx) > this.items[smallerIdx]) {
      smallerIdx = this.rightChildIndex(idx);
    }

    this.swap(smallerIdx, idx);
    idx = smallerIdx;
  }
};

const minHeap1 = new MinHeap();
minHeap1.add(12);
console.log([...minHeap1.items]);
minHeap1.add(2);
console.log([...minHeap1.items]);
minHeap1.add(23);
console.log([...minHeap1.items]);
minHeap1.add(4);
console.log([...minHeap1.items]);
minHeap1.add(13);
console.log([...minHeap1.items]);

while (minHeap1.items.length) {
  console.log(minHeap1.poll());
}

const maxHeap1 = new MaxHeap();
maxHeap1.add(12);
console.log([...maxHeap1.items]);
maxHeap1.add(2);
console.log([...maxHeap1.items]);
maxHeap1.add(23);
console.log([...maxHeap1.items]);
maxHeap1.add(4);
console.log([...maxHeap1.items]);
maxHeap1.add(13);
console.log([...maxHeap1.items]);

while (maxHeap1.items.length) {
  console.log(maxHeap1.poll());
}

function MedianHeap() {
  this.minHeap = new MinHeap();
  this.maxHeap = new MaxHeap();
}

MedianHeap.prototype.add = function (value) {
  if (value > this.median()) {
    this.minHeap.add(value);
  } else {
    this.maxHeap.add(value);
  }

  if (this.minHeap.size() - this.maxHeap.size() > 1) {
    this.maxHeap.add(this.minHeap.poll());
  }

  if (this.maxHeap.size() - this.minHeap.size() > 1) {
    this.minHeap.add(this.maxHeap.poll());
  }
};

MedianHeap.prototype.median = function () {
  if (this.minHeap.size() === 0 && this.maxHeap.size() === 0) {
    return Number.NEGATIVE_INFINITY;
  } else if (this.minHeap.size() === this.maxHeap.size()) {
    return (this.minHeap.peek() + this.maxHeap.peek()) / 2;
  } else if (this.maxHeap.size() > this.maxHeap.size()) {
    return this.minHeap.peek();
  } else {
    return this.maxHeap.peek();
  }
};

const medianHeap = new MedianHeap();

medianHeap.add(12);
console.log(medianHeap.median());
medianHeap.add(2);
console.log(medianHeap.median());
medianHeap.add(23);
console.log(medianHeap.median());
medianHeap.add(13);
console.log(medianHeap.median());

const test2 = [12, 3, 13, 4, 2, 40, 23];

function getKthSmall(arr, k) {
  const minH = new MinHeap();
  for (let i = 0; i < arr.length; i++) {
    minH.add(arr[i]);
  }
  for (let i = 1; i < k; i++) {
    minH.poll();
  }
  return minH.poll();
}

console.log(getKthSmall(test2, 2));
console.log(getKthSmall(test2, 1));
console.log(getKthSmall(test2, 7));

function getKthBig(arr, k) {
  const maxH = new MaxHeap();
  for (let i = 0; i < arr.length; i++) {
    maxH.add(arr[i]);
  }
  for (let i = 1; i < k; i++) {
    maxH.poll();
  }
  return maxH.poll();
}

console.log(getKthBig(test2, 2));
console.log(getKthBig(test2, 1));
console.log(getKthBig(test2, 7));
