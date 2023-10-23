"use strict";

(function () {
  const foo = () => {
    console.log(this);
  };
  function bar() {
    console.log(this);
    function Bar() {
      console.log(this); // Fooo
    }
    new Bar();
  }
  foo();
  bar();
})();

function a(a) {
  a = 2;

  console.log(arguments);
}

a(1);
