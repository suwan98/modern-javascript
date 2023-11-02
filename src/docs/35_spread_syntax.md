# #35 스프레드 문법

**📚 목차**

# 개요

**ES6에서 도입된 스프레드 문법 (`…`)**

- 하나로 뭉쳐져 있는 여러 값들의 집합을 전개해 개별적인 값들의 목록을 만들 수 있음
- 스프레드 문법을 사용할 수 있는 대상
  - `Array`
  - `String`
  - `Map`
  - `Set`
  - `DOM` 컬렉션(`NodeList`, `HTMLCollection`)
  - `arguments`
- `for..of` 문으로 순회할 수 있는 이터러블에 한정한다

```jsx
/* 전개 연산자 */

/* for..of 문으로 순회할 수 있는 이터러블에 한정 */

/* 배열은 전개가 가능하다 */
console.log(...[1, 2, 3]); // 1 2 3

/* 문자열도 이터러블이므로 전개가 가능하다 */
console.log(..."hello"); // h e l l o

/* Map과 Set은 이터러블하므로 전개가 가능하다 */
console.log(
  ...new Map([
    [1, 2, 3],
    ["b", 2],
  ])
); // [1,2] ["b", 2]
console.log(...new Set([1, 2, 3])); // 1 2 3

/* 이터러블이 아닌 일반객체는 전개가 불가능하다 */
/* Uncaught TypeError: Spread syntax requires ...iterable[Symbol.iterator] to be a function */
console.log(...{name: "seju", age: 25});
```

> 💡 **주의!**

**스프레드 문법의 결과는 값이 아니다**

- 이는 스프레드 문법이 피연산자를 연사해 값을 생성하는 연산자가 아님을 의미
  - 따라서 **스프레드 문법의 결과는 변수에 할당할 수 없다**

```jsx
/* 스프레드 문법의 결과는 값이 아니다 */

/* SyntaxError: Unexpected token '...' */
const list = ...[1, 2, 3];
```

**스프레드 문법의 결과물은 값으로 사용할 수없고 값의 목록을 사용하는 문맥에서만 사용할 수 있다**

- 함수 호출문의 인수 목록
- 배열 리터럴의 요소 목록
- 객체 리터럴의 프로퍼티 목록

## 함수 호출문의 인수 목록에서 사용하는 경우

**배열을 펼쳐 개별적인 값의 목록을 만든 후, 이를 함수의 인수로 전달해야하는 경우가 있음**

- `Math.max`의 메서드에 숫자가 아닌 배열을 인수로 전달하면 최대값을 구할 수 없으므로 `NaN`을 반환한다
- 이와 같은 문제를 해결하기 위해 배열을 펼쳐 요소들을 개별적인 값들의 목록으로 만든다

```jsx
/* 함수 호출문의 인수 목록에서 사용하는 경우 */

const argumentsArray = [1, 2, 3];

/* Math.max의 인수는 배열이 아닌 숫자가 들어가야하므로 NaN이 나온다! */
const max = Math.max(argumentsArray);
console.log(max); // NaN

/* 해결방법 : 배열을 전개연산자로 값들의 목록으로 만들어 전달한다 */
const spreadMax = Math.max(...argumentsArray);
console.log(spreadMax); // 3
```

### Rest Parmeter VS Spread Syntax?

**차이점**

- **나머지 매개변수**는 함수에 전달된 **인수들의 목록을 배열로 전달받기 위해** 매개변수 이름앞에 …을 붙이는 것
- **전개 연산자**는 여러개의 값이 하나로 뭉쳐있는 **이터러블을 펼쳐서 개별적인 값들의 목록**을 만드는것
  - 즉 둘은 서로 반대의 개념이다

```jsx
/* Rest Parmeter VS Spread Syntax? */

const restParmeterFunction = (...rest) => {
  console.log(rest); // [1,2,3]
};
restParmeterFunction(1, 2, 3);
```

## 배열 리터럴 내부에서 사용하는 경우

**전개연산자 사용 시 ES5에서 사용하던 기본방식보다 간결하게 구현할 수 있게된다**

- ES5에서 사용하던 방식과 비교해서 정리

### concat

**ES5에선 2개의 배열을 하나의 배열리터럴로 결합하고 싶은경우 concat 메서드를 사용했어야 했다**

- ES6에선 전개연산자로 배열리터럴 두개를 하나의 배열로 손쉽게 결합할 수 있다

```jsx
/* ES5 vs ES6 Spread Syntax */

/* concat? */
const concatArray1 = [1, 2, 3];
const concatArray2 = [4, 5, 6];

/* ES5 Concat */
const mergeArray = concatArray1.concat(concatArray2);
console.log(mergeArray); // [1, 2, 3, 4, 5, 6]

/* ES6 Spread Syntax */
const spreadMergeArray = [...concatArray1, ...concatArray2];
console.log(spreadMergeArray); // [1, 2, 3, 4, 5, 6]
```

