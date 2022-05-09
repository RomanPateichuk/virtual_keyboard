const wrapper = document.querySelectorAll(".keyboard_wrapper> div");
let i = 1;
let cursor_position = null;

let servises = [
  "Tab",
  "ShiftLeft",
  "CapsLock",
  "ControlLeft",
  "MetaLeft",
  "AltLeft",
  "Space",
  "AltRight",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ControlRight",
  "ShiftRight",
  "Enter",
  "Delete",
  "Backspace",
];

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
