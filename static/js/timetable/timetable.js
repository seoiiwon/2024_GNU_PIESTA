function showPopup(day, eventTitle, eventTime, eventDetail) {
  const popup = document.getElementById("popup");
  const popupLeft = document.querySelector(".popup-left");
  const popupRight = document.querySelector(".popup-right");
  const popupTitle = document.getElementById("popup-title");
  const popupDetail = document.getElementById("popup-detail");

  let day1LeftBG = "#BCB1FF";
  let day2LeftBG = "#FFA0E0";
  let day3LeftBG = "#FFD260";

  let day1RightBG = "#DCD6FF";
  let day2RightBG = "#FFC0EB";
  let day3RightBG = "#FFF0A7";

  // 팝업 내용 채우기
  popupTitle.innerHTML = eventTitle.replace(/,/g, "<br>");
  document.getElementById("popup-time").innerText = eventTime;
  popupDetail.innerHTML = eventDetail.replace(/,/g, "<br>");

  if (day == 1) {
    popupLeft.style.backgroundColor = day1LeftBG;
    popupRight.style.backgroundColor = day1RightBG;
  } else if (day == 2) {
    popupLeft.style.backgroundColor = day2LeftBG;
    popupRight.style.backgroundColor = day2RightBG;
  } else if (day == 3) {
    popupLeft.style.backgroundColor = day3LeftBG;
    popupRight.style.backgroundColor = day3RightBG;
  }

  popup.style.display = "flex";
  setTimeout(() => {
    popup.style.visibility = "visible";
    popup.style.transform = "translateX(0)";
  }, 10);
}

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

function closeModal() {
  const popup = document.getElementById('popup');

  popup.style.visibility = "hidden";
  popup.style.transform = "translateX(100%)";
  setTimeout(() => {
    popup.style.display = "none";
  })
}