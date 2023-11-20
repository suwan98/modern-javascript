/* 제네레이터 함수 정의 */

/* 제네레이터 함수 선언문 */
function* getDeclarationFunction() {
  yield 1;
}

/* 제네레이터 함수 표현식 */
const getExpFunction = function* () {
  yield 1;
};

/* 제네레이터 메서드  */
const generatorObejct = {
  *generatorMethod() {
    yield 1;
  },
};

/* 제네레이터 클래스 메서드 */
class MyClass {
  *generatorMethod() {
    yield 1;
  }
}

/* 제네레이터 화살표 함수(정의 불가 ❌) */
// const generatorArrowFunction = *() => {
//     yield 1;
// }

/* 제네레이터 함수 생성자 함수로써 호출 (정의 불가 ❌) */
// function* getFunction() {
//   yield 1;
// }

// new getFunction();

/* 제네레이터 객체 */
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}
const generator = generatorFunction();
console.log(generator);
console.log(Symbol.iterator in generator); // true
console.log("next" in generator); // true

function* tryCatchGenerator() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (error) {
    console.log(error);
  }
}
const tryCatchGen = tryCatchGenerator();

/* { value : 1, done : false } */
console.log(generator.next());

/* { value : 'End!!' , done : true } */
console.log(generator.return("End!!"));

/* 제네레이터의 일시 중지와 재개 */
function* generatorFunction2() {
  yield 1;
  yield 2;
  yield 3;
}
const generator2 = generatorFunction2();

/* {value: 1, done: false} */
console.log(generator2.next());

/* {value: 2, done: false} */
console.log(generator2.next());

/* {value: 3, done: false} */
console.log(generator2.next());

/* 다시 next 메서드 호출 시 남은 yield 표현식이 없으므로 제네레이터 함수 마지막까지 실행 */
/* value 프로퍼티는 제네레이터 함수의 반환값 undefined 반환 done 프로퍼티 에는 제네레이터 함수가 끝까지 실행되어 있음을 알리는 true 가 할당 */
/* {value: undeinfed, done: true} */
console.log(generator2.next());

/* 제네레이터 객체의 next 메서드에 인수를 전달할 수 있다 */
function* generatorFunction3() {
  const x = yield 1;

  const y = yield x + 10;

  return x + y;
}

const generator3 = generatorFunction3(0);
let generatorResult = generator3.next();
console.log(generatorResult);
generatorResult = generator3.next(10);
console.log(generatorResult);
generatorResult = generator3.next(20);
console.log(generatorResult);

/* 제네레이터의 활용 */

/* 이터러블 구현 */
const infiniterFibonacci = (function* () {
  let [prev, current] = [0, 1];
  while (true) {
    [prev, current] = [current, prev + current];
    yield current;
  }
})();

/* infiniterFibonacci함수는 무한 이터러블이다 */
for (const num of infiniterFibonacci) {
  if (num > 10000) break;
  console.log(num);
}

/* 제네레이터 함수를 통한 비동기 처리 */
const asyncFunction = (generatorFunctionCallBack) => {
  const generator = generatorFunctionCallBack();

  const onResolved = (arg) => {
    const result = generator.next(arg);
    return result.done
      ? result.value
      : result.value.then((res) => onResolved(res));
  };
  return onResolved;
};

asyncFunction(function* fetchTodo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const response = yield fetch(url);
  const todo = yield response.json();

  /* {userId: 1, id: 1, title: 'delectus aut autem', completed: false} */
  console.log(todo);
})();

/* async/await를 통한 fetch 구현 */
async function fetchTodo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const response = await fetch(url);
  const todo = await response.json();

  /* {userId: 1, id: 1, title: 'delectus aut autem', completed: false} */
  console.log(todo);
}
fetchTodo();

/* await 키워드 */
const getGithubUserName = async (id) => {
  const response = await fetch(`https://api.github.com/users/${id}`);
  const {name} = await response.json();
  console.log(name); // 고수완
};
getGithubUserName("suwan98");

/* await 키워드는 다음 실행을 일시 중지시켰다가 프로미스가 settled 상태가 될 때 재개된다 */
async function foo() {
  const a = await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
  const b = await new Promise((resolve) => setTimeout(() => resolve(2), 2000));
  const c = await new Promise((resolve) => setTimeout(() => resolve(3), 1000));

  console.log([a, b, c]);
}

/* 약 6초 소요 */
foo();

/* promise.All을 통한 병렬처리 */
async function promiseAllFoo() {
  const response = await Promise.all([
    new Promise((res) => setTimeout(() => res(1)), 3000),
    new Promise((res) => setTimeout(() => res(2)), 2000),
    new Promise((res) => setTimeout(() => res(3)), 1000),
  ]);
  console.log(response);
}

/* 약 3초 소요 */
promiseAllFoo();

/* async/await에서의 에러 핸들링 */
const errorHandling = async () => {
  try {
    const wrongURL = "https://wroog.url";
    const response = await fetch(wrongURL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    /* TypeError: Failed to fetch */
    console.log(error);
  }
};
errorHandling();
