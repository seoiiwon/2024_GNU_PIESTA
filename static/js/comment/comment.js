document.addEventListener("DOMContentLoaded", function () {
  // 페이지 로드 시 기존 댓글 불러오기
  fetch("/api/comments")
    .then((response) => response.json())
    .then((comments) => {
      comments.forEach((comment) => {
        displayComment(comment.name, comment.text);
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
        const names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];
        const randomName = names[Math.floor(Math.random() * names.length)];

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
    document.getElementById("comments-container").appendChild(commentDiv);
  }
});

// hambuger.js-----------------------------------------------------------------------------------------------------
const burger = document.querySelector(".menu-trigger");
const menu = document.querySelector(".hambergerContents");
let isOpen = false; // 메뉴 상태를 추적

burger.addEventListener("click", function (e) {
  e.preventDefault();

  // 햄버거 버튼 애니메이션 처리
  this.classList.toggle("active");

  if (!isOpen) {
    // 메뉴를 열 때
    menu.classList.remove("inactive");
    menu.classList.add("active");
  } else {
    // 메뉴를 닫을 때
    menu.classList.remove("active");
    menu.classList.add("inactive");
  }

  // 상태 전환
  isOpen = !isOpen;
});

const navItems = document.querySelectorAll("#navContainer div");

navItems.forEach((item) => {
  item.addEventListener("click", function () {
    const url = this.getAttribute("data-url");
    window.location.href = url;
  });
});

// logojs--------------------------------------------------------------------------------------------------------------------------------------------

// 로고 클릭시 홈으로 이동
document.getElementById("logoImg").addEventListener("click", function () {
  window.location.href = "/home";
});
