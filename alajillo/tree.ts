class TreeNode {
  value: number;
  children: number[];
  constructor(value: number) {
    this.value = value;
    this.children = [];
  }
}

class BinaryTreeNode {
  value: number;
  left: BinaryTreeNode;
  right: BinaryTreeNode;
  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  root: BinaryTreeNode;
  constructor() {
    this.root = null;
  }
  insertNode(value: number) {
    const newNode = new BinaryTreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    const nodeQueue = [this.root];
    while (nodeQueue.length) {
      const currentNode = nodeQueue.shift();
      if (currentNode.left === null) {
        currentNode.left = newNode;
        break;
      } else {
        nodeQueue.push(currentNode.left);
      }
      if (currentNode.right === null) {
        currentNode.right = newNode;
        break;
      } else {
        nodeQueue.push(currentNode.right);
      }
    }
  }
  traversePreOrder() {
    const nodeStack = [];
    nodeStack.push(this.root);
    while (nodeStack.length) {
      const node = nodeStack.pop();
      console.log(node.value);
      node.right && nodeStack.push(node.right);
      node.left && nodeStack.push(node.left);
    }
  }
  traverseInOrder() {
    let current = this.root;
    const s = [];
    let done = false;

    while (!done) {
      if (current !== null) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length) {
          current = s.pop();
          console.log(current.value);
          current = current.right;
        } else {
          done = true;
        }
      }
    }
  }
  traversePostOrder() {
    const s1 = [];
    const s2 = [];
    s1.push(this.root);
    while (s1.length) {
      const node = s1.pop();
      s2.push(node);
      node.left && s1.push(node.left);
      node.right && s1.push(node.right);
    }
    while (s2.length) {
      const node = s2.pop();
      console.log(node.value);
    }
  }
  traverseBfs() {
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      console.log(node.value);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
}

function findMin(root: BinaryTreeNode) {
  while (root.left) {
    root = root.left;
  }
  return root;
}
// const binaryTree = new BinaryTree();
//          1
//     2         3
//  4     5    6    7
// 1,2,4,5,3,6
// binaryTree.insertNode(1);
// binaryTree.insertNode(2);
// binaryTree.insertNode(3);
// binaryTree.insertNode(4);
// binaryTree.insertNode(5);
// binaryTree.insertNode(6);
// binaryTree.insertNode(7);
// binaryTree.traversePreOrder();
// binaryTree.traverseInOrder();
// binaryTree.traversePostOrder();
// binaryTree.traverseBfs();

class BinarySerchTree {
  root: BinaryTreeNode;
  constructor() {
    this.root = null;
  }
  insert(value: number) {
    const newNode = new BinaryTreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    let currentParentNode = this.root;
    while (true) {
      if (currentParentNode.value > value) {
        if (currentParentNode.left === null) {
          currentParentNode.left = newNode;
          break;
        } else {
          currentParentNode = currentParentNode.left;
        }
      } else if (currentParentNode.value < value) {
        if (currentParentNode.right === null) {
          currentParentNode.right = newNode;
          break;
        } else {
          currentParentNode = currentParentNode.right;
        }
      } else {
        break;
      }
    }
  }
  // 노드에 자식이 없는 경우 -> 바로 삭제
  // 노드에 자식이 하나 있는 경우 -> 자식이 부모 노드를 대체
  // 노드에 자식이 두개 있는 경우 ->
  remove(value: number) {
    return deleteRecursively(this.root, value);
    function deleteRecursively(root: BinaryTreeNode, value: number) {
      if (!root) {
        return null;
      } else if (value < root.value) {
        root.left = deleteRecursively(root.left, value);
      } else if (value > root.value) {
        root.right = deleteRecursively(root.right, value);
      } else {
        if (!root.left && !root.right) {
          return null;
        } else if (!root.left) {
          root = root.right;
          return root;
        } else if (!root.right) {
          root = root.left;
          return root;
        } else {
          const temp = findMin(root.right);
          root.right = deleteRecursively(root.right, temp.value);
          return root;
        }
      }
    }
  }
  search(value: number) {
    let currentRoot = this.root;
    let found = false;
    while (currentRoot) {
      if (currentRoot.value > value) {
        currentRoot = currentRoot.left;
      } else if (currentRoot.value < value) {
        currentRoot = currentRoot.right;
      } else {
        found = true;
        break;
      }
    }
    return found;
  }
}

const binarySerchTree = new BinarySerchTree();

// binarySerchTree.insert(1);
// binarySerchTree.insert(2);
// binarySerchTree.insert(5);
// binarySerchTree.insert(76);
// binarySerchTree.insert(5);
// console.log(binarySerchTree.search(2));
// binarySerchTree.remove(2);
// console.log(binarySerchTree.search(2));
