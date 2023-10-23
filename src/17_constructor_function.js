/* Object 생성자 함수 */

const person = new Object();
/* 프로퍼티 추가 및 메서드 */
person.name = "Seju";
person.sayHello = function () {
  console.log(`Hi my name is ${this.name}`);
};
/* 생성한 메서드 호출 */
person.sayHello();

/* 객체 리터럴에 의한 객체 생성 방식의 문제점 */

const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  },
};
console.log(circle1.getDiameter()); // 10
const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  },
};
console.log(circle2.getDiameter()); // 20

/* 생성자 함수에 의한 객체 생성 방식의 장점 */
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
/* 인스턴스 생성 */
const circle3 = new Circle(5);
console.log(circle3);
const circle4 = new Circle(10);
/* getDiameter */
console.log(circle3.getDiameter()); // 10
console.log(circle4.getDiameter()); // 20

/* 생성자함수는 new 연산자와 함께 호출해야한다 */
// const circle5 = Circle(15);
// console.log(circle5);

/* 함수는 객체이므로 일반 객체와 동일하게 동작 */
function foo() {}
foo.prop = 10;
foo.method = function () {
  console.log(this.prop);
};
foo.method(); // 10

/* new 연산자 */

/* 생성자 함수로서 정의하지 않은 일반 함수 */
function add(x, y) {
  return x + y;
}
/* 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출 */
let inst = new add(2, 5);
/* 함수가 객체를 반환하지 않았으므로 return 무시 -> 즉 빈객체가 반환 */
console.log(inst); // {}
/* 객체를 반환하는 일반 함수 */
function createUser(name, role) {
  return {name, role};
}
/* 일반 함수를 new 연산자와 함께 호출 */
inst = new createUser("seju", "developer");
/* 함수가 생성된 객체를 ㅂ란환 */
console.log(inst); //{name: 'seju', role: 'developer'}
