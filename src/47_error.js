console.log("시작");

// /* 발생한 에러를 방치하면 프로그램은 강제 종료된다 */
// foo();

// /* 에러에 의해 프로그램이 강제 종료되어 아래 코드는 실행되지 않는다 */
// console.log("종료!");

console.log("시작");

try {
  foo();
} catch (error) {
  console.error("에러발생", error);
}

console.log("계속 실행됩니다");

/* querySelecotor는 요소가 존재하지 않는다면 null을 반환 */
const $btn = document.querySelector("button"); // null

/* 47_error.js:21 Uncaught TypeError: Cannot read properties of null (reading 'classList') */
$btn?.classList.add("disabled");

/* try-catch-finally */

try {
  foo();
} catch (error) {
  console.error(error);
} finally {
  console.log("반드시 한 번 무조건 실행");
}

/* Error 생성자 함수 */
const error = new Error("유효하지않음!");
console.log(error);

/* Error 생성자 함수로 에러객체를 생성한다고 에러를 발생하는것은 아님 ❌ */
try {
  new Error("무언가 잘못되었어요");
} catch (err) {
  console.log(err);
}

/* thorw */
try {
  throw new Error("무언가 잘못되었어요");
} catch (err) {
  console.log(err);
}

/* 에러의 전파 */
const foo = () => {
  throw Error("foo에서 발생한 에러");
};
const bar = () => {
  foo();
};

const baz = () => {
  bar();
};

try {
  baz();
} catch (err) {
  /* Error: foo에서 발생한 에러 */
  console.log(err);
}
