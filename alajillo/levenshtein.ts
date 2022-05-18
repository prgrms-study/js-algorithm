function editDistanceDp(
  str1: string,
  str2: string,
  length1: number,
  length2: number
) {
  const dpMatrix = [];
  for (let i = 0; i < length1 + 1; i++) {
    dpMatrix[i] = [];
    for (let j = 0; j < length2 + 1; j++) {
      dpMatrix[i][j] = undefined;
    }
  }

  for (let i = 0; i < length1 + 1; i++) {
    for (let j = 0; j < length2 + 1; j++) {
      if (i === 0) {
        dpMatrix[i][j] = j;
      } else if (j === 0) {
        dpMatrix[i][j] = i;
      } else if (str1[i - 1] === str2[j - 1]) {
        dpMatrix[i][j] = dpMatrix[i - 1][j - 1];
      } else {
        const insertCost = dpMatrix[i][j - 1];
        const removeCost = dpMatrix[i - 1][j];
        const replaceCost = dpMatrix[i - 1][j - 1];
        dpMatrix[i][j] = 1 + Math.min(insertCost, removeCost, replaceCost);
      }
    }
  }
  return dpMatrix[length1][length2];
}

function editDistanceDpWrapper(str1: string, str2: string) {
  return editDistanceDp(str1, str2, str1.length, str2.length);
}

console.log(editDistanceDpWrapper('sammie', 'bae'));
