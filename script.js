// ─────────────────────────────────────────────
// Core Web Vitals: fixes de INP + medição real
// ─────────────────────────────────────────────

// 1. Medir com a biblioteca oficial do Google (web-vitals)
import { onLCP, onCLS, onINP } from 'https://unpkg.com/web-vitals@4?module';

onLCP(({ value }) => console.log('LCP:', Math.round(value), 'ms'));
onCLS(({ value }) => console.log('CLS:', value.toFixed(3)));
onINP(({ value }) => console.log('INP:', Math.round(value), 'ms'));

// 2. DEBOUNCE: só executa depois de 300 ms sem digitar
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const TECNICAS = [
  'fetchpriority="high"', 'link rel="preload"', 'WebP', 'font-display: swap',
  'font-display: optional', 'width e height', 'aspect-ratio', 'debounce',
  'defer', 'IntersectionObserver', 'setTimeout(0)', 'scheduler.yield()',
];

const busca = document.getElementById('search');
const lista = document.getElementById('resultados');
const contador = document.getElementById('buscas');
let buscas = 0;

function buscar(termo) {
  contador.textContent = ++buscas;
  const t = termo.trim().toLowerCase();
  lista.innerHTML = t
    ? TECNICAS.filter((x) => x.toLowerCase().includes(t)).map((x) => `<li>${x}</li>`).join('')
    : '';
}

busca.addEventListener('input', debounce((e) => buscar(e.target.value), 300));

// 3. TERCEIROS SOB DEMANDA: carrega só quando a área chega perto da tela
function carregarQuandoVisivel(seletor, carregar) {
  const el = document.querySelector(seletor);
  if (!el) return;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      carregar(el);
      observer.disconnect();
    }
  }, { rootMargin: '200px' });
  observer.observe(el);
}

carregarQuandoVisivel('#mapa', (el) => {
  // aqui entraria o <script> do Google Maps, do chat etc.
  el.textContent = 'Mapa carregado agora, só quando foi preciso.';
  el.classList.add('carregado');
});

// 4. LONG TASKS: divide o trabalho em pedaços menores que 50 ms
const ceder = () =>
  globalThis.scheduler?.yield?.() ?? new Promise((r) => setTimeout(r, 0));

function processar(n) {
  let x = 0;
  for (let i = 0; i < 2000; i++) x += Math.sqrt(n * i);
  return x;
}

async function processarLista(items, aoAvancar) {
  for (let i = 0; i < items.length; i += 100) {
    items.slice(i, i + 100).forEach(processar);
    aoAvancar(Math.min(i + 100, items.length));
    await ceder(); // cede a vez: o browser responde aos cliques
  }
}

const status = document.getElementById('status');
document.getElementById('processar').addEventListener('click', async () => {
  const itens = Array.from({ length: 20000 }, (_, i) => i);
  const t0 = performance.now();
  await processarLista(itens, (feitos) => { status.textContent = `Processados: ${feitos.toLocaleString('pt-BR')}`; });
  status.textContent = `Pronto: 20.000 itens em ${Math.round(performance.now() - t0)} ms, sem travar a página.`;
});
