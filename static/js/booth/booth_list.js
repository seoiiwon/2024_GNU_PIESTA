// 기본적으로 10월 16일에 맞는 부스 리스트만 보이도록 설정
window.onload = function () {
  document
    .querySelector('input[name="date"]:checked')
    .dispatchEvent(new Event("change"));
  loadHeartStates(); // 페이지 로드 시 로컬 스토리지에서 하트 상태 불러오기
};

document.addEventListener("change", function (event) {
  if (event.target.name === "date") {
    const selectedDate = event.target.value;
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box) => {
      const boxDate = box.getAttribute("data-date");
      if (boxDate.includes(selectedDate)) {
        box.style.display = "flex";
      } else {
        box.style.display = "none";
      }
    });
  }
});

function toggleHeart(boothId) {
  const screenWidth = window.innerWidth;

  // 태블릿과 모바일에서만 작동
  if (screenWidth <= 1024) {
    const heartImage = document.getElementById("heartImage_" + boothId); // 고유 ID 가져오기
    let filled = false;

    // 현재 이미지가 기본 하트인지 확인
    if (heartImage.src.includes("heart_default.png")) {
      // 기본 하트에서 채워진 하트로 변경
      heartImage.src = "/static/images/heart_filled.png";
      filled = true; // 하트가 채워졌음을 표시
    } else {
      // 채워진 하트에서 기본 하트로 변경
      heartImage.src = "/static/images/heart_default.png";
      filled = false; // 하트가 비어있음을 표시
    }

    // 로컬 스토리지에 하트 상태 저장
    saveHeartState(boothId, filled);

    // 날짜 필터링 재적용
    const selectedDate = document.querySelector(
      'input[name="date"]:checked'
    ).value;
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box) => {
      const boxDate = box.getAttribute("data-date");
      if (boxDate.includes(selectedDate)) {
        box.style.display = "flex";
      } else {
        box.style.display = "none";
      }
    });
  }
}

function saveHeartState(boothId, filled) {
  const heartStates = JSON.parse(localStorage.getItem("heartStates")) || {};
  heartStates[boothId] = filled; // 부스명과 하트 상태 저장
  localStorage.setItem("heartStates", JSON.stringify(heartStates));
}

function loadHeartStates() {
  const heartStates = JSON.parse(localStorage.getItem("heartStates")) || {};

  for (const [boothId, filled] of Object.entries(heartStates)) {
    const heartImage = document.getElementById("heartImage_" + boothId);
    if (heartImage) {
      heartImage.src = filled
        ? "/static/images/heart_filled.png"
        : "/static/images/heart_default.png";
    }
  }
}

function sortBoothList() {
  const boothListContainer = document.getElementById("booth-list");
  const boxes = Array.from(boothListContainer.getElementsByClassName("box"));

  // 부스의 ID를 로컬스토리지에서 가져와서 true/false를 판별
  const sortedBoxes = boxes.sort((a, b) => {
    const boothIdA = a
      .querySelector(".heart")
      .getAttribute("onclick")
      .match(/'(\d+)'/)[1];
    const boothIdB = b
      .querySelector(".heart")
      .getAttribute("onclick")
      .match(/'(\d+)'/)[1];

    const isBoothAFavorited = localStorage.getItem(boothIdA) === "true";
    const isBoothBFavorited = localStorage.getItem(boothIdB) === "true";

    // true인 부스가 상단으로 오도록 정렬
    return isBoothBFavorited - isBoothAFavorited;
  });

  // 정렬된 박스들을 다시 DOM에 추가
  sortedBoxes.forEach((box) => boothListContainer.appendChild(box));
}

// 페이지 로드 시 부스 리스트 정렬
window.addEventListener("DOMContentLoaded", sortBoothList);
