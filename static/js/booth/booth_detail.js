function toggleHeart() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 1024) {
        const heartImage = document.getElementById('heartImage');
        if (heartImage.src.includes('heart_default.png')) {
            heartImage.src = '/static/images/heart_filled.png';
        } else {
            heartImage.src = '/static/images/heart_default.png';
        }
    }
}

function applyStyles() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth <= 1024 && screenHeight > screenWidth) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = "/static/css/booth/booth_detail.css";  
        document.head.appendChild(link);
    } 
    else if (screenWidth >= 1024) {
        document.body.style.backgroundColor = 'white';
        document.body.innerHTML = '';  
        document.documentElement.innerHTML = '';  
    }
}

document.addEventListener('DOMContentLoaded', function () {
    applyStyles();
    const heartElement = document.querySelector('.heart');
    if (heartElement) {
        heartElement.addEventListener('click', toggleHeart);
    }
});

window.addEventListener('resize', function () {
    applyStyles();
});