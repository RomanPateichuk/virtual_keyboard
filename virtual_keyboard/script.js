const wrapper = document.querySelectorAll(".keyboard_wrapper> div");
let i = 1;
let cursor_position = null;

console.log(navigator.appVersion);

function getOS() {
  if (navigator.appVersion.indexOf("Windows") >= 0) return "Windows";
  if (navigator.appVersion.indexOf("Linux") >= 0) return "Linux";
  if (navigator.appVersion.indexOf("Sun") == 0) return "SunOS";
  if (navigator.appVersion.indexOf("Mac") == 0) return "MacOS";
}

init_os.innerHTML = `Клавиатура создана в операционной системе: ${getOS()}`;

alert(
  "Привет. Нужно кое-что допилить. Пожалуйста не спиши проверять. Крайний срок вроде как до четверга включительно. Вот мой телеграмм для связи https://t.me/Roman914"
);
// let servises = [
//   "Tab",
//   "ShiftLeft",
//   "CapsLock",
//   "ControlLeft",
//   "MetaLeft",
//   "AltLeft",
//   "Space",
//   "AltRight",
//   "ArrowUp",
//   "ArrowDown",
//   "ArrowLeft",
//   "ArrowRight",
//   "ControlRight",
//   "ShiftRight",
//   "Enter",
//   "Delete",
//   "Backspace",
// ];

let letters_ru = [
  "ё",
  "й",
  "ц",
  "у",
  "к",
  "е",
  "н",
  "г",
  "ш",
  "щ",
  "з",
  "х",
  "ъ",
  "ф",
  "ы",
  "в",
  "а",
  "п",
  "р",
  "о",
  "л",
  "д",
  "ж",
  "э",
  "я",
  "ч",
  "с",
  "м",
  "и",
  "т",
  "ь",
  "б",
  "ю",
  ".",
];
let letters_en = [
  "`",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "[",
  "]",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  "'",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/",
];
const ru = document.querySelectorAll('[class*="ru"]');
console.log(ru);
let val = false;

function ru_lang() {
  if (val) {
    ru.forEach((element, index) => {
      element.innerHTML = letters_en[index];
    });

    val = false;
  } else {
    ru.forEach((element, index) => {
      element.innerHTML = letters_ru[index];
    });
    val = true;
  }
}

CtrlLeft.addEventListener("click", ru_lang);

/*
1) русские клавиши класс "ru", querySelector взять +
2) Пройтись через цикл и менять сочетанием клавиш +
3) Shift - вызывать функцию Caps и присвоить клавиши из массива. servises_ru, services_en

*/

document.addEventListener("DOMContentLoaded", () => {
  textarea.focus();
});

textarea.addEventListener("blur", () => {
  textarea.focus();
});

textarea.addEventListener("click", (event) => {
  cursor_position = getCaretPos();
});

textarea.addEventListener("keydown", (event) => {
  event.preventDefault();
});

wrapper.forEach((element) => {
  element.addEventListener("click", (event) => {
    let elem = event.target;
    cursor_position = getCaretPos();
    if (!elem.classList.contains("services_btn")) {
      printChar(event.target.innerHTML);
    }
    if (elem.classList.contains("Backspace")) {
      Backspace();
    }

    if (elem.classList.contains("Tab")) {
      printChar("\t");
    }

    if (elem.classList.contains("Space")) {
      printChar(" ");
    }

    if (elem.classList.contains("Enter")) {
      printChar("\n");
    }

    if (elem.classList.contains("Delete")) {
      textarea.innerHTML =
        textarea.innerHTML.slice(0, cursor_position) +
        textarea.innerHTML.slice(
          cursor_position + 1,
          textarea.innerHTML.length
        );
      textarea.selectionStart = cursor_position;
    }

    if (elem.classList.contains("CapsLock")) {
      const letters = document.querySelectorAll('[class*="Key"]');
      if (elem.getAttribute("data-val") === "true") {
        for (let letter of letters) {
          letter.innerHTML = letter.innerHTML.toLowerCase();
        }

        elem.removeAttribute("data-val");
      } else {
        for (let letter of letters) {
          letter.innerHTML = letter.innerHTML.toUpperCase();
        }
        elem.dataset.val = "true";
      }
    }
  });
});

textarea.addEventListener("keydown", (event) => {
  wrapper.forEach((elem) => {
    if (elem.classList.contains(event.code)) {
      elem.classList.add("active");
      if (!elem.classList.contains("services_btn")) {
        printChar(elem.innerHTML);
      }

      if (elem.classList.contains("Backspace")) {
        Backspace();
      }

      if (elem.classList.contains("Tab")) {
        printChar("\t");
      }

      if (elem.classList.contains("Space")) {
        printChar(" ");
      }

      if (elem.classList.contains("Enter")) {
        printChar("\n");
      }

      if (elem.classList.contains("Delete")) {
        textarea.innerHTML =
          textarea.innerHTML.slice(0, cursor_position) +
          textarea.innerHTML.slice(
            cursor_position + 1,
            textarea.innerHTML.length
          );
        textarea.selectionStart = cursor_position;
      }

      if (elem.classList.contains("CapsLock")) {
        const letters = document.querySelectorAll('[class*="Key"]');
        if (elem.getAttribute("data-val") === "true") {
          for (let letter of letters) {
            letter.innerHTML = letter.innerHTML.toLowerCase();
          }

          elem.removeAttribute("data-val");
        } else {
          for (let letter of letters) {
            letter.innerHTML = letter.innerHTML.toUpperCase();
          }
          elem.dataset.val = "true";
        }
      }

      if (elem.classList.contains("ControlLeft")) {
        ru_lang();
      }
    }
  });
});

textarea.addEventListener("keyup", (event) => {
  wrapper.forEach((element) => {
    element.classList.remove("active");
  });
});

function Backspace() {
  textarea.innerHTML =
    textarea.innerHTML.slice(0, cursor_position - 1) +
    textarea.innerHTML.slice(cursor_position, textarea.innerHTML.length);
  textarea.selectionStart = --cursor_position;
}

function getCaretPos() {
  textarea.focus();
  if (textarea.selectionStart !== false) return textarea.selectionStart;
  else return 0;
}

function printChar(char) {
  textarea.innerHTML =
    textarea.innerHTML.slice(0, cursor_position) +
    char +
    textarea.innerHTML.slice(cursor_position, textarea.innerHTML.length);
  textarea.selectionStart = ++cursor_position;
}
