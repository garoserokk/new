const sampleBtn =document.querySelector(".sample-btn")

//함수이름은 동사+명사
function showAlert(){
  console.log("야호");
}
// 가져온 버튼에 함수를 추가하는 방법
// addEventListener(행동, 함수)
//sampleBtn.addEventListener("click",showAlert);
// 특정 조건을 만족할때까지 기다렸다가 작동하는 함수 : 콜백함수
// 쉽게 말해서 파라미터로 들어가는 함수

sampleBtn.addEventListener("click",function (){
  alert("jony");
})
//한번 쓰고 말 함수는 일반적으로 위와 같이 사용한다.

