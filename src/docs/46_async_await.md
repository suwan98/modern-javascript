# async/await 키워드

**제네레이터를 통한 비동기처리 구현시 코드가 가독성이 나쁘고 장황해 진다는 단점이 생겼음**

- ES8(2017년도) 부터 제네레이터보다 간단하고 가독성 좋게 비동기 처리를 동기처럼 동작할 수 있는 `async/await`가 도입됨

**async/await**

- 프로미스를 기반으로 동작
- `async/await` 사용 시 프로미스의 `then/catch/finally` 후속 처리 메서드의 콜백함수를 전달해 비동기 처리 결과를 후속 처리할 필요 없이 마치 동기처리 처럼 프로미스를 사용할 수 있다

```tsx
/* async/await를 통한 fetch 구현 */
async function fetchTodo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const response = await fetch(url);
  const todo = await response.json();

  /* {userId: 1, id: 1, title: 'delectus aut autem', completed: false} */
  console.log(todo);
}
fetchTodo();
```

### async 함수

**await 키워드는 반드시 async 함수 내부에서 사용해야 한다**

- `async` 함수는 `aysnc` 키워드를 통해 정의하고 언제나 프로미스를 반환
- `async` 함수가 명시적으로 프로미스를 반환하지 않더라도 `async` 함수는 암묵적으로 반환값을 `resolve` 하는 프로미스 객체가 반환된다

### await 키워드

**await 키워드는?**

- 프로미스가 `settled` 상태가 될 때 까지 대기하다가 `settled` 상태가 될 때 프로미스가 `resolve`한 결과를 반환
- `awiat` 키워드는 반드시 프로미스 앞에서 사용해야 한다
  - `response` 프로미스 객체가 HTTP 요청에 서버의 응답이 도착해 `fetch`함수가 반환한 프로미스가 `settled` 상태가 될 때 까지 대기
  - 이후 프로미스가 `settled`상태가 될 때 프로미스가 `resolve`한 처리 결과가 `response` 객체에 담긴다

```jsx
/* await 키워드 */
const getGithubUserName = async (id) => {
  const response = await fetch(`https://api.github.com/users/${id}`);
  const {name} = await response.json();
  console.log(name); // 고수완
};
getGithubUserName("suwan98");
```

**await 키워드는 다음 실행을 일시 중지시켰다가 프로미스가 settled 상태가 될 때 재개된다**

- 모든 프로미스에 `await` 키워드를 사용하는것은 주의
  - 아래코드에서 foo 함수는 약 6초 소요된다
    - 첫번째 프로미스가 `settled` 상태가 될 때까지 3초
    - 두번째 프로미스가 `settled` 상태가 될 때까지 2초
    - 마지막 프로미스가 `settled` 상태가 될 때까지 1초가 소요되기 때문

```jsx
/* await 키워드는 다음 실행을 일시 중지시켰다가 프로미스가 settled 상태가 될 때 재개된다 */
async function foo() {
  const a = await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
  const b = await new Promise((resolve) => setTimeout(() => resolve(2), 2000));
  const c = await new Promise((resolve) => setTimeout(() => resolve(3), 1000));

  console.log([a, b, c]); // [1,2,3]
}

/* 약 6초 소요 */
foo();
```

**그런데 foo함수가 수행하는 3개의 비동기 처리는 서로 연관없이 개별적으로 처리되는 비동기 처리**

- 따라서 `Promise.all`로 한번에 비동기 처리 결과를 수행하는것이 낫다

```jsx
/* promise.All을 통한 병렬처리 */
async function promiseAllFoo() {
  const response = await Promise.all([
    new Promise((res) => setTimeout(() => res(1)), 3000),
    new Promise((res) => setTimeout(() => res(2)), 2000),
    new Promise((res) => setTimeout(() => res(3)), 1000),
  ]);
  console.log(response);
}

/* 약 3초 소요 */
promiseAllFoo();
```

### 에러 핸들링

**async/await에서의 에러처리는 try-catch 문을 사용할 수 있다**

- 콜백함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출 할 수 있으므로 호출자가 명확하다
- 아래 코드에서 `errorHandling` 함수 내부 `catch`문은 `HTTP`통신에 발생한 네트워크 뿐만 아니라 `try` 블록 내의 모든 문에서 발생한 일반적인 에러까지 모두 캐치할 수 있다

```jsx
/* async/await에서의 에러 핸들링 */
const errorHandling = async () => {
  try {
    const wrongURL = "https://wroog.url";
    const response = await fetch(wrongURL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    /* TypeError: Failed to fetch */
    console.log(error);
  }
};
errorHandling();
```
