
  // COUNTDOWN TIMER
  function updateCountdown() {
    const wedding = new Date('2026-07-03T00:00:00');
    const now = new Date();
    const diff = wedding - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '0';
      document.getElementById('cd-hours').textContent = '0';
      document.getElementById('cd-mins').textContent = '0';
      document.getElementById('cd-secs').textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // FALLING PETALS
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const petalColors = ['#F2C4CE', '#E8A0B0', '#FFD6DF', '#FFC0CB', '#F8D7DA', '#B5C9B7'];

  class Petal {
    constructor() { this.reset(); }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.size = Math.random() * 8 + 5;
      this.speedY = Math.random() * 1.2 + 0.4;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.04;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.03 + 0.01;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    update() {
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.5;
      this.y += this.speedY;
      this.rotation += this.rotSpeed;

      if (this.y > canvas.height + 20) this.reset();
    }
  }
  const music = document.getElementById('bg-music');
const btn = document.getElementById('music-btn');

// start as unmuted icon
btn.textContent = '🔇';

document.addEventListener('DOMContentLoaded', () => {
  music.play().catch(() => {
    document.body.addEventListener('click', () => {
      music.play();
      btn.textContent = '🔊';
    }, { once: true });
  });
});

function toggleMusic() {
  if (music.paused) {
    music.play();
    btn.textContent = '🔊';
  } else {
    music.pause();
    btn.textContent = '🔇';
  }
}

  const petals = Array.from({ length: 35 }, () => new Petal());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  animate();
