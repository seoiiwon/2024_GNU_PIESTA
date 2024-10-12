const header = document.getElementById('header');
const faqSection = document.querySelector('.faq-section');

window.addEventListener('scroll', function() {
    const faqTop = faqSection.getBoundingClientRect().top;
    const headerHeight = header.offsetHeight;

    if (faqTop <= headerHeight) {
        // FAQ 섹션이 헤더와 겹치기 시작하면
        header.style.zIndex = '0';  // FAQ 섹션 아래로 숨김
    } else {
        header.style.zIndex = '10'; // 원래 상태로 복원
    }
});

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
        const headerHeight = document.getElementById('header').clientHeight;
        const scrollPosition = offsetTop - headerHeight - 20;

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }
}