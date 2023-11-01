/* String 생성자 함수 */

const stringObject = new String();
console.log(stringObject); // String{" "}

/* String 생성자 함수에 인수에 문자열을 전달 */
const assigmentStringObject = new String("할당");
console.log(assigmentStringObject); // '할당'
console.log(assigmentStringObject[0]); // '할'

/* String 생성자 함수에 인수로 문자열이 아닌 값 전달하면? */
const nullStringObject = new String(null);
console.log(nullStringObject); // 'null'

/* new  연산자 없이 String 생성자 함수 호출 시 */
console.log(String(1)); // '1'
console.log(String(NaN)); // 'NaN'

/* length 프로퍼티 */
console.log("Hello".length); //5

/* String.prototype.indexof */
const indexOfString = "Hello World";
/* 문자열에서 l을 검색 후 첫번째 l의 index를 반환 */
console.log(indexOfString.indexOf("l")); // 2
/* 검색한 문자열 내에서 존재하지 않을시 -1 반환 */
console.log(indexOfString.indexOf("z")); // -1
/* 2번째 인수 (옵션) */
console.log(indexOfString.indexOf("l", 3)); // 3

/* String.prototype.search */
const searchString = "Hello World";
console.log(searchString.search(/o/)); // 4

/* String.prototype.includes */
const isIncludeString = "Hello Woooorld";
console.log(isIncludeString.includes("ooo")); // true
console.log(isIncludeString.includes("oooz")); // false

/* String.prototype.startsWith */
const startString = "Hello World";
/* 문자열이 He로 시작하므로 true */
console.log(startString.startsWith("He")); // true
console.log(startString.startsWith("e")); // false

/* String.prototype.endsWith */
const endString = "is End?";
/* d?로 끝나므로 true */
console.log(endString.endsWith("d?")); // true
/* end?로 끝나지않으므로 false */
console.log(endString.endsWith("end?")); // false

/* String.prototype.charAt */
const charAtString = "Seju";
/* 문자열의 3번째 인덱스인 u 반환 */
console.log(charAtString.charAt(3)); // 'u'
/* 인덱스 범위를 넘어선 경우 */
console.log(charAtString.charAt(7)); // ' '

/* String.prototype.substring */
const subString = "Hellooooooooooooo World";
/* 인수로 전달받은 인덱스 1부터 3까지 반환 */
console.log(subString.substring(1, 4)); // 'ell'
/* substring 메서드 두번째 인수는 옵션 */
console.log(subString.substring(4)); // 'ooooooooooooo World'

/* String.prototype.slice */
const sliceString = "문자열을 잘라내보자!";
console.log(sliceString.slice(0, 5)); // '문자열을 '
console.log(sliceString.slice(2)); // '열을 잘라내보자'
/* 음수를 전달할 수 있다 */
console.log(sliceString.slice(-1)); // "!"

/* String.prototype.toUpperCase / toLowerCase */
const 대문자소문자변환 = "SsAzzSDdDasdfaCs";
console.log(대문자소문자변환.toUpperCase()); // 'SSAZZSDDDASDFACS'
console.log(대문자소문자변환.toLowerCase()); // 'ssazzsdddasdfacs'

/* String.prototype.trim */
const trimString = "            꺼억     ";
console.log(trimString.trim()); // '꺼억'

/* String.prototype.repeat */
const 문자열반복 = "반복하자";
console.log(문자열반복.repeat(2)); // '반복하자반복하자'
console.log(문자열반복.repeat()); // ''
