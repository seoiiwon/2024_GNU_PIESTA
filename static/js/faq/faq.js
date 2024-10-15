const header = document.getElementById('header');
const faqSection = document.getElementById('faqSection');

function toggleAnswer(index) {
    const answer = document.getElementById(`answer-${index}`);
    const faqItem = answer.parentElement;

    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
    } else {
        const allFaqItems = document.querySelectorAll('.faq-item');
        allFaqItems.forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.faq-answer').style.opacity = '0';
        });

        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
    }
}