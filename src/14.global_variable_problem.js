/* 지역변수의 생명주기 */
function functionLocalVaribale() {
  var x = "local";
  console.log(x); // 'local'
  return x;
}

functionLocalVaribale();

// /* Reference Error */
// console.log(x);

/* 아래코드에서 변수 x가 출력되는 값은? */
var x = "global";

function foo() {
  console.log(x); // undefined
  var x = "local";
}

foo();
console.log(x); // 'global'

/* 전역변수의 문제점 */

var x = 1;
/* 변수의 중복선언 기존의 값을 재할당하고 있다 */
var x = 1000;
console.log(x); // 1000

/* 전역 변수의 사용을 억제하는 방법 */

/* IIFE */
(() => {
  var iifeVariable = 10;
})();
/* ReferenceError  */
// console.log(iifeVariable);

/* 네임스페이스 */
var APP = {};

APP.name = "seju";
console.log(APP.name);
APP.person = {
  name: "손흥민",
  age: "33",
};

console.log(APP.person.name); // 손흥민

/* 모듈 패턴 */
var counter = (() => {
  var num = 0;

  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    },
  };
})();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 1
