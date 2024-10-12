const bubble1 = document.getElementById("bubble1");
const bubble2 = document.getElementById("bubble2");
// 버블 두번째 페이지에만 나타나도록
function scrollToSection(sectionIndex) {
  if (sectionIndex == 2) {
    bubble1.style.visibility = "hidden";
    bubble2.style.visibility = "hidden";
  } else {
    bubble1.style.visibility = "visible";
    bubble2.style.visibility = "visible";
  }
  window.scrollTo({
    top: window.innerHeight * sectionIndex,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let currentSection = 0;
  const sections = document.querySelectorAll(
    "#home_poster, #home_lineup, #home_info"
  );
  const totalSections = sections.length;
  const scrollThrottleDuration = 1000;
  let isScrolling = false;
  let startY = 0;

  function scrollToSection(sectionIndex) {
    const section = sections[sectionIndex];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleWheelScroll(event) {
    event.preventDefault();
    if (isScrolling) return;

    isScrolling = true;
    setTimeout(() => {
      if (event.deltaY > 0 && currentSection < totalSections - 1) {
        currentSection++;
      } else if (event.deltaY < 0 && currentSection > 0) {
        currentSection--;
      }
      scrollToSection(currentSection);
      isScrolling = false;
    }, scrollThrottleDuration);
  }

  // 터치 이벤트 리스너
  function handleTouchStart(event) {
    startY = event.touches[0].clientY;
  }

  function handleTouchEnd(event) {
    if (isScrolling) return;

    const endY = event.changedTouches[0].clientY;
    const deltaY = startY - endY;
    const threshold = 50;

    if (Math.abs(deltaY) > threshold) {
      isScrolling = true;
      if (deltaY > 0 && currentSection < totalSections - 1) {
        currentSection++;
      } else if (deltaY < 0 && currentSection > 0) {
        currentSection--;
      }
      scrollToSection(currentSection);
      setTimeout(() => {
        isScrolling = false;
      }, scrollThrottleDuration);
    }
  }

  window.addEventListener("wheel", handleWheelScroll, { passive: false });
  window.addEventListener("touchstart", handleTouchStart, { passive: false });
  window.addEventListener("touchend", handleTouchEnd, { passive: false });

  scrollToSection(currentSection);
});

function getKSTDate() {
  const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
  const kstOffset = 9 * 60;
  return new Date(utc + kstOffset * 60000);
}

// 날짜 카운트다운
const dDayDate = new Date(2024, 9, 16); //10월 16일

function countdown() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const distance = dDayDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML = "Day";
  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("countdown").innerHTML = days;
  }
}

countdown(); // 페이지 로드 시 초기 계산
setInterval(countdown, 1000 * 60 * 60 * 24); // 매일 자정에 갱신

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
