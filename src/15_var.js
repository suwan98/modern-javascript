/* 모던자바스크립트 DeepDive 15장 let,const 키워드와 블록레벨 스코프 */

/* var 변수 중복 선언 허용 */

// var x = 1;
// var y = 1;

// var x = 100;
// var y;

// console.log(x);
// console.log(y);

/* var 함수 레벨 스코프 */

// var x = 1;
// if (true) {
//   var x = 10;
// }

// console.log(x);

/* var 변수 호이스팅 */

// console.log(foo);

// foo = 123;

// console.log(foo);

// var foo;

/* let을 통한 중복선언 */
// let bar = 123;
// let bar = 456;

/* let 블록레벨 스코프 */

// let foo = 1;

// {
//   let foo = 2;
//   let bar = 3;
// }

// console.log(foo);
// console.log(bar);

/* let 호이스팅 */

// console.log(foo);
// let foo;

/* TDZ */
// console.log(foo); // Referece Error

// let foo;
// console.log(foo);

// foo = 1;
// console.log(foo);

/* 전역객체와 let */

let x = 1;

console.log(window.x); //undeifnfed
console.log(x); // 1

/* const 재할당 금지 */
// const a = 1;
// a = 3;

/* const키워드로 선언된 객체 값 변경 */
const person = {
  name: "seju",
  age: 26,
};

person.age = 25;

console.log(person);
