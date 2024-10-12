// 하트 토글 함수 (태블릿/모바일에서만 작동)
function toggleHeart() {
    const screenWidth = window.innerWidth;
    
    // 태블릿과 모바일에서만 작동
    if (screenWidth <= 1024) {
        const heartImage = document.getElementById('heartImage');
        // 현재 이미지가 기본 하트인지 확인
        if (heartImage.src.includes('heart_default.png')) {
            // 기본 하트에서 채워진 하트로 변경
            heartImage.src = '/static/images/heart_filled.png';
        } else {
            // 채워진 하트에서 기본 하트로 변경
            heartImage.src = '/static/images/heart_default.png';
        }
    }
}

// 스타일 적용 함수
function applyStyles() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // 태블릿 또는 작은 화면일 경우 booth_detail.css 로딩
    if (screenWidth <= 1024 && screenHeight > screenWidth) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = "/static/css/booth/booth_detail.css";  // 적절한 경로로 수정 필요
        document.head.appendChild(link);
    } 
    // 노트북 또는 큰 화면일 경우 화면을 흰색으로 설정하고, HTML을 완전히 제거
    else if (screenWidth >= 1024) {
        document.body.style.backgroundColor = 'white';
        document.body.innerHTML = '';  // PC 화면에서 body 내용 제거
        document.documentElement.innerHTML = '';  // <html> 내용까지 제거
    }
}

// 페이지 로딩 시 스타일 및 하트 토글 기능 적용
document.addEventListener('DOMContentLoaded', function () {
    applyStyles();
    // 하트 클릭 이벤트 리스너 등록 (모바일/태블릿에서만 작동)
    const heartElement = document.querySelector('.heart');
    if (heartElement) {
        heartElement.addEventListener('click', toggleHeart);
    }
});

// 화면 크기 변경 시 스타일 재적용 (화면 크기를 바꿀 때 대응)
window.addEventListener('resize', function () {
    applyStyles();
});