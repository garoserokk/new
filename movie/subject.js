const array =[];
const test1 = document.querySelector(
  "#NM_FAVORITE > div.group_nav > ul.list_nav.type_fix"
);
const test2 = document.querySelector(
  "#NM_FAVORITE > div.group_nav > ul.list_nav.NM_FAVORITE_LIST"
);
const test3 = document.querySelector(
  "#NM_FAVORITE > div.group_nav > a"
);

array.push(test1.textContent);
array.push(test2.textContent);
array.push(test3.textContent);
console.log(array);