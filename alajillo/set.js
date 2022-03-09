const set = new Set();

set.add(1);

set.delete(1);

set.has(1);

function intersectSets(setA, setB) {
  const intersection = new Set();
  setB.forEach((el) => {
    setA.has(el) && intersection.add(el);
  });
  return intersection;
}

const set1 = new Set();
const set2 = new Set();
const set3 = new Set();
set1.add(1);
set1.add(2);
set2.add(2);
set3.add(4);
console.log(intersectSets(set1, set2)); // { 2 }

function isSuperSet(setA, subset) {
  subset.forEach((el) => {
    if (!setA.has(el)) return false;
  });
  return true;
}
console.log(isSuperSet(set1, set2)); // true;

console.log(isSuperSet(set2, set1)); // true?

function unionSet(setA, setB) {
  const union = new Set(setA);
  setB.forEach((el) => union.add(el));
  return union;
}

console.log(unionSet(set1, set3)); // {1, 2, 4}

function checkDuplicates(arr) {
  const mySet = new Set(arr);
  return mySet.size < arr.length;
}

function uniqueList(arr1, arr2) {
  const mySet = new Set(arr1.concat(arr2));
  return Array.from(mySet);
}
