class AVLNode {
  value: number;
  left: AVLNode;
  right: AVLNode;
  depth: number;
  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.depth = 0;
  }
  insert(value: number, node: AVLNode) {
    // node : 1,
    // value : 2
    if (node === null) {
      return new AVLNode(value);
    }
    if (value < node.value) {
      node.left = this.insert(value, node.left);
    } else if (value > node.value) {
      node.right = this.insert(value, node.right);
    }
    node.depth =
      Math.max(AVLTree.getDepth(node.left), AVLTree.getDepth(node.right)) + 1;
    if (AVLTree.getBalance(node) === 2 && AVLTree.getBalance(node.left) >= 0) {
      //     x
      //   y
      // z
      //
      //   y
      // z   x
      return AVLTree.rightRotate(node);
    } else if (
      AVLTree.getBalance(node) === 2 &&
      AVLTree.getBalance(node.left) < 0
    ) {
      //     x
      //   y
      //     z
      //     x
      //   z
      // y
      node.left = AVLTree.leftRotate(node.left);
      return AVLTree.rightRotate(node);
    } else if (
      AVLTree.getBalance(node) === -2 &&
      AVLTree.getBalance(node.right) <= 0
    ) {
      return AVLTree.leftRotate(node);
    } else if (
      AVLTree.getBalance(node) === -2 &&
      AVLTree.getBalance(node.right) > 0
    ) {
      node.right = AVLTree.rightRotate(node.right);
      return AVLTree.leftRotate(node);
    }
    return node;
  }
  delete(value: number, node: AVLNode) {
    if (value < node.value && node.left) {
      node.left = this.delete(value, node.left);
    } else if (value > node.value && node.right) {
      node.right = this.delete(value, node.right);
    } else {
      if (node.value === value) {
        if (node.left && node.right) {
          let minValue = AVLTree.findMinValue(node.right);
          node.value = minValue;
          node.right = this.delete(minValue, node.right);
        } else if (node.left) {
          return node.left;
        } else if (node.right) {
          return node.right;
        } else {
          return null;
        }
      }
      node.depth =
        Math.max(AVLTree.getDepth(node.left), AVLTree.getDepth(node.right)) + 1;
      if (
        AVLTree.getBalance(node) === 2 &&
        AVLTree.getBalance(node.left) >= 0
      ) {
        return AVLTree.rightRotate(node);
      } else if (
        AVLTree.getBalance(node) === 2 &&
        AVLTree.getBalance(node.left) < 0
      ) {
        node.left = AVLTree.leftRotate(node.left);
        return AVLTree.rightRotate(node);
      } else if (
        AVLTree.getBalance(node) === -2 &&
        AVLTree.getBalance(node.right) <= 0
      ) {
        return AVLTree.leftRotate(node);
      } else if (
        AVLTree.getBalance(node) === -2 &&
        AVLTree.getBalance(node.right) > 0
      ) {
        node.right = AVLTree.rightRotate(node.right);
        return AVLTree.leftRotate(node);
      }
    }
    return node;
  }
}

