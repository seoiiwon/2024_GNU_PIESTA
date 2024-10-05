// 토글 리스트
function toggleList(listId) {
  const busLists = ["busList1", "busList2", "busList3"];

  busLists.forEach((id) => {
    const busList = document.getElementById(id);

    if (id === listId) {
      busList.style.display =
        busList.style.display === "none" || busList.style.display === ""
          ? "block"
          : "none";
          busList.style.maxHeight = busList.scrollHeight + "px"; 
          busList.style.transition = "max-height 0.3s ease"; 
    } else {
      busList.style.display = "none";
    }
  });
}