### splice

**ES5에선 배열의 중간에 다른 배열의 요소를 추가하거나 제거하려면 splice 메서드를 사용**

- 이때 `splice` 메서드의 세번째 인수로 배열을 전달해 배열자체가 추가한다
  - 그러나 아래 코드에선 `[1,2,3,4]`를 기대했으나 `[1,[2.3].4]` 로 출력된다
  - 이러한 경우 ES5에선 `Function.prototype.apply`를 통해 `splice` 메서드를 호출해야한다 `apply` 의 두번째 인수는 `apply`가 호출하는 함수에 의해 해체되어 전달된다

```jsx
/* splice? */
const spliceArray1 = [1, 4];
const spliceArray2 = [2, 3];

spliceArray1.splice(1, 0, spliceArray2);
/* 기대한결과는 [1,2,3,4] 였으나 [1, [2,3], 4 ] 로 출력 */
console.log(spliceArray1);
```

**전개연산자를 사용하면 더욱 간결하고 가독성 좋게 표현할 수 있다**

```jsx
const spliceArray1 = [1, 4];
const spliceArray2 = [2, 3];

/* ES6 Spread Syntax */
spliceArray1.splice(1, 0, ...spliceArray2);
console.log(spliceArray1); // [1,2,3,4]
```

### 배열 복사

**ES5에선 배열 복사를 위해선 slice 메서드를 사용했어야 했다**

```jsx
/* Copy Array */

/* ES5 slice */
const originArray = ["김민재", "손흥민", "이강인"];

const copyArray = originArray.slice();
console.log(copyArray); //  ["김민재", "손흥민", "이강인"];
```

**전개연산자 사용시 더욱 간결하게 복사할 수 있다**

```jsx
const originArray = ["김민재", "손흥민", "이강인"];

/* ES6 Spread Syntax */
const copyArray3 = [...originArray];
console.log(copyArray3); //  ["김민재", "손흥민", "이강인"];
```

**이때 slice로 하던 전개연산자로 복사하던 배열은 얕은복사한다**

### 이터러블 배열로 변환

**ES5에선 arguments(유사배열객체)를 배열로 변환시 apply/call 메서드를 사용했어야 했음**

```jsx
/* Convert To Array */
/* ES5 Argumets Obejct Convert to Array  */
function es5Arguments() {
  const args = Array.prototype.slice.call(arguments);

  return args.reduce((acc, cur) => acc + cur, 0);
}
console.log(es5Arguments(1, 4)); // 5
```

**전개연산자를 사용하면 더 간단하게 유사배열객체를 변환할 수 있다**

```jsx
/* ES6 Spread Syntax */
function es6Arguments() {
  const args = [...arguments];

  return args.reduce((acc, cur) => acc + cur, 0);
}
console.log(es6Arguments(1, 6)); // 7
```

**물론 위예제보다 더 나은 방법은 RestParmeter 사용**

```jsx
/* ES6 Spread Syntax */
function es6Arguments(...rest) {
  return rest.reduce((acc, cur) => acc + cur, 0);
}
console.log(es6Arguments(1, 6)); // 7
```

**단, 이터러블이 아닌 유사배열객체는 전개연산자를 사용할 수 ❌**

- 이터러블이 아닌 유사배열 객체를 배열로 변경하려면 `Array.from` 메서드를 사용해야함

```jsx
/* 이터러블이 아닌 유사배열 객체에 대한 전개연산자 사용 */
const arrayLikeObejct = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

/* TypeError: arrayLikeObejct is not iterable */
const arrayLikeConvertToArray = [...arrayLikeObejct];
```

**이터러블이 아닌 유사배열 객체를 Array.from으로 배열로 변환**

```jsx
const arrayLikeObejct = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

const arrayLikeConvertToArray = Array.from(arrayLikeObejct);

console.log(arrayLikeConvertToArray); // [1,2,3]
```

## 객체 리터럴 내부에서 사용되는 경우

**스프레드 프로퍼티 사용 시 객체 리터럴 프로퍼티 목록에서도 스프레드 문법 사용 가능**

- 객체 자체를 전개하는게 아니라 프로퍼티만 전개하는 것임!
  - 기존 객체 자체를 전개하는것은 당연히 불가 ❌

```jsx
/* 객체 리터럴 내부에서 사용하는 경우 */
const originObejct = {
  name: "seju",
  age: 26,
};

const copyObject = {...originObejct};
console.log(originObejct); // {name: 'seju', age: 26}
```

**스프레드 프로퍼티 이전에는 Obejct.assign을 이용해서 객체를 복사했어야 됬다**

```jsx
/* Obejct.assign */

const merged = Object.assign({}, {name: "seju"}, {age: 26});

console.log(merged); // {name: 'seju', age: 26}
```
