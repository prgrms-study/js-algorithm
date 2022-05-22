class Item {
  value: number;
  weight: number;
  constructor(value: number, weight: number) {
    this.value = value;
    this.weight = weight;
  }
}

function getRandomInt(range: number) {
  return Math.ceil(Math.random() * range);
}

function getItems(length: number) {
  const items = [];
  for (let i = 0; i < length; i++) {
    const weight = getRandomInt(8);
    const value = getRandomInt(5);
    const newItem = new Item(value, weight);
    items.push(newItem);
  }
  return items;
}

function backpack(items: Item[], spare: number) {
  function backpackHelper(index: number, spare: number) {
    if (index <= -1 || spare <= 0) return 0;
    if (items[index].weight > spare) {
      return backpackHelper(index - 1, spare);
    }
    const current = backpackHelper(index - 1, spare);
    const case1 =
      items[index].value +
      backpackHelper(index - 1, spare - items[index].weight);
    return Math.max(current, case1);
  }

  return backpackHelper(items.length - 1, spare);
}

const items = getItems(3);
console.log('items : ', items);
console.log(backpack(items, 10));
