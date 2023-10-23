/* 객체지향 프로그래밍 */

/* 이름과 주소 속성을 가지는 객체 */
const person = {
  name: "Seju",
  address: "seoul",
};

console.log(person);

/* 원 */
const circle = {
  radius: 5,

  /* 원의 지름을 구하는 메서드 */
  getDiameter() {
    return 2 * this.radius;
  },
  /* 원의 둘레를 구하는 메서드 */
  getPermeter() {
    return 2 * Math.PI * this.radius;
  },
  /* 원의 넓이를 구하는 메서드 */
  getArea() {
    return Math.PI * this.radius ** 2;
  },
};
console.log(circle);
console.log(circle.getDiameter()); // 10
console.log(circle.getPermeter()); // 31.41...
console.log(circle.getArea()); // 78.539..

/* 상속과 프로토타입 */

/* 생성자 함수 */
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}
/* 인스턴스 생성 */
const circle1 = new Circle(2);
const circle2 = new Circle(4);
/* 생성자함수에선 인스턴스를 생성할 때마다 getArea메서드를 중복생성하게 되버린다 */
console.log(circle1.getArea() === circle2.getArea()); //false
console.log(circle1.getArea()); // 12.566..
console.log(circle2.getArea()); // 50.265..

/* 생성자 함수 */
function PrototypeCircle(radius) {
  this.radius = radius;
}
/* 프로토타입을 통한 생성자 함수에서의 메서드 생성 */
PrototypeCircle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};
const prototypeCircle = new PrototypeCircle(2);
console.log(prototypeCircle.hasOwnProperty("radius")); // true
const prototypeCircle2 = new PrototypeCircle(5);
console.log(prototypeCircle.getArea === prototypeCircle2.getArea); // true

/* 접근자 프로퍼티 내 getter 함수 사용 */
const object = {};
const parentObject = {name: "seju"};
/* 내부적으로 getter 함수가 호출되며, object 객체의 프로토타입을 취득 */
object.__proto__;
/* 내부적으로 setter 함수가 호출되며 object 객체의 프로토타입을 parent 객체로 교체 */
object.__proto__ = parentObject;
console.log(object.name);
console.log(object);

/* __proto__ 접근자 프로퍼티는 상속을 통해 사용한다 */
const inheritPerson = {name: "seju"};
// inheritPerson 객체가 __proto__ 라는 접근자 프로퍼티를 가지고 있는가?
console.log(inheritPerson.hasOwnProperty("__proto__")); // false
// __proto__ 프로퍼티는 모든 객체의 프로토 타입 객체인 Object.prototype의 접근자 프로퍼티 이다
// {enumerable: false, configurable: true, get: ƒ, set: ƒ}
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
// 모든 객체는 Object.prototype 의 접근자 프로퍼티닌 __proto__를 상속받아 사용할 수 있다
console.log({}.__proto__ === Object.prototype); // true

/* __proto__ 접근자를 통해 프로토타입에 접근하는 이유는? */
const parentObj = {};
const childObj = {};

// childObj의 프로토타입을 parentObj로 설정
childObj.__proto__ = parentObj;
// parentObj의 프로토타입을 childObj로 설정
//TypeError: Cyclic __proto__ value  at set __proto__ [as __proto__]
// parentObj.__proto__ = childObj;

/* 함수 객체의 prototype 프로퍼티 */
/* 함수 객체는 prototype 프로퍼티를 소유 */
(() => {}).hasOwnProperty("prototype"); // true
/* 일반 객체는 prototype 프로퍼티를 소유 ❌ */
({}).hasOwnProperty("prototype"); // false

/* non-constructor */
/* 화살표 함수 */
const ArrowFunctionPerson = (name) => (this.name = name);
/* 화살표함수가 prototype 프로퍼티를 소유하고 있는가? */
console.log(ArrowFunctionPerson.hasOwnProperty("prototype")); // false
/* foo() 메서드 축약 표현으로 정의한 메서드 */
const methodObject = {
  foo() {},
};
/* foo 메서드가 prototype 프로퍼티를 소유하고 있는가? */
console.log(methodObject.foo.hasOwnProperty("prototype")); // false

/* 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입 */

/* object 객체를 생성한 생성자 함수는 Object이다*/
const obj = new Object();
console.log(obj.constructor === Object); // true
/* add 함수 객체를 생성한 생성자 함수는 Function 이다 */
const add = new Function("a", "b", "return a + b");
console.log(add.constructor === Function); // true
/* 생성자 함수 */
function Person(name) {
  this.name = name;
}
const me = new Person("seju");
console.log(me.constructor === Person); // true
/* 리터럴로 생성하면? */
const literalObject = {};
console.log(literalObject.constructor === Object); // true
const literalFunction = () => {};
console.log(literalFunction.constructor === Function); // true

/* 사용자 정의 생성자 함수와 프로토타입 생성 시점 */

/* constructor는 프로토타입이 선언시 생성 */
console.log(ConstructorPerson.prototype); // {constructor: ƒ}
function ConstructorPerson(name) {
  this.name = name;
}
/* non-constructor는 프로토타입이 생성 ❌ */
const ArrowFunction = (name) => {
  this.name = name;
};
console.log(ArrowFunction.prototype);

const today = new Date();
console.log(Object.getPrototypeOf(today));

/* instanceof 연산자 */
function InstanceonfConstructorPerson(name) {
  this.name = name;
}
const suwan = new InstanceonfConstructorPerson("suwan");
// InstanceonfConstructorPerson.prototype이 suwan 객체의 프로토타입 체인상에 존재하므로 true를 반환
console.log(suwan instanceof InstanceonfConstructorPerson); // true
// Object.prototype 객체가 suwan 객체의 프로토타입 체인 상에 존재하므로 true를 반환
console.log(suwan instanceof Object); // true
