var x = "global";

function foo() {
  var x = "local";
  console.log(x);
}

foo();
console.log(x);

/* 함수 레벨 스코프 */

var global = 1;

if (true) {
  var global = 2;
}

console.log(global); // 2

/* 렉시컬 스코프 예제 */

var x = 20;

function lexical() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x); // 20
}

lexical();
bar(); // 20
