(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(29)},22:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(11),l=n.n(c),o=n(12),u=n(6),m=n(31),i=n(32),s=n(34),d=n(35),E=n(33),f=(n(22),function(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)([]),f=Object(u.a)(l,2),b=f[0],p=f[1],h=Object(a.useState)({}),y=Object(u.a)(h,2),g=y[0],k=y[1],x=Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),S=function(e){var t="ascending";g.column===e&&"ascending"===g.direction&&(t="descending"),k({column:e,direction:t})},C=r.a.useMemo(function(){var e=Object(o.a)(b);return g.column&&e.sort(function(e,t){return"ascending"===g.direction?e[g.column]>t[g.column]?1:-1:e[g.column]<t[g.column]?1:-1}),e},[b,g]);return r.a.createElement(m.a,{fluid:!0},r.a.createElement(i.a,{className:"mx-auto mt-3 mb-2 p-1"},r.a.createElement(s.a,{onSubmit:function(e){e.preventDefault();var t=[];try{t=JSON.parse(n)}catch(a){console.error("Error parsing JSON:",a)}p(t)}},r.a.createElement("textarea",{value:n,onChange:function(e){return c(e.target.value)}}),r.a.createElement(d.a,{type:"submit",variant:"outline-secondary",size:"small",className:"mb-2"},"Submit")),b.length>0&&r.a.createElement(E.a,{responsive:!0,size:"sm",className:"sticky text-light border border-secondary"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{onClick:function(){return S("symbol")}},"Symbol","symbol"===g.column?"ascending"===g.direction?"  \ud83d\udd3c":" \ud83d\udd3d":null),r.a.createElement("th",{onClick:function(){return S("text")}},"Strikes","text"===g.column?"ascending"===g.direction?"  \ud83d\udd3c":" \ud83d\udd3d":null),r.a.createElement("th",{onClick:function(){return S("days")}},"DTE","days"===g.column?"ascending"===g.direction?"  \ud83d\udd3c":" \ud83d\udd3d":null),r.a.createElement("th",{onClick:function(){return S("mprofit")}},"Max Profit","mprofit"===g.column?"ascending"===g.direction?"\ud83d\udd3c":"\ud83d\udd3d":null),r.a.createElement("th",{onClick:function(){return S("mloss")}},"Max Loss","mloss"===g.column?"ascending"===g.direction?"\ud83d\udd3c":"\ud83d\udd3d":null),r.a.createElement("th",{onClick:function(){return S("mpodds")}},"Chance Max Profit","mpodds"===g.column?"ascending"===g.direction?"\ud83d\udd3c":"\ud83d\udd3d":null),r.a.createElement("th",{onClick:function(){return S("mlodds")}},"Chance Max Loss","mlodds"===g.column?"ascending"===g.direction?"\ud83d\udd3c":"\ud83d\udd3d":null),r.a.createElement("th",{onClick:function(){return S("expectancy")}},"Probable Profit Per Trade (P3T)","expectancy"===g.column?"ascending"===g.direction?"\ud83d\udd3c":"\ud83d\udd3d":null))),r.a.createElement("tbody",null,C.map(function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.symbol),r.a.createElement("td",null,e.text),r.a.createElement("td",null,e.days),r.a.createElement("td",null,x.format(Math.round(e.mprofit))),r.a.createElement("th",null,x.format(Math.round(e.mloss))),r.a.createElement("td",null,Math.round(100*e.mpodds),"%"),r.a.createElement("td",null,Math.round(100*e.mlodds),"%"),r.a.createElement("td",null,x.format(Math.round(Number(e.mprofit*e.mpodds-e.mloss*e.mlodds)))))})))))});n(27);l.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(f,null)))}},[[13,2,1]]]);
//# sourceMappingURL=main.d2b43b8e.chunk.js.map