/* 해당하는 객체가 이터러블인지 아닌지 확인하는 함수 */
function isIterable(obj) {
  return obj !== null && typeof obj[Symbol.iterator] === "function";
}

/* 배열은 이터러블이다 */
console.log(isIterable([])); // true

/* 문자열은 이터러블이다 */
console.log(isIterable("")); // true

/* Map/Set은 이터러블이다 */
console.log(isIterable(new Map())); // true
console.log(isIterable(new Set())); // true

/* 객체는 이터러블하지 않다 */
console.log(isIterable({})); // false

/* 이터러블인 배열은 Symbol.iterator 메서드를 상속받는다 */

const iterableArray = [1, 2, 3];
console.log(Symbol.iterator in iterableArray); // true
/* 이터러블인 배열은 for-of문으로 순회가능하다 */
for (const item of iterableArray) {
  console.log(item); // 3 2 1
}
/* 이터러블인 배열은 전개연산자 사용이 가능하다 */
console.log([...iterableArray]);
/* 이터러블인 배열은 배열 구조분해할당이 가능하다 */
const [a, ...rest] = iterableArray;
console.log(rest); // [2,3]

/* Symbol.iterator 메서드를 직접구현하지 않거나 상속받지 아니한 일반객체는 이터러블이 아니다 */
const suwan = {age: 26, address: "seoul"};
console.log(Symbol.iterator in suwan); // false
/* Error : suwan is not iteralbe */
// for (const item of suwan) {
//   console.log(item);
// }
/* 이터러블이 아닌 일반객체는 배열 구조분해 할당의 대상으로 사용할 수 없다 */
/* Error : suwan is not iteralbe */
// const [a1, b2] = suwan;
// console.log(a1);
/* 원래는 불가능하지만 전개연산자 제안으로 인해 객체 리터럴 내부에서 전개연산자 사용을 허용하고 있음 */
console.log({...suwan});

/* 이터러블의 Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 가진다 */
const iterableProtocolArray = [1, 2, 3];

/* Symbol.iterator() 메서드는 이터레이터를 반환 */
const iterator = iterableProtocolArray[Symbol.iterator]();

/* 반환한 이터레이터는 next 메서드를 가지게 된다 */
console.log("next" in iterator); // true
console.log(iterator.next()); // {value: 1, done: false}

/* for of문이 돌아가는 과정 */
for (const item of [1, 2, 3]) {
  /* item 변수에 순차적으로 1,2,3이 할당된다 */
  console.log(item);
}

/* 유사배열 객체 */
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

/* 유사배열객체는 length 프로퍼티를 가지므로 for문으로 순회할 수 있다 */
for (let i = 0; i < arrayLike.length; i++) {
  /* 유사 배열 객체는 마치 배열처럼 이넫스로 프로퍼티 값에 접근할 수 있다 */
  console.log(arrayLike[i]); // 3 2 1
}

/* 유사배열객체는 이터러블이 아닌 일반객체 */
/* Error : arrayLike is not iterable */
// for (const item of arrayLike) {
//   console.log(item);
// }

/* Array.from으로 유사배열객체 또는 이터러블을 인수로 전달받아 배열로 변환해 반환할 수 있다 */
const realArray = Array.from(arrayLike);
console.log(realArray);

/* 사용자 정의 이터러블 (피보나치 수열) */
const fibonacci = {
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    const max = 10;

    return {
      next() {
        [pre, cur] = [cur, pre + cur];

        return {value: cur, done: cur >= max};
      },
    };
  },
};

/* 사용자 정의 이터러블 객체인 fibonacci는 for-of문으로 순회가 가능해진다 */
for (const item of fibonacci) {
  console.log(item); // 8 5 3 2 1
}

function fibonacciFunction(maxValue) {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return {value: cur, done: cur >= maxValue};
        },
      };
    },
  };
}
