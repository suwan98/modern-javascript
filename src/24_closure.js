/* 함수가 선언된 렉시컬 환경 */

const x = 1;
function outerFunction() {
  const x = 10;
  function innerFunction() {
    /* 외부 변수 x에 접근 가능*/
    console.log(x);
  }
  innerFunction();
}
outerFunction();

/* 만약 innerFunction 함수가 outerFunction 내부에 정의된 중첩함수가 아니라면? */
const x2 = 1;
function outerFunction2() {
  const x2 = 10;
  innerFunction2();
}
function innerFunction2() {
  console.log(x); // 1
}
outerFunction2();

/* 엔진은 함수를 어디서 호출했는지가 아니라, 함수를 어디에 정의했는지에 따라 상위컨텍스트를 결정한다 */
const lexicalX = 1;
function lexicalFunction1() {
  const lexicalX = 1000;
  lexicalFunction2();
}
function lexicalFunction2() {
  console.log(lexicalX); // 1 1
}
lexicalFunction1();
lexicalFunction2();

/* 클로저와 렉시컬 환경 */
const closureX = 1;
function outerClosure() {
  const closuerX = 10000;
  const innerFunction = () => {
    return console.log(closuerX); // 10000
  };
  return innerFunction;
}
const innerFunc = outerClosure();
innerFunc();

/* 클로저의 좋지않은 활용 예시 1*/
/* let countNumber = 0;

const handleIncreaseNumber = () => {
  return ++countNumber;
};
console.log(handleIncreaseNumber());
console.log(handleIncreaseNumber());
console.log(handleIncreaseNumber()); */

/* 클로저의 좋지않은 활용 예시 2*/

/* const handleIncreaseNumber = () => {
  let countNumber = 0;
  return ++countNumber;
};
console.log(handleIncreaseNumber());
console.log(handleIncreaseNumber());
console.log(handleIncreaseNumber()); */

/* 클로저로 리팩토링 */

/* const handleIncreaseNumber = (() => {
  let countNumber = 0;
  return () => ++countNumber;
})();
console.log(handleIncreaseNumber());
console.log(handleIncreaseNumber());
console.log(handleIncreaseNumber()); */

/* 클로저로 리팩토링2 : 상태를 감소시키는 기능 추가 */
const handleIncreaseNumber = (() => {
  let countNumber = 0;
  return {
    increase() {
      return ++countNumber;
    },
    decrease() {
      return countNumber > 0 ? --countNumber : 0;
    },
  };
})();
console.log(handleIncreaseNumber.increase());
console.log(handleIncreaseNumber.increase());
console.log(handleIncreaseNumber.decrease());

/* 함수형 프로그래밍에서 클로저 활용 예 */

// function makeCounter(aux) {
//   let counter = 0;

//   return () => {
//     counter = aux(counter);
//     return counter;
//   };
// }
// /* 보조함수 */
// function increase(number) {
//   return ++number;
// }
// function decrease(number) {
//   return --number;
// }
// const increaser = makeCounter(increase);
// console.log(increaser());
// console.log(increaser());
// console.log(increaser());
// const decreaser = makeCounter(decrease);
// console.log(decreaser());
// console.log(decreaser());
// console.log(decreaser());

/* IIFE 패턴을 사용한 연동 */
const counter = (function () {
  let counter = 0;

  return (aux) => {
    counter = aux(counter);
    return counter;
  };
})();
/* 보조함수 */
function increase(number) {
  return ++number;
}
function decrease(number) {
  return --number;
}
console.log(counter(increase));
console.log(counter(increase));
console.log(counter(decrease));
console.log(counter(decrease));

/* 클로저 사용시 자주 발생하는 실수 */
// var funcs = [];
// for (var i = 0; i < 3; i++) {
//   funcs[i] = () => i;
// }
// for (var j = 0; j < funcs.length; j++) {
//   console.log(funcs[j]()); //
// }

/* const/let 키워드를 사용해 리팩토링 */
const funcs = [];
for (let i = 0; i < 3; i++) {
  funcs[i] = () => i;
}
for (let i = 0; i < funcs.length; i++) {
  console.log(funcs[i]());
}
