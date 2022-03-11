function linearSearch(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    console.log(i);
    if (arr[i] === n) {
      console.log(`arr[${i}]`, n);
      return true;
    }
  }

  return false;
}

// linearSearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 6);

function binarySearch(arr, n) {
  let lowIdx = 0;
  let highIdx = arr.length - 1;
  console.log(n);
  while (lowIdx <= highIdx) {
    let midIdx = Math.floor((lowIdx + highIdx) / 2);
    console.log(
      `[${lowIdx}]: ${arr[lowIdx]}`,
      `[${midIdx}]: ${arr[midIdx]}`,
      `[${highIdx}]: ${arr[highIdx]}`
    );
    if (arr[midIdx] === n) {
      console.log("DONE", midIdx);
      return midIdx;
    } else if (n > arr[midIdx]) {
      lowIdx = midIdx + 1;
    } else {
      highIdx = midIdx - 1;
    }
  }

  return -1;
}

// binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 6);

//

function swap(arr, idx1, idx2) {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

function bubbleSort(arr) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let o = 0; o <= i; o++) {
      console.log(i, o);
      if (arr[o] > arr[o + 1]) {
        console.log(`${arr[o]}[${o}] : ${arr[o + 1]}[${o + 1}]`);
        swap(arr, o, o + 1);
        console.log(JSON.parse(JSON.stringify(arr)));
      }
      count++;
    }
  }
  console.log(arr);
  console.log(count);
  return arr;
}

bubbleSort([6, 1, 3, 4, 2, 3, 5]);

function selectionSort(arr) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let o = i + 1; o < arr.length; o++) {
      console.log(i, o);
      if (arr[o] < arr[i]) {
        console.log(`${arr[o]}[${o}] : ${arr[o + 1]}[${o + 1}]`);
        swap(arr, i, o);
        console.log(JSON.parse(JSON.stringify(arr)));
      }
      count++;
    }
  }

  console.log(arr);
  console.log(count);
}

selectionSort([6, 1, 3, 4, 2, 3, 5]);

function insertionSort(arr) {
  let count = 0;
  let o;

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    for (o = i - 1; o > -1 && arr[o] > value; o--) {
      console.log(i, o);
      arr[o + 1] = arr[o];
      count++;
    }
    arr[o + 1] = value;
    console.log(JSON.parse(JSON.stringify(arr)));
    console.log(value);
  }

  console.log(arr);
  console.log(count);
}

insertionSort([6, 1, 3, 4, 2, 3, 5]);

function partition(arr, left, right) {
  const pivot = arr[Math.floor((left + right) / 2)];

  while (left <= right) {
    while (pivot > arr[left]) {
      left++;
    }
    while (pivot < arr[right]) {
      right--;
    }
    if (left <= right) {
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }
  }

  return left;
}

function quickSortHelper(arr, left, right) {
  console.log(JSON.parse(JSON.stringify(arr)));
  console.log(left, right);
  if (!arr.length) return arr;

  let index = partition(arr, left, right);
  console.log(`(${left}, ${right}) =  [${index}]${arr[index]}`);

  if (left < index - 1) {
    quickSortHelper(arr, left, index - 1);
  }

  if (index < right) {
    quickSortHelper(arr, index, right);
  }

  return arr;
}

function quickSort(arr) {
  const result = quickSortHelper(arr, 0, arr.length - 1);
  console.log(result);
  return result;
}

quickSort([6, 1, 3, 4, 2, 3, 5]);

function merge(leftArr, rightArr) {
  let result = [];
  let leftIdx = 0;
  let rightIdx = 0;

  while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
    if (leftArr[leftIdx] < rightArr[rightIdx]) {
      result.push(leftArr[leftIdx++]);
    } else {
      result.push(rightArr[rightIdx++]);
    }
  }

  const leftRemains = leftArr.slice(leftIdx);
  const rightRemains = rightArr.slice(rightIdx);

  result = result.concat(leftRemains).concat(rightRemains);

  return result;
}

