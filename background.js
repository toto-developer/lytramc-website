const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let fireflies = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

class Firefly {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.7 + 0.3;
    this.alphaChange = Math.random() * 0.01 + 0.005;
    this.alphaDirection = Math.random() > 0.5 ? 1 : -1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    this.alpha += this.alphaChange * this.alphaDirection;
    if (this.alpha <= 0.3 || this.alpha >= 1) this.alphaDirection *= -1;
  }
  draw() {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 10);
    gradient.addColorStop(0, `rgba(180, 255, 180, ${this.alpha})`);
    gradient.addColorStop(0.6, `rgba(180, 255, 180, 0.1)`);
    gradient.addColorStop(1, 'rgba(180, 255, 180, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  fireflies = [];
  for(let i=0; i<60; i++) {
    fireflies.push(new Firefly());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Fondo bosque oscuro (degradado vertical)
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
  bgGradient.addColorStop(0, '#001b2e'); // noche más clara arriba
  bgGradient.addColorStop(1, '#00070f'); // casi negro abajo
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  fireflies.forEach(f => {
    f.update();
    f.draw();
  });

  requestAnimationFrame(animate);
}

init();
animate();
