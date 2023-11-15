/* 타이머함수 */

/* 1초 후 타이머가 만료되면 콜백함수가 호출 */
setTimeout(() => {
  console.log("Hi");
}, 1000);

/* 3번째 인수로 params를 전달받을 수 있다 */
setTimeout(
  (name) => {
    console.log(`Hi ${name}`);
  },
  2000,
  "Seju"
);

/* setTimeout은 고유한 타이머 id를 반환하고 이를 통해 타이머를 취소할 수 있다 */
const timerId = setTimeout(() => {
  console.log("h1");
}, 1000);
console.log(timerId); // 3
/* clearTimeout을 통해 타이머가 취소되면 setTimeout의 콜백함수는 실행되지 않는다 */
clearTimeout(timerId);

/* setInterval 호출 스케줄링 취소 */
let count = 1;
const timeoutId = setInterval(() => {
  count++;
  console.log(count);
  if (count === 5) {
    clearInterval(timeoutId);
  }
}, 1000);

/* 디바운스와 스로틀링 */
const container = document.createElement("div");
document.body.appendChild(container);
container.insertAdjacentHTML(
  "beforeend",
  `
    <button>Click me!</button>
    <pre>일반 클릭 이벤트 카운터 <span class="normal-msg">0</span></pre>
    <pre>디바운스 클릭 이벤트 카운터 <span class="debounce-msg">0</span></pre>
    <pre>스로틀 이벤트 카운터 <span class="throttle-msg">0</span></pre>
`
);
const $button = document.querySelector("button");
const $normalMsg = document.querySelector(".normal-msg");
const $debounceMsg = document.querySelector(".debounce-msg");
const $throttleMsg = document.querySelector(".throttle-msg");

/* 디바운스 코드 */
const debounce = (callback, delay) => {
  let timerId;
  return (...args) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, ...args);
  };
};

/* 스로틀 코드 */
const throttle = (callback, delay) => {
  let timerId;
  return (...args) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback(...args);
      timerId = null;
    }, delay);
  };
};

/* 클릭 이벤트 실행 */
$button.addEventListener("click", () => {
  $normalMsg.textContent = +$normalMsg.textContent + 1;
});

$button.addEventListener(
  "click",
  debounce(() => {
    $debounceMsg.textContent = +$debounceMsg.textContent + 1;
  }, 500)
);

$button.addEventListener(
  "click",
  throttle(() => {
    $throttleMsg.textContent = +$throttleMsg.textContent + 1;
  }, 500)
);

/* 디바운스 예시 */
container.insertAdjacentHTML(
  "beforeend",
  `
  <input type="text" />
  <div class="msg"></div>
`
);

const $input = document.querySelector("input");
const $msg = document.querySelector(".msg");

/* 디바운스로 매핑 */
$input.addEventListener(
  "input",
  debounce((e) => {
    $msg.textContent = e.target.value;
  }, 1000)
);

/* 스로틀 예시 */
const throttleContainer = document.body.insertAdjacentHTML(
  "beforeend",
  `
    <div class="throttleContainer">
        <div class="content"></div>
    </div>
    <div>
        일반 이벤트 핸들러가 scroll 이벤트를 처리한 횟수 :
        <span class="normal-count">0</span>
    </div>
    <div>
        스로틀 이벤트 핸들러가 scroll 이벤트를 처리한 횟수 :
        <span class="throttle-count">0</span>
    </div>
`
);

const $throttleContainer = document.querySelector(".throttleContainer");
const $normalCount = document.querySelector(".normal-count");
const $throttleCount = document.querySelector(".throttle-count");

/* 일반 addEventListenr로 스크롤 이벤트를 발생시킨 경우 */
let normalCount = 0;
$throttleContainer.addEventListener("scroll", () => {
  $normalCount.textContent = ++normalCount;
});

/* 스로틀함수를 매핑해 스크롤이벤트를 발생시킨 경우 */
let throttleCount = 0;
$throttleContainer.addEventListener(
  "scroll",
  throttle(() => {
    $throttleCount.textContent = ++throttleCount;
  }, 100)
);
