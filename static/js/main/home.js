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
  const sections = document.querySelectorAll("div");
  const totalSections = sections.length;
  const logoImg = document.getElementById("logoImg");
  let scrollThrottle = false; // 스크롤 감도 조절을 위한 플래그
  const hamburger = document.getElementById("hamburger");

  // 새로고침 시 처음 페이지로 이동하게 설정
  scrollToSection(0);

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
      }, 1500);
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
          // handleLogoPosition();
        }
      } else {
        if (currentSection > 0) {
          currentSection--;
          scrollToSection(currentSection);
          // handleLogoPosition();
        }
      }
      scrollThrottle = false;
    }, 4000);
  });

  window.addEventListener("resize", function () {
    scrollToSection(currentSection);
    // handleLogoPosition();
  });

  // handleLogoPosition();
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
