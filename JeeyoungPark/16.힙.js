// 힙
// 트리와 비슷한 자료구조, 자식에 대한 포인터를 갖는 대신에 배열로 저장 -> 자식의 인덱스를 쉽게 계산
// 다양한 힙이 있지만, 이진 힙만 다룰 것임.


// 힙 클래스 정의
class Heap {
    constructor() {
        this.items = [];
    }

    swap = (index1, index2) => {
        let temp = this.items[index1];
        this.items[index1] = this.items[index2];
        this.items[index2] = temp;
    }

    parentIndex = (currentIndex) => {
        return Math.floor((currentIndex - 1) / 2);
    }

    leftChildIndex = (currentIndex) => {
        return currentIndex * 2 + 1;
    }

    rightChildIndex = (currentIndex) => {
        return currentIndex * 2 + 2;
    }

    parent = (currentIndex) => {
        return this.items[this.parentIndex(currentIndex)];
    }

    leftChild = (currentIndex) => {
        return this.items[this.leftChildIndex(currentIndex)];
    }

    rightChild = (currentIndex) => {
        return this.items[this.rightChildIndex(currentIndex)];
    }

    // 최대힙 -> 최대갑 반환
    // 최소힙 -> 최소값 반환
    peek = () => {
        return this.items[0];
    }

    size = () => {
        return this.items.length;
    }
}


// 삼투
// 항목을 삽입/삭제할 때 위 아래로의 노드가 이동하며 힙의 구조를 유지하는 것


// 삼투 구현하기 - 최소힙
class MinHeap extends Heap {
    add = (item) => {
        this.items[this.items.length] = item;
        this.bubbleUp();
        
        console.log('heap:', this.items)
    }

    // 최소 항목 제거
    poll = () => {
        let minItem = this.items[0];
        this.items[0] = this.items[this.items.length - 1];
        this.items.pop();
        this.bubbleDown();

        console.log(this.items);

        return minItem;
    }

    bubbleDown = () => {
        let index = 0;

        while (
            this.leftChild(index) &&
            (this.leftChild(index) < this.items[index] || this.rightChild(index) < this.items[index])
        ) {
            let smallerIndex = this.leftChildIndex(index);

            if (this.rightChild(index) && this.rightChild(index) < this.items[smallerIndex]) {
                smallerIndex = this.rightChildIndex(index);
            }

            console.log('* bubbleDown', this.items, 'Child ', this.items[smallerIndex], 'is smaller than', this.items[index]);

            this.swap(smallerIndex, index);
            index = smallerIndex;
        }
    }

    bubbleUp = () => {
        let index = this.items.length - 1;

        while (
            this.parent(index) &&
            this.parent(index) > this.items[index]
        ) {
            console.log('* bubbleUp', this.items, ': parent', this.parent(index), 'is bigger than', this.items[index]);
            this.swap(this.parentIndex(index), index);
            index = this.parentIndex(index);
        }
    }
}

const minHeap = new MinHeap();

minHeap.add(1);
minHeap.add(10);
minHeap.add(5);
minHeap.add(100);
minHeap.add(8);

console.log('\n');
console.log(minHeap.poll());
console.log(minHeap.poll());
console.log(minHeap.poll());
console.log(minHeap.poll());
console.log(minHeap.poll());


// 삼투 구현하기 - 최대힙
// 최소힙과의 차이점은 bubbleDown/Up의 비교 부분이다.
class MaxHeap extends Heap {
    add = (item) => {
        this.items[this.items.length] = item;
        this.bubbleUp();
        
        console.log('heap:', this.items)
    }

    // 최소 항목 제거
    poll = () => {
        let minItem = this.items[0];
        this.items[0] = this.items[this.items.length - 1];
        this.items.pop();
        this.bubbleDown();

        console.log(this.items);

        return minItem;
    }

    bubbleDown = () => {
        let index = 0;

        while (
            this.leftChild(index) &&
            (this.leftChild(index) > this.items[index] || this.rightChild(index) > this.items[index])
        ) {
            let biggerIndex = this.leftChildIndex(index);

            if (this.rightChild(index) && this.rightChild(index) < this.items[biggerIndex]) {
                biggerIndex = this.rightChildIndex(index);
            }

            console.log('* bubbleDown', this.items, 'Child ', this.items[biggerIndex], 'is bigger than', this.items[index]);

            this.swap(biggerIndex, index);
            index = biggerIndex;
        }
    }

    bubbleUp = () => {
        let index = this.items.length - 1;

        while (
            this.parent(index) &&
            this.parent(index) < this.items[index]
        ) {
            console.log('* bubbleUp', this.items, ': parent', this.parent(index), 'is smaller than', this.items[index]);
            this.swap(this.parentIndex(index), index);
            index = this.parentIndex(index);
        }
    }
}

const maxHeap = new MaxHeap();

maxHeap.add(1);
maxHeap.add(10);
maxHeap.add(5);
maxHeap.add(100);
maxHeap.add(8);

console.log('\n');
console.log(maxHeap.poll());
console.log(maxHeap.poll());
console.log(maxHeap.poll());
console.log(maxHeap.poll());
console.log(maxHeap.poll());