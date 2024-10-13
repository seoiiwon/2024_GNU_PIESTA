const header = document.getElementById('header');
const faqSection = document.getElementById('faqSection');

// FAQ 토글 기능
// function toggleAnswer(index) {
//     const answer = document.getElementById(`answer-${index}`);
//     const faqItem = answer.parentElement;

//     if (faqItem.classList.contains('active')) {
//         faqItem.classList.remove('active');
//         answer.style.maxHeight = '0';
//         answer.style.opacity = '0';
//     } else {
//         faqItem.classList.add('active');
//         answer.style.maxHeight = answer.scrollHeight + 'px';
//         answer.style.opacity = '1';

//         // 로고 이미지를 숨기지 않음
//         // 로고 이미지를 숨기는 코드가 제거되었습니다.
//     }
// }

function toggleAnswer(index) {
    const answer = document.getElementById(`answer-${index}`);
    const faqItem = answer.parentElement;

    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
    } else {
        // 모든 FAQ 아이템에서 active 클래스를 제거하고 답변을 숨김
        const allFaqItems = document.querySelectorAll('.faq-item');
        allFaqItems.forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.faq-answer').style.opacity = '0';
        });

        // 클릭된 FAQ 아이템만 활성화
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
    }
}