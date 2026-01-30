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
  // Animação: flutuação e brilho
  const tempo = Date.now() * 0.001;
  const x = w * 0.8;
  // Flutuação vertical suave
  const y = h * 0.18 + Math.sin(tempo) * 10;
  const raio = 60;
  // Brilho pulsante
  const brilho = 30 + 10 * Math.abs(Math.sin(tempo * 0.7));
  const alpha = 0.85 + 0.1 * Math.abs(Math.sin(tempo * 0.7));

  // Lua cheia
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, raio, 0, 2 * Math.PI);
  ctx.fillStyle = '#f8f8e8';
  ctx.shadowColor = '#fffbe6';
  ctx.shadowBlur = brilho;
  ctx.globalAlpha = alpha;
  ctx.fill();
  ctx.restore();

  // Crateras (estilo pixel, fixas para não "tremerem")
  const crateras = [
    { dx: -20, dy: -10, r: 8 },
    { dx: 15, dy: 5, r: 6 },
    { dx: 10, dy: -18, r: 5 },
    { dx: -8, dy: 18, r: 4 },
    { dx: 22, dy: -8, r: 7 },
    { dx: -15, dy: 15, r: 5 }
  ];
  crateras.forEach(c => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + c.dx, y + c.dy, c.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#e0e0c0';
    ctx.globalAlpha = 0.25;
    ctx.fill();
    ctx.restore();
  });
}

function animar() {
  desenhaCeuNoturno();
  desenhaLua();
  requestAnimationFrame(animar);
}

animar();
