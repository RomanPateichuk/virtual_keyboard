const wrapper = document.querySelectorAll(".keyboard_wrapper> div");
let i = 1;
let cursor_position = null;

document.addEventListener("DOMContentLoaded", () => {
  textarea.focus();
});

textarea.addEventListener("blur", () => {
  textarea.focus();
});

textarea.addEventListener("click", (event) => {
  cursor_position = getCaretPos();
});

wrapper.forEach((element) => {
  element.addEventListener("click", (event) => {
    let elem = event.target;
    cursor_position = getCaretPos();
    if (!elem.classList.contains("services_btn")) {
      printChar(event.target.innerHTML);
    }
    if (elem.innerHTML === "Backspace") {
      Backspace();
    }

    if (elem.innerHTML === "Tab") {
      printChar("\t");
    }

    if (elem.innerHTML === "Space") {
      printChar(" ");
    }

    if (elem.innerHTML === "Enter") {
      printChar("\n");
    }

    if (elem.innerHTML === "Del") {
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
