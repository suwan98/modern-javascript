/* 소스코드 실행 예제 상상 */
// var x;
// x = 1;

/* 23.3 실행 컨텍스트의 역할 */

/* 전역 변수 선언 */
const x = 1;
const y = 2;
function foo(a) {
  /* 함수 내부 지역변수 선언 */
  const x = 100;
  const y = 200;
  console.log(a + x + y);
}
/* 함수 호출 */
foo(100);
console.log(x + y);

/* 아래 코드에서 실행컨텍스트 스택의 흐름은? */
const stackVariableX = 1;
function executionContextFunction() {
  const stackVariableY = 2;

  function innerFunction() {
    const stackVaribaleZ = 3;
    console.log(stackVariableX + stackVariableY + stackVaribaleZ);
  }
  innerFunction();
}
executionContextFunction(); //6

/* 실행 컨텍스트의 생성과 식별자 검색과정 */
var exeX = 1;
const exeY = 2;
function exeFunction(a) {
  var exeX = 3;
  const exeY = 4;

  function innerFunction(b) {
    const innerFunctionZ = 5;
    console.log(a + b + exeX + exeY + innerFunctionZ);
  }
  innerFunction(10);
}
exeFunction(20);

/* 23.7 실행 컨텍스트와 블록 레벨 스코프 */
let blockScopeX = 1;
if (true) {
  let blockScopeX = 10;
  console.log(blockScopeX); // 10
}
console.log(blockScopeX); // 1
