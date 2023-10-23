/* 일급 객체 */

/* 1 .함수는 무명의 리터럴로 생성 가능 */
/* 2. 함수는 변수에 저장 가능 */
/* 할당단계에 함수 리터럴이 평가되어 함수 객체가 생성 ➡️ 변수에 할당 */
const increse = function (num) {
  return ++num;
};
const decrease = function (num) {
  return --num;
};
/* 2. 함수는 자료구조에 저장할 수 있다 */
const auxs = {increse, decrease};
/* 3. 함수의 매개변수로 함수를 전달할 수 있다 */
/* 4. 함수의 반환값으로 함수를 사용할 수 있다 */
function makeCounter(aux) {
  let num = 0;
  return () => {
    num = aux(num);
    return num;
  };
}
/* 3. 함수의 매개변수로 함수를 전달할 수 있다 */
const increaser = makeCounter(auxs.increse);
console.log(increaser()); // 1
console.log(increaser()); // 2
const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2

/* 함수 객체의 프로퍼티 */
function square(number) {
  return number * number;
}
console.log(Object.getOwnPropertyDescriptors(square));
/* __proto__는 square 함수의 프로퍼티가 ❌ */
console.log(Object.getOwnPropertyDescriptor(square, "__proto__"));
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
/* JS에서 함수는 매개변수와 인수의 개수가 일치하는지 확인 ❌ */
function multiply(x, y) {
  console.log(arguments);
  return x + y;
}
console.log(multiply()); // NaN
console.log(multiply(1)); // NaN
console.log(multiply(1, 2)); // 3
console.log(multiply(1, 2, 3)); // 3

/* 가변 인자 함수 */
function sum() {
  let res = 0;
  for (let i = 0; i < arguments.length; i++) {
    res = res + arguments[i];
  }
  return res;
}
console.log(sum()); // 0
console.log(sum(1)); // 1
console.log(sum(1, 2)); // 3

/* 유사배열 객체 arguments를 call 메서드를 사용하여 순회하기 */
function arrayLikeSumFunction() {
  const array = Array.prototype.slice.call(arguments);
  return array.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
}
console.log(arrayLikeSumFunction(1, 2)); // 3
console.log(arrayLikeSumFunction(1, 2, 3)); // 6

/* ES6 Rest Parmeter */
function restParmeterSum(...args) {
  return args.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
}
console.log(restParmeterSum(1, 2)); // 3
console.log(restParmeterSum(1, 2, 3)); // 6

/* 함수의 length 프로퍼티 */
function functionLength() {}
console.log(functionLength.length); // 0
function functionLength2(num) {}
console.log(functionLength2.length); // 1
function functionLength3(x, y, z) {}
console.log(functionLength3.length); // 3

/* 함수의 name 프로퍼티 */
const namedFunction = function foo() {};
console.log(namedFunction.name); // foo
const 익명함수표현식 = () => {};
/* name프로퍼티는 익명 함수 객체를 가리키는 변수 이름을 값으로 가진다 */
console.log(익명함수표현식.name); // 익명함수표현식
function declarationFunction() {}
console.log(declarationFunction.name); // declarationFunction

/* __proto__ 접근자 프로퍼티 */
const object = {a: 1};
console.log(object.__proto__ === Object.prototype); // true
console.log(object.hasOwnProperty("a")); // true
console.log(object.hasOwnProperty("__proto__")); // false

/* prototype 프로퍼티 */
// 함수 객체는 prototype 프로퍼티를 소유하고 있다
console.log(function () {}.hasOwnProperty("prototype")); // true
// 일반 객체는 prototype 프로퍼티를 소유하고 있지 않다
console.log({}.hasOwnProperty("prototype")); // false
