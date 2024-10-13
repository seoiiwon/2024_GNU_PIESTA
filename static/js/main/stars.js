let width = window.innerWidth;
let height = window.innerHeight;
let MAX_PARTICLES = (width * height) / 30000;  // 별의 개수를 조금 더 늘림
let DRAW_INTERVAL = 60;
let canvas = document.querySelector('.starCanvas'); // 클래스 선택자로 변경
let context = canvas.getContext('2d');
let gradient = null;
let pixies = [];

// 화면 크기 조정 관련 함수
function setDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
    MAX_PARTICLES = (width * height) / 25000;  // 별의 개수를 약간 증가시킴
    canvas.width = width;
    canvas.height = height;
}

setDimensions();
window.addEventListener('resize', setDimensions);

// 가장자리 쪽에 별이 많이 분포되도록 좌표 생성
function getRandomEdgePosition() {
    let edgeMargin = 0.2; // 중앙 부분은 빈 공간으로 남기고 가장자리 쪽으로 별이 분포되도록 설정
    let randX, randY;
    
    // x 좌표: 화면의 가장자리로 분포 (좌우)
    if (Math.random() < 0.5) {
        randX = Math.random() * width * edgeMargin; // 왼쪽 가장자리
    } else {
        randX = width * (1 - Math.random() * edgeMargin); // 오른쪽 가장자리
    }

    // y 좌표: 화면의 가장자리로 분포 (상하)
    if (Math.random() < 0.5) {
        randY = Math.random() * height * edgeMargin; // 상단 가장자리
    } else {
        randY = height * (1 - Math.random() * edgeMargin); // 하단 가장자리
    }

    return {x: randX, y: randY};
}

// 원형(별) 객체 생성
function Circle() {
    this.settings = {ttl: 8000, xmax: 5, ymax: 2, rmin: 5, rmax: 10, drt: 1};

    this.reset = function () {
        let pos = getRandomEdgePosition(); // 가장자리 좌표 생성 함수 호출
        this.x = pos.x;
        this.y = pos.y;
        this.r = ((this.settings.rmax - 1) * Math.random()) + 1;
        this.dx = (Math.random() * this.settings.xmax) * (Math.random() < 0.5 ? -1 : 1);
        this.dy = (Math.random() * this.settings.ymax) * (Math.random() < 0.5 ? -1 : 1);
        this.hl = (this.settings.ttl / DRAW_INTERVAL) * (this.r / this.settings.rmax);
        this.rt = 0;
        this.settings.drt = Math.random() + 1;
        this.stop = Math.random() * 0.2 + 0.4;
    };

    this.fade = function () {
        this.rt += this.settings.drt;
        if (this.rt >= this.hl) {
            this.rt = this.hl;
            this.settings.drt *= -1;
        } else if (this.rt < 0) {
            this.reset();
        }
    };

    this.draw = function () {
        let newo = this.rt / this.hl;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.closePath();

        let cr = this.r * newo;
        gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, cr < this.settings.rmin ? this.settings.rmin : cr);
        gradient.addColorStop(0.0, 'rgba(255,255,255,' + newo + ')');
        gradient.addColorStop(this.stop, 'rgba(77,101,181,' + (newo * 0.6) + ')');
        gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
        context.fillStyle = gradient;
        context.fill();
    };

    this.move = function () {
        this.x += (1 - this.rt / this.hl) * this.dx;
        this.y += (1 - this.rt / this.hl) * this.dy;
        if (this.x > width || this.x < 0) this.dx *= -1;
        if (this.y > height || this.y < 0) this.dy *= -1;
    };
}

// 애니메이션 그리기 함수
function draw() {
    context.clearRect(0, 0, width, height);

    while (pixies.length < MAX_PARTICLES) {
        pixies.push(new Circle());
        pixies[pixies.length - 1].reset();
    }

    for (let i = 0; i < pixies.length; i++) {
        pixies[i].fade();
        pixies[i].move();
        pixies[i].draw();
    }
}

setInterval(draw, DRAW_INTERVAL);