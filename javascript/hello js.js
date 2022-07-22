// console.log는  print이다
console.log('hi');
// alert는 경고창을 보여준다.
alert('hi')
// ;는 붙여야 하지만 alt+shif+f 프리티어를 사용하면 알아서 붙여준다.

// javascript는 변수선언을 해도 되고 안해도 된다.
// 변수는 메모리의 주소
// 변수 선언은 : 어떤 주소에 이름을 붙인다는 의미
// 변수 배정 : asign  값을 지정하는 것
// 변수배정 (int)형 만큼의 주소를 잡아달라는 말
// 값을 집어넣는 과정이 initialize 초기화


// 자바스크립트에서 변수 선언은
// const, let, var:[deprecated : 지원은 하지만 쓰지는 않는다.]
// const를 쓰면 초기화하지 않는 것을 막아준다.

const a;

// 자바스크립트에서는 타입을 붙이지 않는다.(파이썬과 같이)

// 한번 선언한 변수는 다시 선언하면 에러가 나야한다.
// 그래서 const를 사용한다.

const a=1;
const a=2;
console.log(a)

// 변수선언을 하지 않아도 쓸 수 있다.
a=1;
console.log(a);

//  const는 한번 들어간 값을 배정할 수 없다 (constant variable: 상수 변수)
const a=1;
a=2;

// 변해야 하는 변수 i,idx,cnt,flag같은 변수를 사용하려면 let을 사용한다.


// 함수선언 스코프

function hello(){
  var a=5;
}
hello()
console.log(a);


// 블록레벨 스코프 :블록으로 선언된 변수는 블록 내부에서만 유효하다.
function hello(){
  const a=5;
}
hello()
console.log(a);
{
  const a =20;
}
console.log(a);

// 자바스크립트 데이터 타입
// number : 모든 숫자
// string : 문자
// array, object , function 도 데이터 타입

console.log(typeof(1));
console.log(typeof(-1));
console.log(typeof(-3.14));
console.log(typeof("1"));
console.log(typeof("a"));
console.log(typeof("lalala"));
console.log(typeof(true));
// t를 소문자로 쓴다.
console.log(typeof("true"));

// null과 undefined
// null은 의도하고 비워둔 값

// undefined : 의도치 않게 값이 없는 경우

// Array 는 배열인데 대괄호로 사용한다.
const a=[1,2,3,4]
console.log(a[1])


const a= [1,2,3];
console.log(a);

// 함수(function)
// 함수이름은 항상 소문자로 적어야한다.
// Camel case로 사용해야 한다.
function sampleFunc(a){
  console.log(a);
}
sampleFunc(1);
// 함수를 실행을 할 때는 소괄호를 쓴다.

//a는 함수내부와 외부가 같은 변수이름이지만 서로 메모리 배정이 다르다.
const a=1;
sampleFunc(a);

//배열하고 객체는 그 주소가 들어간다.

//항수의 선언보다 먼저 사용할 수는 있지만 굳이 쓸 필요가 없다.
sampleFunc();
function sampleFunc(){
  console.log('랄랄라');
}


//함수에서 배열이나 객체를 넣으면 원치않는 결과가 나올 수 있기 때문에 조심해야 한다.
//결과가 [1,2,3,4]로 나온다.
function sampleFunc(a){
  a.push(4);
}
const a=[1,2,3];

sampleFunc(a);
console.log(a);

//차라리 배열이 있다면 전역번수로 선언하고 시작해라

const a=[1,2,3];
function sampleFunc(){
  a.push(4);
}

sampleFunc();
console.log(a);



const a=1;
const b=2;
function sampleFunc(a,b){
  return a+b;
}

console.log(sampleFunc(a,b));
// retrun은 내보내는 역할 
// return값이 하나가 되는 것이 맞다.


// javascript에서는 callback함수를 일상적으로 사용한다.
// 함수자체를 선언한다.
console.log(sampleFunc);


// 새로운 함수선언 
// 변수를 선언하고 함수선언 자체가 들어간다.
// 자바스크립트에서 함수는 변수다
// lamda expression
// 자바스크립트에는 함수에 이름을 붙이지 않을 수 있다.
const sampleFunc = function(){
  console.log('lalla');
};

sampleFunc();

//타입변환시 대문자로 시작해야한다.


//호이스팅 :함수를 먼저 사용하는 것 (사용하지 말것)
// 함수 선언을 뒤에서 한다.
// let과 const는 error를 출력한다.

const txt=prompt("입력하시오");
console.log(txt);


//ECMAScript
// 표준 명세서 : 줄여서 es라고 한다.
// 국제적으로 Script 언어 기준
// ES6 modern javascript


// 배열에 다른 자료형이 들어갈 수 있지만 같은 자료형이 들어가는게 원리
// 객체는 key와 value로 이루어진 property
// 순서가 지정되지 않는다.

family =["아빠","엄마","실비"];
const info = {
  userName : "이자룡",
  job:"싸피강사",
  isMarriage:true,
  family : family,
  myStack:{
    frontend: "vue.js",
    backend: "node.js",
  },
  add : function(a,b){
    return a+b;
  },
};
//객체 안에 있는 함수를 method라고 한다.
console.log(info.add(1,2))

//실전 예제
//배열안에 객체 3개가 존재한다.
// 내부 타입까지 일치해야한다.
const people =[
  {
    name:"jony",
    age:44,
  },
  {
    name:"silvie",
    age:26,
  },
  {
    name:"nana",
    age:44,
  },
];


// console이라는 객체의 log라는 메서드를 사용한다.
//console.log

//javascript에서 length는 소괄호 쓰지 않는다.


//javascript는 ===이 같다 !==이 다르다로 쓰인다.
const a=1;
const b="1";
console.log(a===b);

//array구현 배열과 객체는 const로 선언되어서 변경이 가능하다.
// 그렇지만 배열 자체를 다시 배정하는것은 안된다.
const arr=[1,2,3];

arr.push(4);
console.log(arr);

//배열끼리 합칠때 concat을 써야한다.
const arr1 =[1,2,3];
const arr2 =[4,5,6];
const result = arr1.concat(arr2);
console.log(result);























