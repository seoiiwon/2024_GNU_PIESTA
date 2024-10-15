let width = window.innerWidth;
let height = window.innerHeight;
let MAX_PARTICLES = (width * height) / 30000;  
let DRAW_INTERVAL = 60;
let canvas = document.querySelector('.starCanvas'); 
let context = canvas.getContext('2d');
let gradient = null;
let pixies = [];

function setDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
    MAX_PARTICLES = (width * height) / 25000;  
    canvas.width = width;
    canvas.height = height;
}

setDimensions();
window.addEventListener('resize', setDimensions);

function getRandomEdgePosition() {
    let edgeMargin = 0.2;
    let randX, randY;
    
    if (Math.random() < 0.5) {
        randX = Math.random() * width * edgeMargin; 
    } else {
        randX = width * (1 - Math.random() * edgeMargin);
    }

    if (Math.random() < 0.5) {
        randY = Math.random() * height * edgeMargin; 
    } else {
        randY = height * (1 - Math.random() * edgeMargin); 
    }

    return {x: randX, y: randY};
}

function Circle() {
    this.settings = {ttl: 8000, xmax: 5, ymax: 2, rmin: 5, rmax: 10, drt: 1};

    this.reset = function () {
        let pos = getRandomEdgePosition(); 
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