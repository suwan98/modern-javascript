# #24 클로저

# 개요

**클로저는 난해하기로 유형만 자바스크립트 개념 중 하나**

- 함수를 일급객체로 취급하는 함수형 프로그래밍언어에서 사용되는 주요 특성

**클로저의 ECMAScript에서의 정의**

- 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합

**코드로 렉시컬스코프 알아보기**

- outerFunction 함수 내 중첩함수 innerFunction이 정의되고 호출
  - 이때 중첩함수의 상위 스코프는 외부 함수 `outerFunction`의 스코프
    - 따라서 중첩함수 내부에서 자신을 포함하고 있는 외부 함수 outerFunction의 x변수에 접근 가능

```jsx
/* 함수가 선언된 렉시컬 환경 */

const x = 1;
function outerFunction() {
  const x = 10;
  function innerFunction() {

		/* 외부 변수 x에 접근 가능*/
    **console.log(x); // 10**
  }
  innerFunction();
}
outerFunction();
```

**만약 innerFunction 함수가 outerFunction 내부에 정의된 중첩함수가 아니라면?**

- 당연하게도 `outerFunction` 내부 변수 x2에 접근 불가

```jsx
/* 만약 innerFunction 함수가 outerFunction 내부에 정의된 중첩함수가 아니라면? */
const x2 = 1;
function outerFunction2() {
  const x2 = 10;
  innerFunction2();
}
function innerFunction2() {
  **console.log(x); // 1**
}
outerFunction2();
```

## 렉시컬 스코프

**렉시컬 스코프**

- 엔진은 함수를 어디서 호출했는지가 아니라, 함수를 어디에 정의했는지에 따라 상위컨텍스트를 결정한다
- 아래 코드에서 lex1과 lex2 함수는 전역에 정의된 전역 함수이다
  - 함수의 상위스코프는 함수를 어디서 정의했느냐에 따라 결정되므로 해당 함수들의 상위 스코프는 전역 스코프이다
    - 즉, **함수의 상위스코프는 함수를 정의한 위치에 의해 정적으로 결정되고 변하지 않는다**

```jsx
/* 엔진은 함수를 어디서 호출했는지가 아니라, 함수를 어디에 정의했는지에 따라 상위컨텍스트를 결정한다 */

const lexicalX = 1;

function lexicalFunction1() {
  const lexicalX = 1000;
  lexicalFunction2();
}

function lexicalFunction2() {
  **console.log(lexicalX); // 1 1
}

lexicalFunction1();
lexicalFunction2();
```

**스코프의 실체**

- **실행 컨텍스트의 렉시컬 환경**
  - 렉시컬환경은 자신의 외부 렉시컬환경에 대한 참조를 통해 상위 렉시컬환경과 연결
    - **스코프체인**
- 함수의 상위스코프를 결정하는것 === 렉시컬환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조값을 결정하는 것
- **상위스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경에 의해 결정**

## 함수 객체 내부 슬롯 [[Environment]]

**함수가 정의된 환경과 호출되는 환경은 다를 수 있다**

- 렉시컬 스코프가 가능하려면 함수는 자신이 호출되는 환경과는 상관없이 자신이 정의된 환경
  - 즉, 상위 스코프를 기억해야한다
- 이를 위해 함수는 자신의 내부 슬롯 `[[Environment]]` 에 상위 스코프의 참조를 저장한다

**함수가 평가되고 함수 객체 생성 시**

- 자신이 정의된 환경에 의해 결정된 상위 스코프의 참조를 함수 객체 자신의 `[[Environment]]`에 저장
  - 이때 `[[Environment]]` 내부슬롯에 저장된 상위 스코프의 참조는 현재 실행중인 실행 컨텍스트의 렉시컬 환경을 가르킨다
    - 상위함수가 평가 또는 실행되고 있는 시점이며, 이때 현재 실행중인 실행컨텍스트는 상위함수의 실행컨텍스트 이기 때문

**전역에서 정의된 함수 선언문**

