function showPopup(eventTitle, eventTime, eventDetail, eventImage) {
  const popup = document.getElementById("popup");
  const popupLeft = document.querySelector(".popup-left");
  const popupTitle = document.getElementById("popup-title");
  const popupDetail = document.getElementById("popup-detail");

  //이미지 요소를 찾거나 생성 (클래스 기준)
  const imgElement = popupLeft.querySelector(".event-icon");
  if (!imgElement) {
    const newImg = document.createElement("img");
    newImg.classList.add("event-icon");
    popupLeft.appendChild(newImg);
    imgElement = newImg;
  }

  // 팝업 내용 채우기
  popupTitle.innerHTML = eventTitle.replace(/,/g, "<br>");
  document.getElementById("popup-time").innerText = eventTime;
  popupDetail.innerHTML = eventDetail.replace(/,/g, "<br>");

  // 팝업 애니메이션 추가
  popup.style.display = "flex"; // 팝업 표시
  setTimeout(() => {
    popup.style.visibility = "visible";
    popup.style.transform = "translateX(0)";
  }, 10);
}

function closePopup() {
  const popup = document.getElementById("popup");

  // 팝업 애니메이션 제거
  popup.style.visibility = "hidden";
  popup.style.transform = "translateX(100%)";

  // 팝업 숨기기
  setTimeout(() => {
    popup.style.display = "none";
  }, 400); // 애니메이션이 끝날 때까지 기다림
}