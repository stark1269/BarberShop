// открытие/закрытие мобильного меню

const mobMenuBtn = document.querySelector('.nav-icon');
const mobMenu = document.querySelector('.mob-menu');

mobMenuBtn.addEventListener('click', () => {
  mobMenuBtn.classList.toggle('open');
  mobMenu.classList.toggle('mob-menu-open');
});