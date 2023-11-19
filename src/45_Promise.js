/* 비동기 처리를 위한 콜백패턴의 단점들 */

/* 콜백 헬 */
// const END_POINT = "https://jsonplaceholder.typicode.com/posts/1";
// const getData = (url) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url);
//   xhr.send();

//   xhr.onload = () => {
//     xhr.status === 200
//       ? console.log(JSON.parse(xhr.response))
//       : console.error(`${xhr.status} ${xhr.statusText}`);
//   };
// };
/* id가 1인 post 취득 */
// const response = getData(END_POINT);
// console.log(response); // undefined

/* setTimeout 함수의 콜백함수에 상위 스코프에 변수 값 할당해보기 */
let global = 0;
setTimeout(() => {
  global = 100;
}, 0);
console.log(global); // 0

/* 서버의 응답을 상위 스코프에 변수에 할당하면? */
// let todos;
// const END_POINT = "https://jsonplaceholder.typicode.com/posts/1";
// const getData = (url) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url);
//   xhr.send();

//   xhr.onload = () => {
//     xhr.status === 200
//       ? (todos = JSON.parse(xhr.response))
//       : console.error(`${xhr.status} ${xhr.statusText}`);
//   };
// };
// /* id가 1인 post 취득 */
// getData(END_POINT);
// console.log(todos); // undeinfed

/* getData를 콜백패턴을 사용해 데이터 응답결과를 반환받을 수 있다 */
const END_POINT = "https://jsonplaceholder.typicode.com/posts/1";
// const getData = (url, success, reject) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url);
//   xhr.send();

//   xhr.onload = () => {
//     xhr.status === 200
//       ? success(JSON.parse(xhr.response))
//       : reject(`${xhr.status} ${xhr.statusText}`);
//   };
// };
/* id가 1인 post 취득 */
// getData(END_POINT, console.log, console.error);

/* 콜백헬 */
// getData(`${END_POINT}/posts/1`, ({userId}) => {
//   console.log(userId);

//   getData(`${END_POINT}/users/${userId}`, (userInfo) => {
//     console.log(userInfo);
//   });
// });

/* 콜백 헬은 가독성을 나쁘게 하며 실수를 유발 시키는 원인이된다 */
// get("/stp1", (a) => {
//   get(`/step2/${a}`, (b) => {
//     get(`/step/3/${b}`, (c) => {
//       get(`/step/4/${c}`, (d) => {
//         console.log(d);
//       });
//     });
//   });
// });

/* 콜백패턴에서 에러 처리의 한계점 */
// try {
//   setTimeout(() => {
//     throw new Error("Error");
//   }, 1000);
// } catch (error) {
//   console.log("캐치한 에러", error);
// }

/* 프로미스 */

/* 프로미스 생성 */
// const promise = new Promise((resolve, reject) => {
//     if (/* 비동기 처리 성공했을때 수행될 resolve 함수 */) {
//         resolve('비동기 처리 성공')
//     } else {
//         reject('비동기 처리 실패')
//     }
// })

/* Promise객체를 통한 getData 리팩토링 */
const promiseGetData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = () => {
      xhr.status === 200
        ? resolve(JSON.parse(xhr.response))
        : reject(new Error(xhr.status));
    };
  });
};

const promiseObject = promiseGetData(END_POINT);
console.log(promiseObject);

/* 프로미스는 비동기 처리 상태와 더불어 비동기 처리결과도 상태로 가진다 */
const fullfilled = new Promise((res) => res(1));
console.log(fullfilled);

// const rejected = new Promise((_, reject) => reject(new Error("rejected")));
// console.log(rejected);

/* then 메서드가 전달받는 인수 */
new Promise((resolve) => resolve("fullfilled")).then((v) => console.log(v)); // 'fullfilled'
new Promise((_, reject) => reject("Error")).then(
  "",
  (e) => console.log(e) // 'Error'
);

/* Promise.prototype.catch */
// new Promise((_, reject) => reject(new Error("비동기 통신 실패!"))).catch((e) =>
//   console.log(e)
// );

/* Promise.prototype.finally */
const finallyPromise = new Promise(() => {}).finally(() =>
  console.log("무적권 실행")
);
console.log(finallyPromise);

/* 프로미스로 구현한 비동기 함수 getData를 사용해 후속처리 구현 */
promiseGetData(END_POINT)
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
  .finally(() => {
    console.log("무조건 실행");
  });

/* 콜백헬이 발생한 예제를 프로미스 체이닝을 통해 다시 구현 */
const BASE_URL = "https://jsonplaceholder.typicode.com";
promiseGetData(`${BASE_URL}/posts/1`)
  .then(({userId}) => promiseGetData(`${BASE_URL}/users/${userId}`))

  /* {id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: {…}, …} */
  .then((userInfo) => console.log(userInfo))
  .catch((erorr) => console.error(erorr));

