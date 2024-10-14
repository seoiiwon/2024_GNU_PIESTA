document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('click', function(event) {
      const url = this.getAttribute('data-url');
      window.location.href = url;
  });

  // heart 클래스의 요소에 클릭 이벤트 리스너 추가
  const heartElement = box.querySelector('.heart');
  if (heartElement) {
      heartElement.addEventListener('click', function(event) {
          event.stopPropagation(); // 클릭 이벤트 전파 방지
          toggleHeart('{{ booth.booth_id | urlencode }}');
      });
  }
});

window.onload = function () {
  document
    .querySelector('input[name="date"]:checked')
    .dispatchEvent(new Event("change"));
  loadHeartStates(); // 페이지 로드 시 로컬 스토리지에서 하트 상태 불러오기


  const heartStates = JSON.parse(localStorage.getItem("heartStates")) || [];

  fetch("/api/save_heart_states", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ heartStates: heartStates }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
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

    // 현재 이미지가 기본 하트인지 확인
    if (heartImage.src.includes("heart_default.png")) {
      // 기본 하트에서 채워진 하트로 변경
      heartImage.src = "/static/images/heart_filled.png";

      // 로컬 스토리지에 하트 상태 저장 (boothId 추가)
      addHeartState(boothId);
    } else {
      // 채워진 하트에서 기본 하트로 변경
      heartImage.src = "/static/images/heart_default.png";

      // 로컬 스토리지에서 하트 상태 삭제 (boothId 제거)
      removeHeartState(boothId);
    }

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

function addHeartState(boothId) {
  const heartStates = JSON.parse(localStorage.getItem("heartStates")) || [];
  if (!heartStates.includes(boothId)) {
    heartStates.push(boothId); // boothId 추가
    localStorage.setItem("heartStates", JSON.stringify(heartStates));
  }
}

function removeHeartState(boothId) {
  const heartStates = JSON.parse(localStorage.getItem("heartStates")) || [];
  const updatedHeartStates = heartStates.filter((id) => id !== boothId); // boothId 제거
  localStorage.setItem("heartStates", JSON.stringify(updatedHeartStates));
}

function loadHeartStates() {
  const heartStates = JSON.parse(localStorage.getItem("heartStates")) || [];
  heartStates.forEach((boothId) => {
    const heartImage = document.getElementById("heartImage_" + boothId);
    if (heartImage) {
      heartImage.src = "/static/images/heart_filled.png"; // 저장된 부스는 채워진 하트로 설정
    }
  });
}