function mergeSort(arr) {
  if (arr.length < 2) return arr;

  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);
  console.log(mid, leftArr, rightArr);
  const result = merge(mergeSort(leftArr), mergeSort(rightArr));

  console.log(result);
  return result;
}

mergeSort([6, 1, 3, 4, 2, 3, 5]);

function countSort(arr) {
  const hash = {};
  const countArr = [];
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    count++;
    if (!hash[arr[i]]) {
      hash[arr[i]] = 1;
    } else {
      hash[arr[i]]++;
    }
  }

  for (let key in hash) {
    for (let o = 0; o < hash[key]; o++) {
      console.log(hash[key], key, o);
      count++;
      countArr.push(parseInt(key));
    }
  }
  console.log(hash);
  console.log(countArr);
  console.log(count);
  return countArr;
}

countSort([6, 1, 3, 4, 2, 3, 5]);

//

function solution1(n) {
  let start = 1;
  let end = n;
  let mid = -1;
  console.log(n);
  while (end - start > 0.1) {
    mid = (start + end) / 2;
    console.log(`start: ${start}`, `mid: ${mid}`, `end: ${end}`);
    if (mid * mid === n) {
      console.log("DONE", mid);
      return mid;
    }

    if (mid * mid > n) {
      end = mid;
    } else {
      start = mid;
    }
  }

  console.log(mid);
  return mid;
}

solution1(10);

function solution2(arr, sum) {
  let answer;
  const dp = {};

  for (let i = 0; i < arr.length; i++) {
    if (dp[arr[i]]) {
      answer = true;
    } else {
      dp[sum - arr[i]] = arr[i];
    }
    console.log(dp, arr[i]);
  }
  answer = Object.entries(dp);
  console.log(answer);
  return answer;
}

solution2([1, 2, 3, 4, 5], 8);

function solution3(arr, low, high) {
  console.log(`low: ${arr[low]}[${low}]`, `high: ${arr[high]}[${high}]`);
  if (low > high) {
    console.log(arr[low]);
    return null;
  }

  if (low === high) {
    console.log(arr[low]);
    return arr[low];
  }

  let mid = Math.floor((low + high) / 2);

  console.log(`mid: ${arr[mid]}[${mid}]`);
  if (mid % 2 === 0) {
    if (arr[mid] === arr[mid + 1]) {
      console.log(mid);
      return solution3(arr, mid + 2, high);
    } else {
      console.log(mid);
      return solution3(arr, low, mid);
    }
  } else {
    if (arr[mid] === arr[mid - 1]) {
      console.log(mid);
      return solution3(arr, mid + 1, high);
    } else {
      console.log(mid);
      return solution3(arr, low, mid - 1);
    }
  }
}

const test3 = [1, 1, 2, 2, 4, 4, 5, 5, 6, 7, 7];

solution3(test3, 0, test3.length - 1);

function solution4(arr) {
  const result = arr.sort((a, b) => {
    console.log(a, b);
    return a.length - b.length;
  });

  console.log(result);
}

solution4(["123", "1", "123456", "12345", "12", "1234"]);

function solution5(sentence) {
  const wordsArr = sentence.toLowerCase().replace(/[.]/g, "").split(" ");
  const occurence = {};
  const answer = {};
  console.log(wordsArr);

  for (let i = 0; i < wordsArr.length; i++) {
    const currentWord = wordsArr[i];
    console.log(currentWord);
    if (!occurence[currentWord]) {
      occurence[currentWord] = 1;
    } else {
      occurence[currentWord]++;
    }
  }
  console.log(occurence);
  const arrTemp = [];

  for (let prop in occurence) {
    arrTemp.push([occurence[prop], prop]);
  }
  console.log(arrTemp);
  arrTemp.sort((a, b) => b[0] - a[0]);

  for (let o = 0; o < arrTemp.length; o++) {
    const current = arrTemp[o];
    console.log(current);
    answer[current[1]] = current[0];
  }
  console.log(answer);
  return answer;
}

solution5("Practice makes perfect. Get perfect by practice. Just practice");
