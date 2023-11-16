/* JSON */
// {
//     "name" : "seju",
//         "age" : 20,
//         "alive" : true,
//             "hobby" : ['soccer', 'game']
// }

/* JSON.stringify */
const 손흥민 = {
  name: "손흥민",
  age: 33,
  job: "soccerPlayer",
  alive: true,
};

const objectToJson = JSON.stringify(손흥민);
console.log(objectToJson);

/* replacer 함수 */
function replacer(key, value) {
  return typeof value === "number" ? null : value;
}

const stringFilteredObject = JSON.stringify(손흥민, replacer, 2);
console.log(stringFilteredObject);

/* 배열을 JSON 포멧으로 변환 */
const todos = [
  {id: 1, content: "HTML", complted: true},
  {id: 2, content: "CSS", complted: false},
  {id: 3, content: "JavaScript", complted: false},
];

const ArrayToJson = JSON.stringify(todos);
console.log(ArrayToJson);

/* JSON.parse */
/* 기존의 JSON 데이터로 만들었던 문자열을 다시 객체로 */

const JsonToObject = JSON.parse(objectToJson);
console.log(JsonToObject);

/* XMLHttpRequest */
/* XMLHttpRequest 객체 생성 */
const xhr = new XMLHttpRequest();
console.log(xhr);

/* HTTP 요청 전송 */
xhr.open("GET", "/users");
xhr.setRequestHeader("content-header", "application/json");
xhr.setRequestHeader("accept", "application/json");
xhr.send();

/* send로 전송시 요청 몸체에 담아 전송할 데이터를 인수로 전달할 수 있다 */
// xhr.send(JSON.stringify({id: 1, content: "HTML", complted: true}));

/* 실제 HTTP 응답처리 */
const SERVER_URL = "https://jsonplaceholder.typicode.com/todos/1";
const realXhr = new XMLHttpRequest();
realXhr.open("GET", SERVER_URL);
/* HTTP 요청 전송 */
realXhr.send();

/* 해당 이벤트는 HTTP 현재 상태를 나타내는 readyState 프로퍼티가 변경 될 때마다 발생 */
realXhr.onreadystatechange = () => {
  // 만약 서버 응답이 아직 완료되지 않았다면 리턴
  if (realXhr.readyState !== XMLHttpRequest.DONE) return;

  if (realXhr.status === 200) {
    console.log(JSON.parse(realXhr.response));
  } else {
    console.error("Error", realXhr.status, realXhr.statusText);
  }
};

realXhr.onload = () => {
  if (realXhr.status === 200) {
    console.log(JSON.parse(realXhr.response));
  } else {
    console.log("Error");
  }
};
