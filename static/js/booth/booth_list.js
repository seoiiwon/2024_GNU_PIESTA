// 기본적으로 10월 16일에 맞는 부스 리스트만 보이도록 설정
window.onload = function() {
    document.querySelector('input[name="date"]:checked').dispatchEvent(new Event('change'));
  }

  document.addEventListener('change', function (event) {
    if (event.target.name === 'date') {
      const selectedDate = event.target.value;
      const boxes = document.querySelectorAll('.box');

      boxes.forEach(box => {
        const boxDate = box.getAttribute('data-date');
        if (boxDate.includes(selectedDate)) {
          box.style.display = 'flex';
        } else {
          box.style.display = 'none';
        }
      });
    }
  });