- 전역 코드가 평가되는 시점에 평가되어 함수 객체 생성
  - 이때 생성된 함수 객체의 내부 슬롯 `[[Environment]]` 에는 전역 코드 평가 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장됨

**함수 내부에서 정의된 함수 표현식**

- 외부 함수 코드가 실행되는 시점에 평가되어 함수 객체 생성
  - 이때 생성된 함수 객체의 내부 슬롯 `[[Environment]]` 에는 외부 함수 코드 실행 시점에 실행 중인 실행컨텍스트의 렉시컬 환경인 외부 렉시컬 환경의 참조가 저장

## 클로저와 렉시컬 환경

<aside>
💡 **클로저 코드로 살펴보기**

</aside>

`**outer`함수 호출 시 `outer`함수는 `inner`함수를 반환하고 생명주기를 마감\*\*

- `outer`함수 실행 컨텍스트는 실행 컨텍스트 스택에서 제거
  - 이때 `outer`함수 지역 변수 `closuerX`와 변수 값 100000을 저장하고 있던 `outer`함수 실행 컨텍스트가 제거되었으므로 `outer`함수의 변수 또한 생명주기를 마감
  - 따라서 `outer`함수의 지역변수 `closureX`는 생명주기를 마감했으므로 더이상 유효하지 않을 것으로 보임
- 그러나 아래 코드 실행 결과는 `outer`함수의 지역변수 100000이다
  - 이처럼 **외부 함수보다 중첩함수가 더 오래 유지되는 경우**는 **중첩 함수**는 **이미 생명주기를 종료한 외부 함수의 변수를 참조 할 수 있다**
  - 이러한 **중첩함수**를 **클로저**라고 부른다

```jsx
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
```

### **자바스크립트 모든 함수는 자신의 상위 스코프를 기억한다**

**따라서 함수를 어디서 호출 하든 상관없이 함수는 언제나 자신이 기억하는 상위 스코프의 식별자를 참조 할 수 있으며 식별자에 바인딩 된 값 또한 변경 가능하다**

- 위 코드에서 `innerFunction`함수는 평가 시 자신이 정의된 위치에 의해 결정된 상위 스코프를 `[[Environment]]` 내부 슬롯에 저장
  - 이때 저장된 상위스코프는 함수가 존재하는한 유지
- `outerClosure`함수 호출 시 해당 함수에 대한 렉시컬 환경이 생성되고,
  - 앞서 `outerClosure` 함수의 내부슬롯에 저장된 전역 렉시컬 환경을 `outerFunction` 함수 렉시컬 환경의 외부 렉시컬환경에 대한 참조에 할당
- 그리고 중첩함수 `innerFunction`이 평가됨
  - 이때 중첩함수는 `outerClosure`함수의 렉시컬 환경을 상위스코프로서 저장
- `outerClosure`함수 종료시 `innerFunction`을 반환하면서 `outerClousure`생명 주기가 종료된다
  - **이때 `outerClosure` 함수의 실행컨텍스트는 실행 컨텍스트 스택에서 제거되지만, `outerClosure` 함수의 렉시컬 환경까지 소멸되는 것은 ❌**
    - **이유는 `outerClosure` 함수의 렉시컬환경은 `innerFunction` 함수의 `[[Environment]]` 내부 슬롯에 의해 참조되고 있고**
    - **`innerFunction` 함수는 전역변수 `innerFunc`에 의해 참조되고 있으므로**
    - **가비지 컬렉션의 대상이 되지 않는다**
- 중첩된 `innerFunction`, **즉 `innerFunc`를 호출**하면 `inner`함수의 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 푸쉬
  - 렉시컬 환경의 외부 렉시컬 환경에 대한 참조는 `inner` 함수 객체의 `[[Environment]]` 내부 슬롯에 저장되어 있는 참조값이 할당된다
  - 따라서 중첩된 inner는 외부 함수 outerClosure 함수보다 오래 생존
    - 이때 외부 함수보다 오래 생존한 중첩함수는 외부 함수의 생존여부와 관계없이 자신이 정의된 위치에 의해 결정된 상위스코프를 기억한다
    - 이제 상위스코프의 식별자(closureX)를 참조하고 변경할 수 있게 된다

