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
      textarea.innerHTML =
        textarea.innerHTML.slice(0, cursor_position) +
        event.target.innerHTML +
        textarea.innerHTML.slice(cursor_position, textarea.innerHTML.length);
      textarea.selectionStart = ++cursor_position;
    }
    if (elem.innerHTML === "Backspace") {
      Backspace();
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
