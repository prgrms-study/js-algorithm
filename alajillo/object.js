class Animal {
  #name;
  #animalType;
  constructor(name, animalType) {
    this.#name = name;
    this.#animalType = animalType;
  }
  sayName() {
    console.log(this.#name);
  }
  sayAnimalType() {
    console.log(this.#animalType);
  }
  test() {
    console.log("이거는 Cat이 가지는 메서드가 아니다.");
  }
}
// 상속
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

// 합성
class Dog {
  #animal;
  constructor(Animal, name) {
    this.#animal = new Animal(name, "Dog");
  }
  sayName() {
    this.#animal.sayName();
  }
  sayAnimalType() {
    this.#animal.sayAnimalType();
  }
}

const myAninal = new Animal("ditto", "pokemon");
myAninal.sayName();
myAninal.sayAnimalType();

const myDog = new Dog(Animal, "candy");
myDog.sayName();
myDog.sayAnimalType();

const myCat = new Cat("cat");
myCat.sayName();
myCat.test();

console.log("프르토타입 객체", myCat);
