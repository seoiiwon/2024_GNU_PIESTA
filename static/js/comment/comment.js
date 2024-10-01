document
  .getElementById("comment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // 댓글 입력 필드의 값을 가져옴
    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value.trim();

    if (commentText !== "") {
      // 랜덤한 이름을 선택하기 위한 이름 배열
      const names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];
      const randomName = names[Math.floor(Math.random() * names.length)];

      // 댓글을 표시할 div 요소 생성
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";

      // 이름을 표시할 div 요소 생성
      const nameDiv = document.createElement("div");
      nameDiv.className = "name";
      nameDiv.textContent = randomName;

      // 댓글 텍스트를 표시할 div 요소 생성
      const textDiv = document.createElement("div");
      textDiv.className = "text";
      textDiv.textContent = commentText;

      // 이름과 댓글 텍스트를 commentDiv에 추가
      commentDiv.appendChild(nameDiv);
      commentDiv.appendChild(textDiv);

      // 댓글을 댓글 컨테이너에 추가
      document.getElementById("comments-container").appendChild(commentDiv);

      // 댓글 입력 필드 초기화
      commentInput.value = "";
    }
  });
