// تأكد من تحميل DOM بالكامل
document.addEventListener('DOMContentLoaded', function() {
  // 1. التأكد من تحميل GSAP وScrollTrigger
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('لم يتم تحميل GSAP أو ScrollTrigger بشكل صحيح');
    showAllContent(); // عرض المحتوى بدون أنيميشن
    return;
  }

  // 2. تسجيل plugin ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // 3. تهيئة العناصر
  const sections = gsap.utils.toArray('.section');
  
  // 4. إعداد أولي للأنيميشن
  gsap.set('.content', { opacity: 0 });
  
  // 5. تطبيق الأنيميشنات لكل قسم
  sections.forEach((section, index) => {
    const image = section.querySelector('.image');
    const text = section.querySelector('.text');
    const img = section.querySelector('img');
    const lines = section.querySelectorAll('h1, p');
    
    // 6. تحديد اتجاهات الأنيميشن
    const isEven = index % 2 === 0;
    const imageFrom = { y: 100, opacity: 0 };
    const textFrom = { x: isEven ? -100 : 100, opacity: 0 };
    
    // 7. أنيميشن الصورة والنص الرئيسي
    const sectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 25%',
        scrub: false,
        markers: false,
        toggleActions: 'play none none reverse'
      }
    });
    
    sectionTl
      .fromTo(image, 
        { ...imageFrom },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      )
      .fromTo(text,
        { ...textFrom },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.8'
      );
    
    // 8. أنيميشن الصورة الداخلية
    gsap.fromTo(img,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        scrollTrigger: {
          trigger: image,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // 9. أنيميشن الأسطر النصية
    lines.forEach((line, i) => {
      gsap.fromTo(line,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: text,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  });
  
  // 10. التأكد من ظهور المحتوى بعد 3 ثواني كحد أقصى
  setTimeout(() => {
    if (document.querySelector('.content').style.opacity === '0') {
      showAllContent();
    }
  }, 3000);
  
  // 11. دالة لعرض جميع المحتوى بدون أنيميشن (حالة الطوارئ)
  function showAllContent() {
    gsap.set('.content', { 
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1
    });
    console.warn('تم عرض المحتوى بدون أنيميشن');
  }
  
  console.log('تم تهيئة الصفحة بنجاح');
});