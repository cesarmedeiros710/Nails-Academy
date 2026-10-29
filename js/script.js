  const menuToggle = document.getElementById('menuToggle');
  const mobilePanel = document.getElementById('mobilePanel');

  menuToggle.addEventListener('click', () => {
    const isOpen = mobilePanel.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  mobilePanel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobilePanel.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- Modal / lightbox das cores ----------
// ---------- Modal / lightbox (serve para cores e para estilos) ----------
const colorModal = document.getElementById('colorModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalCta = document.getElementById('modalCta');
const modalClose = document.getElementById('modalClose');

// Cada card diz, via data-kind, se é uma cor ou um formato.
// Assim o mesmo modal escreve o texto certo no alt e na mensagem do WhatsApp.
const copyByKind = {
  cor: {
    alt: (name) => 'Trabalho real na cor ' + name,
    whatsapp: (name) => 'Olá! Vi o tom "' + name + '" no site e quero agendar com esse esmalte.',
  },
  formato: {
    alt: (name) => 'Unhas no formato ' + name,
    whatsapp: (name) => 'Olá! Vi o formato "' + name + '" no site e quero agendar nesse estilo.',
  },
};

document.querySelectorAll('.nail-card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.dataset.name;
    const copy = copyByKind[card.dataset.kind] || copyByKind.cor;

    modalImg.src = card.dataset.img;
    modalImg.alt = copy.alt(name);
    modalTitle.textContent = name;
    modalDesc.textContent = card.dataset.desc;
    modalCta.href = 'https://wa.me/5588999999999?text=' +
      encodeURIComponent(copy.whatsapp(name));
    colorModal.showModal();
  });
});

  modalClose.addEventListener('click', () => colorModal.close());

  // fecha ao clicar fora do card (no backdrop)
  colorModal.addEventListener('click', (event) => {
    const rect = colorModal.getBoundingClientRect();
    const clickedOutside = event.clientX < rect.left || event.clientX > rect.right ||
                            event.clientY < rect.top || event.clientY > rect.bottom;
    if (clickedOutside) colorModal.close();
  });

  // ---------- Carrossel da galeria de tons ----------
const track = document.getElementById('galeriaTrack');
const btnPrev = document.getElementById('galeriaPrev');
const btnNext = document.getElementById('galeriaNext');

if (track && btnPrev && btnNext) {
  // Calcula o passo a partir do próprio card + gap, em vez de um número
  // fixo. Assim continua correto se o tamanho do card mudar no CSS.
  const step = () => {
    const card = track.querySelector('.nail-card');
    if (!card) return 200;
    const gap = parseInt(getComputedStyle(track).gap, 10) || 16;
    return card.offsetWidth + gap;
  };

  // Desativa a seta quando não há mais pra onde rolar naquele sentido.
  const updateButtons = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    btnPrev.disabled = track.scrollLeft <= 4;
    btnNext.disabled = track.scrollLeft >= maxScroll - 4;
  };

  btnPrev.addEventListener('click', () => {
    track.scrollBy({ left: -step(), behavior: 'smooth' });
  });
  btnNext.addEventListener('click', () => {
    track.scrollBy({ left: step(), behavior: 'smooth' });
  });

  track.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
}
  
  // ---------- Mapa de localização (Leaflet + OpenStreetMap) ----------
  const mapEl = document.getElementById('map');
  if (mapEl && window.L) {
    // SUBSTITUIR: coordenadas de exemplo (Praça Padre Cícero, Juazeiro do Norte).
    // Troque pelas coordenadas reais do endereço da cliente.
    const studioCoords = [-6.975142976463658, -34.83464040025463];

    const map = L.map('map', {
      scrollWheelZoom: false, // evita que o mapa "roube" o scroll da página
    }).setView(studioCoords, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const winePin = L.divIcon({
      className: 'map-pin',
      html: '<span></span>',
      iconSize: [26, 26],
      iconAnchor: [13, 26],
    });

    L.marker(studioCoords, { icon: winePin })
      .addTo(map)
      .bindPopup('Nails Academy Studio de Unhas')
      .openPopup();
  }
