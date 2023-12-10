(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(e){e.target.closest(".card").remove()}function n(t,n,r,o,c,i,a,u){var s=e.querySelector(".card").cloneNode(!0),l=s.querySelector(".card__delete-button"),d=s.querySelector(".card__like-button"),p=s.querySelector(".card__image"),f=s.querySelector(".card__like-count"),_=s.querySelector(".card__title"),m=t.owner._id,y=t._id,h=t.likes;return f.textContent=t.likes.length,h.forEach((function(e){e._id==c&&d.classList.add("card__like-button_is-active")})),m!==c&&l.remove(),_.textContent=t.name,p.src=t.link,p.alt=t.name+", фото",l.addEventListener("click",(function(e){i(y).then((function(t){n(e)})).catch((function(e){console.error("Ошибка: ".concat(e))}))})),d.addEventListener("click",(function(e){d.classList.contains("card__like-button_is-active")?u(y).then((function(t){f.textContent=t.likes.length,r(e)})).catch((function(e){console.error("Ошибка: ".concat(e))})):a(y).then((function(t){f.textContent=t.likes.length,r(e)})).catch((function(e){console.error("Ошибка: ".concat(e))}))})),p.addEventListener("click",o),s}function r(e){e.target.classList.toggle("card__like-button_is-active")}function o(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function c(e){e.classList.add("popup_is-animated"),setTimeout((function(){return e.classList.add("popup_is-opened")}),1),window.addEventListener("keydown",o)}function i(e){e.classList.remove("popup_is-opened"),setTimeout((function(){return e.classList.remove("popup_is-opened")}),600),window.removeEventListener("keydown",o)}var a=function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""},u=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n),t.disabled=!1):(t.classList.add(n),t.disabled=!0)},s=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);r.classList.add(t.inactiveButtonClass),r.disabled=!0,n.forEach((function(n){a(e,n,t.inputErrorClass,t.errorClass)}))},l={baseUrl:"https://nomoreparties.co/v1/wff-cohort-1",headers:{authorization:"73cd315f-54c6-4681-84c4-826e15c27bc3","Content-Type":"application/json"}};function d(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function p(e){return fetch(l.baseUrl+"/cards/".concat(e),{method:"DELETE",headers:l.headers}).then((function(e){return d(e)}))}function f(e){return fetch(l.baseUrl+"/cards/likes/".concat(e),{method:"PUT",headers:l.headers}).then((function(e){return d(e)}))}function _(e){return fetch(l.baseUrl+"/cards/likes/".concat(e),{method:"DELETE",headers:l.headers}).then((function(e){return d(e)}))}var m,y=document.querySelector(".places__list"),h=(document.querySelector(".page__content"),document.forms["edit-profile"]),v=document.querySelector(".popup__input_type_name"),b=document.querySelector(".popup__input_type_avatar_url"),S=document.querySelector(".popup__input_type_description"),q=document.forms["new-place"],g=document.querySelector(".popup_type_edit"),E=document.querySelector(".popup_type_new-card"),L=document.querySelector(".profile__edit-button"),C=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_image"),x=k.querySelector(".popup__image"),w=k.querySelector(".popup__caption"),A=document.forms["profile-photo"],T=document.querySelector(".popup_type_profile-photo"),U=document.querySelector(".profile__image-container"),j=document.querySelectorAll(".popup"),O=document.querySelector(".profile__title"),B=document.querySelector(".profile__description"),D=document.querySelector(".profile__image"),P=q.querySelector(".popup__input_type_card-name"),I=q.querySelector(".popup__input_type_url"),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function N(e,t){t.textContent=e?"Сохранение...":"Сохранить"}function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function H(e){var t=e.target.closest(".card"),n=e.target.src,r=t.querySelector(".card__description").querySelector(".card__title").textContent;x.src=n,w.textContent=r,x.alt=r+", фото",c(k)}h.addEventListener("submit",(function(e){e.preventDefault(),N(!0,e.submitter),function(e,t){return fetch(l.baseUrl+"/users/me",{method:"PATCH",body:JSON.stringify({name:e,about:t}),headers:l.headers}).then((function(e){return d(e)}))}(v.value,S.value).then((function(e){O.textContent=e.name,B.textContent=e.about,i(g)})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){N(!1,e.submitter)}))})),q.addEventListener("submit",(function(e){var o;e.preventDefault(),N(!0,e.submitter),(o={name:P.value,link:I.value},fetch(l.baseUrl+"/cards",{method:"POST",body:JSON.stringify({name:o.name,link:o.link}),headers:l.headers}).then((function(e){return d(e)}))).then((function(e){y.prepend(n(e,t,r,H,m,p,f,_)),i(E)})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){N(!1,e.submitter)}))})),A.addEventListener("submit",(function(e){var t;e.preventDefault(),N(!0,e.submitter),(t=b.value,fetch(l.baseUrl+"/users/me/avatar",{method:"PATCH",body:JSON.stringify({avatar:t}),headers:l.headers}).then((function(e){return console.log(e),d(e)}))).then((function(e){D.style.backgroundImage="url(".concat(e.avatar,")"),i(T)})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){N(!1,e.submitter)}))})),L.addEventListener("click",(function(e){s(g,M),v.value=document.querySelector(".profile__title").textContent,S.value=document.querySelector(".profile__description").textContent,c(g)})),C.addEventListener("click",(function(e){q.reset(),s(E,M),c(E)})),U.addEventListener("click",(function(e){A.reset(),s(T,M),c(T)})),j.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_is-opened")&&i(t.target),t.target.classList.contains("popup__close")&&i(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t,n,r,o,c){var i=Array.from(e.querySelectorAll(n)),s=e.querySelector(t);u(i,s,r),i.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?a(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage,n,r)}(e,t,o,c),u(i,s,r)}))}))}(t,e.submitButtonSelector,e.inputSelector,e.inactiveButtonClass,e.inputErrorClass,e.errorClass)}))}(M),Promise.all([fetch(l.baseUrl+"/users/me",{headers:l.headers}).then((function(e){return d(e)})),fetch(l.baseUrl+"/cards",{method:"GET",headers:l.headers}).then((function(e){return d(e)}))]).then((function(e){var o,c,i=(c=2,function(e){if(Array.isArray(e))return e}(o=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,i,a=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(s)throw o}}return a}}(o,c)||function(e,t){if(e){if("string"==typeof e)return J(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?J(e,t):void 0}}(o,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=i[0],u=i[1];O.textContent=a.name,B.textContent=a.about,a.avatar,D.style.backgroundImage="url(".concat(a.avatar,")"),m=a._id,u.forEach((function(e){y.append(n(e,t,r,H,m,p,f,_))}))})).catch((function(e){console.error("Ошибка: ".concat(e))}))})();