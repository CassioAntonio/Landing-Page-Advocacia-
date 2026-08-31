/* =============================================================
   Rafael Ferreira Advogados — script.js
   Modules:
     1. Header scroll effect
     2. Mobile menu toggle (hamburger)
     3. Smooth-scroll behavior + close menu on click
     4. IntersectionObserver reveal-on-scroll
     5. Contact form validation
     6. "Ver rota" buttons → Google Maps directions
     7. Back-to-top floating button
     8. Footer year auto-update
   ============================================================= */
(function () {
  'use strict';

  /* ---------- 1. Header scroll effect ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

    // back-to-top visibility
    if (window.scrollY > 600) backToTop.classList.add('is-visible');
    else backToTop.classList.remove('is-visible');
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 2. Hamburger / Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navList   = document.getElementById('navList');
  const nav       = document.querySelector('.nav');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* ---------- 3. Smooth-scroll & close menu on link click ---------- */
  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  /* ---------- 4. Reveal-on-scroll (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target); // animação roda apenas 1x
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // fallback: tudo visível
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- 5. Form validation ---------- */
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  // helpers
  const setError = (field, msg) => {
    field.classList.add('is-invalid');
    const slot = form.querySelector(`[data-error-for="${field.name}"]`);
    if (slot) slot.textContent = msg;
  };
  const clearError = (field) => {
    field.classList.remove('is-invalid');
    const slot = form.querySelector(`[data-error-for="${field.name}"]`);
    if (slot) slot.textContent = '';
  };

  // valida em tempo real ao sair do campo
  form.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
  });

  function validateField(field) {
    const v = field.value.trim();
    if (!v) { setError(field, 'Campo obrigatório.'); return false; }

    if (field.type === 'email') {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!re.test(v)) { setError(field, 'Informe um e-mail válido.'); return false; }
    }
    if (field.type === 'tel') {
      // aceita números, espaço, parênteses, traço, +
      const re = /^[0-9\s()+\-]{8,20}$/;
      if (!re.test(v)) { setError(field, 'Telefone inválido.'); return false; }
    }
    if (field.name === 'name' && v.length < 2) {
      setError(field, 'Nome muito curto.'); return false;
    }
    if (field.name === 'message' && v.length < 10) {
      setError(field, 'Mensagem muito curta (mín. 10 caracteres).'); return false;
    }
    clearError(field);
    return true;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input, textarea').forEach((f) => {
      if (!validateField(f)) valid = false;
    });

    if (!valid) {
      feedback.textContent = 'Por favor, corrija os campos destacados.';
      feedback.className = 'form__feedback is-error';
      return;
    }

    // Envio via WhatsApp: monta mensagem com os dados preenchidos e abre a conversa
    const data = new FormData(form);
    const nome = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const telefone = (data.get('phone') || '').toString().trim();
    const mensagem = (data.get('message') || '').toString().trim();

    const texto =
      'Olá! Gostaria de entrar em contato através do site do Rafael Ferreira Advogados.\n\n' +
      'Nome:\n' + nome + '\n\n' +
      'E-mail:\n' + email + '\n\n' +
      'Telefone:\n' + telefone + '\n\n' +
      'Mensagem:\n' + mensagem;

    const url = 'https://wa.me/5511975856717?text=' + encodeURIComponent(texto);

    feedback.textContent = 'Abrindo o WhatsApp para concluir seu envio…';
    feedback.className = 'form__feedback is-success';
    window.open(url, '_blank', 'noopener');
    form.reset();
    setTimeout(() => { feedback.textContent = ''; feedback.className = 'form__feedback'; }, 6000);
  });

  /* ---------- 6. "Ver rota" — abre Google Maps com direções ---------- */
  document.querySelectorAll('.route-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const address = btn.dataset.address || '';
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
      window.open(url, '_blank', 'noopener');
    });
  });

  /* ---------- 7. Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 8. Ano dinâmico no footer ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- 9. Carrossel "Áreas de Atuação" ---------- */
  const track = document.getElementById('areasTrack');
  if (track) {
    const slides = Array.from(track.querySelectorAll('.area-slide'));
    const prevBtn = document.getElementById('areasPrev');
    const nextBtn = document.getElementById('areasNext');
    const dotsWrap = document.getElementById('areasDots');
    let current = 0;
    let autoplayId;

    // cria os dots dinamicamente
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Ir para área ${i + 1}`);
      b.addEventListener('click', () => goTo(i, true));
      dotsWrap.appendChild(b);
    });
    const dots = Array.from(dotsWrap.children);

    function update() {
      track.style.transform = `translateX(-${current * 100}%)`;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }
    function goTo(i, userAction) {
      current = (i + slides.length) % slides.length;
      update();
      if (userAction) restartAutoplay();
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });
    nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });

    // autoplay sutil — pausa em hover
    function startAutoplay() { autoplayId = setInterval(next, 6500); }
    function restartAutoplay() { clearInterval(autoplayId); startAutoplay(); }
    const carouselEl = document.getElementById('areasCarousel');
    carouselEl.addEventListener('mouseenter', () => clearInterval(autoplayId));
    carouselEl.addEventListener('mouseleave', startAutoplay);

    // suporte a swipe (mobile)
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); restartAutoplay(); }
    });

    // teclado
    carouselEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { next(); restartAutoplay(); }
      if (e.key === 'ArrowLeft')  { prev(); restartAutoplay(); }
    });

    update();
    startAutoplay();
  }
  /* ---------- 10. Counter animation (hero__meta) ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const format = (n, mode) => {
      if (mode === 'thousand') return n.toLocaleString('pt-BR');
      return String(n);
    };
    const animate = (el) => {
      const target = parseFloat(el.dataset.count) || 0;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const mode = el.dataset.format || '';
      const dur = 1600;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.round(target * eased);
        el.textContent = `${prefix}${format(value, mode)}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animate(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => cio.observe(c));
  }

  // inicializa estado
  onScroll();
})();
