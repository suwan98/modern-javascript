// import {pi, square, Person} from "./48_module.js";

// console.log(pi);
// console.log(square);
// console.log(Person);

/* 모듈이 export한 식별자 이름을 일일이 지정하지 않고 하나의 이름으로 한번에 import 하기 */
import * as lib from "./48_module.js";

console.log(lib);
console.log(lib.pi);
console.log(lib.Person);
console.log(lib.square);

/* 모듈이 export 한 식별자 이름을 as로 변경하고 import할 수도있다 */
import {pi as PI, square as SQ, Person as 사람} from "./48_module.js";

console.log(PI);
console.log(SQ);
console.log(사람);
