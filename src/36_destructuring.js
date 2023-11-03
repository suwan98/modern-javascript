/* 구조분해 할당 */

/* 배열의 구조분해할당 */
const arr = [1, 2, 3];
const [a, b, c] = arr;
console.log(a, b, c); // 1 2 3

/* 배열 구조분해할당을 위해선 할당 연산자 왼족에 값을 할당받을 변수를 선언해야한다 */
const [x, y] = [1, 2];

/* 우변에 이터러블을 할당하지 않을 시 에러가 발생한다 */
// const [x1, y2] = {};

/* 배열 구조분해할당의 할당기준은 인덱스 */
const [a2, b2] = [1, 2];
console.log(a2, b2); // 1 | 2

const [c1, d1] = [1];
console.log(c1, d1); // 1 | undefined

/* 배열 구조분해할당을 위한 변수에 기본값을 지정 */
const [defaultValueA, defaultValueB, defaultValueC = 3] = [1, 2];
console.log(defaultValueA, defaultValueB, defaultValueC); // 1 | 2 | 3

/* 배열 구조분해할당 변수에도 Rest 요소 사용 가능 */
const [value, ...rest] = [1, 2, 3];
console.log(value); // 1
console.log(rest); // [2, 3]

/* 객체 구조분해할당 */
const user = {
  firstName: "suwan",
  lastName: "go",
};
const {firstName, lastName} = user;
console.log(firstName); // 'suwan'

/* 객체 구조분해할당 방법 */
const {name, age} = {name: "이강인", age: "24"};

/* 객체 프로퍼티 키와 다른 변수를 프로퍼티 값으로 할당받으려면? */
const {firstName: fi, lastName: la} = user;
console.log(fi); // 'suwan

/* 객체 구조분해할당 기본값 설정 */
const soccer = {
  name: "messi",
};

const {name: n, carreer = "GOAT"} = soccer;
console.log(n); // 'messi'
console.log(carreer); // 'GOAT'

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

/* 함수에 인수로 객체의 프로퍼티를 전달받아야 하는 경우 유용하다 */
/* 구조분해할당하기전 */
function printTodo(todo) {
  console.log(
    `할일 ${todo.content}은 ${todo.complted ? "완료" : "미완료"} 상태입니다`
  );
}
printTodo(todo);
/* 구조분해할당 한 후 */
function printTodoDestructuring({content, complted}) {
  console.log(`할일 ${content}은 ${complted ? "완료" : "미완료"} 상태입니다`);
}
printTodoDestructuring(todo);

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

/* Rest 프로퍼티 */
const {x1, ...restProperty} = {x1: 1, y: 2, z: 3};
console.log(restProperty); // {x : 2 , z : 3}
