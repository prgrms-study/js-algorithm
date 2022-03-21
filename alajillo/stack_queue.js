function Stack(array) {
  this.array = [];
  this.array.length && (this.array = array);

  Stack.prototype.getBuffer = function () {
    return this.array.slice();
  };
  Stack.prototype.isEmpty = function () {
    return this.array.length === 0;
  };
  Stack.prototype.peek = function () {
    return this.array[this.array.length - 1];
  };
  Stack.prototype.push = function (value) {
    try {
      this.array.push(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  Stack.prototype.pop = function () {
    return this.array.pop();
  };
}

function stackAccessNthTopNode(stack, n) {
  const bufferArray = stack.getBuffer();
  if (n <= 0) throw "error";
  while (--n !== 0) {
    bufferArray.pop();
  }
  return bufferArray.pop();
}

const stack2 = new Stack();
stack2.push(1);
stack2.push(2);
stack2.push(3);
[1, 2, 3];
console.log(stackAccessNthTopNode(stack2, 2));

function stackSearch(stack, element) {
  const bufferArray = stack.getBuffer();
  while (bufferArray.isEmpty()) {
    if (bufferArray.pop() === element) {
      return true;
    }
  }
  return false;
}
