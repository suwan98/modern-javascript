/* 배열리터럴을 통한 배열 생성 */
const literalArray = [1, 2, 3, 4, 5];
/* 배열의 길이 */
console.log(literalArray.length);
/* 배열의 타입 */
console.log(typeof literalArray);

/* 빈배열 */
const emptyArray = [];
console.log(emptyArray.length);

/* 희소배열 */
const sparseArray = [1, , 3];
console.log(sparseArray);
console.log(sparseArray.length);

/* Array 생성자 함수 */
const constructorArray = new Array(3).fill(null);
console.log(constructorArray);
/* Array 생성자 함수 빈배열 생성 */
const emptyConstructorArray = new Array();
console.log(emptyConstructorArray);
/* Array 생성자 함수에 인수가 숫자가 아니라면? */
const notNumberConstructorArray = new Array({});
console.log(notNumberConstructorArray);

/* Array.of 메서드를 통한 배열 생성 */
const arrayOfMethodArray = Array.of(1, "string", 5, false);
console.log(arrayOfMethodArray);

/* Array.from 메서드를 통한 배열 생성 */
const arrayFromMethodArray = Array.from({length: 2, 0: "a", 1: "b"});
console.log(arrayFromMethodArray);
/* 이터러블을 변환하여 배열을 생성한다 - 문자열은 이터러블하다 */
const arrayFromMethodArraytoString = Array.from("arr");
console.log(arrayFromMethodArraytoString);

/* 배열요소의 참조 */
const referenceArray = [1, 2];
console.log(referenceArray[0]);

/* 배열 요소의 추가와 갱신 */
/* 배열 요소 추가 */
const addArrayElements = [0];
addArrayElements[1] = 1;
console.log(addArrayElements);
/* length 프로퍼티보다 더 큰 값을 인덱스로 추가 */
addArrayElements[7] = "희소배열";
console.log(addArrayElements);

/* 인덱스는 반드시 0이상의 정수(또는 정수 형태의 문자열)로 표기해야 한다 */
addArrayElements["props"] = 4;
console.log(addArrayElements);
console.log(addArrayElements.length);

/* Boolean을 반환하는 배열 메서드들 */
/* Array.isArray */
/* 해당 배열은 Array이다 */
console.log(Array.isArray([]));
console.log(Array.isArray(new Array()));
console.log(Array.isArray(Array.of(1, 2)));
/* 해당 배열은 Array가 아니다 */
console.log(Array.isArray({}));
console.log(Array.isArray(null));
console.log(Array.isArray(undefined));
console.log(Array.isArray("Array"));
// 유사배열 객체도 배열이아니다
console.log(Array.isArray({length: 3, 0: 1}));

/* Array.prototype.indexOf */
const indexOfMethodArray = [1, 2, 2, 3, "hi"];
console.log(indexOfMethodArray.indexOf(2));
// hi는 배열의 4번째에 위치하고 있으므로 4를 반환한다
console.log(indexOfMethodArray.indexOf("hi")); // 4
// 6에 해당하는 요소가 없으므로 -1을 반환한다
console.log(indexOfMethodArray.indexOf(6)); // -1
// indexof의 두번째 인수는 검색을 시작할 순서 array[2] = 2 인덱스 2를 반환한다
console.log(indexOfMethodArray.indexOf(2, 2));
const foods = ["apple", "banana", "grape"];
if (foods.indexOf("orange") === -1) {
  foods.push("orange");
}
console.log(foods);
/* includes를 사용하면 더 가독성이 높다 */
if (foods.includes("melon")) {
  foods.push("melon");
}
console.log(foods);

/* Array.prototype.includes() */
const arr = [1, 2, 3, "hello"];
console.log(arr.includes("hello"));
console.log(arr.includes("hi"));

/* 원본배열이 훼손되는 메서드들 */
/* Array.prototype.push */
const pushArray = [1, 2];
const resultLength = pushArray.push("3");
console.log(resultLength);
// 기존 배열이 변경됨
console.log(pushArray);
/* Sperad Syntax */
const newSpereadArray = [...pushArray, 4];
// 기존 배열의 변경없이 새로운 배열을 만들어 반환했다
console.log(newSpereadArray);
console.log(pushArray);

/* Array.prototype.pop */
const popArray = [1, 2];
const resultPopArrayElement = popArray.pop();
console.log(resultPopArrayElement); // 2
// 원본 배열 popArray가 훼손
console.log(popArray); // [1]

/* Array.prototype.unshift */
const unshiftArray = [1, 2];
const resultUnShiftArrayLength = unshiftArray.unshift(0);
console.log(resultUnShiftArrayLength);
/* 원본 배열 맨 앞에 0 추가 + 원본배열 훼손 */
console.log(unshiftArray);

/* Array.prototype.shift */
const shiftArray = [1, 2, 3];
const shiftArrayElement = shiftArray.shift();
// 삭제한 배열의 요소가 반환
console.log(shiftArrayElement); // 1
// 원본 배열이 훼손
console.log(shiftArray); // [2, 3]

/* Array.prototype.splice() */
/* 원본 배열의 중간에 요소를 추가하거나, 제거하는 경우 사용 */
const spliceArray = [1, 2, 3, 4];
/* 2번째 인덱스요소와 3번째인덱스 요소 제거 + 제거한 자리에 20 추가 */
const spliceResult = spliceArray.splice(2, 3, 20);
/* 제거한 요소들 */
console.log(spliceResult);
/* 변경된 원본 배열 (훼손) */
console.log(spliceArray);
/* 3번째 옵션을 지정하지 않을 시 원본배열을 제거하기만한다 */
spliceArray.splice(0, 1);
console.log(spliceArray);
const reverseArray = [1, 2, 3, 4, 5, 6];
const reverseArrayResult = reverseArray.reverse();
// 원본 배열이 훼손됨
console.log(reverseArray);
// 반환값은 변경된 배열이다
console.log(reverseArrayResult);

