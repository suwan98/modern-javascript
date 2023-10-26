/* ES6에서 메서드란? */
const ES6_Object = {
  x: 1,
  /* 객체 내 메서드 축약표현으로 정의된 함수만이 메서드이다 */
  ES6_method() {
    return this.x;
  },
  ES6_not_method: function () {
    return this.x;
  },
};
/*  prototype 프로티가 없고 프로토타입 또한 생성 ❌ */
console.log(ES6_Object.ES6_method.hasOwnProperty("prototype"));
console.log(ES6_Object.ES6_not_method.hasOwnProperty("prototype"));

/* 화살표함수 정의 */
const arrowFunction = (x, y) => {
  return x + y;
};
/* 화살표함수에서의 매개변수 선언 */
const arrow = () => {};

/* 함수몸체가 하나의 문이라면 함수 몸체 중괄호{} 생략 가능 */
const power = (x) => x ** 2;
console.log(power(3));

/* 표현식이 아닌 문 */
// const power2 = (x) => const y = 1;

/* 객체리터럴을 반환하는 경우 소괄호 사용 */
const create = (id, content) => ({id, content});
console.log(create(1, "js"));

/* 함수 몸체가 여러개의 문으로 구성되어 있다면 중괄호 생략 불가 */
const sum = (a, b) => {
  const result = a + b;
  return result;
};

/* 화살표 함수를 고차함수에 인수로 전달 */
// ES5
const arr = [1, 2, 3];
const ES5_result = arr.map(function (v) {
  return v * 2;
});
console.log(ES5_result);
// ES6
const ES6_ArrowFunctionResult = arr.map((v) => v * 2);
console.log(ES6_ArrowFunctionResult);

/* 화살표함수와 일반함수의 차이점 3가지 */
/* 1. 화살표함수는 인스턴스를 생성할 수 없다 */
const noInstanceFunction = () => {};
// new noInstanceFunction(); // TypeError : noInstanceFunction is not a constructor
/* 2. 화살표함수는 중복된 매개변수를 허용하지 않는다 */
// const duplicateParmeterName = (x, x) => x * x; // SyntaxError : Duplicate parmeter name allowed in this context

/* 화살표 함수에서의 this */
/* 일반함수로서 호출되는 콜백함수 */
/* class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }
  add(arr) {
    return arr.map(function (item) {
      return this.prefix + item;
    });
  }
}
const prefix = new Prefixer("-webkit");
console.log(prefix.add(["google", "chrome"])); */

/* 화살표 함수로서 호출되는 콜백함수 */
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }
  add(arr) {
    return arr.map((item) => this.prefix + item);
  }
}
const prefix = new Prefixer("-webkit");
console.log(prefix.add(["-google", "-chrome"]));

/* 만약 화살표함수와 화살표함수가 중첩되어있다면? */
(function () {
  const arrowFunction = () => console.log(this);
  arrowFunction();
}).call({a: 1});

/* 화살표 함수는 자체적인 this바인딩을 가지지않으므로 call/apply/bind 메서드를 사용해도 화살표 함수 내부 this를 교체할 순 없다 */
const add = (a, b) => a + b;
console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
console.log(add.bind(null, 1, 2)()); // 3

/* 메서드를 화살표 함수로 정의하는 것은 피하자 */
/* const arrowMethodObject = {
  name: "seju",
  sayHi: () => console.log(`Hi My Name is ${this.name}`),
};

arrowMethodObject.sayHi(); */

/* this와 마찬가지로 상위 스코프의 arguments를 참조 */
(function () {
  const foo = () => console.log(arguments);
  foo(3, 4);
})(1, 2);

/* Rest Parameter 기본 문법 */
function restFunction(...rest) {
  console.log(rest);
}
restFunction(1, 2, 3, 4, 5, 6);

/* arguments 객체는 배열이 아닌 유사배열 객체 */
/* strict mode에선 arguments 사용 불가 */
/* function arrayLikeParameters(arguments) {
  let array = Array.prototype.slice.call(arguments);

  return array.reduce((acc, cur) => acc + cur, 0);
}
console.log(arrayLikeParameters(1, 2, 3, 4, 5)); */

/* rest parameter로 리듀스 구현 */
function restParameterReduce(...rest) {
  return rest.reduce((acc, cur) => acc + cur, 0);
}
console.log(restParameterReduce(1, 2, 3, 4, 5));

/*  매개변수의 값이 일치하지 않아도 에러를 발생시키지 않았을때 발생하는 문제는? */
function argumentIsLack(x, y) {
  return x + y;
}
console.log(argumentIsLack(1));

/* restParmeter에는 매개변수 기본값 지정 불가능 */
// function isRestDefaultParmeter(...rest = []) {
//     console.log(rest)
// }
