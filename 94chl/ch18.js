function TrieNode() {
  this.children = {};
  this.endOfWord = false;
}

function Trie() {
  this.root = new TrieNode();
}

Trie.prototype.insert = function (word) {
  let current = this.root;
  for (let i = 0; i < word.length; i++) {
    const ch = word.charAt(i);
    console.log(ch);
    let node = current.children[ch];
    if (!node) {
      node = new TrieNode();
      current.children[ch] = node;
      console.log(ch);
    }
    current = node;
  }
  current.endOfWord = true;
  console.log(word);
  console.log(current);
};

Trie.prototype.search = function (word) {
  let current = this.root;
  for (let i = 0; i < word.length; i++) {
    const ch = word.charAt(i);
    console.log(ch);
    const node = current.children[ch];
    if (!node) return false;
    current = node;
  }
  return current.endOfWord;
};

const trie = new Trie();

trie.insert("sammie");
trie.insert("simran");
console.log(trie);
console.log(trie.search("simran"));
console.log(trie.search("fake"));
console.log(trie.search("sam"));

Trie.prototype.delete = function (word) {
  this.deleteRecursively(this.root, word, 0);
};

Trie.prototype.deleteRecursively = function (current, word, index) {
  if (index === word.length) {
    if (!current.endOfWord) return false;
    current.endOfWord = false;
    return Object.keys(current.children).length === 0;
  }

  const ch = word.charAt(index);
  const node = current.children[ch];

  if (!node) return false;

  const shouldDeleteCurentNode = this.deleteRecursively(node, word, index + 1);

  if (shouldDeleteCurentNode) {
    delete current.children[ch];
    return Object.keys(current.children).length === 0;
  }

  return false;
};

function buildBadMatchTable(str) {
  const tableObj = {};
  for (let i = 0; i < str.length - 1; i++) {
    tableObj[str[i]] = str.length - 1 - i;
  }
  if (!tableObj[str[str.length - 1]])
    tableObj[str[str.length - 1]] = str.length;
  return tableObj;
}

console.log(buildBadMatchTable("data"));
console.log(buildBadMatchTable("struct"));
console.log(buildBadMatchTable("roi"));
console.log(buildBadMatchTable("jam"));

function boyerMoore(str, pattern) {
  const badMatchTable = buildBadMatchTable(pattern);
  let offset = 0;
  let patternLastIndex = pattern.length - 1;
  let scanIndex = patternLastIndex;
  let maxOffset = str.length - pattern.length;

  while (offset <= maxOffset) {
    scanIndex = 0;

    console.log(pattern[scanIndex], scanIndex);
    console.log(str[scanIndex + offset]);

    while (pattern[scanIndex] === str[scanIndex + offset]) {
      console.log(pattern, offset);
      if (scanIndex === patternLastIndex) return offset;
      scanIndex++;
    }

    let badMatchString = str[offset + patternLastIndex];

    if (badMatchTable[badMatchString]) {
      offset += badMatchTable[badMatchString];
    } else {
      offset += 1;
    }
  }

  return -1;
}

console.log(boyerMoore("jellyjam", "jam"));
console.log(boyerMoore("jellyjam", "jelly"));
console.log(boyerMoore("jellyjam", "sam"));
