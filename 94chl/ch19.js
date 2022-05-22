function stepDP(step) {
  const cache = {};
  if (step < 0) return 0;
  if (step === 0) return 1;

  if (cache[step]) {
    console.log(cache, step);
    return cache[step];
  } else {
    cache[step] = stepDP(step - 1) + stepDP(step - 2) + stepDP(step - 3);
    console.log(cache, step);
    return cache[step];
  }
}

// const stepDPResult = stepDP(4);
// console.log(stepDPResult);

function knapsackNaive(index, weight, values, target) {
  let result = 0;

  if (index <= 1 || target <= 0) {
    result = 0;
    console.log(result, index);
  } else if (weight[index] > target) {
    result = knapsackNaive(index - 1, weight, values, target);
    console.log(result, index);
  } else {
    const current = knapsackNaive(index - 1, weight, values, target);
    const currentPlusOther =
      values[index] +
      knapsackNaive(index - 1, weight, values, target - weight[index]);
    console.log(current, currentPlusOther);
    result = Math.max(current, currentPlusOther);
    console.log(result, index);
  }
  console.log(result);
  return result;
}

function knapsackDP(index, weight, values, target, matrix) {
  let result = 0;

  if (matrix[index + "-" + target]) {
    console.log(matrix[index + "-" + target]);
    return matrix[index + "-" + target];
  }

  if (index <= 1 || target <= 0) {
    console.log(index);
    result = 0;
    console.log(result);
  } else if (weight[index] > target) {
    console.log(index);
    result = knapsackNaive(index - 1, weight, values, target, matrix);
    console.log(result);
  } else {
    console.log(index, values[index]);
    const current = knapsackNaive(index - 1, weight, values, target, matrix);
    const currentPlusOther =
      values[index] +
      knapsackNaive(index - 1, weight, values, target - weight[index], matrix);
    console.log(current, currentPlusOther);
    result = Math.max(current, currentPlusOther);
    console.log(result);
  }
  console.log(result);
  matrix[index + "-" + target] = result;
  return result;
}

const weight = [1, 2, 3, 4, 5];
const values = [5, 3, 5, 3, 2];
const target = 10;

// const knapsackNaiveResult = knapsackNaive(4, weight, values, target);
// const knapsackDPResult = knapsackDP(4, weight, values, target, {});
// console.log(knapsackNaiveResult);
// console.log(knapsackNaiveResult);

let startTime, endTime;

function lcsNaive(str1, str2, str1Length, str2Length) {
  if (str1.length === str1Length) startTime = performance.now();
  if (str1Length === 1) endTime = performance.now();

  if (str1Length === 0 || str2Length === 0) {
    return 0;
  }

  if (str1[str1Length - 1] === str2[str2Length - 1]) {
    return 1 + lcsNaive(str1, str2, str1Length - 1, str2Length - 1);
  } else {
    return Math.max(
      lcsNaive(str1, str2, str1Length, str2Length - 1),
      lcsNaive(str1, str2, str1Length - 1, str2Length)
    );
  }
}

let startTimeDP, endTimeDP;

function lcsDP(str1, str2) {
  let matrix = Array(str1.length + 1).fill(Array(str2.length).fill(0));
  let max = 0;

  startTimeDP = performance.now();

  for (let row = 0; row < str1.length; row++) {
    for (let col = 0; col < str2.length; col++) {
      if (col === 0 || row === 0) {
        matrix[row][col] = 0;
        continue;
      }
      console.log(row, col, str1[row - 1], str2[col - 1]);
      if (str1[row - 1] === str2[col - 1]) {
        matrix[row][col] = matrix[row - 1][col - 1] + 1;
        max = Math.max(matrix[row][col], max);
      } else {
        if (matrix[row - 1][col] > matrix[row][col - 1]) {
          matrix[row][col] = matrix[row - 1][col];
        } else {
          matrix[row][col] = matrix[row][col - 1];
        }
      }
    }
  }
  console.log(matrix);
  endTimeDP = performance.now();
  return max;
}

// const lcsNaiveResult1 = lcsNaive("AGGTAB", "GXTXAYB", 6, 7);
// const lcsDPResult1 = lcsDP("AGGTAB", "GXTXAYB");
// const lcsNaiveResult2 = lcsNaive("abcd", "bc", 4, 2);
// const lcsDPResult2 = lcsDP("abcd", "bc");
// console.log(endTime - startTime);
// console.log(endTimeDP - startTimeDP);

// console.log(lcsNaiveResult1);
// console.log(lcsDPResult1);
// console.log(lcsNaiveResult2);
// console.log(lcsDPResult2);

function coinDP(coinArr, coinValue) {
  const dp = Array.from(Array(coinValue + 1), () => new Array(coinArr.length));

  for (let i = 0; i < coinArr.length; i++) {
    dp[0][i] = 1;
  }

  for (let i = 1; i < coinValue + 1; i++) {
    for (let o = 0; o < coinArr.length; o++) {
      let temp1 = 0;
      let temp2 = 0;

      if (i - coinArr[o] >= 0) {
        temp1 = dp[i - coinArr[o]][o];
      }

      if (o >= 1) {
        temp2 = dp[i][o - 1];
      }

      dp[i][o] = temp1 + temp2;
    }
  }
  console.log(dp);
  return dp[coinValue][coinArr.length - 1];
}

// coinDP([1, 2, 3], 4);

function editDP(str1, str2) {
  const dp = Array.from(
    Array(str1.length + 1),
    () => new Array(str2.length + 1)
  );

  for (let i = 0; i < str1.length + 1; i++) {
    for (let o = 0; o < str2.length + 1; o++) {
      if (i === 0) {
        dp[i][o] = o;
      } else if (o === 0) {
        dp[i][o] = i;
      } else if (str1[i - 1] === str2[o - 1]) {
        dp[i][o] = dp[i - 1][o - 1];
      } else {
        const insertCost = dp[i][o - 1];
        const removeCost = dp[i - 1][o];
        const replaceCost = dp[i - 1][o - 1];

        dp[i][o] = 1 + Math.min(insertCost, removeCost, replaceCost);
      }
    }
  }
  console.log(dp);
  return dp[str1.length][str2.length];
}

editDP("simple", "bae");
