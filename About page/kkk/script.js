const sections = document.querySelectorAll(".section");
let currentIndex = 0;
let isAnimating = false;

gsap.set(sections[0], { opacity: 1 });
sections[0].classList.add("active");
animateSectionIn(sections[0]);

function animateSectionIn(section) {
  const image = section.querySelector(".image");
  const text = section.querySelector(".text");

  let imageFrom = section.dataset.index % 2 === 0 ? "100%" : "-100%";
  let textFrom = section.dataset.index % 2 === 0 ? "-100%" : "100%";

  gsap.fromTo(image, { y: imageFrom, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
  gsap.fromTo(text, { x: textFrom, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
}

function animateSectionOut(section, direction = 1) {
  const image = section.querySelector(".image");
  const text = section.querySelector(".text");

  let imageTo = direction === 1 ? "-100%" : "100%";
  let textTo = direction === 1
    ? (section.dataset.index % 2 === 0 ? "-100%" : "100%")
    : (section.dataset.index % 2 === 0 ? "100%" : "-100%");

  gsap.to(image, { y: imageTo, opacity: 0, duration: 1 });
  gsap.to(text, { x: textTo, opacity: 0, duration: 1 });
}

function goToSection(index) {
  if (index < 0 || index >= sections.length || isAnimating || index === currentIndex) return;
  isAnimating = true;

  const currentSection = sections[currentIndex];
  const nextSection = sections[index];

  // استخدم gsap.timeline لضمان انتهاء الأنميشنات
  const tl = gsap.timeline({
    onComplete: () => {
      currentSection.classList.remove("active");
      animateSectionIn(nextSection);
      currentIndex = index;
      isAnimating = false;
    }
  });

  tl.add(() => animateSectionOut(currentSection, index > currentIndex ? 1 : -1));
  tl.add(() => {
    nextSection.classList.add("active");
    gsap.set(nextSection, { opacity: 1 });
  }, "+=1"); // بعد انتهاء الأنميشن (مدة 1 ثانية)
}

let lastWheelTime = 0;
const wheelDelay = 1200; // مدة منع استقبال wheel بعد كل انتقال (أكبر من مدة الأنميشن)

window.addEventListener("wheel", (e) => {
  const now = Date.now();
  if (isAnimating || now - lastWheelTime < wheelDelay) return;
  lastWheelTime = now;
  if (e.deltaY > 0) {
    goToSection(currentIndex + 1);
  } else {
    goToSection(currentIndex - 1);
  }
});