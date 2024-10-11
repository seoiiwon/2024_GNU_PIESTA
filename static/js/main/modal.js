// 공지 모달 열기 
function showNoticeModal(noticeCategory, noticeTitle, noticeBody) {
  const noticeModal = document.getElementById('noticeModal');
  const noticeModalCategory = document.getElementById('noticeModalCategory');
  const noticeModalTitle = document.getElementById('noticeModalTitle');
  const noticeModalBody = document.getElementById('noticeModalBody');
  
  if (noticeCategory && noticeTitle && noticeBody) {
    noticeModalCategory.textContent = '[ ' + noticeCategory + ' ]';
    noticeModalTitle.textContent = noticeTitle;
    noticeModalBody.textContent = noticeBody;

    document.getElementById('home_info').classList.add('blur-background');
    noticeModal.style.display = 'flex';
  } else {
    console.log('404 NOT FOUND');
    
  }
}

let busInfo_chilam = {};
let busInfo_tongyeong = {};
let busInfo_changwon = {};

fetch(jsonFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
       busInfo_chilam = data["칠암"];
      busInfo_all = data;
       console.log(busInfo_tongyeong);
       
    })
    .catch(error => console.error("Error fetching JSON:", error));



function showBusModalChilam(busNumber) {
    const bus = busInfo_chilam[busNumber];

    if (bus) {
        const startPoint = bus["startPoint"];  
        const endPoint = bus["endPoint"];      

        const sp = startPoint["sp"];                         
        const firstBusFromStartPoint = startPoint["firstBus"]; 
        const lastBusFromStartPoint = startPoint["lastBus"];   
        const termFromStartPoint = startPoint["term"];         

        const lp = endPoint["lp"];                           
        const firstBusFromEndPoint = endPoint["firstBus"];   
        const lastBusFromEndPoint = endPoint["lastBus"];     
        const termFromEndPoint = endPoint["term"];           

        document.getElementById('busNumber').textContent = busNumber; 
        document.getElementById('busChannel').textContent = `${sp} - ${lp}`; 
        document.getElementById('firstTimeFromStartPoint').textContent = firstBusFromStartPoint; 
        document.getElementById('lastTimeFromStartPoint').textContent = lastBusFromStartPoint;
        document.getElementById('termsFromStartPoint').textContent = termFromStartPoint;
        
        document.getElementById('firstTimeFromEndPoint').textContent = firstBusFromEndPoint;
        document.getElementById('lastTimeFromEndPoint').textContent = lastBusFromEndPoint;
        document.getElementById('termsFromEndPoint').textContent = termFromEndPoint;

        document.getElementById('home_info').classList.add('blur-background');
        document.getElementById("busModal1").style.display = "flex";
    } else {
        alert('해당 버스 정보를 찾을 수 없습니다.'); 
    }
}


function showBusModalTYCW(time, location, busFrom) {
  const bus = busInfo_all[location][busFrom][time];
  let channelText;
  
  if (bus) {
    if (location == "통영") {
      if (busFrom == "통영출발") {
        channelText = "(통영종합버스터미널 > 개양시외버스터미널)";
      } else if (busFrom == "진주출발") {
        channelText = "(개양시외버스터미널 > 통영종합버스터미널)";
      }
    } else if (location == "창원") {
      if (busFrom == "창원출발") {
        channelText = "(창원종합버스터미널 > 개양시외버스터미널)";
      } else if (busFrom == "진주출발") {
        channelText = "(개양시외버스터미널 > 창원종합버스터미널)";
      }
    }

    const company = bus["버스회사"];
    const expense = bus["요금"];
    const type = bus["유형"];
    const path = bus["경유"];

    document.getElementById("busChannel-TYCW").textContent = channelText;
    
    document.getElementById("busTime").textContent = time;
    document.getElementById("busExpense").textContent = expense;
    document.getElementById("busType").textContent = type;
    document.getElementById("busPath").textContent = path;
    document.getElementById("busCompany").textContent = company;

    document.getElementById('home_info').classList.add('blur-background');
    document.getElementById("busModal2").classList.add('modal-active');

    document.getElementById("busModal2").style.display = "flex";
  } else {
    alert('해당 버스 정보를 찾을 수 없습니다.')
  }  
}


// 모달 닫기
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.getElementById('home_info').classList.remove('blur-background');
}
  
window.onclick = function(event) {
const noticeModal = document.getElementById('noticeModal');
const busModal1 = document.getElementById('busModal1');
const busModal2 = document.getElementById('busModal2');

if (event.target == noticeModal || event.target == busModal1 || event.target == busModal2) {
    closeModal(event.target.id);
}
}