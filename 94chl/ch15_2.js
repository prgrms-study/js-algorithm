function AVLTree(value) {
  this.left = null;
  this.right = null;
  this.value = value;
  this.depth = 1;
}

// AVL 트리 높이 계산
AVLTree.prototype.setDepthBasedOnChildren = function () {
  if (this.node === null) this.depth = 1;

  if (this.node != null) this.depth = this.left.depth + 1;

  if (this.right != null && this.depth <= this.right.depth)
    this.depth = this.right.depth + 1;
};

// 왼쪽 회전(오른쪽부터 회전)
AVLTree.prototype.rotateRR = function () {
  let valueBefore = this.value;
  let leftBefore = this.left;
  this.value = this.right.value;

  this.left = this.right;
  this.right = this.right.right;
  this.left.right = this.left.left;
  this.left.left = leftBefore;
  this.left.value = valueBefore;

  this.left.setDepthBasedOnChildren();
  this.setDepthBasedOnChildren();
};

// 오른쪽 회전(왼쪽부터 회전)
AVLTree.prototype.rotateLL = function () {
  let valueBefore = this.value;
  let rightBefore = this.right;
  this.value = this.left.value;

  this.right = this.left;
  this.left = this.left.left;
  this.right.left = this.right.right;
  this.right.right = rightBefore;
  this.right.value = valueBefore;

  this.right.setDepthBasedOnChildren();
  this.setDepthBasedOnChildren();
};

AVLTree.prototype.balance = function () {
  let ldepth = this.left === null ? 0 : this.left.depth;
  let rdepth = this.right === null ? 0 : this.right.depth;

  if (ldepth > rdepth + 1) {
    let lldepth = this.left.left === null ? 0 : this.left.left.depth;
    let lrdepth = this.left.right === null ? 0 : this.left.right.depth;
    if (lldepth < lrdepth) {
      this.left.rotateRR();
    }
  } else if (ldepth + 1 < rdepth) {
    let rrdepth = this.right.right === null ? 0 : this.right.right.depth;
    let rldepth = this.right.left === null ? 0 : this.right.left.depth;
    if (rldepth < rrdepth) {
      this.right.rotateRR();
    }
    this.rotateRR();
  }
};

AVLTree.prototype.insert = function (value) {
  let childInserted = false;
  if (value === this.value) return false;
  if (value < this.value) {
    if (this.left == null) {
      this.left = new AVLTree(value);
      childInserted = true;
    } else {
      childInserted = this.left.insert(value);
      if (childInserted) this.balance();
    }
  } else if (value > this.value) {
    if (this.right == null) {
      this.right = new AVLTree(value);
      childInserted = true;
    } else {
      childInserted = this.right.insert(value);
      if (childInserted) this.balance();
    }
  }

  if (childInserted) this.setDepthBasedOnChildren();
  return childInserted;
};

AVLTree.prototype.remove = function (value) {
  return deleteRecursively(this, value);

  function deleteRecursively(root, value) {
    if (!root) {
      return null;
    }

    if (value < root.value) {
      root.left = deleteRecursively(root.left, value);
    }

    if (value > root.value) {
      root.right = deleteRecursively(root.right, value);
    }

    if (!root.left && !root.right) {
      return null;
    }

    if (!root.left) {
      root = root.right;
      return root;
    }

    if (!root.right) {
      root = root.left;
      return root;
    }

    const temp = findMin(root.right);
    root.value = temp.value;
    root.right = deleteRecursively(root.right, temp.value);
    return root;
  }

  function findMin(root) {
    while (root.left) {
      root = root.left;
    }
    return root;
  }
};

const avlTest = new AVLTree(1);
avlTest.insert(2);
avlTest.insert(3);
avlTest.insert(4);
avlTest.insert(5);
avlTest.insert(123);
avlTest.insert(203);
avlTest.insert(2222);
console.log(avlTest);

function findLowestCommonAncestor(root, value1, value2) {
  function findLowestCommonAncestorHelper(root, value1, value2) {
    if (!root) return;
    if (Math.max(value1, value2) < root.value)
      return findLowestCommonAncestorHelper(root.left, value1, value2);
    if (Math.min(value1, value2) > root.value)
      return findLowestCommonAncestorHelper(root.right, value1, value2);
    return root.value;
  }

  return findLowestCommonAncestorHelper(root, value1, value2);
}

const test1 = {
  value: 1,
  left: { value: 0 },
  right: { Value: 2 },
};

const test2 = {
  value: 1,
  left: {
    value: 0,
    left: { value: -1 },
    right: { value: 0.5 },
  },
  right: { value: 2 },
};

const test3 = {
  value: 1,
  left: { value: 0 },
  right: {
    value: 2,
    left: { value: 1.5 },
    right: {
      value: 3,
      left: { value: 3.25 },
    },
  },
};

console.log(findLowestCommonAncestor(test1, 0, 2));
console.log(findLowestCommonAncestor(test2, 0, 2));
console.log(findLowestCommonAncestor(test2, 0.5, -1));

function printKthLevels(root, k) {
  let arrayKth = [];
  let queue = [];

  if (!root) return;

  queue.push([root, 0]);

  while (queue.length) {
    let tuple = queue.shift();
    let temp = tuple[0];
    let height = tuple[1];

    if (height == k) arrayKth.push(temp.value);

    if (temp.left) queue.push([temp.left, height + 1]);

    if (temp.right) queue.push([temp.right, height + 1]);
  }

  console.log(arrayKth);
}

printKthLevels(test3, 0);
printKthLevels(test3, 1);

function isSameTree(root1, root2) {
  if (!root1 && !root2) return true;
  if (!root1 || !root2) return false;

  return (
    root1.value == root2.value &&
    isSameTree(root1.left, root2.left) &&
    isSameTree(root1.right, root2.right)
  );
}

function checkIfSubRee(root, subTree) {
  const queue = [];

  if (!root) return;

  queue.push(root);

  while (queue.length) {
    let temp = queue.shift();

    if ((temp.data == subTree.data) == isSameTree(temp, subTree)) return true;

    if (temp.left) queue.push(temp.left);

    if (temp.right) queue.push(temp.right);
  }

  return false;
}

const test4 = {
  value: 5,
  left: {
    value: 3,
    left: { value: 1 },
    right: {
      value: 2,
    },
  },
  right: {
    value: 7,
  },
};

const test4_1 = {
  value: 3,
  left: { value: 1 },
  right: {
    value: 2,
  },
};

const test4_2 = {
  value: 3,
  left: {
    value: 2,
  },
  right: {
    value: 1,
  },
};

console.log(checkIfSubRee(test4, test4_1));
console.log(checkIfSubRee(test4, test4_2));
console.log(checkIfSubRee(test4_1, test4_2));

function isMirror(tree1, tree2) {
  if (!tree1 && !tree2) return true;
  if (!tree1 || !tree2) return false;

  let checkLeftWithRight = isMirror(tree1.left, tree2.right);
  let checkRightWithLeft = isMirror(tree2.right, tree1.left);

  return (
    tree1.value === tree2.value && checkLeftWithRight && checkRightWithLeft
  );
}

console.log(isMirror(test4_1, test4_2));
console.log(isMirror(test4_1, test4));
