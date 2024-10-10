const bubble1 = document.getElementById("bubble1");
const bubble2 = document.getElementById("bubble2");


document.addEventListener("DOMContentLoaded", function () {
  let currentSection = 0;
  const sections = document.querySelectorAll("#home_poster, #home_lineup, #home_info"); // 모든 섹션 선택
  const totalSections = sections.length; // 총 섹션 수
  const scrollThrottleDuration = 500; // 스크롤 간격 설정 (ms)
  let scrollThrottle = false; // 스크롤 감도 조절을 위한 플래그
  let isScrolling = false; // 스크롤 상태 감지 플래그

  // 섹션 스크롤 함수
  function scrollToSection(sectionIndex) {
    const section = sections[sectionIndex];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }); // 부드럽게 스크롤
    }
  }

  // 휠 이벤트 리스너
  function handleWheelScroll(event) {
    event.preventDefault(); // 기본 스크롤 동작 막기
    if (scrollThrottle || isScrolling) return; // 스크롤 중복 방지

    isScrolling = true; // 스크롤 시작
    setTimeout(() => {
      if (event.deltaY > 0) {
        if (currentSection < totalSections - 1) {
          currentSection++;
        }
      } else {
        if (currentSection > 0) {
          currentSection--;
        }
      }
      scrollToSection(currentSection);
      isScrolling = false; // 스크롤 종료
    }, scrollThrottleDuration);
  }

  // 터치 이벤트 리스너
  function handleTouchMove(event) {
    if (scrollThrottle || isScrolling) return; // 스크롤 중복 방지

    const deltaY = event.touches[0].clientY; // 터치 Y좌표
    const threshold = 50; // 스크롤 감지 임계값

    if (deltaY > threshold) {
      if (currentSection > 0) {
        currentSection--;
        scrollToSection(currentSection);
        isScrolling = true; // 스크롤 시작
        setTimeout(() => {
          isScrolling = false; // 스크롤 종료
        }, scrollThrottleDuration);
      }
    } else if (deltaY < -threshold) {
      if (currentSection < totalSections - 1) {
        currentSection++;
        scrollToSection(currentSection);
        isScrolling = true; // 스크롤 시작
        setTimeout(() => {
          isScrolling = false; // 스크롤 종료
        }, scrollThrottleDuration);
      }
    }
  }

  // 휠 및 터치 이벤트 리스너 등록
  window.addEventListener("wheel", handleWheelScroll, { passive: false }); // passive 설정을 false로 변경
  window.addEventListener("touchmove", handleTouchMove, { passive: false }); // passive 설정을 false로 변경

  // 새로고침 시 처음 페이지로 이동
  scrollToSection(currentSection);
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
