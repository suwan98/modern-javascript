# 개요

**구조분해할당이란?**

- 구조화된 배열과 같은 이러터블 또는 객체를 비구조화하여 1개 이상의 변수에 개별적으로 할당하는것을 의미
- 배열과 같은 이러터블 또는 객체 리터럴에서 필요한 값만 추출해 변수에 할당할 때 유용하다

## 배열 구조분해할당

**배열 구조분해할당**

- 배열의 각 요소를 배열로부터 추출해 1개 이상 변수에 할당
  - 이때 배열 구조분해 할당의 대상은 이터러블이어야 하며 할당 기준은 배열의 인덱스이다

```jsx
/* 구조분해 할당 */

/* 배열의 구조분해할당 */

const arr = [1, 2, 3];

const [a, b, c] = arr;
console.log(a, b, c); // 1 2 3
```

**배열 구조분해할당을 위해선 할당 연산자 왼족에 값을 할당받을 변수를 선언해야한다**

- 이때 변수는 배열 리터럴 형태로 선언해야함

```tsx
const [x, y] = [1, 2];
```

**이때 우변에 이터러블을 할당하지 않을 시 에러가 발생한다**

```jsx
/* 우변에 이터러블을 할당하지 않을 시 에러가 발생한다 */

/* {} is not iterable */
const [x1, y2] = {};
```

**배열 구조분해할당의 할당 기준은?**

- 인덱스

```jsx
/* 배열 구조분해할당의 할당기준은 인덱스 */
const [a2, b2] = [1, 2];
console.log(a2, b2); // 1 | 2

const [c1, d1] = [1];
console.log(c1, d1); // 1 |
```

**배열 구조분해할당을 위한 변수에 기본값을 지정할 수도 있다**

- 원래대로라면 `defaultValueC`에는 값이 할당되지않았으므로 `undefined`가 나왔어야하지만 기본값을 3으로 설정해서 3이 출력되고있다

```jsx
/* 배열 구조분해할당을 위한 변수에 기본값을 지정 */

const [defaultValueA, defaultValueB, defaultValueC = 3] = [1, 2];

console.log(defaultValueA, defaultValueB, defaultValueC); // 1 | 2 | 3
```

**배열 구조분해 할당을 위한 변수에도 Rest 요소를 사용할 수 있다**

- 이때 나머지 요소는 반드시 마지막에 위치해야하며
  - 좌변의 배열 내 나머지 요소들을 배열로써 출력한다

```jsx
/* 배열 구조분해할당 변수에도 Rest 요소 사용 가능 */

const [value, **...rest**] = [1, 2, 3];

console.log(value); // 1
console.log(rest); // [2, 3]
```

## 객체 구조분해할당

**객체 구조분해할당**

- 객체의 각 프로퍼티를 객체로부터 추출해 1개이상 변수에 할당
  - 이때 할당문의 우변은 객체이어야하며 **할당기준은 프로퍼티키이다**
    - 순서는 의미가 없으며 **선언된 변수이름과 프로퍼티 키가 일치해야함**

```jsx
/* 객체 구조분해할당 */

const user = {
  firstName: "suwan",
  lastName: "go",
};

const {firstName, lastName} = user;
console.log(firstName); // 'suwan'
```

**객체 구조분해할당을 위해선 할당 연산자 왼쪽에 프로퍼티 값을 할당받을 변수를 선언해야함**

- 이때 변수를 객체 리터럴 형태로 선언해야 함

```tsx
const {name, age} = {name: "이강인", age: "24"};
```

**객체 프로퍼티 키와 다른 변수를 프로퍼티 값으로 할당받으려면?**

- 할당할 프로퍼티에 : 뒤에 원하는 변수를 선언
- 아래는 `firstName` 프로퍼티 키를 `fi`이라는 키로 변환한것

```jsx

const user = {
  firstName: "suwan",
  lastName: "go",
};

/* 객체 프로퍼티 키와 다른 변수를 프로퍼티 값으로 할당받으려면? */
const {firstName: fi, lastName: la} = user;
console.log(fi); /
```

**객체 구조분해할당을 위한 변수에 기본값을 설정할 수 있다**

```jsx
/* 객체 구조분해할당 기본값 설정 */
const soccer = {
  name: "messi",
};

const {name: n, carreer = "GOAT"} = soccer;
console.log(n); // 'messi'
console.log(carreer); // '
```

**객체에 프로퍼티키로 필요한 프로퍼티값만 추출해 변수로 사용할 때 유용하다**

```jsx
/* 부분 추출 */
const tottenhamStriker = "손흥민";

/* string 래퍼객체의 length 프로퍼티만 부분적으로 추출함 */
const {length} = tottenhamStriker;
console.log(length); // 3

const todo = {
  id: 1,
  content: "HTML",
  complted: true,
};
/* todo 객체의 id 프로퍼티만 부분적으로 추출 */
const {id} = todo;
console.log(id); // 1
```

**객체를 인수로 전달받는 함수의 매개변수에도 유용하게 사용될 수 있다**

- 구조분해할당하기 전 / 후로 비교

```jsx
/* 함수에 인수로 객체의 프로퍼티를 전달받아야 하는 경우 유용하다 */
const todo = {
  id: 1,
  content: "HTML",
  complted: true,
};

/* 구조분해할당하기전 */
function printTodo(todo) {
  console.log(
    `할일 ${todo.content}은 ${todo.complted ? "완료" : "미완료"} 상태입니다`
  );
}
printTodo(todo);
```

- 객체를 인수로 전달받는 매개변수 todo에 구조분해할당을 하면 더 간결하게 표현할 수 있게된다

```jsx
const todo = {
  id: 1,
  content: "HTML",
  complted: true,
};

/* 구조분해할당 한 후 */
function printTodoDestructuring({content, complted}) {
  console.log(`할일 ${content}은 ${complted ? "완료" : "미완료"} 상태입니다`);
}
printTodoDestructuring(todo);
```

**배열의 요소가 객체인 경우 배열 구조분해할당과 객체 구조분해할당을 혼용해서 사용할 수 있다**

```jsx
/* 배열의 요소가 객체인 경우 혼용 */
const todos = [
  {
    id: 1,
    content: "HTML",
    complted: true,
  },
  {
    id: 2,
    content: "CSS",
    complted: false,
  },
  {
    id: 3,
    content: "JavaScript",
    complted: true,
  },
];

/* 배열의 첫번째 요소에 complted 프로퍼티에 대한 구조분해할당 */
const [{complted}] = todos;
console.log(complted); // true

/* 배열의 두번째 요소의 complted 프로퍼티에 대한 구조분해할당 */
const [, {complted: co}] = todos;
console.log(co); // false
```

**중첩객체의 경우?**

```jsx
/* 중첩된 객체의 구조분해할당 */
const nestedObject = {
  name: "seju",
  address: {
    zipCode: "03067",
    city: "seoul",
  },
};

/* address 프로퍼티 키로 객체를 추출 후 해당 객체의 city 프로퍼티 키로 값을 추출 */
const {
  address: {city},
} = nestedObject;

console.log(city);
```

> 💡 **Rest 프로퍼티**

**배열 구조분해할당과 마찬가지로 Rest 프로퍼티를 제공한다**

- `…`
- 반드시 객체의 마지막에 위치해야한다

```jsx
/* Rest 프로퍼티 */

const {x1, ...restProperty} = {x1: 1, y: 2, z: 3};

console.log(restProperty); // {x : 2 , z : 3}
```
