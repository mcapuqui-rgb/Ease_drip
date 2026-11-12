# Ease Drip — Boutique Online

Site estático da Ease Drip, apresentada no site como uma boutique de moda
associada a Lubango, Angola. O catálogo mostra produtos para mulher, homem e
criança e encaminha pedidos de informação para o WhatsApp.

O projeto usa HTML, CSS e JavaScript, sem framework ou processo de compilação.
Não tem carrinho, checkout, pagamentos, contas de utilizador ou backend.

## Índice

1. [Executar localmente](#executar-localmente)
2. [Funcionalidades](#funcionalidades)
3. [Limitações](#limitações)
4. [Estrutura do projeto](#estrutura-do-projeto)
5. [Gerir produtos](#gerir-produtos)
6. [Imagens, marcas e hero](#imagens-marcas-e-hero)
7. [Contacto via WhatsApp](#contacto-via-whatsapp)
8. [Publicação no GitHub Pages](#publicação-no-github-pages)
9. [Conteúdo comercial a validar](#conteúdo-comercial-a-validar)
10. [Antes de publicar](#antes-de-publicar)

## Executar localmente

O `index.html` e o `package.json` estão na raiz do repositório. Executa:

```bash
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

## Limitações

- **Sem backend.** Os pedidos existem apenas como conversas de WhatsApp. Não
  há registo estruturado, estado de pedido nem stock. Funciona para um volume
  pequeno; deixa de funcionar quando houver muitos pedidos em simultâneo.
- **Catálogo editado à mão.** Todo o catálogo vive em `data-products.js`. Um
  erro de sintaxe (vírgula em falta, aspa por fechar) pode impedir a loja
  inteira de carregar, sem mensagem visível ao visitante. Ver
  [Gerir produtos](#gerir-produtos).
- **Sem testes automatizados.** A verificação é manual.
- **Disponibilidade e preços não são validados.** O site não sabe se um
  produto está em stock.

## Estrutura do projeto

```text
.
├── index.html
├── package.json
├── .gitignore
├── README.md
└── assets/
    ├── css/style.css
    ├── images/
    │   ├── Background/       # Fundos do hero
    │   ├── logos/            # Logótipos apresentados
    │   └── products/         # Fotografias dos produtos
    └── js/                   # Scripts da loja e da interface
```

Os caminhos `assets/...` usados no código são relativos à raiz do repositório,
que também é a raiz publicada do site. As imagens estão versionadas em
`assets/images/`. O projeto ainda não inclui um favicon.

## Gerir produtos

Os produtos apresentados estão no array `products`, em
[`assets/js/data-products.js`](./assets/js/data-products.js).
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
| `price` | Texto apresentado, por exemplo `'12 000 Kz'` ou `'A consultar'`. Mantém o mesmo formato em todo o catálogo. |
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

### Verificar depois de cada edição

Como não há testes automatizados, faz sempre estas duas verificações depois de
editar `data-products.js`:

```bash
node --check assets/js/data-products.js
```

Este comando só deteta erros de sintaxe (vírgulas, chavetas, aspas). Não valida
categorias nem caminhos de imagem. Depois, abre o site e confirma que a consola
do browser não mostra erros e que o produto novo aparece na categoria certa.

## Imagens, marcas e hero

- Guarda fotografias de produtos em `assets/images/products/` e
  referencia-as no catálogo com caminhos como
  `assets/images/products/produto-1.webp`.
- Os logótipos são definidos no array `brands`, em
  [`assets/js/brands-render.js`](./assets/js/brands-render.js).
- Os fundos do hero são definidos no array `HERO_IMAGES`, em
  [`assets/js/config.js`](./assets/js/config.js).
  `HERO_INTERVAL_MS` controla o intervalo e `HERO_FADE_MS` a duração da
  transição.
- A imagem inicial do hero também está definida em
  `assets/css/style.css`, na regra `.hero-bg`. Se alterares
  `HERO_IMAGES[0]`, atualiza o caminho no CSS.

### Maiúsculas e minúsculas nos caminhos

Esta é a causa mais comum de imagens que funcionam localmente e falham depois da
publicação. O Windows ignora a diferença entre `Nike.webp` e `nike.webp`; o
GitHub Pages corre em Linux e trata-os como ficheiros diferentes. O mesmo vale
para `Background/` e `background/`.

- Escreve os nomes de ficheiros e pastas sempre em minúsculas, sem espaços.
- Para renomear só a capitalização, usa `git mv` (por exemplo
  `git mv assets/images/logos/Nike.webp assets/images/logos/nike.webp`). No
  Windows, o Git pode não registar uma mudança que altere apenas
  maiúsculas/minúsculas se renomeares pelo explorador de ficheiros.
- Compara o que está no repositório com o que o código referencia:
  `git ls-files assets/images`.

Prefere imagens WebP otimizadas e confirma que tens autorização para usar as
fotografias e os logótipos.

## Contacto via WhatsApp

O número usado pelo formulário, pelos botões e pelo telefone visível na página
é a constante `WHATSAPP`, em `assets/js/config.js`. Usa o indicativo
do país e o número sem `+`, espaços ou pontuação, por exemplo `244900000000`.

O formulário abre `wa.me` com uma mensagem preenchida; não envia nem guarda
dados num servidor.

**Privacidade e spam.** O número fica visível na página e no código-fonte e
pode ser recolhido por programas automáticos. Espera mensagens indesejadas.
Se o número for pessoal, considera usar um número dedicado à loja (por exemplo,
uma conta WhatsApp Business), para não expor o teu contacto pessoal.

## Publicação no GitHub Pages

O projeto não precisa de compilação. O `index.html` e a pasta `assets/` estão
na raiz do repositório, pelo que podem ser publicados diretamente pelo GitHub
Pages sem workflow personalizado.

Em **Settings → Pages**, seleciona **Deploy from a branch**, escolhe a branch
`main` e a pasta `/(root)`, e guarda. O site do repositório deverá ficar
disponível em <https://mcapuqui-rgb.github.io/Ease_drip/>.

Os recursos usam caminhos relativos, por isso funcionam no endereço de projeto
com o prefixo `/Ease_drip/`; não acrescentes esse prefixo aos caminhos dos
ficheiros. Após ativar a publicação, verifica a consola do browser e procura
erros 404, muitas vezes causados por imagens em falta ou capitalização
incorreta.

## Conteúdo comercial a validar

O código contém textos, dados e imagens de produtos que não são comprovados
apenas por estarem no site. Antes da publicação, o responsável pela loja deve
confirmar:

- Os dados de contacto e a localização apresentados. O site associa a marca a
  Lubango, mas a morada e o horário não estão publicados atualmente.
- Preços, descrições, materiais, disponibilidade e demais alegações sobre cada
  produto em `data-products.js`.
- As estatísticas apresentadas: a contagem de produtos é atualizada por
  `init.js`; a contagem de logótipos também é calculada a partir de `brands`;
  o número de categorias é fixo no HTML.

### Marcas e fotografias de terceiros

Este é o risco mais sério do projeto, mais do que qualquer questão técnica.
Mostrar logótipos de marcas e fotografias de catálogo de terceiros sem
autorização pode levar a pedidos de remoção, reclamações junto do GitHub
(que pode retirar o conteúdo ou o repositório) ou a litígio com os titulares
dos direitos. Uma loja pequena não está protegida por ser pequena. O site também
sugere uma ligação com marcas conhecidas que pode não existir, o que agrava
o problema.

- Os links para sites oficiais não demonstram autorização de revenda.
- Se não tens autorização, usa fotografias tiradas por ti e evita logótipos
  de marcas, ou apresenta apenas o nome da marca em texto.
- Não tenho a certeza de como a lei angolana se aplica a este caso concreto.
  Se pretendes vender regularmente, consulta um advogado local.

## Antes de publicar

- [ ] `index.html` e `assets/` estão na raiz publicada; as imagens necessárias
      estão versionadas e os caminhos estão em minúsculas e coincidem com
      `git ls-files assets/images`.
- [ ] `node --check assets/js/data-products.js` não devolve erros e a consola
      do browser está limpa.
- [ ] Adiciona um favicon se quiseres que o site tenha um ícone no separador do
      browser.
- [ ] O ano do rodapé em `index.html` (atualmente `© 2025`) está atualizado.
- [ ] Pesquisa, filtros, idioma, tema, cartões e galerias foram testados.
- [ ] Todos os produtos têm `sizes`, mesmo que o valor seja `[]`.
- [ ] O número de WhatsApp e o formulário foram testados, incluindo num
      telemóvel. Decidiste se usas um número pessoal ou dedicado à loja.
- [ ] Tens autorização para usar cada marca, logótipo e fotografia, ou
      removeste o que não tens.
- [ ] Preços, descrições e disponibilidade foram revistos.
- [ ] As informações legais adequadas à atividade foram preparadas.

Não há testes automatizados configurados atualmente.
