import produce from "immer/src/immer.ts";

/* getOwnPropertyDescriptor 메서드 */
const person = {
  name: "seju",
};

console.log(Object.getOwnPropertyDescriptor(person, "name"));

/* 접근자 프로퍼티 예시 */
const person1 = {
  firstName: "Suwan",
  lastName: "Go",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(name) {
    return ([this.firstName, this.lastName] = name.split(" "));
  },
};

/* 데이터 프로퍼티를 통한 프로퍼티 값 참조 */
console.log(person1.firstName + " " + person1.lastName);

/* 접근자 프로퍼티를 통한 프로퍼티 값의 저장 */
person1.fullName = "Suwan ZZang";
console.log(person1);

/* 접근자 프로퍼티를 통한 프로퍼티 값의 참조 */
console.log(person1.fullName);

let desciptor = Object.getOwnPropertyDescriptor(person1, "firstName");
console.log(desciptor);

/* 접근자 프로퍼티와 데이터 프로퍼티 구별법 */

/* 일반 객체의 __proto__는 접근자 프로퍼티이다 */
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));

/* 함수 객체의 prototype은 데이터 프로퍼티이다 */
console.log(Object.getOwnPropertyDescriptor(function () {}, "prototype"));

/* 데이터 프로퍼티 정의 */
const codeMonky = {};

Object.defineProperty(codeMonky, "firstName", {
  value: "Ukky",
  writable: true,
  enumerable: true,
  configurable: true,
});

/* 객체 변경 금지 메서드들 */

/* 객체 프로퍼티 추가 금지 */
const codeMonky2 = {name: "mong"};
console.log(Object.isExtensible(codeMonky2)); //true

/* 객체의 확장을 금지해 프로퍼티 추가를 금지한다 */
Object.preventExtensions(codeMonky2);
console.log(Object.isExtensible(codeMonky2)); // false

//Error : Cannot add property age, object is not extensible 확장이 금지되어있음
// codeMonky2.age = 3;

//Error : Cannot define property age, object is not extensible
//프로퍼티 정의에 의한 프로퍼티 추가도 금지 됨
// Object.defineProperty(codeMonky2, "age", {value: 3});

/* 객체 밀봉 */
const codeMonky3 = {name: "mook"};
console.log(Object.isSealed(codeMonky3)); //false

Object.seal(codeMonky3);
console.log(Object.isSealed(codeMonky3)); //true

console.log(Object.getOwnPropertyDescriptors(codeMonky3)); //configurable : false

// 프로퍼티 추가 금지
// Cannot add property age, object is not extensible
// codeMonky3.age = 3;

// 프로퍼티 삭제 금지
// Cannot delete property 'name' of #<Object>
// delete codeMonky3.name;

// 프로퍼티값 갱신은 가능
codeMonky3.name = "Kim";
console.log(codeMonky3); // {name: 'Kim'}

// 프로퍼티 어트리뷰트 재정의 금지
// Cannot redefine property: name at Function.defineProperty
// Object.defineProperty(codeMonky3, "name", {
//   configurable: true,
// });

/* 객체 동결 */
const codeMonkey4 = {name: "frozenMonkey", address: {city: "Brazil"}};
console.log(Object.isFrozen(codeMonkey4)); // false
Object.freeze(codeMonkey4);
console.log(Object.isFrozen(codeMonkey4)); // true
console.log(Object.isFrozen(codeMonkey4.address)); // false 중첩된 객체까진 동결 불가

const frozenCodeMonkey = produce(codeMonkey4, (prev) => {
  Object.freeze(prev);
  Object.freeze(prev.address);
});

console.log(Object.isFrozen(frozenCodeMonkey));
