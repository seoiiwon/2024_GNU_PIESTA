const burger = document.querySelector('.menu-trigger');
const menu = document.querySelector('.hambergerContents');
let isOpen = false;

burger.addEventListener('click', function(e) {
    e.preventDefault();

    this.classList.toggle('active');
    
    if (!isOpen) {
        menu.classList.remove('inactive');
        menu.classList.add('active');
    } else {
        menu.classList.remove('active');
        menu.classList.add('inactive');
    }
    isOpen = !isOpen;
});


const navItems = document.querySelectorAll('#navContainer div');

navItems.forEach(item => {
    item.addEventListener('click', function () {
        const url = this.getAttribute('data-url');
        window.location.href = url;
    });
});