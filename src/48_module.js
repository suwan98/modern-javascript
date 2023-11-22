/* 모듈 내 var 키워드로 선언한 전역변수 */
var x = "foo";
console.log(x);
console.log(window.x); // undeinfed

/* export 키워드 */
/* 변수의 공개 */
const pi = Math.PI;

/* 함수의 공개 */
function square(x) {
  return x * x;
}

/* 클래스의 공개 */
class Person {
  constructor(name) {
    this.name = name;
  }
}

/* export 할 대상을 하나의 객체로 구성해 한번에 export 할 수도있다 */
export {pi, square, Person};
