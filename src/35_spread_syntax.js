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

// /* 이터러블이 아닌 일반객체는 전개가 불가능하다 */
// /* Uncaught TypeError: Spread syntax requires ...iterable[Symbol.iterator] to be a function */
// console.log(...{name: "seju", age: 25});

/* 스프레드 문법의 결과는 값이 아니다 */
/* SyntaxError: Unexpected token '...' */
// const list = ...[1, 2, 3];

/* 함수 호출문의 인수 목록에서 사용하는 경우 */
const argumentsArray = [1, 2, 3];

/* Math.max의 인수는 배열이 아닌 숫자가 들어가야하므로 NaN이 나온다! */
const max = Math.max(argumentsArray);
console.log(max); // NaN

/* 해결방법 : 배열을 전개연산자로 값들의 목록으로 만들어 전달한다 */
const spreadMax = Math.max(...argumentsArray);
console.log(spreadMax); // 3

/* Rest Parmeter VS Spread Syntax? */
const restParmeterFunction = (...rest) => {
  console.log(rest);
};
restParmeterFunction(1, 2, 3);

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

/* splice? */

/* ES5 Splice */
const spliceArray1 = [1, 4];
const spliceArray2 = [2, 3];
// spliceArray1.splice(1, 0, spliceArray2);
/* 기대한결과는 [1,2,3,4] 였으나 [1, [2,3], 4 ] 로 출력 */
console.log(spliceArray1);

/* ES6 Spread Syntax */
spliceArray1.splice(1, 0, ...spliceArray2);
console.log(spliceArray1);

/* Copy Array */
/* ES5 slice */
const originArray = ["김민재", "손흥민", "이강인"];
const copyArray = originArray.slice();
console.log(copyArray);

/* ES6 Spread Syntax */
const copyArray3 = [...originArray];
console.log(copyArray3);

/* Convert To Array */
/* ES5 Argumets Obejct Convert to Array  */
function es5Arguments() {
  const args = Array.prototype.slice.call(arguments);

  return args.reduce((acc, cur) => acc + cur, 0);
}
console.log(es5Arguments(1, 4)); // 5

/* ES6 Spread Syntax */
function es6Arguments(...rest) {
  return rest.reduce((acc, cur) => acc + cur, 0);
}
console.log(es6Arguments(1, 6)); // 7

/* 이터러블이 아닌 유사배열 객체에 대한 전개연산자 사용 */
const arrayLikeObejct = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

/* TypeError: arrayLikeObejct is not iterable */
// const arrayLikeConvertToArray = [...arrayLikeObejct];
const arrayLikeConvertToArray = Array.from(arrayLikeObejct);
console.log(arrayLikeConvertToArray); // [1,2,3]

/* 객체 리터럴 내부에서 사용하는 경우 */
const originObejct = {
  name: "seju",
  age: 26,
};

const copyObject = {...originObejct};
console.log(originObejct); // {name: 'seju', age: 26}

/* Obejct.assign */
const merged = Object.assign({}, {name: "seju"}, {age: 26});
console.log(merged); // {name: 'seju', age: 26}
