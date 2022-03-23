// 캐싱 설계시 고려 사항 2가지
// 시간적 지역성  tmeporal locality : 최근에 접근한 메모리 위치를 다시 접근할 가능성이 높다.
// 공간적 지역성 spatial locality : 최근에 접근한 메모리 위치 주변의 위치를 다시 접근할 가능성이 높다.

// (LFU)Least Frequently Used 캐싱

interface KeyHashTable {
  [key: number]: LFUNode;
}
interface FreqHashTable {
  [key: number]: LFUDoublyLinkedList;
}
class LFUNode {
  prev: LFUNode;
  next: LFUNode;
  key: number | string;
  data: string;
  freqCount: number;
  constructor(key: number | string, value: string) {
    this.prev = null;
    this.next = null;
    this.key = key;
    this.data = value;
    this.freqCount = 1;
  }
}

class LFUDoublyLinkedList {
  head: LFUNode;
  tail: LFUNode;
  size: number;
  constructor() {
    this.head = new LFUNode("buffer head", "null");
    this.tail = new LFUNode("buffer tail", "null");
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  insertAtHead(node: LFUNode) {
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
    node.prev = this.head;
    this.size++;
  }

  removeAtTail() {
    const oldTail = this.tail.prev;
    const prev = this.tail.prev;
    prev.prev.next = this.tail;
    this.tail.prev = prev.prev;
    this.size--;
    return oldTail;
  }
  removeNode(node: LFUNode) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
  }
}

class LFUCache {
  keys: KeyHashTable;
  freq: FreqHashTable;
  capacity: number;
  minFreq: number;
  size: number;
  constructor(capacity: number) {
    this.keys = {};
    this.freq = {};
    this.capacity = capacity;
    this.minFreq = 0;
    this.size = 0;
  }
  insertNodeAtFreq(node: LFUNode) {
    if (this.freq[node.freqCount] === undefined) {
      this.freq[node.freqCount] = new LFUDoublyLinkedList();
    }
    this.freq[node.freqCount].insertAtHead(node);
  }
  increaseMinFreqInCondition(oldFreqCount: number) {
    if (oldFreqCount === this.minFreq && this.freq[oldFreqCount].size === 0) {
      this.minFreq++;
    }
  }
  set(key: number, value: string) {
    let node = this.keys[key];
    if (node === undefined) {
      node = new LFUNode(key, value);
      this.keys[key] = node;
      // 용량 초과 체크
      if (this.size !== this.capacity) {
        this.insertNodeAtFreq(node);
        this.size++;
      } else {
        const oldTail = this.freq[this.minFreq].removeAtTail();
        console.log("용량 초과 노드를 지웁니다.", oldTail.data);
        delete this.keys[oldTail.key];
        this.insertNodeAtFreq(node);
      }
      // 처음 들어오는 노드 이기때문에 접근 횟수는 1회
      this.minFreq = 1;
    } else {
      // 이미 있는 노드가 수정될 경우
      const oldFreqCount = node.freqCount;
      // 값 수정
      node.data = value;
      // 접근 횟수 1회 증가
      node.freqCount++;
      // 기존에 접근 해쉬 테이블의 인덱스를 제거하고 새로 증가된 빈도 해쉬 테이블에 등록
      this.freq[oldFreqCount].removeNode(node);
      this.insertNodeAtFreq(node);
      this.increaseMinFreqInCondition(oldFreqCount);
    }
  }
  get(key: number) {
    const node = this.keys[key];

    if (node === undefined) return null;
    let oldFreqCount = node.freqCount;
    node.freqCount++;
    this.freq[oldFreqCount].removeNode(node);

    this.insertNodeAtFreq(node);
    this.increaseMinFreqInCondition(oldFreqCount);
    return node.data;
  }
}

const myLFU = new LFUCache(5);

// myLFU.set(1, "1번 키값의 값");
// myLFU.set(2, "2번 키값의 값");
// myLFU.set(3, "3번 키값의 값");
// myLFU.set(4, "4번 키값의 값");
// myLFU.set(5, "5번 키값의 값");
// myLFU.get(1);
// myLFU.get(1);
// myLFU.get(2);
// myLFU.get(2);
// console.log("추가 전");
// for (let i = 1; i <= 5; i++) {
//   console.log(i, " : ", myLFU.get(i));
// }
// myLFU.set(6, "6번 키값의 값");
// myLFU.get(6);
// myLFU.set(7, "7번 키값의 값");
// myLFU.get(7);
// myLFU.set(8, "8번 키값의 값");
// myLFU.get(8);
// console.log("추가 후");
// for (let i = 1; i <= 8; i++) {
//   console.log(i, " : ", myLFU.get(i));
// }

interface KeyTable {
  [key: number]: DLLNode;
}

class DLLNode {
  key: number;
  data: string;
  next: DLLNode;
  prev: DLLNode;
  constructor(key: number, data: string) {
    this.key = key;
    this.data = data;
  }
}

class LRUCache {
  keys: KeyTable;
  capacity: number;
  head: DLLNode;
  tail: DLLNode;
  constructor(capacity: number) {
    this.keys = {};
    this.capacity = capacity;
    this.head = new DLLNode(0, "null");
    this.tail = new DLLNode(0, "null");
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  removeNode(node: DLLNode) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }
  addNode(node: DLLNode) {
    //  진짜 마지막은 아니고 초기에 등록된 tail을 제외한 노드중 마지막
    const tailAmongNodes = this.tail.prev;
    tailAmongNodes.next = node;
    this.tail.prev = node;
    node.prev = tailAmongNodes;
    node.next = this.tail;
  }
  get(key: number) {
    const node = this.keys[key];
    if (node === undefined) return null;
    this.removeNode(node);
    this.addNode(node);
    return node.data;
  }
  set(key: number, value: string) {
    const node = this.keys[key];
    if (node) {
      this.removeNode(node);
    }
    const newNode = new DLLNode(key, value);

    this.addNode(newNode);
    this.keys[key] = newNode;

    if (Object.keys(this.keys).length > this.capacity) {
      const headAmongNodes = this.head.next;
      this.removeNode(headAmongNodes);
      delete this.keys[headAmongNodes.key];
    }
  }
}

const myLRU = new LRUCache(5);

// myLRU.set(1, "1번 키값의 값");
// myLRU.set(2, "2번 키값의 값");
// myLRU.set(3, "3번 키값의 값");
// myLRU.set(4, "4번 키값의 값");
// myLRU.set(5, "5번 키값의 값");

// myLRU.get(1);
// myLRU.get(2);

// myLRU.set(6, "6번 키값의 값");
// myLRU.set(7, "7번 키값의 값");
// myLRU.set(8, "8번 키값의 값");

// for (let i = 1; i <= 8; i++) {
//   console.log(i, " : ", myLRU.get(i));
// }
