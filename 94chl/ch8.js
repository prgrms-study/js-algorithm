function solution1(n) {
  let answer = "";

  function convert(n) {
    if (n < 2) {
      answer += n;
      console.log("Result", n, answer);
      return;
    } else {
      console.log(n);
      convert(Math.floor(n / 2));
      console.log("NEXT", n);
      convert(n % 2);
    }
  }

  convert(n);

  return answer;
}

// console.log(solution1(9));

function swap(strArr, idx1, idx2) {
  let temp = strArr[idx1];
  strArr[idx1] = strArr[idx2];
  strArr[idx2] = temp;
}

function permute(strArr, begin, end) {
  const answer = [];
  if (begin == end) {
    console.log(strArr, begin, end);
    return strArr.join("");
  } else {
    for (let i = begin; i < end + 1; i++) {
      if (begin != i) swap(strArr, begin, i);
      const result = permute(strArr, begin + 1, end);
      if (begin != i) swap(strArr, begin, i);
      answer.push(result);
      console.log("END", answer, strArr);
    }
  }

  return answer;
}

function permuteArr(strArr) {
  return permute(strArr, 0, strArr.length - 1);
}

// console.log(permuteArr(["A", "B", "C"]));

const dictionary = {
  Key1: 1,
  Key2: {
    a: 2,
    b: 3,
    c: {
      d: 3,
      e: 1,
    },
  },
};

function flattenDictionary(dictionary) {
  let flattenedDictionary = {};

  function helper(dictionary, propName) {
    console.log("DICTIONARY", `"${propName}" =`, dictionary);
    if (typeof dictionary != "object") {
      flattenedDictionary[propName] = dictionary;
      return;
    }
    for (let prop in dictionary) {
      if (propName === "") {
        helper(dictionary[prop], propName + prop);
      } else {
        helper(dictionary[prop], `${propName}.${prop}`);
      }
    }
  }

  helper(dictionary, "");
  return flattenedDictionary;
}

// console.log(flattenDictionary(dictionary));
