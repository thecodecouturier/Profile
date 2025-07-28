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
  const svgPlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
  <path d="M8 5v14l11-7z"/>
</svg>`;

const svgPause = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
</svg>`;

const svgReplay = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
  <path d="M12 5V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6a6.005 6.005 0 0 1-5.66-4H4.08a8.003 8.003 0 0 0 7.92 6c4.42 0 8-3.58 8-8s-3.58-8-8-8z"/>
</svg>`;

  let currentIndex = 0;
  let intervalId = null;
  let isPlaying = false;

  // استخراج اللون الغالب وتطبيقه على overlay
  const colorThief = new ColorThief();

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
  if (playIcon.innerHTML.includes("Replay") || playIcon.innerHTML.includes("path d=\"M12 5V1")) {
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
  playIcon.innerHTML = svgPause;
  intervalId = setInterval(() => {
    if (currentIndex < galleryItems.length - 1) {
      showImage(currentIndex + 1);
    } else {
      stopSlideshow();
      playIcon.innerHTML = svgReplay;
    }
  }, 2000);
};

  const stopSlideshow = () => {
  isPlaying = false;
  playIcon.innerHTML = svgPlay;
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

  const portfolioLink = document.getElementById("portfolioLink");
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