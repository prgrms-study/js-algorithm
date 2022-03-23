function SinglyLinkedListNode(data) {
  this.data = data;
  this.next = null;
}

function SinglyLinkedList() {
  this.head = null;
  this.size = 0;
}

SinglyLinkedList.prototype.isEmpty = function () {
  return this.size === 0;
};

SinglyLinkedList.prototype.insert = function (value) {
  if (this.head === null) {
    this.head = new SinglyLinkedListNode(value);
  } else {
    const temp = this.head;
    this.head = new SinglyLinkedListNode(value);
    this.head.next = temp;
  }
  this.size++;
};

// const sll = new SinglyLinkedList();
// sll.insert(1);
// sll.insert(12);
// sll.insert(20);
// console.log(sll);

SinglyLinkedList.prototype.remove = function (value) {
  let currentHead = this.head;
  if (currentHead.data === value) {
    this.head = currentHead.next;
    this.size--;
  }
  let prev = currentHead;
  while (currentHead.next) {
    if (currentHead.data === value) {
      prev.next = currentHead.next;
      prev = currentHead;
      currentHead = currentHead.next;
      break;
    }
    prev = currentHead;
    currentHead = currentHead.next;
  }
};

SinglyLinkedList.prototype.deleteAtHead = function () {
  let toReturn = null;
  if (this.head !== null) {
    toReturn = this.head.data;
    this.head = this.head.next;
    this.size--;
  }
  return toReturn;
};

SinglyLinkedList.prototype.find = function (value) {
  let currentHead = this.head;
  while (currentHead.next) {
    if (currentHead.data === value) {
      return true;
    }
    currentHead = currentHead.next;
  }
  return false;
};

// 이중 연결 리스트
function DoublyLinkedListNode(data) {
  this.data = data;
  this.next = null;
  this.prev = null;
}

function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

DoublyLinkedList.prototype.isEmpty = function () {
  return this.size === 0;
};

DoublyLinkedList.prototype.insertAtHead = function (value) {
  if (this.head === null) {
    this.head = new DoublyLinkedListNode(value);
    this.tail = this.head;
  } else {
    let temp = new DoublyLinkedListNode(value);
    temp.next = this.head;
    this.head.prev = temp;
    this.head = temp;
  }
  this.size++;
};

DoublyLinkedList.prototype.insertAtTail = function (value) {
  if (this.tail === null) {
    this.tail = new DoublyLinkedListNode(value);
    this.head = this.tail;
  } else {
    let temp = new DoublyLinkedListNode(value);
    this.tail.next = temp;
    temp.prev = this.tail;
    this.tail = temp;
  }
  this.size++;
};

DoublyLinkedList.prototype.deleteAtHead = function () {
  let toReturn;
  if (this.head !== null) {
    toReturn = this.head;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.size--;
    return toReturn;
  }
};

DoublyLinkedList.prototype.deleteAtTail = function () {
  let toReturn;
  if (this.tail !== null) {
    toReturn = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.size--;
    return toReturn;
  }
};

// 검색 스킵
function reverseSingleLinkedList(sll) {
  let node = sll.head;
  let prev = null;
  while (node) {
    const temp = node.next;
    node.next = prev;
    prev = node;
    if (!temp) {
      break;
    }
    node = temp;
  }
  return node;
}
