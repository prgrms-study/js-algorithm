function SinglyLLNode(data) {
  this.data = data;
  this.next = null;
}

function SinglyLL() {
  this.head = null;
  this.size = 0;
}

SinglyLL.prototype.isEmpty = () => this.size == 0;

SinglyLL.prototype.insert = function (value) {
  if (!this.head) {
    this.head = new SinglyLLNode(value);
  } else {
    const temp = this.head;
    this.head = new SinglyLLNode(value);
    this.head.next = temp;
  }

  this.size++;
};

const sll1 = new SinglyLL();

sll1.insert(1);
sll1.insert(12);
sll1.insert(20);
console.log(sll1);

SinglyLL.prototype.remove = function (value) {
  let currentHead = this.head;
  if (currentHead.data === value) {
    this.head = currentHead.next;
    this.size--;
  } else {
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

    if (currentHead.data === value) {
      prev.next = null;
    }

    this.size--;
  }
};

const sll2 = new SinglyLL();

sll2.insert(1);
sll2.insert(12);
sll2.insert(20);
sll2.remove(12);
console.log(sll2);

SinglyLL.prototype.deleteAtHead = function () {
  let toReturn = null;

  if (this.head !== null) {
    toReturn = this.head.data;
    this.head = this.head.next;
    this.size--;
  }

  return toReturn;
};

SinglyLL.prototype.find = function (value) {
  let currentHead = this.head;
  while (currentHead) {
    console.log(currentHead);
    if (currentHead.data === value) {
      return true;
    }

    currentHead = currentHead.next;
  }

  return false;
};

const sll3 = new SinglyLL();

sll3.insert(10);
sll3.insert(20);
sll3.insert(40);
sll3.deleteAtHead();
console.log(sll3);
console.log(sll3.find(10));
console.log(sll3.find(20));

// 이중 연결 리스트
function DoublyLLNode(data) {
  this.data = data;
  this.next = null;
  this.prev = null;
}

function DoublyLL() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

DoublyLL.prototype.isEmpty = function () {
  return this.size == 0;
};

DoublyLL.prototype.insertAtHead = function (value) {
  if (!this.head) {
    this.head = new DoublyLLNode(value);
    this.tail = this.head;
  } else {
    const temp = new DoublyLLNode(value);
    temp.next = this.head;
    this.head.prev = temp;
    this.head = temp;
  }

  this.size++;
};

let dll1 = new DoublyLL();
dll1.insertAtHead(10);
dll1.insertAtHead(20);
dll1.insertAtHead(30);
console.log(dll1);

DoublyLL.prototype.insertAtTail = function (value) {
  if (!this.tail) {
    this.tail = new DoublyLLNode(value);
    this.head = this.tail;
  } else {
    const temp = new DoublyLLNode(value);
    temp.prev = this.tail;
    this.tail.next = temp;
    this.tail = temp;
  }

  this.size++;
};

let dll2 = new DoublyLL();
dll2.insertAtTail(10);
dll2.insertAtTail(20);
dll2.insertAtTail(30);
// dll2.insertAtTail(40);
console.log(dll2);

DoublyLL.prototype.deleteAtHead = function () {
  let toReturn = null;

  if (this.head !== null) {
    toReturn = this.head.data;
    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
  }
  this.size--;
  return toReturn;
};

DoublyLL.prototype.deleteAtTail = function () {
  let toReturn = null;

  if (this.tail !== null) {
    toReturn = this.tail.data;
    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
  }
  this.size--;
  return toReturn;
};

let dll3 = new DoublyLL();
dll3.insertAtHead(10);
dll3.insertAtHead(20);
dll3.insertAtHead(30);
dll3.insertAtHead(40);
dll3.deleteAtHead();
dll3.deleteAtTail();
console.log(dll3);

DoublyLL.prototype.findStartingHead = function (value) {
  let currentHead = this.head;
  while (currentHead.next) {
    if (currentHead.data === value) {
      return true;
    }
    currentHead = currentHead.next;
  }

  return false;
};

DoublyLL.prototype.findStartingTail = function (value) {
  let currentTail = this.tail;
  while (currentTail.prev) {
    if (currentTail.data === value) {
      return true;
    }
    currentTail = currentTail.prev;
  }

  return false;
};

let dll4 = new DoublyLL();
dll4.insertAtHead(10);
dll4.insertAtHead(20);
dll4.insertAtHead(30);
dll4.insertAtTail(40);
console.log(dll4.findStartingHead(10));
console.log(dll4.findStartingHead(100));
console.log(dll4.findStartingTail(10));
console.log(dll4.findStartingTail(100));

console.log(dll4);
