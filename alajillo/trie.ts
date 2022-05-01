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

// this.deleteRecur(e,"sammie",6)
// this.deleteRecur(i,"sammie",5)
// this.deleteRecur(m,"sammie",4)
// this.deleteRecur(m,"sammie",3)
// this.deleteRecur(a,"sammie",2)
// this.deleteRecur(s,"sammie",1)
// this.deleteRecur(this.root,"sammie",0)
// this.delete('sammie);
const trie = new Trie();
// trie.insert('sammie');
// trie.insert('simran');
// trie.insert('sam');
// trie.delete('sam');
// console.log(trie.search('simran'));
// trie.delete('sammie');
// console.log(trie.search('sammie'));
// console.log(trie.search('simran'));

function buildBadMatchTable(str: string) {
  const tableObj = {};
  const strLength = str.length;
  tableObj[str[strLength - 1]] = strLength;
  str.split('').forEach((char: string, index: number) => {
    if (index === strLength - 1) return;
    tableObj[char] = strLength - 1 - index;
  });
  return tableObj;
}

function boyerMoore(str: string, pattern: string) {
  const badMatchTable = buildBadMatchTable(pattern);
  const patternLastIndex = pattern.length - 1;
  const maxOffset = str.length - pattern.length;
  let offset = 0;
  while (offset <= maxOffset) {
    let scanIndex = 0;
    while (pattern[scanIndex] === str[scanIndex + offset]) {
      if (scanIndex === patternLastIndex) {
        return offset;
      }
      scanIndex++;
    }
    const badMatchString = str[offset + patternLastIndex];
    if (badMatchTable[badMatchString]) {
      offset += badMatchTable[badMatchString];
    } else {
      offset += 1;
    }
  }
  return -1;
}
console.log(boyerMoore('jellyqwdwqam', 'jam'));
