document.addEventListener("DOMContentLoaded", function () {
  // Fisher-Yates 알고리즘을 사용하여 배열을 무작위로 섞는 함수
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // JSON 파일에서 이름 목록 가져오기
  fetch("/static/json/names.json")
    .then((response) => response.json())
    .then((data) => {
      const names = data.names; // JSON 파일에서 불러온 이름 목록
      shuffleArray(names); // 이름 목록을 무작위로 섞음
      let currentNameIndex = 0; // 현재 사용할 이름의 인덱스

      // 페이지 로드 시 기존 댓글 불러오기
      fetch("/api/comments")
        .then((response) => response.json())
        .then((comments) => {
          const commentsContainer =
            document.getElementById("comments-container");
          commentsContainer.innerHTML = ""; // 기존 댓글 초기화

          comments.forEach((comment) => {
            displayComment(comment.name, comment.text);
          });

          // 댓글 클릭 시 비밀번호 입력
          commentsContainer.addEventListener("click", function (event) {
            const commentDiv = event.target.closest(".comment");
            if (!commentDiv) return;

            const password = prompt(
              "방명록을 삭제하려면 비밀번호를 입력하세요:"
            );

            // 사용자가 취소 버튼을 누를 경우 아무 일도 하지 않음
            if (password === null) return;

            if (password === "admin5senses") {
              const text = commentDiv.querySelector(".text").textContent;
              console.log("Deleting comment with text:", text);

              fetch("/api/delete-comment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.success) {
                    commentDiv.remove();
                    alert("방명록이 삭제되었습니다.");
                  } else {
                    alert("방명록 삭제에 실패했습니다.");
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  alert("방명록 삭제 중 오류가 발생했습니다.");
                });
            } else {
              alert(
                "권한이 없습니다. 방명록 삭제를 원할 경우 총학생회에 문의하세요."
              );
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });

      document
        .getElementById("comment-form")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          const commentInput = document.getElementById("comment-input");
          const commentText = commentInput.value.trim();

          if (commentText !== "") {
            const randomName = names[currentNameIndex];
            currentNameIndex = (currentNameIndex + 1) % names.length; // 인덱스를 순환
            if (currentNameIndex === 0) shuffleArray(names); // 모든 이름을 사용한 경우 다시 섞음

            const data = {
              name: randomName,
              text: commentText,
            };

            fetch("/api/save-comment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
                displayComment(randomName, commentText);
                commentInput.value = "";
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        });

      function displayComment(name, text) {
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";

        const nameDiv = document.createElement("div");
        nameDiv.className = "name";
        nameDiv.textContent = name;

        const textDiv = document.createElement("div");
        textDiv.className = "text";
        textDiv.textContent = text;

        commentDiv.appendChild(nameDiv);
        commentDiv.appendChild(textDiv);

        const commentsContainer = document.getElementById("comments-container");
        commentsContainer.insertBefore(
          commentDiv,
          commentsContainer.firstChild
        );
      }
    })
    .catch((error) => {
      console.error("Error loading names:", error);
    });

  // 햄버거 버튼 및 로고 클릭 이벤트 처리 (기존 코드 유지)
  const burger = document.querySelector(".menu-trigger");
  const menu = document.querySelector(".hambergerContents");
  let isOpen = false;

  burger.addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");

    if (!isOpen) {
      menu.classList.remove("inactive");
      menu.classList.add("active");
    } else {
      menu.classList.remove("active");
      menu.classList.add("inactive");
    }
    isOpen = !isOpen;
  });

  const navItems = document.querySelectorAll("#navContainer div");

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const url = this.getAttribute("data-url");
      window.location.href = url;
    });
  });

  document.getElementById("logoImg").addEventListener("click", function () {
    window.location.href = "/home";
  });
});
