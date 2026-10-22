@echo off
rem ===========================================================
rem  Renomeia as imagens dos produtos (Ease Drip) para o padrao marca-produto-numero
rem  COMO USAR: copia este ficheiro para a pasta das imagens
rem  (assets\images\products) e faz duplo-clique, ou executa no CMD.
rem  Ficheiros que nao existem sao ignorados; nada e apagado.
rem  O ponto de interrogacao (?) substitui letras com acento.
rem ===========================================================
cd /d "%~dp0"
echo.
echo A renomear 34 ficheiros...
echo.
call :r "Armani Exchange Classic Watch.jpg" "armani-relogio-exchange-classic-1.jpg"
call :r "Armani Exchange Classic Watch1.jpg" "armani-relogio-exchange-classic-2.jpg"
call :r "Balenciaga Speed Cap.jpg" "balenciaga-bone-speed-1.jpg"
call :r "Balenciaga Speed Cap1.jpg" "balenciaga-bone-speed-2.jpg"
call :r "Burberry Check Scarf.avif" "burberry-cachecol-xadrez-1.avif"
call :r "Cartier Love Bracelet.jpg" "cartier-pulseira-love-1.jpg"
call :r "Cartier Trinity Ring.jpg" "cartier-anel-trinity-1.jpg"
call :r "Cartier Trinity Ring 1.jpg" "cartier-anel-trinity-2.jpg"
call :r "Chanel Chain Belt.webp" "chanel-cinto-corrente-1.webp"
call :r "Daniel Wellington Classic Watch.jpg" "daniel-wellington-relogio-classic-1.jpg"
call :r "Daniel Wellington Classic Watch1.jpg" "daniel-wellington-relogio-classic-2.jpg"
call :r "Dior Oblique Cap.jpg" "dior-bone-oblique-1.jpg"
call :r "Gucci GG Leather Belt.avif" "gucci-cinto-gg-pele-1.avif"
call :r "G?rtel Double G Marmont aus Leder in Schwarz - Gucci _ Mytheresa.jpg" "gucci-cinto-gg-pele-2.jpg"
call :r "Gucci GG Running Ring.jpg" "gucci-anel-gg-running-1.jpg"
call :r "Gucci GG Running Ring1.jpg" "gucci-anel-gg-running-2.jpg"
call :r "Louis Vuitton Monogram Cap.avif" "louis-vuitton-bone-monogram-1.avif"
call :r "Nike Sportswear TEE FUTURA PLUS SIZE UNISEX.webp" "nike-t-shirt-essentials-3.webp"
call :r "Nike Sportswear TEE FUTURA PLUS SIZE UNISEX back.webp" "nike-t-shirt-essentials-4.webp"
call :r "Nike Tracksuit Bottoms.jpg" "nike-calcas-de-fato-1.jpg"
call :r "Nike Tracksuit Bottoms 1.jpg" "nike-calcas-de-fato-2.jpg"
call :r "Primark Beach Shorts 2.jpg" "primark-calcoes-praia-1.jpg"
call :r "Rolex Oyster Perpetual Watch.webp" "rolex-relogio-oyster-perpetual-1.webp"
call :r "Rolex Oyster Perpetual Watch1.webp" "rolex-relogio-oyster-perpetual-2.webp"
call :r "Swatch Originals Watch.jpg" "swatch-relogio-originals-1.jpg"
call :r "Swatch Originals Watch 1.jpg" "swatch-relogio-originals-2.jpg"
call :r "Tiffany & Co. T Wire Bracelet.jpg" "tiffany-and-co-pulseira-t-wire-1.jpg"
call :r "Tiffany & Co. T Wire Bracelet1.jpg" "tiffany-and-co-pulseira-t-wire-2.jpg"
call :r "Versace Medusa Chain Necklace1.jpg" "versace-cordao-medusa-1.jpg"
call :r "Vestido Midi Elegante2.jpg" "dior-vestido-midi-elegante-4.jpg"
call :r "Zara Girls Dress.jpg" "zara-vestido-menina-1.jpg"
call :r "Zara Girls Dress 1.jpg" "zara-vestido-menina-2.jpg"
call :r "Nike  Jersy .jpg" "Nike-Jersy.jpg"
call :r "Nike custom jesrsy.jpg" "Nike-custom-jesrsy.jpg"
echo.
echo Concluido.
pause
goto :eof

:r
if exist "%~2" (
  echo JA EXISTE - ignorado: "%~2"
  goto :eof
)
if exist "%~1" (
  ren "%~1" "%~2"
  echo OK: "%~2"
  goto :eof
)
echo NAO ENCONTRADO: "%~1"
goto :eof
