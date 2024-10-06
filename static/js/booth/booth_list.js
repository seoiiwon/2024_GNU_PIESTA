const boxes = document.querySelectorAll(".box");

// 각 .box 요소에 클릭 이벤트 리스너를 추가합니다.
boxes.forEach(function (box) {
  box.addEventListener("click", function () {
    window.location.href = "/booth/detail";
  });
});
