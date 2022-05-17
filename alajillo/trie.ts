class TrieNode {
  children: {
    [keys: string]: TrieNode;
  };
  endOfWord: boolean;
  constructor() {
    this.children = {};
    this.endOfWord = false;
  }
}
class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }
  hello;
  insert(word: string) {
    let currentNode = this.root;
    word.split('').forEach((char: string) => {
      let node = currentNode.children[char];
      if (!node) {
        node = new TrieNode();
        currentNode.children[char] = node;
      }
      currentNode = node;
    });
    currentNode.endOfWord = true;
  }
  search(word: string) {
    let currentNode = this.root;
    word.split('').forEach((char: string) => {
      let node = currentNode.children[char];
      if (!node) {
        return { isFind: false, node };
      }
      currentNode = node;
    });
    return { isFind: currentNode.endOfWord, node: currentNode };
  }
  deleteSimple(word: string) {
    const { node, isFind } = this.search(word);
    if (isFind) {
      node.endOfWord = false;
    }
  }
  delete(word: string) {
    this.deleteRecursively(this.root, word, 0);
  }

  deleteRecursively(currentNode: TrieNode, word: string, index: number) {
    if (index === word.length) {
      if (!currentNode.endOfWord) {
        return false;
      }
      currentNode.endOfWord = false;
      return Object.keys(currentNode.children).length === 0;
    }
    const char = word.charAt(index);
    const node = currentNode.children[char];
    if (!node) {
      return false;
    }
    const shouldDeleteCurrentNode = this.deleteRecursively(
      node,
      word,
      index + 1
    );
    if (shouldDeleteCurrentNode) {
      delete currentNode.children[char];
      return Object.keys(currentNode.children).length === 0;
    }
    return false;
  }
}

const trie = new Trie();
trie.insert('sammie');
console.log(trie.search('simran'));
trie.delete('simran');
// console.log(trie.search('sammie'));
console.log(trie.search('simran'));

function buildBadMatchTable(str: string) {
  const tableObj = {
    a: 2,
    d: 3,
    t: 1,
  };
  const strLength = str.length;
  tableObj[str[strLength - 1]] = strLength;
  str.split('').forEach((char: string, index: number) => {
    if (index === strLength - 1) return;
    tableObj[char] = strLength - 1 - index;
  });
  return tableObj;
}

// djdata
// data
d: 3;
a: 2;
t: 1;
// qwddata
// data
// {
  d : 3,
  a : 2,
  t : 1
}
// pattenrLastIndex = 3
// maxOffset = 3
// offset = 3;
// scanIndex = 1;

function boyerMoore(str: string, pattern: string) {
  const badMatchTable = buildBadMatchTable(pattern);
  const patternLastIndex = pattern.length - 1;
  const maxOffset = str.length - pattern.length;
  let offset = 0;
  while (offset <= maxOffset) {
    let scanIndex = 0;
    while (pattern[scanIndex] === str[scanIndex + offset] ) {
      if (scanIndex === patternLastIndex) {
        return offset;
      }
      scanIndex++;
    }
    const badMatchString = str[offset + patternLastIndex];
    d
    if (badMatchTable[badMatchString]) {
      offset += badMatchTable[badMatchString];
    } else {
      offset += 1;
    }
  }
  return -1;
}
console.log(boyerMoore('jellyqwdwqam', 'jam'));
