const header = document.getElementById('header');
const logoImg = document.getElementById('logoImg');
const faqSection = document.getElementById('faqSection');

// FAQ 토글 기능 (여러 항목이 동시에 열리게 설정 + 클릭하면 로고 이미지만 숨김)
function toggleAnswer(index) {
    const answer = document.getElementById(`answer-${index}`);
    const faqItem = answer.parentElement;

    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
    } else {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';

        const offsetTop = faqItem.getBoundingClientRect().top + window.pageYOffset;
        const headerHeight = header.clientHeight;
        const scrollPosition = offsetTop - headerHeight - 20;

        // 부드럽게 스크롤
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });

        // FAQ를 열 때마다 로고 이미지 숨김 (햄버거는 남김)
        logoImg.style.display = 'none';
    }
}

// FAQ를 클릭할 때마다 로고 이미지만 숨김
faqSection.addEventListener('click', function() {
    logoImg.style.display = 'none';  // FAQ 항목을 클릭할 때마다 로고 이미지를 숨김
});

// 스크롤을 통해서도 로고 이미지를 복원할 수 있도록 이벤트 추가
window.addEventListener('scroll', function() {
    const faqTop = faqSection.getBoundingClientRect().top;
    if (faqTop > 100) {  // FAQ 섹션이 상단에서 멀어지면 로고 이미지 다시 보이도록 설정
        logoImg.style.display = 'block';
    }
});