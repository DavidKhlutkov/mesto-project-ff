(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{a_:()=>W,J3:()=>V}),document.querySelector(".popup__form");var t=document.forms["edit-profile"],n=document.forms["new-place"],o=document.forms["edit-avatar"],r=document.forms["delete-card"],c=t.querySelector(".popup__button"),a=n.querySelector(".popup__button"),i=o.querySelector(".popup__button"),u=(r.querySelector(".popup__button"),document.querySelector(".popup_type_image")),l=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__add-button"),d=Array.from(document.querySelectorAll(".popup")),p=document.querySelector(".popup_type_edit"),f=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_avatar"),_=document.querySelector(".popup_type_delete-card"),v=document.querySelector(".places__list"),y=document.querySelector(".profile__image"),b=document.querySelector(".popup__input_type_name"),h=document.querySelector(".popup__input_type_description"),S=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),C=n.elements["place-name"],k=n.elements.link,q=document.querySelector(".popup__caption"),E=document.querySelector(".popup__image"),L=_.querySelector(".popup__close");function A(e){if("Escape"===e.key){var t=d.find((function(e){return e.classList.contains("popup_is-opened")}));t&&O(t)}}function x(e){e.target===e.currentTarget&&O(e.target)}function T(e){O(e.target.closest(".popup"))}function w(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",A)}function O(e){e&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",A))}function j(e,t,n){var o=t.deleteCardCallback,r=t.openImageCallback,c=t.countLikesCallback,a=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__image"),l=a.querySelector(".card__title"),s=a.querySelector(".card__like-button"),d=a.querySelector(".card__like-counter");i.src=e.link,i.alt=e.name,l.textContent=e.name,d.textContent=e.likes.length;var p=a.querySelector(".card__delete-button");return n!==e.owner._id?p.style.display="none":p.addEventListener("click",(function(){var t=e._id;o(a,t)})),e.likes.some((function(e){return e._id===n}))&&s.classList.add("card__like-button_is-active"),s.addEventListener("click",(function(){c(d,s,e)})),i.addEventListener("click",(function(){r(i,E,q,u)})),a}var P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".button",inactiveButtonClass:"button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},B=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));o&&(t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent="")},D=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(n.removeAttribute("disabled",!1),n.classList.remove(t.inactiveButtonClass)):(n.setAttribute("disabled",!0),n.classList.add(t.inactiveButtonClass))};function I(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){return B(e,n,t)})),D(n,t,o)}var J="users/me",N="cards",H="likes",M={Authorization:"32e48890-9f28-47a5-845e-3c6381af43ab","Content-Type":"application/json"},G=function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))};function U(e,t){return fetch("".concat("https://nomoreparties.co/v1/wff-cohort-7","/").concat(e),t).then(G)}var z,$,F=function(){O(_)};function K(e){e.preventDefault(),function(e,t){(function(e){return U("".concat(N,"/").concat(e),{method:"DELETE",headers:M})})(t).then((function(){e.remove(),F()})).catch((function(e){console.error("Произошла ошибка при удалении карточки:",e)}))}(z,$)}function Q(e){e&&(b.value=S.textContent,h.value=g.textContent)}function R(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var V="",W={deleteCardCallback:function(e,t){console.log(e,t),z=e,$=t,console.log(z,$),w(_)},openImageCallback:function(e,t,o,r){t.src=e.src,t.alt=e.alt,o.textContent=e.alt,I(n,P),w(r)},countLikesCallback:function(e,t,n){t.classList.contains("card__like-button_is-active")?function(e){return U("".concat(N,"/").concat(H,"/").concat(e),{method:"DELETE",headers:M})}(n._id).then((function(n){t.classList.toggle("card__like-button_is-active"),e.textContent=n.likes.length})).catch((function(e){console.error("Произошла ошибка при удалении лайка:",e)})):function(e){return U("".concat(N,"/").concat(H,"/").concat(e),{method:"PUT",headers:M})}(n._id).then((function(n){t.classList.toggle("card__like-button_is-active"),e.textContent=n.likes.length})).catch((function(e){console.error("Произошла ошибка при добавлении лайка:",e)}))}};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);D(n,t,o),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?B(e,t,n):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=t.validationMessage,o.classList.add(n.errorClass)}(e,t,n)}(e,r,t),D(n,t,o)}))}))}(t,e)}))}(P),l.addEventListener("click",(function(){I(t,P),Q(),w(p)})),s.addEventListener("click",(function(){I(f,P),w(f)})),y.addEventListener("click",(function(){I(m,P),w(m)})),d.forEach((function(e){var t=e.querySelector(".popup__close");e.addEventListener("click",x),t.addEventListener("click",T)})),p.addEventListener("submit",(function(e){return function(e){var n,o;e.preventDefault(),c.textContent="Сохранение...",(n=b.value,o=h.value,U(J,{method:"PATCH",headers:M,body:JSON.stringify({name:n,about:o})})).then((function(n){console.log(n),Q(n),O(e.target.closest(".popup_is-opened")),t.reset()})).catch((function(e){console.log("Произошла ошибка при редактировании профиля:",e)})).finally((function(){c.textContent="Сохранить"}))}(e)})),f.addEventListener("submit",(function(e){return e.preventDefault(),a.textContent="Сохранение...",void(t=C.value,o=k.value,U(N,{method:"POST",headers:M,body:JSON.stringify({name:t,link:o})})).then((function(e){var t=j(e,W,V);v.prepend(t),n.reset(),O(f)})).catch((function(e){console.log("Произошла ошибка при добавлении карточки:",e)})).finally((function(){a.textContent="Сохранить"}));var t,o})),m.addEventListener("submit",(function(e){return e.preventDefault(),i.textContent="Сохранение...",void(t=o.elements["avatar-link"].value,U("".concat(J,"/avatar"),{method:"PATCH",headers:M,body:JSON.stringify({avatar:t})})).then((function(e){console.log(e),y.setAttribute("style","background-image: url('".concat(e,"')")),O(o),o.reset()})).catch((function(e){console.log("Произошла ошибка при обновлении аватара:",e)})).finally((function(){i.textContent="Сохранить"}));var t})),L.addEventListener("click",F),r.addEventListener("submit",(function(e){return K(e)})),Promise.all([U(J,{method:"GET",headers:M}),U(N,{method:"GET",headers:M})]).then((function(e){var t,n,o,r=(o=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(n,o)||function(e,t){if(e){if("string"==typeof e)return R(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?R(e,t):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],a=r[1];t=c,S.textContent=t.name,g.textContent=t.about,y.setAttribute("style","background-image: url('".concat(t.avatar,"')")),V=t._id,function(e,t,n){v.innerHTML="";for(var o=0;o<e.length;o++){var r=j(e[o],t,n);v.appendChild(r)}}(a,W,c._id)})).catch((function(e){console.log("Произошла ошибка при получении данных:",e)}))})();
//# sourceMappingURL=index.js.map