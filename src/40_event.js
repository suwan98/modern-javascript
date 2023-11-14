/* 이벤트 핸들러 */
const button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("button Click");
});
button.addEventListener("click", () => {
  console.log("button Click2");
});

/* 참조가 동일한 이벤트 핸들러 중복 등록 시 */
const handleClick = () => {
  console.log("click");
};
button.addEventListener("click", handleClick);
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

/* 이벤트 객체 */
const message = document.querySelector(".message");
const showCoords = (e) => {
  message.textContent = `clientX : ${e.clientX}, clientY : ${e.clientY}`;
};
window.addEventListener("click", showCoords);

const container = document.querySelector(".container");
container.insertAdjacentHTML(
  "beforeend",
  `
        <ul class="fruits">
            <li class="apple">사과</li>
            <li class="banana">바나나</li>
            <li class="orange">오렌지</li>
        </ul>
`
);

/* 이벤트 전파 */
const fruits = document.querySelector(".fruits");

function clickEvent(node, callback) {
  node.addEventListener("click", callback);
}

const consolePropagation = (e) => {
  console.log(e.eventPhase); // 3
  console.log(e.target); // 내가 클릭한 li
  console.log(e.currentTarget);
  console.log(this);
  console.log(this === e.currentTarget);
};
clickEvent(fruits, consolePropagation);

fruits.addEventListener("click", consolePropagation);

/* 이벤트 위임 */
function activate({target}) {
  if (!target.matches(".fruits > li")) return;
  [...fruits.children].forEach((fruit) => {
    fruit.classList.toggle("active", fruit === target);
  });
}

fruits.addEventListener("click", activate);

/* 이벤트 핸들러 어트리뷰트 방식의 this  */

function handleClickNode() {
  console.log(this);
}

/* 이벤트 핸들러에 인수 전달하기 */
container.insertAdjacentHTML(
  "beforeend",
  `
    <label>UserName <input type="text" class="user-input" /></label>
    <em class="message2"></em>
`
);

const MIN_USER_NAME_LENGTH = 5;
const userInput = document.querySelector(".user-input");
const $message = document.querySelector(".message2");

const checkUserNameLength = (min) => (e) => {
  $message.textContent =
    userInput.value.length < min ? `이름은 ${min}자 이상 입력해 주세요` : null;
  console.log(e);
};

userInput.addEventListener("change", checkUserNameLength(MIN_USER_NAME_LENGTH));

/* 커스텀 이벤트 생성 */
const keyboardEvent = new KeyboardEvent("keyup");
console.log(keyboardEvent.type); // 'keyup'

const customEvent = new CustomEvent("페이커");
console.log(customEvent.type); // '페이커'
console.log(customEvent.cancelable); // false
console.log(customEvent.bubbles); // false
