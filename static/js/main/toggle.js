// 토글 리스트 함수
function toggleList(listId) {
    const busLists = ["busList1", "busList2", "busList3"];
  
    busLists.forEach((id) => {
      const busList = document.getElementById(id);
  
      if (id === listId) {
        busList.style.display =
          busList.style.display === "none" || busList.style.display === ""
            ? "block"
            : "none";
      } else {
        busList.style.display = "none";
      }
    });
  }