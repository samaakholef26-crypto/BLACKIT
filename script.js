// script.js
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggle || !navLinks) return; // لو مش موجودين مانع الشغل

  // افتح / اقفل المينيو
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    navLinks.classList.toggle('show');

    // بدل الايكون من bars -> times
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }

    // aria
    const expanded = navLinks.classList.contains('show');
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // اقفل المينيو لما اختار أي لينك (وينقلك للسكشن)
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.classList.remove('show');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // لو ضغطت برا المينيو وهو مفتوح -> يغلق
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('show')) {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('show');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// ===========================================
// Lightbox functionality
// ===========================================

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');
  const nextBtn = document.querySelector('.lightbox .next');
  const prevBtn = document.querySelector('.lightbox .prev');
  const portfolioItems = document.querySelectorAll('.portfolio-item img');

  let currentIndex = 0;
  let images = Array.from(portfolioItems).map(img => img.src);

  // helper عشان نعمل الفيد
  function showImageWithFade(src) {
    lightboxImg.classList.remove("fade"); 
    void lightboxImg.offsetWidth; // restart animation
    lightboxImg.src = src;
    lightboxImg.classList.add("fade");
  }

  // افتح الصورة
  portfolioItems.forEach((img, index) => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'block';
      currentIndex = index;
      showImageWithFade(img.src);
    });
  });

  // اقفل
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  // Next
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImageWithFade(images[currentIndex]);
  });

  // Prev
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImageWithFade(images[currentIndex]);
  });

  // اقفل لما تدوس برا الصورة
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

});
