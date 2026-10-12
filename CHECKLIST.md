# Checklist de Core Web Vitals

Metas do Google (percentil 75 das visitas reais):

| Métrica | Bom | Precisa melhorar | Ruim |
|---|---|---|---|
| **LCP** · Largest Contentful Paint | ≤ 2,5 s | até 4 s | > 4 s |
| **CLS** · Cumulative Layout Shift | ≤ 0,1 | até 0,25 | > 0,25 |
| **INP** · Interaction to Next Paint | ≤ 200 ms | até 500 ms | > 500 ms |

## LCP
- [ ] `fetchpriority="high"` na imagem hero (o maior elemento visível)
- [ ] `<link rel="preload" as="image">` para a imagem acima da dobra
- [ ] Imagens em WebP ou AVIF ([squoosh.app](https://squoosh.app))
- [ ] `font-display: swap` (no `@font-face` ou `&display=swap` no Google Fonts)
- [ ] Nunca usar `loading="lazy"` na imagem hero

## CLS
- [ ] `width` e `height` em todas as `<img>`, mesmo com CSS responsivo
- [ ] `aspect-ratio` ou altura mínima em iframes, embeds e anúncios
- [ ] `font-display: optional` para fontes de texto de corpo
- [ ] Nada de conteúdo injetado acima do que já está na tela

## INP
- [ ] `debounce` em inputs de busca e handlers de scroll/resize
- [ ] Scripts de terceiros com `defer`, `async` ou carregados por IntersectionObserver
- [ ] Tasks longas (> 50 ms) divididas com `setTimeout(0)` ou `scheduler.yield()`

## Medir
- [ ] Lighthouse no Chrome DevTools, em janela anônima e no modo mobile
- [ ] [PageSpeed Insights](https://pagespeed.web.dev) para dados de usuários reais
- [ ] Biblioteca [`web-vitals`](https://github.com/GoogleChrome/web-vitals) em produção
