/* setTimeout과 유사한 sleep 함수 구현 */
function sleep(callback, delay) {
  const delayUntil = Date.now() + delay;

  while (Date.now() < delayUntil);

  callback();
}

function test() {
  console.log("TEST1");
}

function test2() {
  console.log("TEST2");
}

/* slepp 함수는 3 초이상 실행된다 */
// sleep(test, 3 * 1000);

/* test2함수의 호출은 sleep 함수의 실행이 종료된 이후 호출되므로 3초 이상 블로킹 된다 */
test2();

/* setTimeout을 사용해 수정 */
function setTimeoutAsync1() {
  console.log("첫번째 실행될까?");
}

function setTimeoutAsync2() {
  console.log("두번째 실행될까?");
}

setTimeout(setTimeoutAsync1, 0);
setTimeoutAsync2();
