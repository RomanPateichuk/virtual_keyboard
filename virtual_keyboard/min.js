const wrapper=document.querySelectorAll(".keyboard_wrapper> div");let i=1,cursor_position=null;function Backspace(){textarea.innerHTML=textarea.innerHTML.slice(0,cursor_position-1)+textarea.innerHTML.slice(cursor_position,textarea.innerHTML.length),textarea.selectionStart=--cursor_position}function getCaretPos(){return textarea.focus(),!1!==textarea.selectionStart?textarea.selectionStart:0}document.addEventListener("DOMContentLoaded",(()=>{textarea.focus()})),textarea.addEventListener("blur",(()=>{textarea.focus()})),textarea.addEventListener("click",(e=>{cursor_position=getCaretPos()})),wrapper.forEach((e=>{e.addEventListener("click",(e=>{let t=e.target;cursor_position=getCaretPos(),t.classList.contains("services_btn")||(textarea.innerHTML=textarea.innerHTML.slice(0,cursor_position)+e.target.innerHTML+textarea.innerHTML.slice(cursor_position,textarea.innerHTML.length),textarea.selectionStart=++cursor_position),"Backspace"===t.innerHTML&&Backspace()}))}));