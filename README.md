# Vívida Studio de Unhas — landing page

## Estrutura

```
vivida-project/
├── index.html        → estrutura da página (HTML)
├── css/
│   └── styles.css     → todo o visual (cores, fontes, responsividade)
├── js/
│   └── script.js       → menu mobile + modal de fotos da galeria
└── images/             → coloque aqui as fotos reais do cliente
```

## Como abrir

Basta abrir o `index.html` no navegador. Se estiver usando VSCode, a extensão
"Live Server" facilita (clique direito no arquivo → "Open with Live Server"),
porque ela recarrega a página sozinha a cada alteração.

## Onde trocar as fotos

- Fotos da **galeria de tons**: dentro de `index.html`, procure pelo atributo
  `data-img="..."` em cada `<button class="nail-card">` e troque pelo caminho
  do arquivo em `images/`.
- Foto da **hero** (topo da página): procure `<div class="photo-frame">` e
  troque o `src` da `<img>` logo abaixo.
- Número de **WhatsApp**: procure por `5588999999999` (aparece em 3 lugares:
  botão flutuante, CTA final e dentro do `script.js`) e troque pelo número real
  no formato `55DDDNÚMERO` (sem espaços, traços ou parênteses).

## Mapa de localização

A seção "Onde nos encontrar" usa **Leaflet + OpenStreetMap** (gratuito, sem
chave de API). Pra apontar pro endereço real da cliente:

1. Pegue as coordenadas reais do endereço (clique com o botão direito no local
   no [Google Maps](https://maps.google.com) → as coordenadas aparecem no menu
   e podem ser copiadas; ou busque o endereço no
   [Nominatim](https://nominatim.openstreetmap.org/)).
2. Em `js/script.js`, troque os dois números de `studioCoords` (linha perto do
   comentário `SUBSTITUIR`) pela latitude e longitude reais.
3. Em `index.html`, troque o texto de `.local-address` pelo endereço por
   extenso, e o `destination=-7.2130,-39.3150` no botão "Traçar rota" pelas
   mesmas coordenadas (ou pelo endereço em texto, se preferir).

## Onde mexer no visual

Os tokens de cor e fonte ficam no topo do `css/styles.css`, dentro de `:root`.
Mudar uma cor ali atualiza o site inteiro, porque todo o CSS usa essas
variáveis (`var(--wine)`, `var(--gold)` etc.) em vez de cores fixas.
