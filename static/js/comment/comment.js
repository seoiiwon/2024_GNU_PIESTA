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
