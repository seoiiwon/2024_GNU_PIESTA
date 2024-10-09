const bubble1 = document.getElementById("bubble1");
const bubble2 = document.getElementById("bubble2");

document.addEventListener("DOMContentLoaded", function () {
  let currentSection = 0;
  const sections = document.querySelectorAll("div");
  const totalSections = sections.length;
  const scrollThrottleDuration = 300; // 스크롤 조절을 위한 시간 설정
  let scrollThrottle = false; // 스크롤 감도 조절을 위한 플래그
  let startY = null; // 터치 시작 Y좌표 저장

  // 새로고침 시 처음 페이지로 이동하게 설정
  scrollToSection(0);

  // 섹션 스크롤 함수
  function scrollToSection(sectionIndex) {
    const section = sections[sectionIndex];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // 휠 이벤트 리스너
  function handleWheelScroll(event) {
    if (scrollThrottle) return; // 스크롤 중복 방지
    scrollThrottle = true; // 플래그 활성화

    setTimeout(() => {
      if (event.deltaY > 0) {
        if (currentSection < totalSections - 1) {
          currentSection++;
          scrollToSection(currentSection);
        }
      } else {
        if (currentSection > 0) {
          currentSection--;
          scrollToSection(currentSection);
        }
      }
      scrollThrottle = false; // 스크롤 플래그 비활성화
    }, scrollThrottleDuration);
  }

  // 터치 이벤트 리스너
  function handleTouchMove(event) {
    if (scrollThrottle || startY === null) return;

    const deltaY = event.touches[0].clientY - startY;
    if (Math.abs(deltaY) > 50) { // 스크롤 감지
      scrollThrottle = true;

      setTimeout(() => {
        if (deltaY > 0) {
          if (currentSection > 0) {
            currentSection--;
            scrollToSection(currentSection);
          }
        } else {
          if (currentSection < totalSections - 1) {
            currentSection++;
            scrollToSection(currentSection);
          }
        }
        scrollThrottle = false;
        startY = null; // Y좌표 초기화
      }, scrollThrottleDuration);
    }
  }

  // 휠 및 터치 이벤트 리스너 등록
  window.addEventListener("wheel", handleWheelScroll);
  window.addEventListener("touchstart", function (event) {
    startY = event.touches[0].clientY; // 터치 시작 Y좌표 저장
  });
  window.addEventListener("touchmove", handleTouchMove);

  // 창 크기 변경 시 현재 섹션으로 스크롤
  window.addEventListener("resize", function () {
    scrollToSection(currentSection);
  });
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
    document.getElementById("countdown").innerHTML = "Day";
  }
}

const x = setInterval(countdown, 1000);
countdown();

// 라인업
document.addEventListener("DOMContentLoaded", function () {
  const dates = document.querySelectorAll(".date");
  const lineUpLists = document.querySelectorAll(".lineUpList");

  function showLineup(date) {
    lineUpLists.forEach((list) => {
      if (list.id === `lineup/${date}`) {
        list.style.display = "flex";
      } else {
        list.style.display = "none";
      }
    });
  }

  showLineup("16");

  dates.forEach((date) => {
    date.addEventListener("click", function () {
      showLineup(this.getAttribute("data-date").split("/")[1]);
    });
  });
});

// 초기 상태 설정
document.getElementById("lineup16").classList.add("active");
document.getElementById("lineup16").style.display = "block";
