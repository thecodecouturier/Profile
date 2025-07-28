// JavaScript الكامل مع التعديلات المطلوبة
const name = document.getElementById('name');
const tagline = document.getElementById('tagline');
const overlay = document.querySelector('.overlay');
const socialLinks = document.querySelector('.social-links');
const visionMessage = document.getElementById('creative-vision');
const visionLines = document.querySelectorAll('.vision-line');
const creativeTrigger = document.getElementById('creative-trigger');

// متغيرات التحكم
let visionMessageTimeout;
let isNaturalDisappearance = false;
let lastScrollPosition = 0;
let isVisionMessageVisible = false;
let isDisappearing = false;

// تهيئة العناصر
function initElements() {
  name.style.opacity = '0';
  name.style.transform = 'translateY(20px)';
  tagline.style.opacity = '0';
  tagline.style.transform = 'translateY(20px)';
  overlay.style.opacity = '0';
  overlay.style.transform = 'translateY(20px)';
  socialLinks.style.opacity = '0';
  socialLinks.style.transform = 'translateY(20px)';
  
  // إعداد كلمة Creative
  const creativeText = '* My Essence *'; // النص الجديد مع المسافات والنجوم
creativeTrigger.innerHTML = '';

// تعديل خاص لمعالجة المسافات
for (let i = 0; i < creativeText.length; i++) {
  const charSpan = document.createElement('span');
  charSpan.textContent = creativeText[i];
  
  // معالجة خاصة للمسافات والنجوم
  if (creativeText[i] === ' ') {
    charSpan.innerHTML = '&nbsp;'; // تحويل المسافة العادية إلى مسافة غير قابلة للكسر
    charSpan.style.minWidth = '0.3em'; // ضمان عرض المسافة
  } else if (creativeText[i] === '*') {
    charSpan.style.opacity = '0.5'; // جعل النجوم شبه شفافة
  }
  
  charSpan.style.setProperty('--char-index', i);
  charSpan.style.transitionDelay = `${i * 0.15}s`; // نفس سرعة الكود الأصلي
  creativeTrigger.appendChild(charSpan);
}
  
  name.style.transition = 'all 1.2s ease-out';
  tagline.style.transition = 'all 1.2s ease-out';
  overlay.style.transition = 'all 1.5s ease-out';
  socialLinks.style.transition = 'all 1.2s ease-out';
  
  visionMessage.style.display = 'none';
  visionMessage.style.opacity = '0';
  visionLines.forEach(line => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(15px)';
    line.style.transition = 'all 0.8s ease, filter 1.5s ease';
  });
}

// تسلسل الظهور الأساسي
function showHeaderElements() {
  setTimeout(() => {
    overlay.style.opacity = '1';
    overlay.style.transform = 'translateY(0)';
    
    setTimeout(() => {
      name.style.opacity = '1';
      name.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        tagline.style.opacity = '1';
        tagline.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          socialLinks.style.opacity = '1';
          socialLinks.style.transform = 'translateY(0)';
          
          setTimeout(() => {
            // ظهور كلمة Creative حرفًا بحرف
            creativeTrigger.classList.add('visible');
            
            // تأثير البريق بعد اكتمال الظهور
            setTimeout(() => {
              creativeTrigger.classList.add('hover-effect');
              setTimeout(() => {
                creativeTrigger.classList.remove('hover-effect');
              }, creativeTrigger.textContent.length * 100 + 500);
            }, creativeTrigger.textContent.length * 100 + 300);
            
            // إعداد أحداث التفاعل
            setupCreativeInteractions();
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  }, 200);
}

// إعداد تفاعلات كلمة Creative
function setupCreativeInteractions() {
  creativeTrigger.addEventListener('mouseenter', () => {
    creativeTrigger.classList.add('hover-effect');
    const chars = creativeTrigger.querySelectorAll('span');
    chars.forEach(char => {
      char.style.transform = 'translateY(-8px) scale(1.15)';
      char.style.textShadow = '0 0 15px rgba(224, 192, 151, 0.6)';
      char.style.filter = 'blur(0)';
    });
  });
  
  creativeTrigger.addEventListener('mouseleave', () => {
    creativeTrigger.classList.remove('hover-effect');
    const chars = creativeTrigger.querySelectorAll('span');
    chars.forEach(char => {
      char.style.transform = 'translateY(0) scale(1)';
      char.style.textShadow = 'none';
    });
  });
  
  creativeTrigger.addEventListener('click', () => {
    [name, tagline, socialLinks].forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-40px)';
      }, index * 150);
    });
    
    // إخفاء كلمة Creative
    const chars = creativeTrigger.querySelectorAll('span');
    chars.forEach((char, index) => {
      setTimeout(() => {
        char.style.opacity = '0';
        char.style.transform = 'translateY(30px) translateZ(-50px)';
        char.style.filter = 'blur(8px)';
        char.style.textShadow = 'none';
      }, index * 50);
    });
    
    setTimeout(showVisionMessage, 1000);
  });
}

