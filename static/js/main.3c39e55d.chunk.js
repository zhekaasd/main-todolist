(this["webpackJsonpmain-todolist"]=this["webpackJsonpmain-todolist"]||[]).push([[0],{44:function(e,t,a){},50:function(e,t,a){e.exports={errorMsg:"AddItemFrom_errorMsg__pO7uj",error:"AddItemFrom_error__dvBZ6",done:"AddItemFrom_done__1S0wO"}},65:function(e,t,a){e.exports=a(76)},70:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(8),l=a.n(c),r=(a(70),a(44),a(36)),o=a(29),s=a(50),d=a.n(s),u=a(51),m=a.n(u),f=a(117),T=a(104),O=function(e){return i.a.createElement(T.a,{size:e.size,variant:e.variant,color:e.color,onClick:e.onClick},e.text,e.icon)},E=i.a.memo((function(e){var t=Object(n.useState)(""),a=Object(o.a)(t,2),c=a[0],l=a[1],s=Object(n.useState)(null),u=Object(o.a)(s,2),T=u[0],E=u[1],v=function(){""!==c.trim()?(e.addItem(c.trim()),l("")):(E("Title is required"),l(""))},b=m()(Object(r.a)({},d.a.error,T));return i.a.createElement("div",{style:{display:"flex",marginBottom:"10px"}},i.a.createElement(f.a,{label:T?"Error":"Title",variant:"outlined",value:c,onChange:function(e){var t=e.currentTarget.value;l(t),""!==t&&E(null)},onKeyPress:function(e){E(null),e.ctrlKey&&13===e.charCode&&v()},className:b,size:e.size,error:!!T,helperText:T}),i.a.createElement(O,{onClick:v,icon:e.icon}))})),v=i.a.memo((function(e){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),c=a[0],l=a[1],r=Object(n.useState)(e.value),s=Object(o.a)(r,2),d=s[0],u=s[1];return c?i.a.createElement(f.a,{autoFocus:!0,value:d,onDoubleClick:function(){l(!1),e.onChange(d)},onBlur:function(){l(!1),u(e.value)},onChange:function(e){u(e.currentTarget.value)},onKeyPress:function(t){t.ctrlKey&&13===t.charCode&&(l(!1),e.onChange(d))},size:e.size}):i.a.createElement("span",{onDoubleClick:function(){l(!0),u(e.value)}},e.value)})),b=a(109),k=a(110),h=a(111),j=a(118),g=a(108),I=i.a.memo((function(e){return i.a.createElement("div",null,i.a.createElement("li",{key:e.tasks.id,className:e.tasks.isDone?"done":""},i.a.createElement(j.a,{checked:e.tasks.isDone,onChange:function(t){e.changeTaskStatus(e.tasks.id,t.currentTarget.checked,e.id)},size:"small"}),i.a.createElement(v,{value:e.tasks.title,onChange:function(t){e.changeTaskTitle(e.tasks.id,t,e.id)},size:"small"}),i.a.createElement(O,{onClick:function(){e.removeTask(e.tasks.id,e.id)},icon:i.a.createElement(g.a,null)})))})),C=i.a.memo((function(e){var t=Object(n.useCallback)((function(){e.removeTodolist(e.id)}),[e.removeTodolist,e.id]),a=Object(n.useCallback)((function(t){e.addTask(t,e.id)}),[e.id,e.addTask]),c=Object(n.useCallback)((function(t){e.changeTodolistTitle(e.id,t)}),[e.id,e.changeTodolistTitle]),l=Object(n.useCallback)((function(){e.changeFilterTodolist("all",e.id)}),[e.changeFilterTodolist,e.id]),r=Object(n.useCallback)((function(){e.changeFilterTodolist("active",e.id)}),[e.changeFilterTodolist,e.id]),o=Object(n.useCallback)((function(){e.changeFilterTodolist("completed",e.id)}),[e.changeFilterTodolist,e.id]);return i.a.createElement("div",null,i.a.createElement(b.a,{container:!0,justify:"center"},i.a.createElement("h2",{style:{display:"flex",alignItems:"center"}},i.a.createElement(v,{value:e.title,onChange:c}),i.a.createElement(O,{onClick:t,icon:i.a.createElement(k.a,null)}))),i.a.createElement(E,{size:"small",addItem:a,icon:i.a.createElement(h.a,{fontSize:"small"})}),i.a.createElement("div",null,e.tasks.map((function(t){return i.a.createElement(I,{key:t.id,id:e.id,changeTaskTitle:e.changeTaskTitle,changeTaskStatus:e.changeTaskStatus,removeTask:e.removeTask,tasks:t})}))),i.a.createElement("div",null,i.a.createElement(O,{size:"small",color:"default",variant:"all"===e.filter?"contained":"text",onClick:l,text:"All"}),i.a.createElement(O,{size:"small",color:"primary",variant:"active"===e.filter?"contained":"text",onClick:r,text:"Active"}),i.a.createElement(O,{size:"small",color:"secondary",variant:"completed"===e.filter?"contained":"text",onClick:o,text:"Completed"})))})),p=a(28),S=a(24),y=a(119),D=[],A=a(15),x={},L=a(112),z=a(113),F=a(115),w=a(116),K=a(77),N=a(114);var _=function(){var e=Object(p.c)((function(e){return e.tasks})),t=Object(p.c)((function(e){return e.todolists})),a=Object(p.b)(),c=Object(n.useCallback)((function(e,t){var n={type:"REMOVE-TASK",todolistId:t,taskId:e};a(n)}),[a]),l=Object(n.useCallback)((function(e,t){var n=function(e,t){return{type:"ADD-TASK",todolistId:e,title:t}}(t,e);a(n)}),[a]),r=Object(n.useCallback)((function(e,t,n){a(function(e,t,a){return{type:"CHANGE-TASK-TITLE",todolistId:e,taskId:t,title:a}}(n,e,t))}),[a]),o=Object(n.useCallback)((function(e,t,n){a(function(e,t,a){return{type:"CHANGE-TASK-STATUS",todolistId:e,taskId:t,isDone:a}}(n,e,t))}),[a]),s=Object(n.useCallback)((function(e,t){var n=function(e,t){return{type:"CHANGE-TODOLIST-FILTER",id:e,filter:t}}(t,e);a(n)}),[a]),d=Object(n.useCallback)((function(e){a({type:"REMOVE-TODOLIST",id:e})}),[a]),u=Object(n.useCallback)((function(e){a({type:"ADD-TODOLIST",title:e,todolistId:Object(y.a)()})}),[a]),m=Object(n.useCallback)((function(e,t){var n=function(e,t){return{type:"CHANGE-TODOLIST-TITLE",id:e,title:t}}(e,t);a(n)}),[a]);return i.a.createElement("div",{className:"App"},i.a.createElement(L.a,{position:"static"},i.a.createElement(z.a,null,i.a.createElement(O,{color:"inherit",icon:i.a.createElement(N.a,{"aria-label":"menu"})}),i.a.createElement(F.a,{variant:"h6"},"WTF"),i.a.createElement(O,{color:"inherit",text:"Login"}))),i.a.createElement(b.a,{container:!0,justify:"center",style:{padding:"20px"}},i.a.createElement(E,{addItem:u,icon:i.a.createElement(h.a,{fontSize:"large"})})),i.a.createElement(w.a,{fixed:!0},i.a.createElement(b.a,{container:!0,spacing:3,justify:"center"},t.map((function(t){var a=e[t.id],n=a;return"active"===t.filter&&(n=a.filter((function(e){return!1===e.isDone}))),"completed"===t.filter&&(n=a.filter((function(e){return!0===e.isDone}))),i.a.createElement(b.a,{item:!0},i.a.createElement(K.a,{variant:"elevation",style:{padding:"10px"}},i.a.createElement(C,{title:t.title,filter:t.filter,id:t.id,key:t.id,tasks:n,removeTask:c,changeFilterTodolist:s,addTask:l,changeTaskStatus:o,removeTodolist:d,changeTaskTitle:r,changeTodolistTitle:m})))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var G=a(35),H=Object(G.b)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":var a=Object(A.a)({},e),n=a[t.todolistId],i=n.filter((function(e){return e.id!=t.taskId}));return a[t.todolistId]=i,a;case"ADD-TASK":var c=Object(A.a)({},e),l={id:Object(y.a)(),title:t.title,isDone:!1};return c[t.todolistId]=[l].concat(Object(S.a)(c[t.todolistId])),c;case"CHANGE-TASK-TITLE":var r=Object(A.a)({},e),o=r[t.todolistId];return r[t.todolistId]=o.map((function(e){return e.id===t.taskId?Object(A.a)({},e,{title:t.title}):e})),r;case"CHANGE-TASK-STATUS":var s=Object(A.a)({},e),d=s[t.todolistId];return s[t.todolistId]=d.map((function(e){return e.id===t.taskId?Object(A.a)({},e,{isDone:t.isDone}):e})),s;case"ADD-TODOLIST":var u=Object(A.a)({},e);return u[t.todolistId]=[],u;case"REMOVE-TODOLIST":var m=Object(A.a)({},e);return delete m[t.id],m;default:return Object(A.a)({},e)}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":Object(S.a)(e);return e.filter((function(e){return e.id!==t.id}));case"ADD-TODOLIST":return[].concat(Object(S.a)(e),[{id:t.todolistId,title:t.title,filter:"all"}]);case"CHANGE-TODOLIST-TITLE":var a=e.find((function(e){return e.id===t.id}));return a&&(a.title=t.title),Object(S.a)(e);case"CHANGE-TODOLIST-FILTER":var n=e.find((function(e){return e.id===t.id}));return n&&(n.filter=t.filter),Object(S.a)(e);default:return e}}}),M=Object(G.c)(H);window.store=M,l.a.render(i.a.createElement(p.a,{store:M},i.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[65,1,2]]]);
//# sourceMappingURL=main.3c39e55d.chunk.js.map