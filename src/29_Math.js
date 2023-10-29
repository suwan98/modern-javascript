/* Math */

/* Math.PI */
console.log(Math.PI); // 3.141592..

/* Math.abs */
console.log(Math.abs(-1)); // 1
console.log(Math.abs("-1")); // 1
console.log(Math.abs(null)); // 0
console.log(Math.abs([])); // 0
console.log(Math.abs({})); // NaN
console.log(Math.abs(undefined)); // NaN
console.log(Math.abs("string")); // NaN

/* Math.ceil */
console.log(Math.ceil(4.6)); // 5
console.log(Math.ceil(-1.4)); // -1
console.log(Math.ceil()); //

/* Math.round */
console.log(Math.round(1.4));
console.log(Math.round(1.6));
console.log(Math.round(-1.4));
console.log(Math.round(-1.6));

/* Math.floor */
console.log(Math.floor(1.9));
console.log(Math.floor(9.1));
console.log(Math.floor(-1.9));
console.log(Math.floor(-9.1));

/* Math.sqrt */
console.log(Math.sqrt(9));

/* Math.random */
/* 1~10 범위의 랜덤 정수 취득 */
const random = Math.floor(Math.random() * 10 + 1);
console.log(random);

/* Math.pow */
console.log(Math.pow(2, 8)); // 256
console.log(Math.pow(2, -1)); // 0.5
console.log(Math.pow(2)); // NaN

/* Math.max/max */
const numbers = [1, 2, 3, 4, 5];
console.log(Math.max(...numbers));
console.log(Math.min(...numbers));
console.log(Math.max()); // -Infinity