💡 **Q : 자바스크립트 모든 함수는 클로저?**

**자바스크립트의 모든 함수는 상위 스코프를 기억하므로 모든 함수는 클로저일까?**

- **정답은 ❌**
  - 일반적으로 클로저는 중첩함수가 상위 스코프의 식별자를 참조하고 있으며,
  - 중첩함수가 외부 함수보다 더 오래 유지되는 경우에만으로 한정함

💡 **Q : 그럼 클로저는 불필요한 메모리를 점유하고 있지 않는가?**

**모던 자바스크립트 엔진은 최적화가 매우 잘되어 있음**

- 클로저가 참조하고 있지 않는 식별자는 기억하지 ❌
  - 상위 스코프의 식별자 중에서 기억해야할만한 식별자만 기억
  - **클로저의 메모리 점유는 필요한 것을 기억하기 위한 것이므로 불필요한 메모리를 점유하는가에 대한 논의대상이 ❌**

## 클로저의 활용

**클로저를 사용하는 근본적인 이유**

- 상태를 안전하게 변경하고 유지
  - 은닉 및 특정 함수에게만 상태 변경 제어권을 허용하도록

💡 **클로저 활용 예시**

**좋지않은 예시 (클로저 사용 ❌) 그 이유는?**

- 아래 예시가 올바르게 동작하려면 아래와 같은 전제 조건이 지켜져야 한다
  1. 카운트 상태는 함수가 호출되기 전까지 변경되지않고 유지되어야 함
  2. 이를 위해 카운트 상태는 `handleIncreaseNumber` 함수만이 변경할 수 있어야 한다
- 그러나 `countNumber` 상태는 전역변수를 통해 관리되고 있음
  - 누구나 접근가능하고 변경할 수 있다, 이는 곧 의도치 않게 상태가 변경될 수 있음을 의미

```jsx
**let countNumber = 0;

const handleIncreaseNumber = () => {
  return ++countNumber;
};

console.log(handleIncreaseNumber()); // 1
console.log(handleIncreaseNumber()); // 2
console.log(handleIncreaseNumber()); // 3**
```

**그러면 countNumber을 함수 내에서 지역변수로 사용하면?**

- `handleIncreaseNumber`가 호출될때마다 지역변수 `countNumber`는 다시 선언되고 0으로 초기화되는 문제가 있다
  - 따라서 `countNumber` 의 값은 항상 1이 되어버린다

```jsx
/* 클로저의 좋지않은 활용 예시 2*/

const handleIncreaseNumber = () => {
  let countNumber = 0;
  return ++countNumber;
};

**console.log(handleIncreaseNumber()); // 1
console.log(handleIncreaseNumber()); // 1
console.log(handleIncreaseNumber()); // 1**
```

**이전 상태를 유지할 수 있도록 클로저로 리팩토링**

- `handleIncreaseNumber`함수를 즉시실행함수로 바꾸고, `countNumber`가 증가되는 로직을 화살표 함수로 매핑함
  - 즉시 실행 함수는 호출된 이후 소멸하지만 즉시 실행함수가 반환한 클로저는 `handleIncreaseNumber` 함수에 할당되어 호출
    - 이때 즉시 실행함수가 반환한 클로저는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억
    - **즉시 실행 함수가 반환한 클로저**는 카운트 상태를 유지하기 위한 **자유변수 countNumber를 언제 어디서 호출하든 참조하고 변경할 수 있게 된다**

```jsx
/* 클로저로 리팩토링 */

const handleIncreaseNumber = **(() => {
  let countNumber = 0;
  return () => ++countNumber;
})();**

**console.log(handleIncreaseNumber()); // 1
console.log(handleIncreaseNumber()); // 2
console.log(handleIncreaseNumber()); // 3**
```

**상태를 감소시킬수 있도록 좀 더 발전시켜보자**

