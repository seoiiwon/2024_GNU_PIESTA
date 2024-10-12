function toggleHeart() {
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