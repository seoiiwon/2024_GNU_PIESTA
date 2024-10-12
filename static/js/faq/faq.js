const header = document.getElementById('header');
const faqSection = document.getElementById('faqSection');  // 로고 이미지는 더 이상 가져오지 않음

// FAQ 토글 기능
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

        // 로고 이미지를 숨기지 않음
        // 로고 이미지를 숨기는 코드가 제거되었습니다.
    }
}