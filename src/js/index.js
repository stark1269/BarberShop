import { storeCard } from "./storeCard";
import simpleLightbox from "simplelightbox";
import Notiflix from "notiflix";
import "simplelightbox/dist/simple-lightbox.min.css";

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

// Кнопка вверх / Скролл

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

// Секция галерея / Анимация фотограций галереи

const galleryItems = document.querySelectorAll('.gallery-item-link');
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

new simpleLightbox('.gallery a');

// Сбор информации в объект в секции формы

const form = document.querySelector('.form-items');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { name, phone, text } = e.target.elements
  const data = {
    name: name.value.trim(),
    phone: phone.value.trim(),
    message: text.value.trim(),
  };
  console.log(data);
  form.reset()
});

// Плавный скролл

function closeMobileMenu() {
  mobMenuBtn.classList.remove('open');
  mobMenu.classList.remove('mob-menu-open');
  document.body.classList.remove('body-open');
};

function scrollTo(e) {
const link = e.target
  if (link.dataset.goto) {
  const gotoBlock = document.querySelector(link.dataset.goto);
  const gotoBlockValue = gotoBlock.getBoundingClientRect().top;

  window.scrollTo({
    top: gotoBlockValue,
    behavior: 'smooth',
  });
    e.preventDefault();
    closeMobileMenu();
  };
};

const menuLinks = document.querySelectorAll('.header-link');
menuLinks.forEach(menuLink => {
  menuLink.addEventListener('click', scrollTo)
}
);

const mobMenuLinks = document.querySelectorAll('.mob-menu-list');
mobMenuLinks.forEach(menuLink => {
  menuLink.addEventListener('click', scrollTo)
}
);

// Функция клика по кнопке в добавить в коризну

let shopCart = [];

const storeList = document.querySelector('.store-list');
storeList.addEventListener('click', onCardButtonClick);

function onCardButtonClick(e) {
  const btn = e.target.closest('button');
  const { cart } = btn?.dataset || {};

  switch (cart) {
    case 'cart':
      
  const parent = e.target.closest('li');
  const { id } = parent?.dataset || {};

  const existingItem = shopCart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItem = storeCard.find(item => item.id === id);
    shopCart.push(newItem);
    showBtnCart();
  };

  Notiflix.Notify.success('Вау, твій товар уже в кошику!');
    break
  };
};

// Функиця показа кнопки корзины и корзины товара

const heroCartBtn = document.querySelector('.hero-cart-btn');
const modalShopCart = document.querySelector('.shop-cart');

function showModalShopCart() {
  modalShopCart.classList.remove('cart-none');
};

// function closeModalShopCart() {
//   modalShopCart.classList.add('cart-none');
// }

function showBtnCart() {
  if (shopCart.length) {
    heroCartBtn.style.display = 'flex';
  };
};

heroCartBtn.addEventListener('click', showModalShopCart);