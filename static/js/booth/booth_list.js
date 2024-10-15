document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('click', function(event) {
      const url = this.getAttribute('data-url');
      window.location.href = url;
  });

  const heartElement = box.querySelector('.heart');
  if (heartElement) {
      heartElement.addEventListener('click', function(event) {
          event.stopPropagation(); 
          toggleHeart('{{ booth.booth_id | urlencode }}');
      });
  }
});

window.onload = function () {
  document
    .querySelector('input[name="date"]:checked')
    .dispatchEvent(new Event("change"));
  loadHeartStates(); 


  const heartStates = JSON.parse(localStorage.getItem("heartStates")) || [];

  fetch("/api/save_heart_states", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ heartStates: heartStates }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

document.addEventListener("change", function (event) {
  if (event.target.name === "date") {
    const selectedDate = event.target.value;
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box) => {
      const boxDate = box.getAttribute("data-date");
      if (boxDate.includes(selectedDate)) {
        box.style.display = "flex";
      } else {
        box.style.display = "none";
      }
    });
  }
});

function toggleHeart(boothId) {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 1024) {
    const heartImage = document.getElementById("heartImage_" + boothId); 

    if (heartImage.src.includes("heart_default.png")) {
      heartImage.src = "/static/images/heart_filled.png";

      addHeartState(boothId);
    } else {
      heartImage.src = "/static/images/heart_default.png";

      removeHeartState(boothId);
    }

    const selectedDate = document.querySelector(
      'input[name="date"]:checked'
    ).value;
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box) => {
      const boxDate = box.getAttribute("data-date");
      if (boxDate.includes(selectedDate)) {
        box.style.display = "flex";
      } else {
        box.style.display = "none";
      }
    });
  }
}

function addHeartState(boothId) {
  const heartStates = JSON.parse(localStorage.getItem("heartStates")) || [];
  if (!heartStates.includes(boothId)) {
    heartStates.push(boothId); 
    localStorage.setItem("heartStates", JSON.stringify(heartStates));
  }
}

function removeHeartState(boothId) {
  const heartStates = JSON.parse(localStorage.getItem("heartStates")) || [];
  const updatedHeartStates = heartStates.filter((id) => id !== boothId);
  localStorage.setItem("heartStates", JSON.stringify(updatedHeartStates));
}

function loadHeartStates() {
  const heartStates = JSON.parse(localStorage.getItem("heartStates")) || [];
  heartStates.forEach((boothId) => {
    const heartImage = document.getElementById("heartImage_" + boothId);
    if (heartImage) {
      heartImage.src = "/static/images/heart_filled.png"; 
    }
  });
}
