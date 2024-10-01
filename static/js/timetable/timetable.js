function showPopup(title, time) {
  // 모달 창의 제목과 시간 설정
  document.getElementById("event-title").innerText = title;
  document.getElementById("event-time").innerText = time;

  // 모달 창과 배경 표시
  const popup = document.getElementById("popup");
  const bg = document.querySelector(".body-bg");
  popup.style.display = "block";
  bg.style.display = "block";

  // 모달 애니메이션 추가
  setTimeout(() => {
    popup.style.visibility = "visible";
    popup.style.transform = "translateX(0)";
  }, 10);
}

function closePopup() {
  // 모달 애니메이션 제거
  const popup = document.getElementById("popup");
  popup.style.visibility = "hidden";
  popup.style.transform = "translateX(100%)";

  // 배경 숨김
  const bg = document.querySelector(".body-bg");
  bg.style.display = "none";

  // 모달 숨기기
  setTimeout(() => {
    popup.style.display = "none";
  }, 400); // 애니메이션이 끝날 때까지 기다림
}
