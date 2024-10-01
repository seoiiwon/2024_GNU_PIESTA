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

// 라인업 표시
document.addEventListener("DOMContentLoaded", function () {
  const dates = document.querySelectorAll(".date");
  const lineups = document.querySelectorAll(".lineup");
  let currentActive = "10/16";

  dates.forEach((date) => {
    date.addEventListener("click", function () {
      const selectedDate = this.getAttribute("data-date");
      if (selectedDate !== currentActive) {
        const currentLineup = document.getElementById(
          `lineup-${currentActive.replace("/", "-")}`
        );
        const newLineup = document.getElementById(
          `lineup-${selectedDate.replace("/", "-")}`
        );

        // 방향에 따라 애니메이션 설정
        if (selectedDate > currentActive) {
          newLineup.style.display = "block";
          newLineup.style.transform = "translateX(100%)";
          setTimeout(() => {
            currentLineup.style.transform = "translateX(-100%)";
            newLineup.style.transform = "translateX(0)";
          }, 10);
        } else {
          newLineup.style.display = "block";
          newLineup.style.transform = "translateX(-100%)";
          setTimeout(() => {
            currentLineup.style.transform = "translateX(100%)";
            newLineup.style.transform = "translateX(0)";
          }, 10);
        }

        // 이전 라인업 숨기기
        setTimeout(() => {
          currentLineup.style.display = "none";
          currentLineup.style.transform = "translateX(0)";
          currentLineup.classList.remove("active");
        }, 500);

        newLineup.classList.add("active");
        currentActive = selectedDate;
      }
    });
  });

  // 초기 상태 설정
  document.getElementById("lineup16").classList.add("active");
  document.getElementById("lineup16").style.display = "block";
});


// 토글 리스트 함수
function toggleList(listId) {
    const busLists = ['busList1', 'busList2', 'busList3'];

    busLists.forEach(id => {
        const busList = document.getElementById(id);
        
        if (id === listId) {
            busList.style.display = busList.style.display === "none" || busList.style.display === "" ? "block" : "none";
        } else {
            busList.style.display = "none";
        }
    });
}

// let busInfo_chiram = {};

// fetch("{{ url_for('static', path='json/bus_info.json') }}").then(response => response.json()).then(data => {busInfo = data["칠암"];}).catch(error => console.log("Json Error!!!!!!!! : ", error));


let busInfo_chiram = {};
const jsonFilePath = "{{ url_for('static', filename='json/bus_info.json') }}";

    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // 데이터 확인
        })
        .catch(error => console.error("Error fetching JSON:", error));

// 모달 열기
function showBusModalChiram(busNumber) {
    const bus = busInfo_chiram[busNumber];
    console.log(bus);
    
    if (bus) {
        const startPoint = bus.startPoint;  
        const endPoint = bus.endPoint;      
        
        const sp = startPoint.sp;                         
        const firstBusFromStartPoint = startPoint.firstBus; 
        const lastBusFromStartPoint = startPoint.lastBus;   
        const termFromStartPoint = startPoint.term;         
        
        const lp = endPoint.lp;                           
        const firstBusFromEndPoint = endPoint.firstBus;   
        const lastBusFromEndPoint = endPoint.lastBus;     
        const termFromEndPoint = endPoint.term;           

        document.getElementById('busNumber').textContent = busNumber; 
        document.getElementById('busChannel').textContent = `${sp} - ${lp}`; 
        document.getElementById('firstTimeFromStartPoint').textContent = `첫차: ${firstBusFromStartPoint}`; 
        document.getElementById('lastTimeFromStartPoint').textContent = `막차: ${lastBusFromStartPoint}`;
        document.getElementById('termsFromStartPoint').textContent = `배차: ${termFromStartPoint}`;
        
        document.getElementById('firstTimeFromEndPoint').textContent = `첫차: ${firstBusFromEndPoint}`;
        document.getElementById('lastTimeFromEndPoint').textContent = `막차: ${lastBusFromEndPoint}`;
        document.getElementById('termsFromEndPoint').textContent = `배차: ${termFromEndPoint}`;
    } else {
        alert('해당 버스 정보를 찾을 수 없습니다.'); 
    }
}


// 모달 바깥을 클릭하면 닫기
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}