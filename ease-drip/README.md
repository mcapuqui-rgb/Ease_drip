# Ease Drip

Catálogo online estático de uma boutique de moda em Lubango, Angola. Apresenta
produtos para mulher, homem e criança e encaminha pedidos de informação para o
WhatsApp. Não inclui carrinho, checkout, pagamentos, contas de utilizador ou
backend.

## Executar localmente

Na pasta deste projeto, inicia um servidor HTTP:

```bash
npm start
```

O comando executa `serve` na porta `8000` via `npx`; na primeira utilização,
pode ser necessário acesso à Internet para obter a ferramenta. Em alternativa,
com Python instalado:

```bash
py -m http.server 8000
```

Abre <http://localhost:8000>. Não abras `index.html` diretamente com
`file://`.

## Funcionalidades

- Catálogo por público, categoria e subcategoria.
- Pesquisa e filtros por tamanho, cor, preço, material, marca e ocasião.
- Coleções de novidades, mais vendidos e promoções.
- Cartões de produto com galeria de imagens.
- Idiomas português e inglês e temas claro e escuro.
- Faixa de marcas animada e arrastável e slideshow de fundos no hero.
- Formulário de contacto que prepara uma mensagem e abre o WhatsApp.

## Atualizar produtos

Edita o array `products` em [`assets/js/data-products.js`](./assets/js/data-products.js).
Os valores de `cat`, `group` e `sub` devem corresponder à árvore `taxonomy` em
[`assets/js/data-categories.js`](./assets/js/data-categories.js). Os valores de
`materials` e `occasions` devem existir em `MATERIALS` e `OCCASIONS` nesse
ficheiro.

Cada produto tem nome e descrição em `pt` e `en`, preço, tamanhos, cores,
materiais, ocasiões, coleções e imagens. `priceValue` é o valor numérico usado
no filtro de preço; `oldPrice` faz o produto aparecer também em Promoções;
`also` permite apresentá-lo noutras categorias. As imagens usam caminhos
relativos à raiz do site, como `assets/images/products/produto-1.webp`.

## Imagens e configurações

- Fotografias de produtos: `assets/images/products/`.
- Logótipos: `assets/images/logos/`, configurados no array `brands` em
  [`assets/js/brands-render.js`](./assets/js/brands-render.js).
- Imagens do hero: array `HERO_IMAGES` em
  [`assets/js/config.js`](./assets/js/config.js). `HERO_INTERVAL_MS` define o
  intervalo e `HERO_FADE_MS` a duração da transição.
- Número de WhatsApp: constante `WHATSAPP` em `assets/js/config.js`, com
  indicativo do país e número, sem `+`, espaços ou pontuação.

Confirma os nomes e a capitalização dos caminhos: alojamentos Linux distinguem
maiúsculas de minúsculas. O HTML referencia `assets/images/favicon.png`, mas
esse ficheiro não está incluído atualmente.

## Publicar

Publica o conteúdo completo desta pasta num alojamento estático, mantendo
`index.html` na raiz junto da pasta `assets/`. Não é necessário compilar o
projeto. Antes da publicação, testa os recursos, filtros, idiomas, temas,
galerias e contactos; revê os dados dos produtos e as informações legais
adequadas à atividade.

O HTML carrega os scripts diretamente, não como módulos ES. Mantém a ordem das
tags `<script>` no fim de `index.html`. Não há testes automatizados
configurados atualmente.
