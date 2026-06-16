// ===== MUSIC =====
const music = document.getElementById('bg-music');
const btn = document.getElementById('music-btn');

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

// Stop music when tab hidden / home button
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    music.pause();
    btn.textContent = '🔇';
  } else {
    music.play();
    btn.textContent = '🔊';
  }
});

// Stop when maps button clicked
const mapBtn = document.querySelector('.map-btn');
if (mapBtn) {
  mapBtn.addEventListener('click', () => {
    music.pause();
    btn.textContent = '🔇';
  });
}

// Stop when closing page
window.addEventListener('pagehide', () => {
  music.pause();
});


// ===== COUNTDOWN TIMER =====
function updateCountdown() {
  const wedding = new Date('2026-07-03T00:00:00');
  const now = new Date();
  const diff = wedding - now;

  if (diff <= 0) {
    ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent  = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent  = String(mins).padStart(2,'0');
  document.getElementById('cd-secs').textContent  = String(secs).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ===== HERO PHOTO FADE ON SCROLL =====
const heroImg = document.getElementById('hero-img');
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroHeight = hero.offsetHeight;
  const fadeStart = heroHeight * 0.3;
  const fadeEnd = heroHeight * 0.85;

  if (scrolled <= fadeStart) {
    heroImg.style.opacity = '1';
  } else if (scrolled >= fadeEnd) {
    heroImg.style.opacity = '0.08';
  } else {
    const progress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
    heroImg.style.opacity = 1 - (progress * 0.92);
  }
}, { passive: true });


// ===== SCROLL REVEAL FOR CARDS =====
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => observer.observe(el));


// ===== FALLING PETALS =====
const canvas = document.getElementById('petals-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const petalColors = ['#F2C4CE','#E8A0B0','#FFB6C1','#C0185A44','#F8D7DA','#FFD6DF'];

class Petal {
  constructor() { this.reset(true); }

  reset(initial = false) {
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : -20;
    this.size = Math.random() * 9 + 5;
    this.speedY = Math.random() * 1.0 + 0.4;
    this.speedX = Math.random() * 0.6 - 0.3;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.035;
    this.opacity = Math.random() * 0.55 + 0.2;
    this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.025 + 0.008;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
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

const petals = Array.from({ length: 30 }, () => new Petal());

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animatePetals);
}

animatePetals();
