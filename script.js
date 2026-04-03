// ===================== NAVBAR SCROLL EFFECT =====================
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===================== MOBILE MENU =====================
function openMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) { menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) { menu.classList.remove('open'); document.body.style.overflow = ''; }
}

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.mobile-close');
  if (hamburger) hamburger.addEventListener('click', openMobileMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
});

// ===================== SCROLL REVEAL =====================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  el.classList.add('animate-hidden');
  revealObserver.observe(el);
});

// ===================== HERO BG LOAD ANIMATION (about.html) =====================
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  heroBg.classList.add('loaded');
}

// ===================== CONTACT FORM HANDLER (index.html) =====================
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();

  const name = [firstName, lastName].filter(Boolean).join(' ');
  const text = encodeURIComponent(
    `Hello Fio Transfer,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`
  );

  window.open(`https://wa.me/905344717912?text=${text}`, '_blank', 'noopener');
}
