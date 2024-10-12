// document.addEventListener("DOMContentLoaded", function () {
//     const campusContainer = document.getElementById('campusContainer');
//     const leftArrow = document.getElementById('leftArrow');
//     const rightArrow = document.getElementById('rightArrow');
    
//     let currentCampusIndex = 0; // 현재 보여지는 캠퍼스 인덱스
//     const campuses = document.querySelectorAll('.campus');
//     const totalCampuses = campuses.length;
    
//     // 화살표 클릭 시 왼쪽으로 스크롤
//     leftArrow.addEventListener('click', function() {
//         if (currentCampusIndex > 0) {
//             currentCampusIndex--;
//             scrollToCampus(currentCampusIndex);
//         }
//     });

//     // 화살표 클릭 시 오른쪽으로 스크롤
//     rightArrow.addEventListener('click', function() {
//         if (currentCampusIndex < totalCampuses - 1) {
//             currentCampusIndex++;
//             scrollToCampus(currentCampusIndex);
//         }
//     });

//     // 특정 인덱스의 캠퍼스로 스크롤
//     function scrollToCampus(index) {
//         const campusWidth = campuses[0].offsetWidth; // 한 캠퍼스의 너비
//         campusContainer.scrollTo({
//             left: campusWidth * index, 
//             behavior: 'smooth' // 부드러운 스크롤
//         });
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    const campusContainer = document.getElementById('campusContainer');
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    
    let currentCampusIndex = 0; // 현재 보여지는 캠퍼스 인덱스
    const campuses = document.querySelectorAll('.campus');
    const busInfos = document.querySelectorAll('.busInfo'); // 각 busInfo 요소 가져오기
    const totalCampuses = campuses.length;
    
    // busInfo 초기화 함수
    function showBusInfo(index) {
        busInfos.forEach((busInfo, i) => {
            busInfo.style.display = (i === index) ? 'block' : 'none'; // 현재 캠퍼스 인덱스와 일치하는 busInfo만 표시
        });
    }
    
    // 화살표 클릭 시 왼쪽으로 스크롤
    leftArrow.addEventListener('click', function() {
        if (currentCampusIndex > 0) {
            currentCampusIndex--;
            scrollToCampus(currentCampusIndex);
        }
    });

    // 화살표 클릭 시 오른쪽으로 스크롤
    rightArrow.addEventListener('click', function() {
        if (currentCampusIndex < totalCampuses - 1) {
            currentCampusIndex++;
            scrollToCampus(currentCampusIndex);
        }
    });

    // 특정 인덱스의 캠퍼스로 스크롤 및 busInfo 표시
    function scrollToCampus(index) {
        const campusWidth = campuses[0].offsetWidth; // 한 캠퍼스의 너비
        campusContainer.scrollTo({
            left: campusWidth * index, 
            behavior: 'smooth' // 부드러운 스크롤
        });
        showBusInfo(index); // busInfo도 함께 업데이트
    }

    // 초기화: 첫 번째 캠퍼스와 busInfo 표시
    scrollToCampus(currentCampusIndex);
});