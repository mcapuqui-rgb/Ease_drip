# Ease Drip — Boutique Online

Site estático da Ease Drip, apresentada no site como uma boutique de moda
associada a Lubango, Angola. O catálogo mostra produtos para mulher, homem e
criança e encaminha pedidos de informação para o WhatsApp.

O projeto usa HTML, CSS e JavaScript, sem framework ou processo de compilação.
Não tem carrinho, checkout, pagamentos, contas de utilizador ou backend.

## Índice

1. [Executar localmente](#executar-localmente)
2. [Funcionalidades](#funcionalidades)
3. [Estrutura do projeto](#estrutura-do-projeto)
4. [Gerir produtos](#gerir-produtos)
5. [Imagens, marcas e hero](#imagens-marcas-e-hero)
6. [Contacto via WhatsApp](#contacto-via-whatsapp)
7. [Publicação no GitHub Pages](#publicação-no-github-pages)
8. [Conteúdo comercial a validar](#conteúdo-comercial-a-validar)
9. [Antes de publicar](#antes-de-publicar)

## Executar localmente

O site e o `package.json` estão na pasta `ease-drip/`. Abre um terminal na
raiz do repositório e executa:

```bash
cd ease-drip
npm start
```

O comando executa `serve` na porta `8000` através de `npx`. Na primeira
execução, pode ser necessário acesso à Internet para obter essa ferramenta.
Em alternativa, inicia um servidor Python na mesma pasta:

```bash
# Linux/macOS
python3 -m http.server 8000

# Windows
py -m http.server 8000
```

Abre <http://localhost:8000>. Usa um servidor HTTP em vez de abrir
`index.html` diretamente com `file://`.

## Funcionalidades

- Página única com navegação, hero, apresentação, estatísticas, faixa de
  marcas, loja, contacto e rodapé.
- Loja organizada por público, grupo e subcategoria.
- Pesquisa e filtros por tamanho, cor, preço, material, marca e ocasião.
- Coleções de novidades, mais vendidos e promoções.
- Cartões de produto com galeria de imagens.
- Interface em português e inglês. A escolha do idioma não fica guardada
  entre visitas.
- Tema claro e escuro. A escolha do tema fica guardada em `localStorage`.
- Faixa animada e arrastável de logótipos e slideshow de fundos no hero. O
  slideshow desativa a transição visual quando o sistema prefere movimento
  reduzido.
- Formulário e botões que preparam uma mensagem e abrem o WhatsApp.

O site usa scripts clássicos carregados diretamente por `index.html`, não
módulos ES. Como partilham variáveis globais, mantém a ordem das tags
`<script>`; os dados e as funções devem carregar antes dos scripts que os usam.

## Estrutura do projeto

```text
ease-drip/
├── index.html
├── package.json
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── images/
    │   ├── Background/       # Fundos do hero
    │   ├── logos/            # Logótipos apresentados
    │   └── products/         # Fotografias dos produtos
    └── js/
        ├── config.js           # WhatsApp e configuração do hero
        ├── data-categories.js  # Categorias, coleções e opções dos filtros
        ├── data-products.js    # Catálogo e links de marcas/produtos
        ├── render.js           # Loja, filtros, cartões e modal
        ├── language.js         # Idiomas
        ├── theme.js            # Tema
        ├── nav.js              # Navegação e menu móvel
        ├── contact.js          # Formulário de WhatsApp
        ├── brands-render.js    # Lista e construção da faixa de marcas
        ├── brands-carousel.js  # Movimento e arrasto da faixa
        ├── ui-feedback.js      # Animações e notificações
        ├── init.js             # Inicialização da página
        ├── search.js           # Pesquisa
        └── hero-slider.js      # Slideshow do hero
```

Os caminhos `assets/...` usados no código são relativos à raiz publicada do
site, isto é, à pasta `ease-drip/`. Há imagens versionadas em
`ease-drip/assets/images/`. O HTML referencia `assets/images/favicon.png`, mas
esse ficheiro não está atualmente presente.

## Gerir produtos

Os produtos apresentados estão no array `products`, em
[`ease-drip/assets/js/data-products.js`](./ease-drip/assets/js/data-products.js).
A ordem dos objetos define a ordem dos produtos na loja. Para adicionar um
produto, copia um bloco existente e atualiza os campos.

```js
{
  cat: 'homem',
  group: 'vestuario',
  sub: 'camisas',
  brand: 'Zara',
  name: { pt: 'Camisa Oxford', en: 'Oxford Shirt' },
  desc: {
    pt: 'Camisa de algodão para ocasiões formais e casuais.',
    en: 'Cotton shirt for formal and casual occasions.'
  },
  price: '12 000 Kz',
  priceValue: 12000,
  sizes: ['S', 'M', 'L'],
  colors: ['Branco', 'Azul'],
  materials: ['algodao'],
  occasions: ['casual', 'formal'],
  collections: ['novidades'],
  images: ['assets/images/products/zara-camisa-oxford-1.webp']
}
```

| Campo | Notas |
| --- | --- |
| `cat`, `group`, `sub` | Devem corresponder à árvore `taxonomy` em `data-categories.js`. |
| `brand` | Usado para identificar a marca. Para disponibilizar um link externo, adiciona a marca a `officialBrandLinks`. Sem link configurado, o código usa `#`. |
| `name`, `desc` | Objetos com valores `pt` e `en`. |
| `price` | Texto apresentado, por exemplo `'12 000 Kz'` ou `'A consultar'`. |
| `priceValue` | Número usado pelo filtro de preço. Sem valor numérico, o produto é excluído quando esse filtro está ativo. |
| `oldPrice` | Opcional. É apresentado riscado e inclui o produto em Promoções. |
| `sizes` | Obrigatório; o modal chama `.map()` nesta lista. Usa `[]` se não aplicável. |
| `colors` | Lista de cores apresentada nos detalhes e usada nos filtros. |
| `materials`, `occasions` | Chaves definidas em `MATERIALS` e `OCCASIONS` em `data-categories.js`. |
| `collections` | Aceita `novidades`, `mais-vendidos` e `promocoes`. Uma lista vazia não coloca o produto numa coleção, exceto Promoções quando tem `oldPrice`. |
| `also` | Opcional. Lista de `{cat, group, sub}` para apresentar o produto noutras categorias. |
| `images` | Caminhos relativos à raiz do site. A primeira imagem é a miniatura; as imagens são usadas na galeria. |

As opções dos filtros são construídas a partir dos produtos. Os produtos ainda
sem categoria podem ficar em `productsSemCategoria`; não são apresentados até
serem categorizados e movidos para `products`.

`officialBrandLinks` associa marcas a sites externos; `officialProductLinks`
guarda links para produtos concretos. Esses links não comprovam que a loja seja
revendedora autorizada.

## Imagens, marcas e hero

- Guarda fotografias de produtos em `ease-drip/assets/images/products/` e
  referencia-as no catálogo com caminhos como
  `assets/images/products/produto-1.webp`.
- Os logótipos são definidos no array `brands`, em
  [`ease-drip/assets/js/brands-render.js`](./ease-drip/assets/js/brands-render.js).
- Os fundos do hero são definidos no array `HERO_IMAGES`, em
  [`ease-drip/assets/js/config.js`](./ease-drip/assets/js/config.js).
  `HERO_INTERVAL_MS` controla o intervalo e `HERO_FADE_MS` a duração da
  transição.
- A imagem inicial do hero também está definida em
  `ease-drip/assets/css/style.css`, na regra `.hero-bg`. Se alterares
  `HERO_IMAGES[0]`, atualiza o caminho no CSS.

Confirma nomes, extensões e maiúsculas/minúsculas dos caminhos. O GitHub Pages
corre em Linux, onde `Nike.webp` e `nike.webp`, ou `Background/` e
`background/`, são caminhos diferentes. Prefere imagens WebP otimizadas e
confirma que tens autorização para usar as fotografias e os logótipos.

## Contacto via WhatsApp

O número usado pelo formulário, pelos botões e pelo telefone visível na página
é a constante `WHATSAPP`, em `ease-drip/assets/js/config.js`. Usa o indicativo
do país e o número sem `+`, espaços ou pontuação, por exemplo `244900000000`.
O número é apresentado na página e fica visível no código-fonte.

O formulário abre `wa.me` com uma mensagem preenchida; não envia nem guarda
dados num servidor.

## Publicação no GitHub Pages

O projeto não precisa de compilação. O `index.html` deve ficar na raiz do site
publicado. Na estrutura atual, está em `ease-drip/`, por isso o GitHub Pages
configurado para publicar diretamente a raiz do repositório não encontrará
esse ficheiro. Usa GitHub Actions para publicar a pasta `ease-drip/`.

Em **Settings → Pages**, escolhe **GitHub Actions** como fonte e cria
`.github/workflows/pages.yml` na raiz do repositório:

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/checkout@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ease-drip
      - uses: actions/deploy-pages@v4
```

Confirma que o nome da branch no workflow corresponde à branch usada pelo
repositório. Depois do primeiro deploy, verifica a consola do browser e procura
erros 404, muitas vezes causados por imagens em falta ou por capitalização
incorreta.

## Conteúdo comercial a validar

O código contém textos, dados e imagens de produtos que não são comprovados
apenas por estarem no site. Antes da publicação, o responsável pela loja deve
confirmar:

- Os dados de contacto e a localização apresentados. O site associa a marca a
  Lubango, mas a morada e o horário não estão publicados atualmente.
- Preços, descrições, materiais, disponibilidade e demais alegações sobre cada
  produto em `data-products.js`.
- A autorização para vender os produtos e utilizar marcas, fotografias e
  logótipos. Os links para sites oficiais não demonstram autorização de
  revenda.
- As estatísticas apresentadas: a contagem de produtos é atualizada por
  `init.js`; a contagem de logótipos também é calculada a partir de `brands`;
  o número de categorias é fixo no HTML.

## Antes de publicar

- [ ] As imagens necessárias estão versionadas e os caminhos têm a
      capitalização correta.
- [ ] Adiciona `ease-drip/assets/images/favicon.png` ou atualiza a referência
      no `<head>` de `index.html`.
- [ ] Pesquisa, filtros, idioma, tema, cartões e galerias foram testados.
- [ ] Todos os produtos têm `sizes`, mesmo que o valor seja `[]`.
- [ ] O número de WhatsApp e o formulário foram testados, incluindo num
      telemóvel.
- [ ] O responsável confirmou o conteúdo comercial e as autorizações de uso.
- [ ] Preços, descrições e disponibilidade foram revistos.
- [ ] As informações legais adequadas à atividade foram preparadas.

Não há testes automatizados configurados atualmente.
