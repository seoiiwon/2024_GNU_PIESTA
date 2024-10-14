function heart(boothId) {
    const heartState = JSON.parse(localStorage.getItem('heartStates')) || [];
  
    if (heartState.includes(boothId)) {
      // 하트를 제거
      const index = heartState.indexOf(boothId);
      heartState.splice(index, 1);
      document.getElementById(`heartImage_${boothId}`).src = '/static/images/heart_default.png'; // 기본 이미지로 변경
    } else {
      // 하트를 추가
      heartState.push(boothId);
      document.getElementById(`heartImage_${boothId}`).src = '/static/images/heart_filled.png'; // 채워진 이미지로 변경
    }
  
    // 로컬 스토리지에 업데이트
    localStorage.setItem('heartStates', JSON.stringify(heartState));
  }