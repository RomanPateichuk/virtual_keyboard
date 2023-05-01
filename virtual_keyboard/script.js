import {
  servises_en,
  servises_ru,
  letters_ru,
  letters_en,
  init_en,
} from "/data.js";

function init() {
  let textarea_wrapper = document.createElement("textarea");
  textarea_wrapper.id = "textarea";
  textarea_wrapper.classList.add("input_wrapper");
  textarea_wrapper.cols = "50";
  textarea_wrapper.rows = "5";
  document.body.appendChild(textarea_wrapper);

  let fragment = document.createDocumentFragment();
  for (let item of init_en) {
    let element = document.createElement("div");
    element.innerHTML = item["Key"];
    element.classList.add(item["Code"]);
    if (item.hasOwnProperty("servises_btn")) {
      element.classList.add("services_btn");
    }

    if (item.hasOwnProperty("ru")) {
      element.classList.add("ru");
    }

    if (item.hasOwnProperty("id")) {
      element.id = item["Code"];
    }

    fragment.appendChild(element);
  }

  let wrapper_keyboard = document.createElement("div");
  wrapper_keyboard.classList.add("keyboard_wrapper");
  wrapper_keyboard.appendChild(fragment);

  document.body.appendChild(wrapper_keyboard);

  let info_wrapper = document.createElement("div");
  info_wrapper.classList.add("info_wrapper");

  let info_fragment = document.createDocumentFragment();

  let p1 = document.createElement("p");
  p1.classList.add("lang");
  p1.innerHTML = "Переключение языка - левый Ctrl";

  let p2 = document.createElement("p");
  p2.classList.add("init-os");
  p2.id = "init_os";

  info_fragment.appendChild(p1);
  info_fragment.appendChild(p2);
  info_wrapper.appendChild(info_fragment);
  document.body.appendChild(info_wrapper);
}
init();

const wrapper = document.querySelectorAll(".keyboard_wrapper> div");
let i = 1;
let cursor_position = null;

function getOS() {
  if (navigator.appVersion.indexOf("Windows") >= 0) return "Windows";
  if (navigator.appVersion.indexOf("Linux") >= 0) return "Linux";
  if (navigator.appVersion.indexOf("Sun") == 0) return "SunOS";
  if (navigator.appVersion.indexOf("Mac") == 0) return "MacOS";
}

init_os.innerHTML = `Клавиатура создана в операционной системе: ${getOS()}`;

const ru = document.querySelectorAll('[class*="ru"]');
const en_spec = document.querySelectorAll(
  '[class*="Backquote"], [class*="Digit"], [class*="Minus"], [class*="Equal"], [class*="BracketLeft"], [class*="BracketRight"], [class*="Backslash"], [class*="Semicolon"], [class*="Quote"], [class*="Comma"], [class*="Period"], [class*="Slash"]'
);
const ru_spec = document.querySelectorAll(
  '[class*="Digit"], [class*="Minus"], [class*="Equal"], [class*="Backslash"], [class*="Slash"]'
);
let val = false;
function lang() {
  if (val) {
    ru.forEach((element, index) => {
      element.innerHTML = letters_en[index];
    });
    localStorage.setItem("lang", "en");
    val = false;
  } else {
    ru.forEach((element, index) => {
      element.innerHTML = letters_ru[index];
    });
    val = true;
    localStorage.setItem("lang", "ru");
  }
}

if (localStorage.lang === "ru") {
  lang();
}

function shiftDown() {
  if (!val) {
    en_spec.forEach((element, index) => {
      element.innerHTML = servises_en.shiftDown[index];
    });
  } else {
    ru_spec.forEach((element, index) => {
      element.innerHTML = servises_ru.shiftDown[index];
    });
  }
  const letters = document.querySelectorAll('[class*="ru"]');
  for (let letter of letters) {
    letter.innerHTML = letter.innerHTML.toUpperCase();
  }
}

function shiftUp() {
  if (!val) {
    en_spec.forEach((element, index) => {
      element.innerHTML = servises_en.shiftUp[index];
    });
  } else {
    ru_spec.forEach((element, index) => {
      element.innerHTML = servises_ru.shiftUp[index];
    });
  }
  const letters = document.querySelectorAll('[class*="ru"]');
  for (let letter of letters) {
    letter.innerHTML = letter.innerHTML.toLowerCase();
  }
}

ShiftLeft.addEventListener("mousedown", shiftDown);
ShiftLeft.addEventListener("mouseup", shiftUp);
ShiftRight.addEventListener("mousedown", shiftDown);
ShiftRight.addEventListener("mouseup", shiftUp);
ControlLeft.addEventListener("click", lang);

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
      CapsLock(elem);
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
        CapsLock(elem);
      }

      if (
        elem.classList.contains("ShiftRight") ||
        elem.classList.contains("ShiftLeft")
      ) {
        shiftDown();
      }

      if (elem.classList.contains("ControlLeft")) {
        lang();
      }
    }
  });
});

textarea.addEventListener("keyup", (event) => {
  wrapper.forEach((element) => {
    element.classList.remove("active");
  });

  if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
    shiftUp();
  }
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

function CapsLock(elem) {
  const letters = document.querySelectorAll('[class*="ru"]');
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
