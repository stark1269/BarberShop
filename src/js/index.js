// открытие/закрытие мобильного меню

const mobMenuBtn = document.querySelector('.nav-icon');
const mobMenu = document.querySelector('.mob-menu');

mobMenuBtn.addEventListener('click', () => {
  mobMenuBtn.classList.toggle('open');
  mobMenu.classList.toggle('mob-menu-open');
  document.body.classList.toggle('body-open');
});

// Клик по фото в секции "блог"

const blogCard = document.querySelector('.blog-card');
const frontCard = document.querySelector('.front-card');
const backCard = document.querySelector('.back-card');

const blogTextFirst = document.querySelector('.blog-text-first');
const blogTextSecond = document.querySelector('.blog-text-second');


blogCard.addEventListener('click', () => {
  frontCard.classList.toggle('click-front');
  backCard.classList.toggle('click-back');
  blogTextFirst.classList.toggle('slide-first');
  blogTextSecond.classList.toggle('slide-second');
});

// Кнопка вверх

const arrow = document.querySelector('.border-arrow');
arrow.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver((entries) => {
const { isIntersecting } = entries[0];
  if (!isIntersecting) {
    arrow.style.display = 'flex';
  } else arrow.style.display = 'none';
});

const header = document.querySelector('.header');
observer.observe(header);

// Секция галерея

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  const instans = new IntersectionObserver((entries) => {
    const { isIntersecting, target } = entries[0];
    if (isIntersecting) {
      target.classList.add('animated-gallery');
    }
  });
  instans.observe(item);
}
);

const gallery = document.querySelector('.gallery');
galleryItems.forEach(item => {
  const instansGallery = new IntersectionObserver((entries) => {
    const { isIntersecting } = entries[0];
    if (!isIntersecting) {
      item.classList.remove('animated-gallery');
    }
  });
  instansGallery.observe(gallery);
}
);