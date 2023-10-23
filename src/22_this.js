/* 객체 리터럴에서의 프로퍼티 참조 */

const literalCircle = {
  radius: 5,
  // 자신이 속한 객체 literalCircle을 재귀적으로 참조 가능
  getDimeter() {
    return 2 * literalCircle.radius;
  },
};
console.log(literalCircle.getDimeter(2));

/* 생성자 함수로 인스턴스를 생성하는 경우 */
function ConstructorFunctionCircle(radius) {
  // 이 시점에는 생성자 함수가 자신을 생성할 인스턴스를 가리키는 식별자를 알 수 ❌
  this.radius = radius;
}

ConstructorFunctionCircle.prototype.getDimeter = function () {
  // 이 시점에는 생성자 함수가 자신을 생성할 인스턴스를 가리키는 식별자를 알 수 ❌
  return 2 * this.radius;
};

const circle = new ConstructorFunctionCircle(5);
console.log(circle.getDimeter()); // 10

/* this가 가리키는 값은 상황에 따라서 다르다 */

console.log(this);
/* 일반함수에서의 this */
function normalFunction() {
  console.log(this); // window
}
normalFunction();
/* 객체 내부 메서드 단축표현 */
const person = {
  name: "Seju",
  getName() {
    console.log(this);
  },
};
/* 생성자 함수에서의 this */
person.getName();
function ConstructorFunction() {
  console.log(this);
}

const cFunc = new ConstructorFunction();

/*메서드 내 정의한 중첩함수(일반함수) */
const person1 = {
  name: "seju1",
  foo() {
    console.log(this); // {name: 'seju1', foo: ƒ}

    function bar() {
      console.log(this); // window || strict mode 일땐 undeinfed
    }
    ``;
    bar();
  },
};
person1.foo();

/* 콜백함수가 일반함수로 호출될때의 this */
var value = 1;
const valueObject = {
  value: 100,
  foo() {
    console.log(`Foo this : ${this.value}`);
    // 콜백함수 내부 this는 전역객체가 바인딩된다
    setTimeout(() => {
      //   console.log(`콜백함수의 ${this.value}`);
    }, 1000);
  },
};
valueObject.foo();
/* 콜백함수에서의 this를 "제대로" 바인딩하기 */
const valueObject2 = {
  value: 100,
  foo() {
    console.log(`Foo this : ${this.value}`);
    // 콜백함수 내부 this는 전역객체가 바인딩된다
    setTimeout(
      function () {
        // console.log(`콜백함수의 ${this.value}`);
      }.bind(this),
      1000
    );
  },
};
valueObject2.foo();

/* 메서드 내부 this */
const person3 = {
  name: "seju",
  getName() {
    return this.name;
  },
};
console.log(person3.getName());

/*getName 메서드는 다른 객체의 메서드가 될 수 있고, 일반 변수에 할당해 일반 함수로 호출될 수도 있다 */
const anotherPerson = {
  name: "이현석",
};
anotherPerson.getName = person3.getName;
console.log(anotherPerson.getName());
/* getName 메서드를 변수에 할당 */
const getName = person3.getName();
console.log(getName);

/* 프로토타입 메서드 내부 this */
function ProtoTypePerson(name) {
  this.name = name;
}
ProtoTypePerson.prototype.getName = function () {
  return this.name;
};
const me = new ProtoTypePerson("seju");
console.log(me.getName()); // seju
ProtoTypePerson.prototype.name = "수완";
//getName 메서드를 호출한 객체는 Person.prototype이다
console.log(ProtoTypePerson.prototype.getName()); // 수완

/* 생성자 함수  this */
function Circle(radius) {
  this.radius = radius;
  this.getDimeter = function () {
    return radius * 2;
  };
}
const circle2 = new Circle(3);
console.log(circle2.getDimeter()); // 6

/* apply/call/bind에 의한 간접 호출 */
function getThisBinding() {
  console.log(arguments);
  return this;
}
/* this로 사용할 객체 */
const thisArg = {a: 1};
console.log(getThisBinding()); // window || undefined
/* getThisBinding 함수를 호출하며 인수로 전달할 객체를 getThisBinding 함수의 this에 바인딩한다 */
console.log(getThisBinding.apply(thisArg));
console.log(getThisBinding.call(thisArg));

/* argumnets 객체 apply/call로 나타내기 */
function convertArguments() {
  console.log(arguments);
  const arr = Array.prototype.slice.call(arguments);
  console.log(arr);
  return arr;
}
convertArguments(1, 2, 3);

/* bind 메서드 */
/* bind 메서드는 함수를 호출하지 않으므로 호출해야한다 */
console.log(getThisBinding.bind(thisArg)());

/* bind메서드가 유용하게 사용될 때 */
const bindPerson = {
  name: "고수완",
  callbackFnc(callback) {
    setTimeout(callback.bind(this), 100);
  },
};

bindPerson.callbackFnc(function () {
  console.log(`내 이름은 ${this.name} 이야`);
});
