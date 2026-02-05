/**
 * Home page client-side behavior: smooth scroll, scroll-triggered animations, hero parallax.
 */

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e: Event) {
    e.preventDefault();
    const target = document.querySelector((this as HTMLAnchorElement).getAttribute('href') ?? '');
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Intersection Observer for scroll-triggered fade-in
const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -80px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 50);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-view').forEach((el) => {
  observer.observe(el);
});

// Hero parallax and overlay
(function () {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const heroOverlay = document.querySelector('.hero-overlay');

  if (!hero || !heroContent) return;

  let ticking = false;

  function update() {
    ticking = false;
    const scrolled = window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
    const heroHeight = (hero as HTMLElement).offsetHeight ?? 0;
    const progress = heroHeight ? Math.min(Math.max(scrolled / heroHeight, 0), 1) : 0;

    (heroContent as HTMLElement).style.transform = `translateY(${scrolled * 0.15}px)`;

    if (heroOverlay) {
      const opacity = 0.15 + progress * 0.55;
      (heroOverlay as HTMLElement).style.opacity = String(Math.min(Math.max(opacity, 0), 1));
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
})();
