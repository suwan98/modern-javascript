/* 정규표현식의 생성 */

const literalTarget = "Is this all threre is?";

/* 정규표현식 리터럴 */
/* 플래그 : i => 대소문자를 구별하지 않고 검색 */
const regExp = /is/i;

// 리터럴에 인수로 전한 타겟이 맞으면 true를 반환
console.log(regExp.test(literalTarget)); // true

/* RegExp.prototype.exec */
/* ['Is', index: 0, input: 'Is this all threre is?', groups: undefined] */
console.log(regExp.exec(literalTarget));

/* String.prototype.match */
console.log(literalTarget.match(regExp));

/* 정규표현식 플래그 */

/* 타겟 문자열에 is 문자열을 대소문자를 구별해 한번만 검색 */
console.log(literalTarget.match(/is/)); // ['is', index: 5, input: 'Is this all threre is?', groups: undefined]

/* 타겟 문자열에 is 문자열을 대소문자를 구별하지 않고 한번만 검색 */
console.log(literalTarget.match(/is/i)); // ['Is', index: 0, input: 'Is this all threre is?', groups: undefined]

/* 타겟 문자열에 is 문자열을 대소문자를 구별하고  한번만 검색 */
console.log(literalTarget.match(/is/g)); //  ['is', 'is']

/* 타겟 문자열에 is 문자열을 대소문자를 구별하고 전역 검색 */
console.log(literalTarget.match(/is/gi)); // ['Is', 'is', 'is']

const randomRegExp = /.../g;
console.log(literalTarget.match(randomRegExp));

/* 반복 검색 */
const loopTarget = "A AA B BB Ad Bb AAA";
const loopRegExp = /A{1,2}/g;
console.log(loopTarget.match(loopRegExp));

/* {n} */
const loopNregExp = /A{2}/g;
console.log(loopTarget.match(loopNregExp));

/* {n,} */
const loopRegExp2 = /A{2,}/g;
console.log(loopTarget.match(loopRegExp2));

/* + */
const loopRegExp3 = /A+/g;
console.log(loopTarget.match(loopRegExp3)); // ['A', 'AA', 'A', 'AAA']

/* OR 검색 */
const orRegExp = /A|B+/g;
console.log(loopTarget.match(orRegExp)); //  [ 'A', 'A', 'A', 'B', 'BB', 'A', 'B', 'A', 'A', 'A' ]

/* 자주 사용되는 정규표현식 */

/* 특정 단어로 시작하는지 검사 */
const url = "https://velog.com";
console.log(/^https?:\/\//.test(url)); // true

/* 특정 단어로 끝나는지 검사 */
const fileName = "index.html";
console.log(/html$/.test(fileName)); //true

/* 숫자로만 이루어진 문자열인지 검사 */
const onlyNumber = "12345";
console.log(/^\d+$/.test(onlyNumber)); // true

/* 하나 이상의 공백으로 시작하는지 검사 */
const blackTarget = "      Hi";
console.log(/^[\s]+/.test(blackTarget)); // true

/* 아이디로 사용가능한지 검사 */
const id = "sejuzng123";
console.log(/^[A-Za-z0-9]{4,10}$/.test(id)); // true

/* 메일 주소 형식에 맞는지 검사 */
const email = "sejuzzang1@gmail.com";
console.log(
  /^[0-9a-zA-Z]([-_\.]?[a-9a-zA-Z]*)@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
    email
  )
);

/* 핸드폰 번호 형식에 맞는지 검색 */
const cellphone = "010-1234-2456";
console.log(/^\d{3}-\d{3,4}-\d{4}$/.test(cellphone)); // true

/* 특수 문자 포함 여부 검사 */
const specilString = "abc#123";
console.log(/[^A-Za-z0-9]/gi.test(specilString)); // true
