class PersonClass {
  name;
  #age;
  #number = "1234567890";
  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }
  getAge() {
    return this.#age;
  }
  setAge(nextAge) {
    if (nextAge > 0) {
      this.#age = nextAge;
    }
  }
  #getNumber() {
    return this.#number;
  }
  getNumberAsNumber() {
    return Number(this.#getNumber());
  }
}

function PersonFunction(name, age) {
  this.name = name;
  let _age = age;
  const number = "1230401902193";
  this.getAge = () => {
    return _age;
  };
  this.setAge = () => {
    if (nextAge > 0) {
      _age = nextAge;
    }
  };
  const getNumber = () => {
    return number;
  };
  this.getNumberAsNumber = () => {
    return parseInt(getNumber());
  };
}
const test = new PersonClass("alajillo", 27);
console.log(test.name);
console.log(test.age);
// console.log(test.getNumber());
console.log(test.getNumberAsNumber());

const test2 = new PersonFunction("alajillo", 28);
console.log(test2.name);
console.log(test2.age);
// console.log(test2.getNumber());
console.log(test2.getNumberAsNumber());
