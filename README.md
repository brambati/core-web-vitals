# Core Web Vitals: do 30 ao 98

Código do vídeo **"Core Web Vitals na Prática"** do canal da [Digital Lift](https://digitallift.com.br).

Uma página de exemplo com os fixes de **LCP**, **CLS** e **INP** aplicados e comentados, mais o [checklist completo](CHECKLIST.md).

## Como rodar

É HTML, CSS e JavaScript puros. Sirva a pasta com qualquer servidor estático:

```bash
npx serve .
```

Depois rode o Lighthouse (DevTools → Lighthouse → Mobile) em uma janela anônima e abra o console para ver as métricas medidas pela biblioteca `web-vitals`.

## Os fixes

| Métrica | Fix | Onde |
|---|---|---|
| LCP | `fetchpriority="high"` na imagem hero | `index.html` |
| LCP | `<link rel="preload" as="image">` | `index.html` |
| LCP | imagens em WebP | `hero.webp`, `foto.webp` |
| LCP | `&display=swap` no Google Fonts | `index.html` |
| CLS | `width` e `height` em todas as imagens | `index.html` |
| CLS | `aspect-ratio: 16 / 9` no container do iframe | `style.css` |
| CLS | altura mínima reservada para o mapa | `style.css` |
| INP | `debounce` de 300 ms na busca | `script.js` |
| INP | terceiros carregados com IntersectionObserver | `script.js` |
| INP | long task dividida com `scheduler.yield()` / `setTimeout(0)` | `script.js` |

## Arquivos

- `index.html`: a página com todos os fixes comentados
- `style.css`: estilos, incluindo as reservas de espaço contra CLS
- `script.js`: debounce, carregamento sob demanda, long tasks e medição com `web-vitals`
- `CHECKLIST.md`: checklist completo para usar nos seus projetos