// عرض الرسالة
function showVisionMessage() {
  isVisionMessageVisible = true;
  isNaturalDisappearance = false;
  isDisappearing = false;
  lastScrollPosition = window.scrollY;
  
  visionMessage.style.display = 'flex';
  visionMessage.style.opacity = '1';
  
  visionLines.forEach((line, index) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(15px)';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
      
      if (index === visionLines.length - 1) {
        visionMessageTimeout = setTimeout(() => {
          if (isVisionMessageVisible && !isDisappearing) {
            isNaturalDisappearance = true;
            startDisappearingEffect();
          }
        }, 5000);
      }
    }, index * 400);
  });
}

// تأثير الاختفاء المخصص
function startDisappearingEffect() {
  if (!isVisionMessageVisible || isDisappearing) return;
  isDisappearing = true;
  
  visionLines.forEach(line => {
    const words = line.textContent.split(' ');
    line.innerHTML = words.map(word => 
      `<span class="vision-word" style="opacity:1; filter:brightness(1) blur(0);">${word}</span>`
    ).join(' ');
  });

  const allWords = document.querySelectorAll('.vision-word');
  
  allWords.forEach((word, index) => {
    setTimeout(() => {
      word.style.transition = 'filter 2s ease';
      word.style.filter = 'brightness(3)';
      
      setTimeout(() => {
        word.style.transition = 'all 0.5s ease';
        word.style.filter = 'brightness(2) blur(1px)';
        
        setTimeout(() => {
          word.style.transform = 'rotate(2deg) scale(0.95)';
          
          setTimeout(() => {
            word.style.opacity = '0';
            word.style.transform = 'rotate(5deg) scale(0.8) translateY(5px)';
            word.style.filter = 'brightness(0) blur(3px)';
          }, 300);
        }, 700);
      }, 2000);
    }, index * 100);
  });

  setTimeout(() => {
    visionMessage.style.opacity = '0';
    setTimeout(() => {
      visionMessage.style.display = 'none';
      resetLines();
    }, 500);
  }, (allWords.length * 100) + 3500);
}

// إخفاء الرسالة فورياً
function hideVisionMessageInstantly() {
  if (!isVisionMessageVisible) return;
  
  clearTimeout(visionMessageTimeout);
  isVisionMessageVisible = false;
  isDisappearing = true;
  
  visionLines.forEach(line => {
    line.style.transition = 'none';
    line.innerHTML = line.textContent;
    line.style.opacity = '0';
    line.style.transform = 'translateY(15px)';
  });
  
  visionMessage.style.transition = 'none';
  visionMessage.style.opacity = '0';
  visionMessage.style.display = 'none';
  
  resetLines();
}

