function showPopup(day, eventTitle, eventTime, eventDetail, eventImage) {
  const popup = document.getElementById("popup");
  const popupLeft = document.querySelector(".popup-left");
  const popupRight = document.querySelector(".popup-right");
  const popupTitle = document.getElementById("popup-title");
  const popupDetail = document.getElementById("popup-detail");

  let day1Background = "#BBB6D8";
  let day2Background = "#E5A4D0";
  let day3Background = "#F7E695";
  let popupRightColor = "#EFEFEF";

  let imgElement = popupLeft.querySelector(".event-icon");
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
  imgElement.src = eventImage;

  if (day == 1) {
    popupLeft.style.backgroundColor = day1Background;
    popupRight.style.backgroundColor = popupRightColor;
  } else if (day == 2) {
    popupLeft.style.backgroundColor = day2Background;
    popupRight.style.backgroundColor = popupRightColor;
  } else if (day == 3) {
    popupLeft.style.backgroundColor = day3Background;
    popupRight.style.backgroundColor = popupRightColor;
  }

  popup.style.display = "flex";
  setTimeout(() => {
    popup.style.visibility = "visible";
    popup.style.transform = "translateX(0)";
  }, 10);
}

// function closePopup() {
//   const popup = document.getElementById("popup");

//   popup.style.visibility = "hidden";
//   popup.style.transform = "translateX(100%)";

//   setTimeout(() => {
//     popup.style.display = "none";
//   }, 400);
// }

// 모달 밖에 클릭시 팝업 닫기
window.onclick = function (event) {
  const popup = document.getElementById("popup");

  if (event.target == popup) {
    popup.style.visibility = "hidden";
    popup.style.transform = "translateX(100%)";
    setTimeout(() => {
      popup.style.display = "none";
    });
  }
};
