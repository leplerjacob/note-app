(this.webpackJsonpnoteapp=this.webpackJsonpnoteapp||[]).push([[0],{15:function(t,e,n){t.exports=n(39)},20:function(t,e,n){},21:function(t,e,n){},39:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),c=n(14),r=n.n(c),u=(n(20),n(4)),l=n(3),i=function(t){var e=t.note,n=t.toggledImportance,a=t.deleteNote,c=e.important?"make not important":"make important";return o.a.createElement("div",null,o.a.createElement("li",null,e.content,o.a.createElement("button",{onClick:n},c),o.a.createElement("button",{onClick:a},"Delete")))},f=(n(21),n(2)),m=n.n(f),s="http://localhost:3001/api/notes",p=function(){return m.a.get(s).then((function(t){return t.data}))},d=function(t){return m.a.post(s,t).then((function(t){return t.data}))},h=function(t){return m.a.delete("".concat(s,"/").concat(t)).then((function(){return"Note deleted..."}))},b=function(t,e){return m.a.put("".concat(s,"/").concat(t),e).then((function(t){return t.data}))},E=function(t){var e=t.message;return null===e?null:o.a.createElement("div",{className:"error"},e)},v=function(){var t=Object(a.useState)([]),e=Object(l.a)(t,2),n=e[0],c=e[1],r=Object(a.useState)("a new note..."),f=Object(l.a)(r,2),m=f[0],s=f[1],v=Object(a.useState)(!0),g=Object(l.a)(v,2),O=g[0],j=g[1],k=Object(a.useState)(null),S=Object(l.a)(k,2),N=S[0],w=S[1];Object(a.useEffect)((function(){p().then((function(t){c(t)})).catch((function(t){console.log(t)}))}),[]);var y=O?n:n.filter((function(t){return t.important}));return o.a.createElement("div",null,o.a.createElement("h1",null,"Notes"),o.a.createElement(E,{message:N}),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){return j(!O)}},"show ",O?"important":"all")),o.a.createElement("ul",null,y.map((function(t){return o.a.createElement(i,{key:t.id,note:t,toggledImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),a=Object(u.a)(Object(u.a)({},e),{},{important:!e.important});b(t,a).then((function(e){c(n.map((function(n){return n.id!==t?n:e})))})).catch((function(){w('Note: "'.concat(a.content,'" has already been deleted')),setTimeout((function(){w(null)}),5e3),c(n.filter((function(e){return e.id!==t})))}))}(t.id)},deleteNote:function(e){return function(t,e){t.preventDefault(),h(e).then((function(t){console.log(t)}))}(e,t.id)}})}))),o.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:m,date:(new Date).toISOString(),important:Math.random()<.5};d(e).then((function(t){c(n.concat(t)),s(""),console.log("success",t)})).catch((function(t){return console.log(t)}))}},o.a.createElement("input",{value:m,onChange:function(t){s(t.target.value)}}),o.a.createElement("button",{type:"submit"},"save")))};r.a.render(o.a.createElement(v,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.a92e863d.chunk.js.map