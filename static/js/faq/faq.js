// FAQ 토글 함수
function toggleAnswer(index) {
    const answer = document.getElementById(`answer-${index}`);
    const faqItem = answer.parentElement;

    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        answer.style.display = 'none';
    } else {
        faqItem.classList.add('active');
        answer.style.display = 'block';
    }
}