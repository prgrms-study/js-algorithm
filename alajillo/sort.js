// unsorted array
const unsortedArray = [5, 2, 3, 1, 6, 7, 9, 8, 4];
console.log("unsortedArray :", unsortedArray);
function swap(array, index1, index2) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
// bubble sort
function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}
// selection sort
function selectionSort(array) {
  let len = array.length;
  let min;
  for (let i = 0; i < len; i++) {
    min = i;
    for (let j = i + 1; j < len; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    if (i !== min) {
      swap(array, i, min);
    }
  }
}
// insertion sort
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
    console.log(arr);
  }
  return arr;
}

// quick sort
function quickSort(array, left, right) {
  console.log(array, left, right);
  if (left < right) {
    const p = partition(array, left, right);

    quickSort(array, left, p - 1);
    quickSort(array, p + 1, right);
  }
}
function partition(array, left, right) {
  const pivot = array[right];
  let i = left - 1;
  for (let j = left; j <= right - 1; j++) {
    if (array[j] <= pivot) {
      i++;
      swap(array, i, j);
    }
  }
  swap(array, i + 1, right);
  return i + 1;
}

// quick selection
function quickSelection(array, left, right) {}
// merge sort
function mergeSort() {}
// count sort
// array.protoType.sort()

console.log("sortedArray : ", unsortedArray);