class AVLTree {
  root: AVLNode;
  constructor() {
    this.root = null;
  }
  static getDepth(node: AVLNode) {
    return node ? node.depth : -1;
  }
  static getBalance(node: AVLNode) {
    return this.getDepth(node.left) - this.getDepth(node.right);
  }
  static leftRotate(x: AVLNode) {
    const y = x.right;
    const yLeftChild = y.left;
    y.left = x;
    x.right = yLeftChild;
    x.depth = Math.max(this.getDepth(x.left), this.getDepth(x.right)) + 1;
    y.depth = Math.max(this.getDepth(y.left), this.getDepth(y.right)) + 1;
    return y;
  }
  //      x
  //    y
  //  z
  //    y
  //  z   x
  static rightRotate(x: AVLNode) {
    const y = x.left;
    const yRightChild = y.right;
    y.right = x;
    x.left = yRightChild;
    x.depth = Math.max(this.getDepth(x.left), this.getDepth(x.right)) + 1;
    y.depth = Math.max(this.getDepth(y.left), this.getDepth(y.right)) + 1;
    return y;
  }
  static findMinValue(node: AVLNode) {
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }
  //  x
  //     3
  //  z    2
  insert(value: number) {
    if (this.root) {
      this.root = this.root.insert(value, this.root);
    } else {
      this.root = new AVLNode(value);
    }
  }
  delete(value: number) {
    if (this.root) {
      this.root = this.root.delete(value, this.root);
    }
  }
  traverseByLevel() {
    if (this.root) {
      const levelTable = { '0': [this.root.value] };
      const queue = [{ node: this.root, level: 0 }];
      while (queue.length) {
        let { node: currentNode, level } = queue.shift();
        levelTable[level + 1] = levelTable[level + 1] || [];
        levelTable[level + 1].push(currentNode.left?.value || ' ');
        levelTable[level + 1].push(currentNode.right?.value || ' ');
        currentNode.left &&
          queue.push({ node: currentNode.left, level: level + 1 });
        currentNode.right &&
          queue.push({ node: currentNode.right, level: level + 1 });
      }
      console.log('------------------------tree-view-------------------------');
      Object.values(levelTable).forEach((arr: number[]) => {
        console.log(getSpaceMiddle(50, arr));
      });
      console.log('----------------------------------------------------------');
    }
  }
  finLowestCommonAncstor(value1: number, value2: number) {
    function helper(root: AVLNode, value3: number, value4: number) {
      if (!root) return;
      if (Math.max(value3, value4) < root.value) {
        return helper(root.left, value3, value4);
      }
      if (Math.min(value3, value4) > root.value) {
        return helper(root.right, value3, value4);
      }
      console.log(root.value);
    }
    helper(this.root, value1, value2);
  }
  findNodeKthLevels(root: AVLNode, k: number) {
    if (!root) return;
    const levelTable = {};
    const queue = [{ node: root, level: 0 }];
    while (queue.length) {
      let { node: currentNode, level } = queue.shift();
      levelTable[level] = levelTable[level] || [];
      levelTable[level].push(currentNode.value);
      currentNode.left &&
        queue.push({ node: currentNode.left, level: level + 1 });
      currentNode.right &&
        queue.push({ node: currentNode.right, level: level + 1 });
    }
    console.log(levelTable[k]);
  }
  checkIfSubTrees(root: AVLNode, subTree: AVLNode) {
    const queue = [root];
    while (queue.length) {
      const currentNode = queue.shift();
      if (
        (currentNode.value = subTree.value && isSameTree(currentNode, subTree))
      ) {
        console.log('맞음');
        return true;
      }
      currentNode.left && queue.push(currentNode.left);
      currentNode.right && queue.push(currentNode.right);
    }
    console.log('아님');
    return false;
  }
  isMirrorTree(root1: AVLNode, root2: AVLNode) {
    if (root1 === null && root2 === null) {
      return true;
    }
    if (root1 === null || root2 === null) {
      return false;
    }
    return (
      root1.value === root2.value &&
      isSameTree(root1.left, root2.right) &&
      isSameTree(root1.right, root2.left)
    );
  }
}
function isSameTree(root1: AVLNode, root2: AVLNode) {
  if (root1 === null && root2 === null) {
    return true;
  }
  if (root1 === null || root2 === null) {
    return false;
  }
  return (
    root1.value === root2.value &&
    isSameTree(root1.left, root2.left) &&
    isSameTree(root1.right, root2.right)
  );
}
function getSpaceMiddle(space: number, valueList: number[]) {
  const emptyStringArray = new Array(space).fill(' ');
  const distance = Math.floor(space / (valueList.length + 1));
  valueList.forEach((value, index) => {
    emptyStringArray.splice((index + 1) * distance, 1, value);
  });
  return emptyStringArray.join('');
}

const test = new AVLTree();
test.insert(1);
test.insert(2);
test.insert(3);
test.insert(4);
test.insert(6);
test.insert(8);
test.insert(9);
test.traverseByLevel();
