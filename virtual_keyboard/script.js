const wrapper = document.querySelectorAll(".keyboard_wrapper> div");
let i = 1;
let cursor_position = 0;

document.addEventListener("DOMContentLoaded", () => {
  textarea.focus();
});

textarea.addEventListener("blur", () => {
  textarea.focus();
});

textarea.addEventListener("click", (event) => {
  cursor_position = getCaretPos("textarea");
});

wrapper.forEach((element) => {
  element.addEventListener("click", (event) => {
    let elem = event.target;
    cursor_position = getCaretPos("textarea");
    if (!elem.classList.contains("services_btn")) {
      textarea.innerHTML += event.target.innerHTML;
      textarea.selectionStart = i++;
    }
    if (elem.innerHTML === "Backspace") {
      Backspace();
    }
  });
});

function Backspace() {
  console.log("cursor_position backspace: ", cursor_position);
  textarea.innerHTML =
    textarea.innerHTML.slice(0, cursor_position - 1) +
    textarea.innerHTML.slice(cursor_position, textarea.innerHTML.length);
  textarea.selectionStart = --cursor_position;
}

function getCaretPos(objName) {
  var obj = document.getElementById(objName);

  obj.focus();
  if (document.selection) {
    var sel = document.selection.createRange();
    var clone = sel.duplicate();
    sel.collapse(true);
    clone.moveToElementText(obj);
    clone.setEndPoint("EndToEnd", sel);
    return clone.text.length;
  } else if (obj.selectionStart !== false) return obj.selectionStart;
  else return 0;
}
