import{servises_en,servises_ru,letters_ru,letters_en,init_en}from"/data.js";function init(){let e=document.createElement("textarea");e.id="textarea",e.classList.add("input_wrapper"),e.cols="50",e.rows="5",document.body.appendChild(e);let t=document.createDocumentFragment();for(let e of init_en){let s=document.createElement("div");s.innerHTML=e.Key,s.classList.add(e.Code),e.hasOwnProperty("servises_btn")&&s.classList.add("services_btn"),e.hasOwnProperty("ru")&&s.classList.add("ru"),e.hasOwnProperty("id")&&(s.id=e.Code),t.appendChild(s)}let s=document.createElement("div");s.classList.add("keyboard_wrapper"),s.appendChild(t),document.body.appendChild(s);let n=document.createElement("div");n.classList.add("info_wrapper");let a=document.createDocumentFragment(),r=document.createElement("p");r.classList.add("lang"),r.innerHTML="Переключение языка - левый Ctrl";let i=document.createElement("p");i.classList.add("init-os"),i.id="init_os";let o=document.createElement("p");o.classList.add("pull"),o.innerHTML="Внимание!!! Не правильно сделал сабмит таска, поэтому Pull Request выкладываю здесь: ";let c=document.createElement("a");c.href="https://github.com/rolling-scopes-school/romanpateichuk-JSFE2022Q1/pull/1#issue-1232602221",c.appendChild(document.createTextNode("Pull Request")),o.appendChild(c),a.appendChild(r),a.appendChild(i),a.appendChild(o),n.appendChild(a),document.body.appendChild(n)}init();const wrapper=document.querySelectorAll(".keyboard_wrapper> div");let i=1,cursor_position=null;function getOS(){return navigator.appVersion.indexOf("Windows")>=0?"Windows":navigator.appVersion.indexOf("Linux")>=0?"Linux":0==navigator.appVersion.indexOf("Sun")?"SunOS":0==navigator.appVersion.indexOf("Mac")?"MacOS":void 0}init_os.innerHTML=`Клавиатура создана в операционной системе: ${getOS()}`;const ru=document.querySelectorAll('[class*="ru"]'),en_spec=document.querySelectorAll('[class*="Backquote"], [class*="Digit"], [class*="Minus"], [class*="Equal"], [class*="BracketLeft"], [class*="BracketRight"], [class*="Backslash"], [class*="Semicolon"], [class*="Quote"], [class*="Comma"], [class*="Period"], [class*="Slash"]'),ru_spec=document.querySelectorAll('[class*="Digit"], [class*="Minus"], [class*="Equal"], [class*="Backslash"], [class*="Slash"]');let val=!1;function lang(){val?(ru.forEach(((e,t)=>{e.innerHTML=letters_en[t]})),localStorage.setItem("lang","en"),val=!1):(ru.forEach(((e,t)=>{e.innerHTML=letters_ru[t]})),val=!0,localStorage.setItem("lang","ru"))}function shiftDown(){val?ru_spec.forEach(((e,t)=>{e.innerHTML=servises_ru.shiftDown[t]})):en_spec.forEach(((e,t)=>{e.innerHTML=servises_en.shiftDown[t]}));const e=document.querySelectorAll('[class*="ru"]');for(let t of e)t.innerHTML=t.innerHTML.toUpperCase()}function shiftUp(){val?ru_spec.forEach(((e,t)=>{e.innerHTML=servises_ru.shiftUp[t]})):en_spec.forEach(((e,t)=>{e.innerHTML=servises_en.shiftUp[t]}));const e=document.querySelectorAll('[class*="ru"]');for(let t of e)t.innerHTML=t.innerHTML.toLowerCase()}function Backspace(){textarea.innerHTML=textarea.innerHTML.slice(0,cursor_position-1)+textarea.innerHTML.slice(cursor_position,textarea.innerHTML.length),textarea.selectionStart=--cursor_position}function getCaretPos(){return textarea.focus(),!1!==textarea.selectionStart?textarea.selectionStart:0}function printChar(e){textarea.innerHTML=textarea.innerHTML.slice(0,cursor_position)+e+textarea.innerHTML.slice(cursor_position,textarea.innerHTML.length),textarea.selectionStart=++cursor_position}function CapsLock(e){const t=document.querySelectorAll('[class*="ru"]');if("true"===e.getAttribute("data-val")){for(let e of t)e.innerHTML=e.innerHTML.toLowerCase();e.removeAttribute("data-val")}else{for(let e of t)e.innerHTML=e.innerHTML.toUpperCase();e.dataset.val="true"}}"ru"===localStorage.lang&&lang(),ShiftLeft.addEventListener("mousedown",shiftDown),ShiftLeft.addEventListener("mouseup",shiftUp),ShiftRight.addEventListener("mousedown",shiftDown),ShiftRight.addEventListener("mouseup",shiftUp),ControlLeft.addEventListener("click",lang),document.addEventListener("DOMContentLoaded",(()=>{textarea.focus()})),textarea.addEventListener("blur",(()=>{textarea.focus()})),textarea.addEventListener("click",(e=>{cursor_position=getCaretPos()})),textarea.addEventListener("keydown",(e=>{e.preventDefault()})),wrapper.forEach((e=>{e.addEventListener("click",(e=>{let t=e.target;cursor_position=getCaretPos(),t.classList.contains("services_btn")||printChar(e.target.innerHTML),t.classList.contains("Backspace")&&Backspace(),t.classList.contains("Tab")&&printChar("\t"),t.classList.contains("Space")&&printChar(" "),t.classList.contains("Enter")&&printChar("\n"),t.classList.contains("Delete")&&(textarea.innerHTML=textarea.innerHTML.slice(0,cursor_position)+textarea.innerHTML.slice(cursor_position+1,textarea.innerHTML.length),textarea.selectionStart=cursor_position),t.classList.contains("CapsLock")&&CapsLock(t)}))})),textarea.addEventListener("keydown",(e=>{wrapper.forEach((t=>{t.classList.contains(e.code)&&(t.classList.add("active"),t.classList.contains("services_btn")||printChar(t.innerHTML),t.classList.contains("Backspace")&&Backspace(),t.classList.contains("Tab")&&printChar("\t"),t.classList.contains("Space")&&printChar(" "),t.classList.contains("Enter")&&printChar("\n"),t.classList.contains("Delete")&&(textarea.innerHTML=textarea.innerHTML.slice(0,cursor_position)+textarea.innerHTML.slice(cursor_position+1,textarea.innerHTML.length),textarea.selectionStart=cursor_position),t.classList.contains("CapsLock")&&CapsLock(t),(t.classList.contains("ShiftRight")||t.classList.contains("ShiftLeft"))&&shiftDown(),t.classList.contains("ControlLeft")&&lang())}))})),textarea.addEventListener("keyup",(e=>{wrapper.forEach((e=>{e.classList.remove("active")})),"ShiftLeft"!==e.code&&"ShiftRight"!==e.code||shiftUp()}));