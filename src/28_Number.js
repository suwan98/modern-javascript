/* Number 생성자 함수 */

/* Number 래퍼 객체 */
const numberObject = new Number();
console.log(numberObject); // Number {{[PrimitiveValue] : 0}}

/* Number 생성자함수에 숫자가 아닌값이 들어갈때? */
const number1 = new Number("not a number");
console.log(number1); // NaN
const number2 = new Number("11");
console.log(number2); // 11

/* new 연산자를 사용하지않고 Number 생성자 함수 호출 시 */
const number3 = Number(0);
console.log(number3);

/* isFinite */

/* 인수가 유한한수인경우 true 반환 */
console.log(Number.isFinite(0));
console.log(Number.isFinite(Number.MAX_VALUE));

/* 인수가 무한한 수 인경우 false를 반환 */
console.log(Number.isFinite(Number.POSITIVE_INFINITY));
console.log(Number.isFinite(Number(Infinity)));
console.log(Number.isFinite("0"));

/* Number.isInteger */

/* 인수가 정수라면 true를 반환 */
console.log(Number.isInteger(0));
console.log(Number.isInteger(-123));

/* 인수가 정수가 아니면 false를 반환 */
console.log(Number.isInteger(0.5));
console.log(Number.isInteger("123"));
console.log(Number.isInteger(false));

/* Number.isNaN */
console.log(Number.isNaN(NaN));
console.log(Number.isNaN("1"));
console.log(Number.isNaN(2));

/* Number.prototype.toFixed */
console.log(Number(3.141592).toFixed()); // '3'
console.log(Number(3.141592).toFixed(1)); // '3.1'
console.log(Number(3.141592).toFixed(2)); // 3.14'

/* Number.prototype.toString */
console.log(Number(3.141592).toString()); // '3.141592'
console.log(Number(3.141592).toString(2)); // '11.011111...'
console.log(Number(3.141592).toString(8)); // '3.1109.....'