// إعادة تعيين الخطوط
function resetLines() {
  isVisionMessageVisible = false;
  isDisappearing = false;
  isNaturalDisappearance = false;
  
  visionLines.forEach(line => {
    line.innerHTML = line.textContent;
    line.style.opacity = '0';
    line.style.transform = 'translateY(15px)';
    line.style.filter = 'none';
    line.style.transition = 'all 0.8s ease, filter 1.5s ease';
  });
  
  // إعادة ظهور العناصر بنفس التسلسل
  setTimeout(() => {
    overlay.style.opacity = '1';
    overlay.style.transform = 'translateY(0)';
    
    setTimeout(() => {
      name.style.opacity = '1';
      name.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        tagline.style.opacity = '1';
        tagline.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          socialLinks.style.opacity = '1';
          socialLinks.style.transform = 'translateY(0)';
          
          setTimeout(() => {
            // إعادة ظهور كلمة Creative بنفس التأثيرات
            creativeTrigger.classList.add('visible');
            const chars = creativeTrigger.querySelectorAll('span');
            chars.forEach((char, index) => {
              char.style.opacity = '0';
              char.style.transform = 'translateY(30px) translateZ(-50px)';
              char.style.filter = 'blur(8px)';
              setTimeout(() => {
                char.style.opacity = '1';
                char.style.transform = 'translateY(0) translateZ(0)';
                char.style.filter = 'blur(0)';
              }, index * 100 + 300);
            });
            
            setTimeout(() => {
              creativeTrigger.classList.add('hover-effect');
              setTimeout(() => {
                creativeTrigger.classList.remove('hover-effect');
              }, chars.length * 100 + 500);
            }, chars.length * 100 + 300);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  }, 200);
}

// تأثير التمرير
function handleScroll() {
  const scrollY = window.scrollY;
  const triggerPoint = 300;

  const nameProgress = Math.max(0, 1 - scrollY / (triggerPoint * 0.6));
  const taglineProgress = Math.max(0, 1 - scrollY / (triggerPoint * 0.8));
  const socialProgress = Math.max(0, 1 - scrollY / triggerPoint * 1.0);
  const overlayProgress = Math.max(0, 1 - scrollY / (triggerPoint * 1.2));

  name.style.opacity = nameProgress;
  tagline.style.opacity = taglineProgress;
  socialLinks.style.opacity = socialProgress;
  overlay.style.opacity = overlayProgress;

  name.style.transform = `translateY(${50 * (1 - nameProgress)}px)`;
  tagline.style.transform = `translateY(${50 * (1 - taglineProgress)}px)`;
  socialLinks.style.transform = `translateY(${40 * (1 - socialProgress)}px)`;
  overlay.style.transform = `translateY(${30 * (1 - overlayProgress)}px)`;

  if (isVisionMessageVisible && scrollY > lastScrollPosition) {
    hideVisionMessageInstantly();
  }
  lastScrollPosition = scrollY;
}

// بدء التشغيل
initElements();
setTimeout(showHeaderElements, 300);
window.addEventListener('scroll', () => {
  window.requestAnimationFrame(handleScroll);
});

//////////////////
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-img-wrapper");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const imageCounter = document.getElementById("imageCounter");
  const closeBtn = document.getElementById("closeLightbox");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const playBtn = document.getElementById("playButton");
  const playIcon = document.getElementById("playIcon");

  let currentIndex = 0;
  let intervalId = null;
  let isPlaying = false;

  // استخراج اللون الغالب وتطبيقه على overlay
  const colorThief = new colorThief();

  galleryItems.forEach((wrapper) => {
    const img = wrapper.querySelector("img");
    const overlay = wrapper.querySelector(".overlay");

    if (img.complete) {
      applyOverlayColor(img, overlay);
    } else {
      img.addEventListener("load", () => {
        applyOverlayColor(img, overlay);
      });
    }
  });

  function applyOverlayColor(img, overlay) {
    try {
      const [r, g, b] = colorThief.getColor(img);
      overlay.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.6)`; // 60% شفافية
    } catch (err) {
      overlay.style.backgroundColor = `rgba(0, 0, 0, 0.6)`; // fallback
    }
  }

  const showImage = (index) => {
    const total = galleryItems.length;
    if (index < 0 || index >= total) return;

    const imgSrc = galleryItems[index].querySelector("img").src;
    lightboxImg.src = imgSrc;
    currentIndex = index;
    imageCounter.textContent = `${index + 1} / ${total}`;

    prevBtn.style.display = index === 0 ? "none" : "block";
    nextBtn.style.display = index === total - 1 ? "none" : "block";
  };

  galleryItems.forEach((wrapper, index) => {
    wrapper.addEventListener("click", () => {
      lightbox.classList.add("show");
      showImage(index);
      document.body.style.overflow = "hidden"; // ✅ تعطيل التمرير
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
    stopSlideshow();
    document.body.style.overflow = ""; // ✅ إعادة التمرير
  });

  prevBtn.addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  playBtn.addEventListener("click", () => {
    if (playIcon.textContent === "⟳") {
      currentIndex = 0;
      showImage(currentIndex);
      startSlideshow();
    } else if (isPlaying) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });

  const startSlideshow = () => {
    isPlaying = true;
    playIcon.textContent = "⏸";
    intervalId = setInterval(() => {
      if (currentIndex < galleryItems.length - 1) {
        showImage(currentIndex + 1);
      } else {
        stopSlideshow();
        playIcon.textContent = "⟳";
      }
    }, 2000);
  };

  const stopSlideshow = () => {
    isPlaying = false;
    playIcon.textContent = "▶";
    clearInterval(intervalId);
  };

  // تحديث السنة تلقائيًا
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
////////// navbar
function deleteTranslateCookie() {
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname + ";";
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,fr,it,es,de,pt,ru,ja,ko,ar',
    layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
    autoDisplay: false
  }, 'google_translate_element');
}

let isTranslating = false;

const languageMap = {
  en: { code: "EN", flag: "https://flagcdn.com/w20/gb.png" },
  fr: { code: "FR", flag: "https://flagcdn.com/w20/fr.png" },
  it: { code: "IT", flag: "https://flagcdn.com/w20/it.png" },
  es: { code: "ES", flag: "https://flagcdn.com/w20/es.png" },
  de: { code: "DE", flag: "https://flagcdn.com/w20/de.png" },
  pt: { code: "PT", flag: "https://flagcdn.com/w20/pt.png" },
  ru: { code: "RU", flag: "https://flagcdn.com/w20/ru.png" },
  ja: { code: "JA", flag: "https://flagcdn.com/w20/jp.png" },
  ko: { code: "KO", flag: "https://flagcdn.com/w20/kr.png" },
  ar: { code: "AR", flag: "https://flagcdn.com/w20/sa.png" }
};

function updateLanguageButton(lang) {
  const codeEl = document.getElementById("languageCode");
  const flagEl = document.getElementById("languageFlag");

  if (codeEl && flagEl && languageMap[lang]) {
    codeEl.textContent = languageMap[lang].code;
    flagEl.src = `${languageMap[lang].flag}?t=${Date.now()}`;
    flagEl.alt = languageMap[lang].code;
  }
}

function changeLanguage(lang, save = true) {
  if (isTranslating) return;
  isTranslating = true;

  const select = document.querySelector("select.goog-te-combo");
  if (select) {
    document.querySelectorAll("#languageDropdown a").forEach(link => {
      link.classList.remove("active-language");
    });

    const currentLink = document.querySelector(`#languageDropdown a[data-lang="${lang}"]`);
    if (currentLink) currentLink.classList.add("active-language");

    select.value = lang;
    select.dispatchEvent(new Event("change"));

    if (save) localStorage.setItem("preferredLang", lang);
    updateLanguageButton(lang);
  }

  setTimeout(() => {
    isTranslating = false;
  }, 1500);
}

function waitForGoogleTranslateReady(callback) {
  const interval = setInterval(() => {
    const select = document.querySelector("select.goog-te-combo");
    if (select) {
      clearInterval(interval);
      callback();
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  deleteTranslateCookie(); // ← حذف الكوكي عند التحميل

  waitForGoogleTranslateReady(() => {
    changeLanguage("en", false); // ← فرض العودة للإنجليزية
  });

  const langButton = document.getElementById("languageBtn");
  const langDropdown = document.getElementById("languageDropdown");

  if (langButton && langDropdown) {
    langButton.addEventListener("click", (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle("show");
});

document.addEventListener("click", () => {
  langDropdown.classList.remove("show");
});

// إغلاق عند التمرير لأسفل
let lastLangScrollPos = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (langDropdown.classList.contains("show") && currentScroll > lastLangScrollPos) {
    langDropdown.classList.remove("show");
  }
  lastLangScrollPos = currentScroll;
});

    document.querySelectorAll("#languageDropdown a").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = link.getAttribute("data-lang");
        changeLanguage(lang);
      });
    });
  }

  const portfolioLink = document.getElementById("portfolioItemLink");
const portfolioDropdown = document.querySelector(".portfolio-dropdown");

// إظهار / إخفاء القائمة عند الضغط
portfolioLink.addEventListener("click", (e) => {
  e.preventDefault();
  const isVisible = portfolioDropdown.style.opacity === "1";
  if (isVisible) {
    hideDropdown();
  } else {
    showDropdown();
  }
});

// إغلاق القائمة عند التمرير لأسفل
let lastScrollPos = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (portfolioDropdown.style.opacity === "1" && currentScroll > lastScrollPos) {
    hideDropdown();
  }
  lastScrollPos = currentScroll;
});

