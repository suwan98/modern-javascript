/* Date는 빌트인 객체이면서 생성자 함수 이다 */

/* Date 생성자 함수로 객체를 생성하는 방법 4가지 */
console.log(new Date()); // new Date('2023-10-29T09:55:13.000Z')

/* Date객체를 new 연산자 없이 호출하면? */
console.log(Date()); // 'Sun Oct 29 2023 18:56:19 GMT+0900 (한국 표준시)'

/* Date 생성자 함수에 숫자 타입의 밀리초를 인수로 전달시 */
console.log(new Date(50000)); // new Date('1970-01-01T00:00:50.000Z')

/* Date 생성자 함수에 날짜와 시간을 나타내는 문자열을 인수로 전달시 */
console.log(new Date("May 26, 2020 10:00:00")); // new Date('2020-05-26T01:00:00.000Z')

/* new 생성자 함수에 연,월,일,시분,초,밀리초를 의미하는 숫자를 인수로 전달시 */
console.log(new Date(2023, 10)); // Wed Nov 01 2023 00:00:00 GMT+0900 (한국 표준시)
/* 다음처럼 표현하면 가독성이 훨씬 좋다 */
console.log(new Date("2023/10/29/19:00:00:00")); // Sun Oct 29 2023 19:00:00 GMT+0900 (한국 표준시)

/* Date.now */
const now = Date.now();
console.log(now); // 1698573964175
const nowDate = new Date(now);
console.log(nowDate);

/* Date.pharse */
console.log(Date.parse("1970/01/01/00:00:00"));

/* Date.prototype.getFullYear */
const date = new Date();
console.log(date.getFullYear());

/* Date.prototype.setFullYear */
// date.setFullYear(2022);
// date.setFullYear(1900, 0, 1);
console.log(date);

/* Date.prototype.getMonth */
console.log(date.getMonth());

/* Date.setMonth */
// date.setMonth(11, 1);
console.log(date);

/* Date.prototype.getDate / setDate */
console.log(date.getDate());
// console.log(date.setDate(12));
console.log(date);

/* Date.getDay */
/* 현재 수요일이므로 2가 출력 */
console.log(date.getDay());

/* Date.prototype.getHours */
/* 현재 7시이므로 19 출력 */
console.log(date.getHours()); // 19
// date.setHours(3);
console.log(date.getHours()); // 3

/* Date.prototype.getMinutes / setMinutes */
console.log(date.getMinutes()); // 32
// date.setMinutes(24);
console.log(date.getMinutes());

(function printNow() {
  const today = new Date();
  const dayNames = ["월", "화", "수", "목", "금", "토", "일"];
  const day = dayNames[today.getDay()];

  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  const ampm = hour > 12 ? "PM" : "AM";

  hour %= 12;
  hour = hour || 12;

  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  const now = `${year}년 ${month}월 ${date}일 ${day} : ${hour} : ${minute} : ${second} ${ampm}`;
  console.log(now);

  const oneMinute = 60 * 1000; // 1분을 밀리초로 표현

  setTimeout(printNow, 1000);

  setTimeout(() => {
    clearTimeout(printNow);
  }, 10000);
})();