/* 원본 배열을 변경하지 않는 메서드들 */
/* Array.prototype.concat */
const array1 = [1, 2];
const array2 = [3, 4];
const concatArray = array1.concat(array2);
// 원본배열엔 영향 ❌
console.log(array1);
// 배열이 합쳐져 새로운 배열을 반환
console.log(concatArray);
/* concat은 전개연산자로 대체 가능 */
const speradConcat = [...[1, 2], ...[3, 4]];
console.log(speradConcat);

/* Array.prototype.slice() */
const sliceArr = [1, 2, 3];
const copySliceArr = sliceArr.slice();
console.log(copySliceArr);
/* slice를 이용해 유사배열 객체 ➡️ 배열로 */
function sum() {
  const arrayLiketoArray = Array.prototype.slice.call(arguments);
  return arrayLiketoArray.reduce((acc, cur) => acc + cur, 0);
}
console.log(sum(1, 2, 3));

/* Array.prototype.join() */
const joinArray = [1, 2, 3, 4];
const arrayToString = joinArray.join("");
console.log(arrayToString);

/* Array.prototype.flat() */
const deepArray = [1, 2, [1, 2, [2, 3, [4, 51251]]]];
// 배열이 3단계만큼 깊게 들어가있으므로 3 전달
const flatArray = deepArray.flat(3);
console.log(flatArray);
console.log(deepArray);

/* 배열 고차 함수 */
/* Array.prototype.sort */
const fruits = ["Banana", "Orange", "Apple"];
const sortResult = fruits.sort();
console.log(sortResult);
console.log(fruits); // ['Apple', 'Banana' , 'Orange']
/* 숫자를 내림차순으로 정렬할 때 */
const points = [30, 50, 2, 1, 25, 10];
points.sort((a, b) => a - b);
console.log(points);

/* Array.prototype.forEach */
const numbers = [1, 2, 3];
const pows = [];
numbers.forEach((number) => pows.push(number ** 2));
console.log(pows);
console.log(numbers);
/* forEach 콜백함수에 의해 원본배열이 변경될 수 있다 */
const forEachMethodNumbers = [1, 2, 3];
forEachMethodNumbers.forEach((number, i, arr) => (arr[i] = number * 2));
console.log(forEachMethodNumbers);

/* Array.prototype.map() */
const mapNumbers = [1, 4, 9];
const roots = mapNumbers.map((number) => Math.sqrt(number));
console.log(roots);
/* map 메서드 콜백함수를 통한 객체 전달 */
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }
  add(array) {
    return array.map((itme) => this.prefix + itme);
  }
}
const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["mutation"]));

/* Array.prototype.filter */
const filterNumbers = [1, 2, 3, 4, 5];
const odds = numbers.filter((number) => number % 2);
console.log(odds);
/* filter로 특정 아이디를 제거 */
class User {
  constructor() {
    this.users = [
      {id: 1, name: "김민재"},
      {id: 2, name: "손흥민"},
      {id: 3, name: "이강인"},
    ];
  }
  findId(id) {
    // id가 일치하는 사용자만 반환
    return this.users.filter((user) => user.id === id);
  }
  removeUser(id) {
    // id가 일치하지 않는 사용자 제거
    this.users = this.users.filter((user) => user.id !== id);
  }
}
const users = new User();
let user = users.findId(1);
console.log(user);
users.removeUser(1);
console.log(users);

/* Array.prototype.reduce */
const reduceArray = [1, 2, 3, 4];
const reduceSum = reduceArray.reduce(
  (accumulator, curretValue, index, array) => accumulator + curretValue,
  0
);
console.log(reduceSum);

/* reduce 메서드 활용 */

/* 배열의 요소의 평균값 */
const values = [1, 2, 3, 4, 5, 6];
const average = values.reduce((acc, cur, i, {length}) => {
  return i === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);
console.log(average);

/* 배열 요소의 중복 횟수 구하기 */
const duplicateArray = ["banana", "apple", "orange", "orange", "apple"];
const count = duplicateArray.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});
console.log(count);

/* Array.prototype.some */
const someArray = [1, 5, 18];
const result = someArray.some((item) => item > 10);
console.log(result);

/* Array.prototype.every */
const everyArray = [1, 2, 3, 4, 6];
const everyResult = everyArray.every((value) => value > 0);
console.log(everyResult);

/* Array.prototype.find */
const findUsers = [
  {id: 1, name: "김민재"},
  {id: 2, name: "손흥민"},
  {id: 3, name: "이강인"},
  {id: 4, name: "박주영"},
];
/* 조건에서 true인 첫번째 요소를 반환 */
const findUser = findUsers.find((user) => user.id === 2);
console.log(findUser);

/* filter 와 find 메서드 차이점 */
console.log([1, 2, 3, 4].filter((item) => item === 2));
console.log([1, 2, 3, 4].find((item) => item === 2));

/* Array.prototype.findIndex */
const findUserIndex = findUsers.findIndex((user) => user.id === 3);

/* 조건에 만족하는 손흥민의 인덱스인 2를 반환 */

console.log(findUserIndex);
