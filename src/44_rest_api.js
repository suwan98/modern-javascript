document.body.insertAdjacentHTML(
  "beforeend",
  `
    <pre></pre>
`
);

/* JSON 서버 GET 요청 */

const END_POINT = "http://localhost:3000/todos";
const xhr = new XMLHttpRequest();
xhr.open("GET", END_POINT);
xhr.send();
xhr.onload = () => {
  if (xhr.status === 200) {
    document.querySelector("pre").textContent = xhr.response;
  } else {
    console.log("Error");
  }
};

// /* POST 요청 */
// xhr.open("POST", END_POINT);
// xhr.setRequestHeader("content-type", "application/json");
// xhr.send(JSON.stringify({id: 5, content: "Nodejs", completed: false}));
// xhr.onload = () => {
//   if (xhr.status === 200) {
//     document.querySelector("pre").textContent = xhr.response;
//   } else {
//     console.log("Error", xhr.statusText);
//   }
// };

/* PUT 요청 */
// xhr.open("PUT", `${END_POINT}/4`);
// xhr.setRequestHeader("content-type", "application/json");
// xhr.send(JSON.stringify({id: 5, content: "Docker", completed: true}));
// xhr.onload = () => {
//   if (xhr.status === 200) {
//     document.querySelector("pre").textContent = xhr.response;
//   } else {
//     console.log("Error", xhr.statusText);
//   }
// };

/* PATCH 요청 */
// xhr.open("PATCH", `${END_POINT}/4`);
// xhr.setRequestHeader("content-type", "application/json");
// xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
// xhr.send(JSON.stringify({complted: false}));
// xhr.onload = () => {
//   if (xhr.status === 200) {
//     document.querySelector("pre").textContent = xhr.response;
//   } else {
//     console.log("Error", xhr.statusText);
//   }
// };

/* DELETE 요청 */
// xhr.open("DELETE", `${END_POINT}/4`);
// xhr.send();
// xhr.onload = () => {
//   if (xhr.status === 200) {
//     document.querySelector("pre").textContent = xhr.response;
//   } else {
//     console.log("Error", xhr.statusText);
//   }
// };
