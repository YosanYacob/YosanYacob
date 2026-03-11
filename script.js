// Mark JS as loaded — enables fade-up animations
document.documentElement.classList.add('js-ready');

/* ============================
   CUSTOM CURSOR
   ============================ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, input, textarea, .exp-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ============================
   NAV SCROLL
   ============================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

/* ============================
   HAMBURGER / MOBILE MENU
   ============================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================
   SCROLL REVEAL (fade-up)
   ============================ */
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children in same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.fade-up:not(.visible)')];
      const delay = siblings.indexOf(entry.target) * 90;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

/* ============================
   SKILL BAR ANIMATION
   ============================ */
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const w = entry.target.getAttribute('data-w');
      entry.target.style.width = w + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

bars.forEach(b => barObserver.observe(b));

/* ============================
   CONTACT FORM
   ============================ */
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('.form-submit');
  const text = btn.querySelector('.submit-text');
  const arrow = btn.querySelector('.submit-arrow');

  text.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    feedback.textContent = '✓ Message sent! I\'ll be in touch soon.';
    feedback.style.color = '#16a34a';
    form.reset();
    text.textContent = 'Send Message';
    arrow.textContent = '→';
    btn.disabled = false;
    setTimeout(() => { feedback.textContent = ''; }, 5000);
  }, 1400);
});

/* ============================
   EMAIL (bypass obfuscation)
   ============================ */
(function() {
  const u = 'yy823';
  const d = 'scarletmail.rutgers.edu';
  const email = u + '@' + d;
  const mailto = 'mailto:' + email;

  const displayEl = document.getElementById('emailDisplay');
  if (displayEl) displayEl.textContent = email;

  const contactLink = document.getElementById('contactEmailLink');
  if (contactLink) contactLink.href = mailto;

  const hireBtn = document.getElementById('hireMeBtn');
  if (hireBtn) hireBtn.href = mailto;
})();
// Ensure hover padding doesn't shift layout on items
document.querySelectorAll('.exp-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transition = 'background 0.3s, padding 0.3s';
  });
});