/* async/await를 통한 후속처리 */
(async () => {
  const {userId} = await promiseGetData(`${BASE_URL}/posts/1`);
  const userInfo = await promiseGetData(`${BASE_URL}/users/${userId}`);
  console.log(userInfo);
})();

/* Promise.resolve / Promise.reject */
const resolvedPromise = Promise.resolve([1, 2, 3]);
resolvedPromise.then((res) => console.log(res));
const rejectedPromise = Promise.reject(new Error("에러 객체"));
rejectedPromise.catch((error) => console.log(error));

/* Promise.all */
const requestData = () =>
  new Promise((resolve) => setTimeout(() => resolve(1), 3000));
const requestData2 = () =>
  new Promise((resolve) => setTimeout(() => resolve(2), 2000));
const requestData3 = () =>
  new Promise((resolve) => setTimeout(() => resolve(3), 1000));

const result = [];
requestData()
  .then((data) => {
    result.push(data);
    return requestData2();
  })
  .then((data) => {
    result.push(data);
    return requestData3();
  })
  .then((data) => {
    result.push(data);
    console.log(result);
  });

/* Promise.all을 사용한 병렬처리 */
const all = Promise.all([requestData(), requestData2(), requestData3()]).then(
  console.log
);

// [1,2,3] -> 약 3초 소요됨
console.log(all);

/* 하나라도 rejected 상태가 될 시 나머지 프로미스가 fulfilled 상태가 되는 것을 기다리지 않고 즉시 종료 */
// Promise.all([
//   new Promise((_, reject) =>
//     setTimeout(() => reject(new Error("첫번째 에러")), 3000)
//   ),
//   new Promise((_, reject) =>
//     setTimeout(() => reject(new Error("두번째 에러")), 2000)
//   ),
//   /* 3번째 프로미스객체가 가장 먼저 에러가 발생(1초)하므로 catch메서드로 전달 후 종료 */
//   new Promise((_, reject) =>
//     setTimeout(() => reject(new Error("세번째 에러")), 1000)
//   ),
// ]).catch((erorr) => console.error(erorr));

const githubIds = ["suwan98", "simseonbeom", "yamoo9"];
const response = Promise.all(
  githubIds.map((id) => promiseGetData(`https://api.github.com/users/${id}`))
).then((users) => users.map((user) => user));
console.log(response);

/* Promise.race */
Promise.race([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
]).then(console.log); // 3;

/* Promise.allSettled */
Promise.allSettled([
  new Promise((resolve) => setTimeout(() => resolve(1), 2000)),
  new Promise((_, reject) => setTimeout(() => reject(new Error("엘어")), 1000)),
]).then(console.log);

/* 마이크로 태스크 큐 */

/* 아래코드에선 어떤 순서로 로그가 출력될까? */
setTimeout(() => console.log(1), 0);
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));

/* fetch */
fetch(END_POINT).then((response) => console.log(response.json()));

/* fetch 함수에서의 에러 핸들링 */
// const wrongURL = "https://jsonplaceholder.typicode.com/XXX/1";
// fetch(wrongURL)
//   .then((response) => {
//     if (!response.ok) throw new Error(response.statusText);
//     return response.json();
//   })
//   .then((todo) => console.log(todo))
//   .catch((err) => console.error(err));

/* Patch HTTP 요청 메서드 */

const fetchRequest = {
  get(url) {
    return fetch(url);
  },
  post(url, payload) {
    return fetch(url, {
      method: "POST",
      headers: {"content-Type": "applicaiton/json"},
      body: JSON.stringify(payload),
    });
  },
  patch(url, payload) {
    return fetch(url, {
      method: "PATCH",
      headers: {"content-Type": "applicaiton/json"},
      body: JSON.stringify(payload),
    });
  },
  delete(url) {
    return fetch(url, {method: "DELETE"});
  },
};

/* GET 요청 */
const responseTodo = fetchRequest
  .get(END_POINT)
  .then((response) => {
    if (!response.ok) throw new Error("통신 실패");
    return response.json();
  })
  .then((res) => {
    console.log(res);
  });

/* POST 요청 */
fetchRequest
  .post("https://jsonplaceholder.typicode.com/todos", {
    userId: 1,
    title: "JavaScript",
    completed: false,
  })
  .then((response) => {
    if (!response.ok) throw new Error("통신 실패");
    return response.json();
  })
  .then((todos) => console.log(todos));

/* PATCH 요청 */
