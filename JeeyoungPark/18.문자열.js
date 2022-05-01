const TrieNode = () => {
    this.children = {};
    this.endOfWord = false
}

const Trie = () =>{
    this.root = new TrieNode();
}

Trie.prototype.insert = (word) => {
    let current = this.root;
    
    for (let i = 0; i < word.length; i++) {
        let ch = word.charAt(i);
        let node = current.children[ch];

        if (node === null) {
            node = new TrieNode();
            current.children[ch] = node;
        }

        current = node;
    }

    current.endOfWord = true; // 현재 노드의 
}