// إغلاق القائمة عند الضغط على أي عنصر بداخلها
document.querySelectorAll(".portfolio-dropdown .dropdown-link").forEach(link => {
  link.addEventListener("click", () => {
    hideDropdown();
  });
});

// إغلاق عند الضغط خارج القائمة
document.addEventListener("click", (e) => {
  if (!portfolioDropdown.contains(e.target) && !portfolioLink.contains(e.target)) {
    hideDropdown();
  }
});

// دوال الإظهار والإخفاء
function showDropdown() {
  portfolioDropdown.style.opacity = "1";
  portfolioDropdown.style.pointerEvents = "auto";
  portfolioDropdown.style.transform = "translateX(-50%) translateY(0)";
  portfolioLink.classList.add("active"); // ✅ نضيف كلاس active
}

function hideDropdown() {
  portfolioDropdown.style.opacity = "0";
  portfolioDropdown.style.pointerEvents = "none";
  portfolioDropdown.style.transform = "translateX(-50%) translateY(-10px)";
  portfolioLink.classList.remove("active"); // ✅ نشيله لما القائمة تتقفل
}
// بعد إدراج الـ navbar
const currentPath = window.location.pathname;

document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
  try {
    const fullUrl = new URL(link.href);
    if (fullUrl.pathname === currentPath) {
      link.classList.add('active');
    }
  } catch (e) {
    // في حالة الروابط الداخلية زي #about أو #runway مثلاً
    if (link.getAttribute('href') === window.location.hash) {
      link.classList.add('active');
    }
  }
});


});

// ✅ القائمة الجانبية
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sideMenu = document.getElementById("sideMenu");
const closeSideMenu = document.getElementById("closeSideMenu");

hamburgerBtn.addEventListener("click", () => {
  sideMenu.classList.add("show");
});

closeSideMenu.addEventListener("click", () => {
  sideMenu.classList.remove("show");
});

// ✅ التحكم في إظهار/إخفاء قائمة Portfolio داخل القائمة الجانبية
const sidePortfolioToggle = document.getElementById("sidePortfolioToggle");
const sidePortfolioDropdown = document.getElementById("sidePortfolioDropdown");

sidePortfolioToggle.addEventListener("click", () => {
  sidePortfolioDropdown.classList.toggle("show");
  sidePortfolioToggle.classList.toggle("active"); // ✅ يقلب السهم
});