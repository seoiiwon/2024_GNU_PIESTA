document.addEventListener("DOMContentLoaded", function() {
    let currentSection = 0;
    const sections = document.querySelectorAll('div');
    const totalSections = sections.length;
    const logoImg = document.getElementById('logoImg');
    let scrollThrottle = false; // 스크롤 감도 플래그

    function scrollToSection(sectionIndex) {
        window.scrollTo({
            top: window.innerHeight * sectionIndex,
            behavior: 'smooth'
        });
    }

    // 첫 번째 페이지 로고 숨기기
    function handleLogoPosition() {
        if (currentSection === 1 || currentSection === 2) {
            logoImg.style.position = 'fixed';
            logoImg.style.visibility = 'visible';
            logoImg.style.opacity = '1';
        } else if (currentSection === 0) {
            logoImg.style.opacity = '0';
            setTimeout(() => {
                logoImg.style.visibility = 'hidden';
            }, 300);
        }
    }

    // 스크롤 이벤트
    window.addEventListener('wheel', function(event) {
        if (scrollThrottle) return; 
        scrollThrottle = true; // 스크롤 시 플래그 활성화

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

    window.addEventListener('resize', function() {
        scrollToSection(currentSection);
        handleLogoPosition();
    });

    handleLogoPosition();
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


// 모달 열기
function showModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').textContent = content;
    document.getElementById('myModal').style.display = "block";
}


// 모달 바깥을 클릭하면 닫기
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}