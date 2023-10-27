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

/* Boolean을 반환하는 배열 메서드 */
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
