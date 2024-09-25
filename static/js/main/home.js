// 스크롤 페이지 전환
document.addEventListener("DOMContentLoaded", function() {
    let currentSection = 0;
    const sections = document.querySelectorAll('div');
    const totalSections = sections.length;
    const logoImg = document.getElementById('logoImg');

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
    });

    window.addEventListener('resize', function() {
        scrollToSection(currentSection);
        handleLogoPosition();
    });

    handleLogoPosition();
});