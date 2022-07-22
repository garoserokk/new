// const btn = document.createElement("button");
// btn.setAttribute("class", "sample-btn");
// const txt = document.createTextNode("민코월드");
// btn.append(txt);
// console.log(btn);
// document.querySelector("body").append(btn);

const btns = [];

for (let i = 0; i < 5; i++) {
  btns.push(document.createElement("button"));
}

for (let i = 0; i < 5; i++) {
  btns[i].setAttribute("class", "sample-btn-" + i);
  const txt = document.createTextNode("버튼" + i );
  btns[i].append(txt);
  document.querySelector("body").append(btns[i]);
  btns[i].addEventListener("click",function(){
    alert("hi");
  })
}