const section = document.querySelector('.hero-section');
const textEls = document.querySelectorAll('.animated-text');
const imgEl = document.querySelector('.animated-img');

// Initial Load Animation
window.addEventListener('load', () => {
  section.classList.add('visible');
});

// Scroll-based Hide/Show
window.addEventListener('scroll', () => {
  const sectionTop = section.getBoundingClientRect().top;
  const sectionHeight = section.offsetHeight;

  if (sectionTop < -sectionHeight / 3) {
    // Scroll Down - Hide Elements
    textEls.forEach(el => {
      el.classList.remove('visible');
      el.classList.add('scroll-hide-text');
    });
    imgEl.classList.remove('visible');
    imgEl.classList.add('scroll-hide-img');
  } else if (sectionTop > -sectionHeight / 3) {
    // Scroll Up - Show Elements
    textEls.forEach(el => {
      el.classList.add('visible');
      el.classList.remove('scroll-hide-text');
    });
    imgEl.classList.add('visible');
    imgEl.classList.remove('scroll-hide-img');
  }
});