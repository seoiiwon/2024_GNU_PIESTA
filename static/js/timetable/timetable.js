function showPopup(title, time) {
	document.getElementById('event-title').innerText = title;
	document.getElementById('event-time').innerText = time;
	document.getElementById('popup').style.display = 'block';
  }
  
  function closePopup() {
	document.getElementById('popup').style.display = 'none';
  }
  