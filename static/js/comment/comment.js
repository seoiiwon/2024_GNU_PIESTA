document.addEventListener("DOMContentLoaded", function () {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

fetch("/static/json/names.json")
    .then((response) => response.json())
    .then((data) => {
        
        const mbti = data.mbti; 
        const names = data.names; 
        shuffleArray(mbti);
        shuffleArray(names);

        let currentNameIndex = 0; 

        fetch("/api/comments")
            .then((response) => response.json())
            .then((comments) => {
                console.log(comments.length);  

                const commentsContainer = document.getElementById("comments-container");
                commentsContainer.innerHTML = "";

                comments.forEach((comment) => {
                    displayComment(comment.name, comment.text);
                });

                commentsContainer.addEventListener("click", function (event) {
                    const commentDiv = event.target.closest(".comment");
                    if (!commentDiv) return;

                    const password = prompt("방명록을 삭제하려면 비밀번호를 입력하세요:");

                    if (password === null) return;

                    const text = commentDiv.querySelector(".text").textContent;

                    fetch("/api/delete-comment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ text, password }), 
                    })
                    .then((response) => {
                        if (response.status === 403) {
                            alert("권한이 없습니다. 방명록 삭제를 원할 경우 총학생회에 문의하세요.");
                            return;
                        } else if (response.ok) {
                            return response.json(); 
                        } else {
                            throw new Error("방명록 삭제에 실패했습니다.");
                        }
                    })
                    .then((data) => {
                        if (data && data.success) {
                            commentDiv.remove();
                            alert("방명록이 삭제되었습니다.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        alert("방명록 삭제 중 오류가 발생했습니다.");
                    });
                });
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
            });

        document.getElementById("comment-form").addEventListener("submit", function (event) {
            event.preventDefault();

            const commentInput = document.getElementById("comment-input");
            const commentText = commentInput.value.trim();

            if (commentText !== "") {
                const randomMbti = mbti[Math.floor(Math.random() * mbti.length)];
                const randomName = names[currentNameIndex];
                const combinedName = `${randomMbti} ${randomName}`; 
                currentNameIndex = (currentNameIndex + 1) % names.length; 
                if (currentNameIndex === 0) shuffleArray(names);
                const data = {
                    name: combinedName,
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
                        displayComment(combinedName, commentText);
                        commentInput.value = "";
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            }
        });

        document.addEventListener("DOMContentLoaded", function () {
            scrollToBottom();
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
            commentsContainer.appendChild(commentDiv);

            scrollToBottom();
        }

        function scrollToBottom() {
            const commentsContainer = document.getElementById("comments-container");
            commentsContainer.scrollTop = commentsContainer.scrollHeight;
        }
    })
    .catch((error) => {
        console.error("Error loading names:", error);
    });
});
