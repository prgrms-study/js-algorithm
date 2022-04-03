function TreeNode(value) {
  this.value = value;
  this.children = [];
}

function BinaryTreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinaryTree() {
  this._root = null;
}

const test = BinaryTree();

BinaryTree.prototype.preOrder = function () {
  preOrderHelper(this._root);

  function preOrderHelper(node) {
    if (!node) return;
    console.log(node.value);

    preOrderHelper(node.left);
    preOrderHelper(node.right);
  }
};

BinaryTree.prototype.postOrder = function () {
  postOrderHelper(this._root);

  function postOrderHelper(node) {
    if (node.left) postOrderHelper(node.left);
    if (node.right) postOrderHelper(node.right);

    console.log(node.value);
  }
};

BinaryTree.prototype.inOrder = function () {
  inOrderHelper(this._root);

  function inOrderHelper(node) {
    if (!node) return;

    inOrderHelper(node.left);
    console.log(node.value);
    inOrderHelper(node.right);
  }
};

BinaryTree.prototype.levelOrder = function () {
  const root = this._root;
  const queue = [];

  if (!root) return;
  queue.push(root);

  while (queue.length) {
    const temp = queue.shift();
    console.log(temp.value);

    if (temp.left) queue.push(temp.left);
    if (temp.right) queue.push(temp.right);
  }
};

function BinarySearchTree() {
  this._root = null;
}

BinarySearchTree.prototype.insert = function (value) {
  const thisNode = { left: null, right: null, value };

  if (!this._root) {
    this._root = thisNode;
    return;
  }

  let currentRoot = this._root;
  while (true) {
    if (currentRoot.value > value) {
      if (currentRoot.left) {
        currentRoot = currentRoot.left;
      } else {
        currentRoot.left = thisNode;
        break;
      }
    }

    if (currentRoot.value < value) {
      if (currentRoot.right) {
        currentRoot = currentRoot.right;
      } else {
        currentRoot.right = thisNode;
        break;
      }
    }

    if (currentRoot.value === value) {
      break;
    }
  }
};

BinarySearchTree.prototype.remove = function (value) {
  return deleteRecursively(this._root, value);

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
      root = root.left;
      return root;
    }

    if (!root.left) {
      root = root.right;
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

BinarySearchTree.prototype.findNode = function (value) {
  let currentRoot = this._root;
  let found = false;

  while (currentRoot) {
    if (currentRoot.value > value) {
      currentRoot = currentRoot.left;
    }
    if (currentRoot.value < value) {
      currentRoot = currentRoot.right;
    }
    if (currentRoot.value === value) {
      found = true;
      break;
    }
  }

  return found;
};
