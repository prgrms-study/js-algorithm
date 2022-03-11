function linearSearch(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) return i;
  }
  return -1;
}

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// console.log(linearSearch(arr1, 3));

function binarySearch(arr, n) {
  let lowIndex = 0;
  let highIndex = arr.length - 1;

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((highIndex + lowIndex) / 2);
    if (arr[midIndex] === n) {
      return midIndex;
    } else if (n > arr[midIndex]) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  }
  return -1;
}

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(binarySearch(arr2, 5));
