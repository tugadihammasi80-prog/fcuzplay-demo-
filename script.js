// Tab o‘zgartirish
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ⚽ Futbol demo
let running = false;
let scoreA = 0;
let scoreB = 0;
const ball = document.getElementById('ball');
const score = document.getElementById('score');

document.getElementById('start-football').onclick = () => {
  running = true;
  moveBall();
};
document.getElementById('stop-football').onclick = () => running = false;
document.getElementById('reset-football').onclick = () => {
  scoreA = 0; scoreB = 0;
  score.textContent = "Hisob: 0 : 0";
};

function moveBall() {
  if (!running) return;
  const pitch = document.querySelector('.pitch');
  const x = Math.random() * (pitch.offsetWidth - 40);
  const y = Math.random() * (pitch.offsetHeight - 40);
  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;

  if (Math.random() > 0.8) {
    if (Math.random() > 0.5) scoreA++; else scoreB++;
    score.textContent = `Hisob: ${scoreA} : ${scoreB}`;
  }
  setTimeout(moveBall, 800);
}

// 🛩 Aviator demo
let plane = document.getElementById('plane');
let mult = document.getElementById('multiplier');
let aviStatus = document.getElementById('aviator-status');
let fly = false;
let x = 10, y = 80, m = 1.0;
let timer;

document.getElementById('start-aviator').onclick = () => {
  if (fly) return;
  fly = true;
  aviStatus.textContent = "Samolyot uchmoqda...";
  m = 1.0;
  x = 10;
  y = 80;
  timer = setInterval(() => {
    m += 0.1;
    x += 3;
    y -= 0.5;
    if (y < 10) y = 10;
    plane.style.left = x + "px";
    plane.style.top = y + "%";
    mult.textContent = "x" + m.toFixed(2);
    if (m >= Math.random() * 20 + 2) crashPlane();
  }, 150);
};

document.getElementById('cashout').onclick = () => {
  if (!fly) return;
  aviStatus.textContent = "Pul yechildi! Mult: " + mult.textContent;
  stopPlane();
};

function crashPlane() {
  aviStatus.textContent = "Samolyot qulab tushdi! 😢";
  stopPlane();
}
function stopPlane() {
  fly = false;
  clearInterval(timer);
  plane.style.left = "10px";
  plane.style.top = "80%";
}