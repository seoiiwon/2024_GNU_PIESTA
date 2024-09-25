// 페이지 스크롤 이벤트
document.addEventListener("DOMContentLoaded", function() {
    let currentSection = 0;
    const sections = document.querySelectorAll('div');
    const totalSections = sections.length;

    function scrollToSection(sectionIndex) {
        window.scrollTo({
            top: window.innerHeight * sectionIndex,
            behavior: 'smooth'
        });
    }

    window.addEventListener('wheel', function(event) {
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
    });

    window.addEventListener('resize', function() {
        scrollToSection(currentSection);
    });
});