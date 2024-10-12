window.onload = function() {
    let isPasswordCorrect = false;

    const promptForPassword = () => {
        const userPassword = prompt("비밀번호를 입력하세요:");
        if (userPassword) {
            if (userPassword === correctPassword) {
                isPasswordCorrect = true;
                alert("확인되었습니다.");
                document.getElementById("noticeCategory").disabled = false;
                document.getElementById("noticeTitle").disabled = false;
                document.getElementById("noticeBody").disabled = false;
                document.getElementById("submitBtn").disabled = false;
            } else {
                alert("비밀번호가 일치하지 않습니다.");
                promptForPassword();
            }
        } else {
            alert("비밀번호 입력이 취소되었습니다.");
        }
    };

    promptForPassword();

    document.getElementById("submitBtn").onclick = async function() {
        const category = document.getElementById("noticeCategory").value;
        const title = document.getElementById("noticeTitle").value;
        const content = document.getElementById("noticeBody").value;

        const response = await fetch("/notice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: category,
                title: title,
                content: content
            })
        });

        if (response.ok) {
            alert("공지사항이 저장되었습니다.");
        } else {
            const errorData = await response.json();
            alert("저장 실패: " + errorData.detail);
        }
    };
}