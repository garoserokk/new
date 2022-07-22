const btn = document.createElement('button');
// 단순히 버튼을 그냥 만들었다.
// 이것을 node라고 한다.
// 태그

btn.setAttribute("class","sample-btn");
const txt = document.createTextNode("민코월드");
btn.append(txt);
document.querySelector("body").append(btn)
console.log(btn);

