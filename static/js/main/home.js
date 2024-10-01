document.addEventListener("DOMContentLoaded", function () {
  let currentSection = 0;
  const sections = document.querySelectorAll("div");
  const totalSections = sections.length;
  const logoImg = document.getElementById("logoImg");
  let scrollThrottle = false; // 스크롤 감도 조절을 위한 플래그

  function scrollToSection(sectionIndex) {
    window.scrollTo({
      top: window.innerHeight * sectionIndex,
      behavior: "smooth",
    });
  }

  // 첫 번째 페이지 로고 숨기기
  function handleLogoPosition() {
    if (currentSection === 1 || currentSection === 2) {
      logoImg.style.position = "fixed";
      logoImg.style.visibility = "visible";
      logoImg.style.opacity = "1";
    } else if (currentSection === 0) {
      logoImg.style.opacity = "0";
      setTimeout(() => {
        logoImg.style.visibility = "hidden";
      }, 300);
    }
  }

  // 스크롤 이벤트
  window.addEventListener("wheel", function (event) {
    if (scrollThrottle) return; // 스크롤이 일어나지 않도록 중복 방지
    scrollThrottle = true; // 스크롤을 시작하면 플래그 활성화

    setTimeout(() => {
      if (event.deltaY > 0) {
        if (currentSection < totalSections - 1) {
          currentSection++;
          scrollToSection(currentSection);
          handleLogoPosition();
        }
      } else {
        if (currentSection > 0) {
          currentSection--;
          scrollToSection(currentSection);
          handleLogoPosition();
        }
      }
      scrollThrottle = false;
    }, 1000);
  });

  window.addEventListener("resize", function () {
    scrollToSection(currentSection);
    handleLogoPosition();
  });

  handleLogoPosition();
});

// 날짜 카운트다운
const dDay = new Date("2024-10-16T00:00:00").getTime();

function countdown() {
  const now = new Date().getTime();
  const distance = dDay - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  document.getElementById("countdown").innerHTML = days;

  // 디데이가 지났을 때 어떻게 할지 물어보댜
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "D-Day";
  }
}

const x = setInterval(countdown, 1000);
countdown();

// 라인업
document.addEventListener("DOMContentLoaded", function () {
  const dates = document.querySelectorAll(".date");
  const lineUpLists = document.querySelectorAll(".lineUpList");

  dates.forEach((date) => {
    date.addEventListener("click", function () {
      const selectedDate = date.getAttribute("data-date");
      const selectedLineUp = document.getElementById(
        "lineup" + selectedDate.split("/")[1]
      );

      lineUpLists.forEach((lineUp) => {
        lineUp.classList.remove("active", "left", "right");

        const lineUpDate = lineUp.getAttribute("id").replace("lineup", "");
        const selectedDateNumber = selectedDate.split("/")[1];

        if (lineUpDate < selectedDateNumber) {
          lineUp.classList.add("left");
        } else if (lineUpDate > selectedDateNumber) {
          lineUp.classList.add("right");
        } else {
          lineUp.classList.add("active");
        }
      });
    });
  });
});

// 토글 리스트 함수
function toggleList(listId) {
  const busLists = ["busList1", "busList2", "busList3"];

  busLists.forEach((id) => {
    const busList = document.getElementById(id);

    if (id === listId) {
      busList.style.display =
        busList.style.display === "none" || busList.style.display === ""
          ? "block"
          : "none";
    } else {
      busList.style.display = "none";
    }
  });
}

// 모달 열기
function showModal(title, content) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalContent").textContent = content;
  document.getElementById("myModal").style.display = "block";
}

// 모달 바깥을 클릭하면 닫기
window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
