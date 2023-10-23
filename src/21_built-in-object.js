/* 표준 빌트인 객체는 생성자 함수이다 */

const strObject = new String("seju");
console.log(typeof strObject); // object
const func = new Function("x", "return x + y");
console.log(typeof func); // function
const regExp = new RegExp(/ab+c/i);
console.log(typeof regExp); // object
const date = new Date();
console.log(typeof date); // object

/* 표준 빌트인 객체의 프로토 타입은 표준 빌트인 객체의 prototype의 프로퍼티에 바인딩 된 객체이다*/
const strObject2 = new String("seju");
console.log(Object.getPrototypeOf(strObject2) === String.prototype); // true

/* 원시값과 래퍼객체 */
/* 원시타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작하고 있다 */
const primitiveString = "Hello";
console.log(primitiveString.length); //5
console.log(primitiveString.toLocaleLowerCase()); //hello

/* 전역객체 */
console.log(globalThis === window); // true
/* Node.js 환경 */
// console.log(globalThis === global); // true

/* 전역 객체의 특징 */
console.log(window.parseInt("F", 16)); // 15
/* window 없이도 프로퍼티를 참조할 수 있다 */
console.log(parseInt("F", 16)); // 15
console.log(window.parseInt === parseInt); // true

/* 빌트인 전역 프로퍼티 */
/* 인피니티 */
console.log(window.Infinity === Infinity); // true
console.log(3 / 0); // Infinity
console.log(typeof Infinity);
/* NaN */
console.log(window.NaN); // NaN

/* 인수가 유한수이면 true를 반환 */
console.log(isFinite(0)); // true
console.log(isFinite(NaN)); // false

/* 전달받은 인수가 NaN인지 검사하고 그 결과를 불리언으로 변환 */
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false
console.log(isNaN("hahaa")); // true : 'hahaa' => NaN
console.log(isNaN("10")); // false : '10' -> 10

/* 전달받은 문자열 인수를 실수로 해석 후 반환 */
console.log(parseFloat("3.15")); // 3.15
console.log(parseFloat("10.0000")); // 10
/* 공백으로 구분된 문자열일 경우 첫번째 문자열 값만 반환 */
console.log(parseFloat("34 45 67")); // 34
/* 첫번째 문자열을 숫자로 형변환 불가 시 NaN을 반환 */
console.log(parseFloat("He is ..")); // NaN
