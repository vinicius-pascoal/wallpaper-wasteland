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


// Personagens disponíveis e suas animações

const personagens = [
  {
    nome: 'Dalmatian',
    pasta: 'animations/Dalmatian/animations/running-6-frames',
    frames: {
      east: [
        'frame_000.png', 'frame_001.png', 'frame_002.png', 'frame_003.png', 'frame_004.png', 'frame_005.png'
      ]
    }
  },
  {
    nome: 'whastelander',
    pasta: 'animations/whastelander/animations/scary-walk',
    frames: {
      east: [
        'frame_000.png', 'frame_001.png', 'frame_002.png', 'frame_003.png', 'frame_004.png', 'frame_005.png', 'frame_006.png', 'frame_007.png'
      ]
    }
  },
  {
    nome: 'zombie',
    pasta: 'animations/zombie/animations/walking',
    frames: {
      east: [
        'frame_000.png', 'frame_001.png', 'frame_002.png', 'frame_003.png', 'frame_004.png', 'frame_005.png'
      ]
    }
  }
];

// Container para personagens animados

let containerPersonagens = document.getElementById('personagens-container');
if (!containerPersonagens) {
  containerPersonagens = document.createElement('div');
  containerPersonagens.id = 'personagens-container';
  containerPersonagens.style.position = 'absolute';
  containerPersonagens.style.top = '0';
  containerPersonagens.style.left = '0';
  containerPersonagens.style.width = '100vw';
  containerPersonagens.style.height = '100vh';
  containerPersonagens.style.pointerEvents = 'none';
  containerPersonagens.style.zIndex = '20';
  document.querySelector('.wallpaper').appendChild(containerPersonagens);
}

// Controle de instância única para Dalmatian e whastelander
let dalmatianNaTela = false;
let whastelanderNaTela = false;



function spawnPersonagem() {
  // Escolhe personagem e direção aleatória
  const personagem = personagens[Math.floor(Math.random() * personagens.length)];
  // Controle de instância única para Dalmatian e whastelander
  if (personagem.nome === 'Dalmatian' && dalmatianNaTela) return;
  if (personagem.nome === 'whastelander' && whastelanderNaTela) return;

  const direcao = 'east'; // só há frames east disponíveis
  const frames = personagem.frames[direcao];
  const pasta = `${personagem.pasta}/${direcao}`;
  // Posição inicial e final (1/3 inferior da tela)
  const minY = window.innerHeight * (2 / 3);
  const maxY = window.innerHeight * (0.95);
  const y = Math.random() * (maxY - minY) + minY;
  const startX = direcao === 'east' ? -120 : window.innerWidth + 120;
  const endX = direcao === 'east' ? window.innerWidth + 120 : -120;
  // Cria elemento
  const el = document.createElement('img');
  el.src = `${pasta}/${frames[0]}`;
  el.style.position = 'absolute';
  el.style.top = `${y}px`;
  el.style.left = `${startX}px`;
  el.style.height = '120px';
  el.style.width = 'auto';
  el.style.zIndex = '21';
  el.style.pointerEvents = 'none';
  containerPersonagens.appendChild(el);

  // Marca personagem na tela
  if (personagem.nome === 'Dalmatian') dalmatianNaTela = true;
  if (personagem.nome === 'whastelander') whastelanderNaTela = true;

  // Animação de movimento e troca de frames
  let x = startX;
  const velocidade = 2 + Math.random() * 2; // px/frame
  let frameIdx = 0;
  function mover() {
    if ((direcao === 'east' && x < endX) || (direcao === 'west' && x > endX)) {
      x += direcao === 'east' ? velocidade : -velocidade;
      el.style.left = `${x}px`;
      // Troca de frame para animação suave
      frameIdx = (frameIdx + 1) % frames.length;
      el.src = `${pasta}/${frames[frameIdx]}`;
      setTimeout(() => requestAnimationFrame(mover), 80); // ~12fps
    } else {
      el.remove();
      // Libera instância única
      if (personagem.nome === 'Dalmatian') dalmatianNaTela = false;
      if (personagem.nome === 'whastelander') whastelanderNaTela = false;
    }
  }
  mover();
}

// Spawner de personagens aleatórios
setInterval(() => {
  // 50% de chance de spawnar um personagem a cada 2s
  if (Math.random() < 0.5) spawnPersonagem();
}, 2000);

function animar() {
  desenhaCeuNoturno();
  desenhaLua();
  requestAnimationFrame(animar);
}

animar();
