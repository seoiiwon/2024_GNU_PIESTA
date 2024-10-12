const bubble1 = document.getElementById("bubble1");
const bubble2 = document.getElementById("bubble2");


document.addEventListener("DOMContentLoaded", function () {
  let currentSection = 0;
  const sections = document.querySelectorAll("#home_poster, #home_lineup, #home_info");
  const totalSections = sections.length;
  const scrollThrottleDuration = 1000;
  let isScrolling = false;
  let startY = 0; 

  function scrollToSection(sectionIndex) {
    const section = sections[sectionIndex];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
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
