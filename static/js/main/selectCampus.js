document.addEventListener("DOMContentLoaded", function () {
    const campusContainer = document.getElementById('campusContainer');
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    
    let currentCampusIndex = 0; 
    const campuses = document.querySelectorAll('.campus');
    const busInfos = document.querySelectorAll('.busInfo'); 
    const totalCampuses = campuses.length;
    
    function showBusInfo(index) {
        busInfos.forEach((busInfo, i) => {
            busInfo.style.display = (i === index) ? 'block' : 'none'; 
        });
    }
    
    leftArrow.addEventListener('click', function() {
        if (currentCampusIndex > 0) {
            currentCampusIndex--;
            scrollToCampus(currentCampusIndex);
        }
    });

    rightArrow.addEventListener('click', function() {
        if (currentCampusIndex < totalCampuses - 1) {
            currentCampusIndex++;
            scrollToCampus(currentCampusIndex);
        }
    });

    function scrollToCampus(index) {
        const campusWidth = campuses[0].offsetWidth; 
        campusContainer.scrollTo({
            left: campusWidth * index, 
            behavior: 'smooth' 
        });
        showBusInfo(index); 
    }

    scrollToCampus(currentCampusIndex);
});