- `handleIncreaseNumber`함수를 객체로 내보내며, `increase`와`decrease`라는 기명함수 표현식으로 함수자체를 리턴값으로 내보내고 있음
  - 해당 메서드의 상위 스코프는 메서드가 평가되는 시점에 실행되는 실행 컨텍스트인 즉시 실행함수의 실행컨텍스트의 렉시컬 환경
  - 따라서 메서드가 언제 어디서 호출되는 상관없이 `increase`, `decrease` 함수는 즉시 실행함수의 스코프의 식별자를 참조하고 변경할 수 있다

```jsx
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
  };**
})();

**console.log(handleIncreaseNumber.increase()); // 증가 1
console.log(handleIncreaseNumber.increase()); // 증가 2
console.log(handleIncreaseNumber.decrease()); // 감소 1
```

### 함수형 프로그래밍에서 클로저 활용 예

**makeCounter 함수**

- 고차함수
- 함수 자체를 내보내고 함수를 인자로 받고 있음
- `makeCounter` 함수를 호출해 반환할때 반환된 함수는 자신만의 독립적인 렉시컬 환경을 구성
  - 함수 호출 시 그때마다 새로운 `makeCounter`에 대한 함수 실행컨텍스트 새로 생성
- 독립된 카운터가 아니라 연동하여 증감 가능한 카운터를 만드려면 렉시컬 환경을 공유하는 클로저를 만들어아햔다
  - 즉 IIFE 패턴 필요

```jsx
/* 함수형 프로그래밍에서 클로저 활용 예 */

function makeCounter(aux) {
  let counter = 0;

  return () => {
    counter = aux(counter);
    return counter;
  };
}

/* 보조함수 */
function increase(number) {
  return ++number;
}
function decrease(number) {
  return --number;
}

const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2
console.log(increaser()); // 3

const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
console.log(decreaser()); // -3
```

**IIFE 패턴을 사용한 리팩토링**

```tsx
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

console.log(counter(increase)); // 1
console.log(counter(increase)); // 2
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0**
```

## 캡슐화와 정보은닉

**캡슐화**

- 객체의 상태를 나타내는 프로퍼티와 동작인 메서드를 하나로 묶는것을 말함
- 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉이라고 한다

**정보은닉**

- 외부에 공개할 필요가 없는 구현의 일부를 감춘다
  - 외부로부터 객체의 상태가 변경되는 것을 방지하는 효과
  - 객체간의 상호 의존성을 낮추는 효과

## 클로저 사용시 자주 발생하는 실수

**클로저 사용 시 자주 발생할 수 있는 실수 예제**

- 첫번째 for문 코드 블록 내 함수가 `funcs`배열의 요소로 추가
  - 두번째 `for` 문의 코드 블록 내 `funcs` 배열의 요소로 추가된 함수를 순차적으로 호출
  - 이때 `funcs`배열의 요소로 추가된 3개의 함수가 0,1,2를 반환할것으로 예상했으나 결과는 ❌
- for 문의 변수 선언문에서 var로 선언한 i는 블록레벨스코프가 아닌 함수레벨 스코프를 가짐
  - 전역 변수 i에는 0,1,2가 순차적으로 할당
  - 따라서 funcs 배열의 요소로 추가한 함수를 호출하면 전역변수 i를 참조해 i의 값 3이 총 3번 출력된다

```jsx
/* 클로저 사용시 자주 발생하는 실수 */

var funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = () => i;
}
for (let j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); //  3 3 3 이 총 3번 출력된다
}
```

**const,let 키워드를 사용해 리팩토링**

- `const,let`은 고유한 블록스코프를 가지고 있으므로 반복 실행될때마다 for 문 코드블록의 고유한 새로운 렉시컬 환경이 생성된다
  - 만약 for문 코드 블록 내 정의한 함수가 있다면 ?
    - 해당 함수의 상위 스코프는 for 문의 코드 블록이 반복 실행될 때마다 생성된 for 코드 블록의 새로운 렉시컬 환경이다

```js
/* const/let 키워드를 사용해 리팩토링 */
const funcs = [];
for (let i = 0; i < 3; i++) {
  funcs[i] = () => i;
}
for (let i = 0; i < funcs.length; i++) {
  console.log(funcs[i]()); // [0 1 2] x3번 출력
}
```
