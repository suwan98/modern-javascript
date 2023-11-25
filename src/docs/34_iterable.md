# 모던자바스크립트 DeepDive 34장 : 이터러블

## 이터레이션 프로토콜

**ES6에서 도입된 이터레이션 프로토콜이란?**

- 순회가능한 데이터 자료구조를 만들기 위해 ECMAScript 사양에 정의해 미리 약속한 규칙
- ES6 이전의 순회 가능한 데이터 컬렉션(배열,문자열,유사배열객체, DOM 콜렉션)
  - 통일된 규약없이 각자 나람의 자료구조를 가지고 `for` 문`for-in`문 `forEach` 메서드등을 통해 다양한 방법으로 순회할 수 있었음
- ES6 이후에는 순회가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일
  - `for-of`문/스프레드문법/배열 디스트럭쳐링 할당의 대상으로 사용할 수 있도록 일원화

### 이터러블

**이터러블이란?**

- 이터러블 프로토콜을 준수한 객체
  - 즉, 이터러블은 `Symbol.iterator`를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체를 뜻함
- 이터러블인지 확인하는 함수는 다음과 같이 구현할 수 있음

```tsx
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
```

**이터러블인 배열은 Symbol.iterator 메서드를 상속받는다**

- 그러므로 `for-of`문으로 순회할 수 있으며, 스프레드문법과 배열 구조분해할당의 대상으로 사용할 수 있다

```jsx
/* 이터러블인 배열은 Symbol.iterator 메서드를 상속받는다 */

const iterableArray = [1, 2, 3];
console.log(Symbol.iterator in iterableArray); // true

/* 이터러블인 배열은 for-of문으로 순회가능하다 */
for (const item of iterableArray) {
  console.log(item); // 3 2 1
}

/* 이터러블인 배열은 전개연산자 사용이 가능하다 */
console.log([...iterableArray]); // [1,2,3]

/* 이터러블인 배열은 배열 구조분해할당이 가능하다 */
const [a, ...rest] = iterableArray;
console.log(rest); // [2,3]
```

**Symbol.iterator 메서드를 직접구현하지 않거나 상속받지 아니한 일반객체는 이터러블이 아니다**

- 따라서 `for-of`문으로 순회할 수 없으며 스프레드문법과 배열 디스트럭쳐링 할당이 불가능하다 ❌
- 단 2021년 1월, TC39 프로세스의 stage4 단계에 제안되어 있는 전개연산자 제안은 일반 객체에 대한 전개연산자 사용을 허용하고 있다

```jsx
/* Symbol.iterator 메서드를 직접구현하지 않거나 상속받지 아니한 일반객체는 이터러블이 아니다 */
const suwan = {age: 26, address: "seoul"};
console.log(Symbol.iterator in suwan); // false

/* Error : suwan is not iteralbe */
for (const item of suwan) {
  console.log(item);
}

/* 이터러블이 아닌 일반객체는 배열 구조분해 할당의 대상으로 사용할 수 없다 */

/* Error : suwan is not iteralbe */
const [a1, b2] = suwan;
console.log(a1);

/* 원래는 불가능하지만 전개연산자 제안으로 인해 객체 리터럴 내부에서 전개연산자 사용을 허용하고 있음 */
console.log({...suwan});
```

### 이터레이터

**이터러블의 Symbol.iterator 메서드 호출 시 이터레이터 프로토콜을 준수한 이터레이터를 반환**

- 이터러블의 `Symbol.iterator` 메서드가 반환한 이터레이터는 `next` 메서드를 가진다

```jsx
/* 이터러블의 Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 가진다 */
const iterableProtocolArray = [1, 2, 3];

/* Symbol.iterator() 메서드는 이터레이터를 반환 */
const iterator = iterableProtocolArray[Symbol.iterator]();

/* 반환한 이터레이터는 next 메서드를 가지게 된다 */
console.log("next" in iterator); // true
console.log(iterator.next()); // {value: 1, done: false}
```

