function toggleAnswer(id) {
    const answer = document.getElementById(`answer-${id}`);
    const item = answer.parentElement;
    
    answer.classList.toggle('active');
    item.classList.toggle('active');
}