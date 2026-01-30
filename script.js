// Animação de céu noturno 8bit (estrelas piscando)
const canvas = document.getElementById('ceu-noturno');
const ctx = canvas.getContext('2d');
const w = canvas.width;
const h = canvas.height;


// Estrelas piscando mais lentamente
const estrelas = Array.from({ length: 120 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h * 0.7,
  r: Math.random() * 1.5 + 0.5,
  alpha: Math.random(),
  speed: Math.random() * 0.006 + 0.003 // valores menores para piscar mais devagar
}));

function desenhaCeuNoturno() {
  ctx.fillStyle = '#181d2b';
  ctx.fillRect(0, 0, w, h);
  estrelas.forEach(e => {
    ctx.save();
    ctx.globalAlpha = 0.5 + 0.5 * Math.sin(Date.now() * e.speed + e.x);
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  });
}

// Desenhar a lua (8bit)
function desenhaLua() {
  // Posição e tamanho da lua
  const x = w * 0.8;
  const y = h * 0.18;
  const raio = 60;
  // Lua cheia
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, raio, 0, 2 * Math.PI);
  ctx.fillStyle = '#f8f8e8';
  ctx.shadowColor = '#fffbe6';
  ctx.shadowBlur = 30;
  ctx.globalAlpha = 0.95;
  ctx.fill();
  ctx.restore();
  // Crateras (estilo pixel)
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + Math.random() * raio * 0.8 - raio * 0.4, y + Math.random() * raio * 0.8 - raio * 0.4, Math.random() * 7 + 3, 0, 2 * Math.PI);
    ctx.fillStyle = '#e0e0c0';
    ctx.globalAlpha = 0.3;
    ctx.fill();
    ctx.restore();
  }
}

function animar() {
  desenhaCeuNoturno();
  desenhaLua();
  requestAnimationFrame(animar);
}

animar();
