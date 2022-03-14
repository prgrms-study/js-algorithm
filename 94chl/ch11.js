const input = {
  7: "hi",
  20: "hello",
  33: "sunny",
  46: "weather",
  59: "wow",
  72: "forty",
  85: "happy",
  98: "sad",
};

function LinearHashTable(size) {
  this.size = size;
  this.keys = this.initArray(size);
  this.values = this.initArray(size);
  this.limit = 0;
}

LinearHashTable.prototype.put = function (key, value) {
  if (this.limit >= this.size) throw "hash table is fulled";

  let hashedIndex = this.hash(key);

  // 선형
  while (this.keys[hashedIndex] !== null) {
    hashedIndex++;

    hashedIndex = hashedIndex % this.size;
  }

  this.keys[hashedIndex] = key;
  this.values[hashedIndex] = value;
  this.limit++;
};

LinearHashTable.prototype.get = function (key) {
  let hashedIndex = this.hash(key);

  // 선형
  while (this.keys[hashedIndex] !== key) {
    hashedIndex++;

    hashedIndex = hashedIndex % this.size;
  }

  return this.values[hashedIndex];
};

LinearHashTable.prototype.hash = function (key) {
  if (!Number.isInteger(key)) throw "must be int";

  return key % this.size;
};

LinearHashTable.prototype.initArray = function (size) {
  const array = new Array(size).fill(null);

  return array;
};

const linearTable = new LinearHashTable(13);

for (let key in input) {
  linearTable.put(parseInt(key), input[key]);
}

console.log(linearTable);

//

function SquareHashTable(size) {
  this.size = size;
  this.keys = this.initArray(size);
  this.values = this.initArray(size);
  this.limit = 0;
}

SquareHashTable.prototype.put = function (key, value) {
  if (this.limit >= this.size) throw "hash table is fulled";

  let hashedIndex = this.hash(key),
    squareIndex = 1;

  // 이차
  while (this.keys[hashedIndex % this.size] !== null) {
    hashedIndex += Math.pow(squareIndex, 2);

    squareIndex++;
  }

  this.keys[hashedIndex % this.size] = key;
  this.values[hashedIndex % this.size] = value;
  this.limit++;
};

SquareHashTable.prototype.get = function (key) {
  let hashedIndex = this.hash(key),
    squareIndex = 1;

  // 이차
  while (this.keys[hashedIndex % this.size] !== key) {
    hashedIndex += Math.pow(squareIndex, 2);

    hashedIndex = hashedIndex % this.size;
    squareIndex++;
  }

  return this.values[hashedIndex % this.size];
};

SquareHashTable.prototype.hash = function (key) {
  if (!Number.isInteger(key)) throw "must be int";

  return key % this.size;
};

SquareHashTable.prototype.initArray = function (size) {
  const array = new Array(size).fill(null);

  return array;
};

const squareTable = new SquareHashTable(13);

for (let key in input) {
  squareTable.put(parseInt(key), input[key]);
}

console.log(squareTable);
//

function LinearSquareHashTable(size) {
  this.size = size;
  this.keys = this.initArray(size);
  this.values = this.initArray(size);
  this.limit = 0;
}

LinearSquareHashTable.prototype.put = function (key, value) {
  if (this.limit >= this.size) throw "hash table is fulled";

  let hashedIndex = this.hash(key);

  // 선형 이중
  while (this.keys[hashedIndex] !== null) {
    hashedIndex++;

    hashedIndex = hashedIndex % this.size;
  }

  this.keys[hashedIndex] = key;
  this.values[hashedIndex] = value;
  this.limit++;
};

LinearSquareHashTable.prototype.get = function (key) {
  let hashedIndex = this.hash(key);

  // 선형 이중
  while (this.keys[hashedIndex] !== key) {
    hashedIndex++;

    hashedIndex = hashedIndex % this.size;
  }

  return this.values[hashedIndex];
};

LinearSquareHashTable.prototype.hash = function (key) {
  if (!Number.isInteger(key)) throw "must be int";

  return this.secondHash(key);
};

LinearSquareHashTable.prototype.secondHash = function (hashedKey) {
  const R = this.size - 2;
  console.log(R);
  return R - (hashedKey % R);
};

LinearSquareHashTable.prototype.initArray = function (size) {
  const array = new Array(size).fill(null);

  return array;
};

const linearSquareTable = new LinearSquareHashTable(13);

for (let key in input) {
  linearSquareTable.put(parseInt(key), input[key]);
}

console.log(linearSquareTable);
//

console.log(linearTable.values);
console.log(squareTable.values);
console.log(linearSquareTable.values);
