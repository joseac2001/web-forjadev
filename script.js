/* ================================================================
   FORJADEV.CL — Script principal
================================================================ */

/* ----------------------------------------------------------------
   NAVBAR — efecto al hacer scroll
---------------------------------------------------------------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

/* ----------------------------------------------------------------
   MENÚ MÓVIL
---------------------------------------------------------------- */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
const toggleSpans = navToggle.querySelectorAll('span');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');

  if (isOpen) {
    toggleSpans[0].style.transform = 'translateY(7px) rotate(45deg)';
    toggleSpans[1].style.opacity   = '0';
    toggleSpans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    navToggle.setAttribute('aria-label', 'Cerrar menú');
  } else {
    toggleSpans[0].style.transform = '';
    toggleSpans[1].style.opacity   = '';
    toggleSpans[2].style.transform = '';
    navToggle.setAttribute('aria-label', 'Abrir menú');
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggleSpans[0].style.transform = '';
    toggleSpans[1].style.opacity   = '';
    toggleSpans[2].style.transform = '';
  });
});

/* ----------------------------------------------------------------
   ANIMACIONES DE ENTRADA — IntersectionObserver
---------------------------------------------------------------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // dispara una sola vez
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -36px 0px'
});

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* Animación inicial del hero (visible sin scroll) */
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('#hero .fade-up').forEach(el => {
      el.classList.add('visible');
    });
  }, 120);
});

/* ----------------------------------------------------------------
   FORMULARIO DE COTIZACIÓN
---------------------------------------------------------------- */
const form       = document.getElementById('quote-form');
const submitBtn  = document.getElementById('submit-btn');
const btnText    = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const successMsg = document.getElementById('form-success');
const errorMsg   = document.getElementById('form-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const action = form.getAttribute('action');

  // Aviso si el endpoint de Formspree no está configurado
  if (action.includes('YOUR_FORM_ID')) {
    alert('⚠️ El formulario aún no está conectado.\n\nPara activarlo:\n1. Ve a formspree.io\n2. Crea una cuenta gratis\n3. Reemplaza YOUR_FORM_ID en index.html con tu ID real');
    return;
  }

  // Estado de carga
  btnText.hidden    = true;
  btnLoading.hidden = false;
  submitBtn.disabled = true;
  successMsg.hidden = true;
  errorMsg.hidden   = true;

  try {
    const response = await fetch(action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      successMsg.hidden = false;
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      throw new Error(`Status ${response.status}`);
    }
  } catch {
    errorMsg.hidden = false;
    errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } finally {
    btnText.hidden    = false;
    btnLoading.hidden = true;
    submitBtn.disabled = false;
  }
});
