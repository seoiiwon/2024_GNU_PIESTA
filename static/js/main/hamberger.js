const burger = document.querySelector('.menu-trigger');
const menu = document.querySelector('.hambergerContents');
let isOpen = false;  // 메뉴 상태를 추적

burger.addEventListener('click', function(e) {
    e.preventDefault();

    // 햄버거 버튼 애니메이션 처리
    this.classList.toggle('active');
    
    if (!isOpen) {
        // 메뉴를 열 때
        menu.classList.remove('inactive');
        menu.classList.add('active');
    } else {
        // 메뉴를 닫을 때
        menu.classList.remove('active');
        menu.classList.add('inactive');
    }

    // 상태 전환
    isOpen = !isOpen;
});



const navItems = document.querySelectorAll('#navContainer div');

navItems.forEach(item => {
    item.addEventListener('click', function () {
        const url = this.getAttribute('data-url');
        window.location.href = url;
    });
});