## 빌트인 이터러블

**자바스크립트는 이터레이션 프로토콜을 준수한 객체인 빌트인 이터러블을 제공한다**

| 빌트인 이터러블 | Symbol.iterator 메서드                    |
| --------------- | ----------------------------------------- |
| Array           | Array.prototype[Symbol.iterator]          |
| String          | String.prototype[Symbol.iterator]         |
| Map             | Map.prototype[Symbol.iterator]            |
| Set             | Set.prototype[Symbol.iterator]            |
| TypedArray      | TypedArray.prototype[Symbol.iterator]     |
| arguments       | arguments[Symbol.iterator]                |
| DOMCollection   | HTMLCollection.prototype[Symbol.iterator] |
| NodeList        | NodeList.prototype[Symbol.iterator]       |

## for-of 문

**for-of문**

- 이터러블을 순회하며 이터러블의 요소를 변수에 할당

```tsx
for(변수선언문 of 이터러블){...}
```

**for-of문이 돌아가는 과정**

- 내부적으로 이터레이터의 `next` 메서드를 호출해 이터러블을 순회하며
  - `next` 메서드가 반환한 이터레이터 리절트 객체의 `value` 프로퍼티를 `for-of`문의 변수에 할당
  - 최종적으로 이터레이터 리절트 객체의 `done` 프로퍼티 값이 `false`가 되면 이터러블의 순회를 계속하고
  - `true`이면 이터러블의 순회를 중단

```tsx
/* for of문이 돌아가는 과정 */
for (const item of [1, 2, 3]) {
  /* item 변수에 순차적으로 1,2,3이 할당된다 */
  console.log(item);
}
```

## 이터러블과 유사배열 객체

**유사배열객체**

- 유사배열객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체렐 뜻한다

```tsx
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
```

**유사배열객체는 이터러블이 아닌 일반객체**

- 따라서 `Symobl.iterator` 메서드가 없으므로 `for-of`문으로 순회할 수 없다 ❌

```jsx
/* 유사배열객체는 이터러블이 아닌 일반객체 */
/* Error : arrayLike is not iterable */
for (const item of arrayLike) {
  console.log(item);
}
```

<aside>
💡 **단, arguments, NodeList, HTMLCollection은 유사배열객체이면서 이터러블**

</aside>

**Array.from으로 유사배열객체 또는 이터러블을 인수로 전달받아 배열로 변환해 반환할 수 있다**

```jsx
/* 유사배열 객체 */
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};
const realArray = Array.from(arrayLike);
console.log(realArray);
```

## 이터레이션 프로토콜의 필요성

**이터러블의 역할**

- for-of문, 스프레드 연산자, 배열 구조분해할당과 같은 데이터 소비자에 의해 사용된다
  - 따라서 이터러블은 데이터 공급자의 역할을 한다고 할 수 있다

**만약 다양한 데이터 공급자가 각자의 순회방식을 가진다면?**

- 데이터소비자는 다양한 데이터 공급자의 순회방식을 모두 지원해야 함
  - 이는 효율적이지 ❌
  - 하지만 다양한 데이터 공급자가 이터레이션 프로토콜을 준수하도록 규정하면 데이터 소비자는 이터레이션 프로토콜만 지원하도록 구현하면 됨
- 즉, 이터러블을 지원하는 데이터 소비자는 내부에서 `Symbol.iterator` 메서드를 호출해 이터레이터를 생성하고, 이터레이터 `next` 메서드를 호출 해 이터러블을 순회해 이터레이터 리절트 객체를 반환한다.
- 그리고 이터레이터 리절트 객체의 `value/done` 프로퍼티의 값을 취득
- 이처럼 이터레이션 프로토콜은 다양한 데이터 공급자가 하나의 순회방식을 갖도록 규정하는 것
  - 데이터소비자가 효율적으로 다양한 데이터 공급자를 사용할 수 있도록
  - 데이터 소비자와 데이터 공급자를 연결하는 인터페이스 역할을 하게 된다
