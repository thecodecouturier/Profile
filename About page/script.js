const sections = document.querySelectorAll('.section');
let lastScroll = window.scrollY;

// إلغاء updateAnimations بالكامل

function applyInitialAnimations() {
    sections.forEach((section, index) => {
        const image = section.querySelector('.image img');
        const paragraphs = section.querySelectorAll('.paragraph');
        const direction = section.dataset.direction;

        image.style.opacity = '0';
        image.style.transform = 'translateY(100px) scale(0.95)';
        image.style.transition = 'none';

        paragraphs.forEach(p => {
            p.style.opacity = '0';
            p.style.transform = direction === 'left' ? 'translateX(-80px) scale(0.9)' : 'translateX(80px) scale(0.9)';
            p.style.transition = 'none';
        });

        setTimeout(() => {
            image.style.transition = 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)';
            image.style.opacity = '1';
            image.style.transform = 'translateY(0) scale(1)';

            paragraphs.forEach((p, i) => {
                const delay = 300 + i * 200;
                setTimeout(() => {
                    p.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.22, 0.61, 0.36, 1)';
                    p.style.opacity = '1';
                    p.style.transform = 'translateX(0) scale(1)';
                }, delay);
            });
        }, index * 350);
    });
}

function handleScroll() {
    const currentScroll = window.scrollY;
    const viewportHeight = window.innerHeight;

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;
        const image = section.querySelector('.image img');
        const paragraphs = section.querySelectorAll('.paragraph');
        const sectionDirection = section.dataset.direction;

        // ✅ الصورة تشتغل بمجرد ما جزء منها يدخل الفيو بورت
        if (top < viewportHeight && bottom > 0) {
            image.style.opacity = '1';
            image.style.transform = 'translateY(0) scale(1)';
            image.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        } else {
            image.style.opacity = '0';
            image.style.transform = 'translateY(120px) scale(0.95)';
            image.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        }

        // ✅ شرط أدق لظهور العبارات لما يكون السكشن شبه كامل داخل الفيو بورت
        const sectionFullyVisible = top >= 0 && bottom <= viewportHeight;
        const sectionMostlyVisible = top < 0 && bottom > viewportHeight * 0.8;

        if (sectionFullyVisible || sectionMostlyVisible) {
            paragraphs.forEach((p, i) => {
                p.style.opacity = '1';
                p.style.transform = 'translateX(0) scale(1)';
                p.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
            });
        } else {
            paragraphs.forEach((p) => {
                let isLeft = p.classList.contains('paragraph-left');
                let isRight = p.classList.contains('paragraph-right');
                let x = sectionDirection === 'left' ? -100 : 100;
                if (isLeft) x = -100;
                if (isRight) x = 100;

                p.style.opacity = '0';
                p.style.transform = `translateX(${x}px) scale(0.9)`;
                p.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            });
        }
    });

    lastScroll = currentScroll;
}

// Scroll Optimized
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Load
window.addEventListener('DOMContentLoaded', () => {
    sections.forEach(section => {
        const image = section.querySelector('.image img');
        const paragraphs = section.querySelectorAll('.paragraph');
        const direction = section.dataset.direction;

        image.style.opacity = '0';
        image.style.transform = 'translateY(120px) scale(0.95)';
        image.style.willChange = 'transform, opacity';

        paragraphs.forEach(p => {
            p.style.opacity = '0';
            if (p.classList.contains('paragraph-left')) {
                p.style.transform = 'translateX(-100px) scale(0.9)';
            } else if (p.classList.contains('paragraph-right')) {
                p.style.transform = 'translateX(100px) scale(0.9)';
            } else {
                p.style.transform = direction === 'left' ? 'translateX(-100px) scale(0.9)' : 'translateX(100px) scale(0.9)';
            }
            p.style.willChange = 'transform, opacity';
        });
    });
});

window.addEventListener('load', applyInitialAnimations);
window.addEventListener('resize', handleScroll);



let currentSectionIndex = 0;
let isScrolling = false;
const sectionArray = Array.from(sections);
const counter = document.getElementById('section-counter');

function updateCounter(index) {
  const formatted = String(index + 1).padStart(2, '0');
  counter.textContent = formatted;
}

function scrollToSection(index) {
  if (index < 0 || index >= sectionArray.length) return;
  isScrolling = true;
  sectionArray[index].scrollIntoView({ behavior: 'smooth' });
  updateCounter(index);
  currentSectionIndex = index;
  setTimeout(() => {
    isScrolling = false;
  }, 900); // يمنع التمرير السريع
}

// عجلة الماوس
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  if (e.deltaY > 50) {
    scrollToSection(currentSectionIndex + 1);
  } else if (e.deltaY < -50) {
    scrollToSection(currentSectionIndex - 1);
  }
});

// التاتش (لابتوب أو موبايل)
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
  if (isScrolling) return;
  const touchEndY = e.changedTouches[0].clientY;
  const delta = touchStartY - touchEndY;
  if (delta > 50) {
    scrollToSection(currentSectionIndex + 1);
  } else if (delta < -50) {
    scrollToSection(currentSectionIndex - 1);
  }
});

// تحدث العدّاد أثناء التمرير اليدوي (optional backup)
window.addEventListener('scroll', () => {
  const viewportMiddle = window.innerHeight / 2;
  sectionArray.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
      currentSectionIndex = i;
      updateCounter(i);
    }
  });
});