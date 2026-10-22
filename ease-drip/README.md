# Ease Drip — Boutique Online

Site institucional/loja da Ease Drip. Site estático (HTML + CSS + JavaScript puro,
sem frameworks nem passo de build), pronto para hospedar em qualquer serviço
de alojamento estático.

## Estrutura do projeto

```
ease-drip/
├── index.html                  ← página única (single-page site)
├── README.md
├── .gitignore
├── package.json                ← apenas para correr um servidor local de testes
└── assets/
    ├── css/
    │   └── style.css           ← todo o estilo do site (tema claro/escuro incluído)
    ├── js/
    │   ├── config.js           ← número de WhatsApp e estado global (idioma, etc.)
    │   ├── data-categories.js  ← árvore de categorias, coleções, materiais e ocasiões
    │   ├── data-products.js    ← catálogo de produtos (cada um com cat/group/sub)
    │   ├── render.js           ← categorias, coleções, filtros, grelha e modal de produto
    │   ├── language.js         ← alternância PT/EN
    │   ├── theme.js            ← alternância tema claro/escuro
    │   ├── nav.js               ← menu mobile + destaque do menu ao fazer scroll
    │   ├── contact.js          ← formulário de contacto (envia para WhatsApp)
    │   ├── brands-render.js    ← lista de marcas + construção da faixa de logótipos
    │   ├── ui-feedback.js      ← toasts e animação de entrada dos cartões
    │   ├── hero-slider.js      ← rotação automática das imagens do hero (crossfade)
    │   ├── init.js             ← arranque da página (chama as funções acima)
    │   ├── brands-carousel.js  ← faixa de marcas: velocidade suave + arrasto
    │   └── search.js           ← pesquisa de produtos
    └── images/                 ← (não incluída neste pacote — mantém a tua cópia local)
        ├── logos/               ← logótipos das marcas (referenciados em brands-render.js)
        ├── products/            ← fotos dos produtos (referenciadas em data-products.js)
        └── background/          ← imagem de fundo da secção principal (hero)
```

Os ficheiros JavaScript são carregados por ordem no `index.html` (não são
módulos ES) — se adicionares um novo ficheiro, garante que o `<script>` fica
na posição certa (dados/funções antes de quem as usa).

## Categorias, filtros e coleções

**Árvore** (em `data-categories.js`): Mulher · Homem · Moda Infantil → grupo
(Vestuário / Calçado / Acessórios; Menina / Menino / Calçado infantil) →
subcategoria. Para acrescentar uma subcategoria basta juntar uma linha.

**Produto** (em `data-products.js`) — campos novos:

```js
{cat:'homem', group:'vestuario', sub:'camisas',   // onde aparece na loja
 also:[{cat:'mulher', group:'acessorios', sub:'cintos'}], // opcional: aparece também noutro sítio
 priceValue: 12000,        // número, para o filtro de Preço (null = "A consultar")
 price: '12 000 Kz',       // texto mostrado no cartão
 oldPrice: '15 000 Kz',    // opcional — o produto entra sozinho em "Promoções"
 materials:['algodao'],    // chaves de MATERIALS
 occasions:['casual'],     // chaves de OCCASIONS
 collections:['novidades','mais-vendidos'], // coleções
 sizes:[...], colors:[...], brand:'...', ...}
```

**Filtros** (Tamanho, Cor, Preço, Material, Marca, Ocasião): são gerados
automaticamente a partir dos produtos da categoria aberta — só aparecem
opções que existem. O filtro de Preço fica inativo até haver `priceValue`.

**Coleções** (Novidades, Mais vendidos, Promoções): ficam vazias até marcares
produtos reais em `collections`. Categorias sem produtos mostram "Brevemente".

**Produtos sem lugar na nova árvore** (meias, gravatas, roupa interior, bebé…)
estão guardados em `productsSemCategoria` no fim do bloco de dados e não
aparecem na loja.

## Imagens rotativas do hero

Em `assets/js/config.js`, acrescenta caminhos ao array `HERO_IMAGES`
(`HERO_INTERVAL_MS` = tempo por imagem, `HERO_FADE_MS` = duração da fusão).
A transição só anima a opacidade — sem zoom nem blur — por isso não perde
qualidade. Usa imagens ≥ 1920×1080 em WebP/JPG. Respeita
`prefers-reduced-motion` e pára quando o separador está em segundo plano.

## Como testar localmente

Qualquer servidor estático serve. Duas opções simples:

```bash
# Opção 1 — com Node instalado
npm start

# Opção 2 — com Python instalado
python3 -m http.server 8000
```

Depois abre `http://localhost:8000` (ou a porta que o `npm start` indicar).
Não abras o `index.html` diretamente com duplo-clique (`file://...`) — alguns
browsers bloqueiam pedidos a ficheiros locais e o site não carrega bem.

## Configuração antes de publicar

1. **Número de WhatsApp** — em `assets/js/config.js`, substitui
   `'244900000000'` pelo número real da loja (com indicativo do país, sem
   espaços nem `+`).
2. **Produtos reais** — em `assets/js/data-products.js`, substitui as
   descrições/preços de exemplo pelos produtos reais. Cada produto tem um
   campo `images: []`; coloca aí os caminhos das fotos, por exemplo:
   `images: ['assets/images/products/tshirt-nike-branca-1.jpg']`.
3. **Fotos dos produtos** — usa imagens otimizadas para a web (formato
   `.webp` ou `.jpg` comprimido, idealmente < 200 KB cada) para o site
   carregar rápido em ligações móveis mais lentas.
4. **Logótipos das marcas** — coloca os ficheiros em
   `assets/images/logos/` com o nome exato usado em
   `assets/js/brands-render.js`. Confirma que tens autorização/licença para
   usar cada logótipo.
5. **Favicon** — coloca um `favicon.png` (ou `.ico`) em `assets/images/` (já
   está referenciado no `<head>` do `index.html`).

## Antes de considerar isto "pronto para produção"

- [ ] Substituir todos os produtos/preços de exemplo por dados reais.
- [ ] Confirmar direitos de uso de todas as imagens (fotos de produto e
      logótipos de marcas).
- [ ] Adicionar página de **Política de Privacidade** e **Termos & Condições**
      (recomendado para qualquer loja online, mesmo sem checkout próprio).
- [ ] Adicionar política de trocas/devoluções, já que as vendas fecham via
      WhatsApp.
- [ ] Comprar um domínio próprio e publicar com HTTPS (ver secção seguinte).
- [ ] Testar em telemóvel real (iOS e Android), não só no browser do
      computador.
- [ ] Verificar todos os `alt=""` das imagens de produto quando as fotos
      reais forem adicionadas (acessibilidade e SEO).
- [ ] Considerar analytics (ex. Google Analytics / Meta Pixel) se quiseres
      medir visitas e conversões — não incluído por defeito, por privacidade.

## Publicar o site (hosting)

Por ser 100% estático, podes publicar em qualquer um destes serviços,
arrastando a pasta ou ligando a um repositório Git:

- **Netlify** ou **Vercel** — grátis, HTTPS automático, muito simples.
- **GitHub Pages** — grátis, ideal se já usas Git/GitHub.
- Qualquer alojamento cPanel/FTP tradicional — basta enviar a pasta inteira.

Recomenda-se usar Git desde já (`git init`) para teres histórico de
alterações e poderes reverter facilmente se algo correr mal.
