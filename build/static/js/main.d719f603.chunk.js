(this.webpackJsonpnoteapp=this.webpackJsonpnoteapp||[]).push([[0],{15:function(e,t,n){e.exports=n(39)},20:function(e,t,n){},21:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(14),c=n.n(r),u=(n(20),n(4)),l=n(2),i=function(e){var t=e.note,n=e.toggledImportance,a=e.deleteNote,r=t.important?"make not important":"make important";return o.a.createElement("div",null,o.a.createElement("li",null,t.content,o.a.createElement("button",{onClick:n},r),o.a.createElement("button",{onClick:a},"Delete")))},s=(n(21),n(3)),m=n.n(s),f=function(){return m.a.get("/api/notes").then((function(e){return e.data}))},p=function(e){return m.a.post("/api/notes",e).then((function(e){return e.data}))},d=function(e){return m.a.delete("".concat("/api/notes","/").concat(e)).then((function(){return"Note deleted..."}))},b=function(e,t){return m.a.put("".concat("/api/notes","/").concat(e),t).then((function(e){return e.data}))},E=function(e){var t=e.message;return null===t?null:o.a.createElement("div",{className:"error"},t)},v=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)("a new note..."),s=Object(l.a)(c,2),m=s[0],v=s[1],g=Object(a.useState)(!0),h=Object(l.a)(g,2),O=h[0],j=h[1],w=Object(a.useState)(null),S=Object(l.a)(w,2),k=S[0],y=S[1],C=Object(a.useState)(""),N=Object(l.a)(C,2),D=N[0],I=N[1],x=Object(a.useState)(""),J=Object(l.a)(x,2),T=J[0],B=J[1];Object(a.useEffect)((function(){f().then((function(e){r(e)})).catch((function(e){console.log(e)}))}),[]);var L=O?n:n.filter((function(e){return e.important}));return o.a.createElement("div",null,o.a.createElement("h1",null,"Notes"),o.a.createElement(E,{message:k}),o.a.createElement("h2",null,"Login"),o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log("loggin in with username: ".concat(D,", and password: ").concat(T))}},o.a.createElement("div",null,"username",o.a.createElement("input",{type:"text",value:D,name:"Username",onChange:function(e){var t=e.target;return I(t.value)}})),o.a.createElement("div",null,"password",o.a.createElement("input",{type:"password",value:T,name:"Password",onChange:function(e){var t=e.target;return B(t.value)}})),o.a.createElement("button",{type:"submit"},"login")),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){return j(!O)}},"show ",O?"important":"all")),o.a.createElement("ul",null,L.map((function(e){return o.a.createElement(i,{key:e.id,note:e,toggledImportance:function(){return function(e){var t=n.find((function(t){return t.id===e})),a=Object(u.a)(Object(u.a)({},t),{},{important:!t.important});b(e,a).then((function(t){r(n.map((function(n){return n.id!==e?n:t})))})).catch((function(){y('Note: "'.concat(a.content,'" has already been deleted')),setTimeout((function(){y(null)}),5e3),r(n.filter((function(t){return t.id!==e})))}))}(e.id)},deleteNote:function(t){return function(e,t){e.preventDefault(),d(t).then((function(e){console.log(e)}))}(t,e.id)}})}))),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={content:m,date:(new Date).toISOString(),important:Math.random()<.5};p(t).then((function(e){r(n.concat(e)),v(""),console.log("success",e)})).catch((function(e){console.log("Error Occurred: ",e.response.data.error),y(e.response.data.error),setTimeout((function(){y(null)}),5e3)}))}},o.a.createElement("input",{value:m,onChange:function(e){v(e.target.value)}}),o.a.createElement("button",{type:"submit"},"save")))};c.a.render(o.a.createElement(v,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.d719f603.chunk.js.map