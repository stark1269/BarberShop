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

let shopCard = [];

loadShopCard();

const storeList = document.querySelector('.store-list');
storeList.addEventListener('click', onCardButtonClick);

function onCardButtonClick(e) {
  const btn = e.target.closest('button');
  const { card } = btn?.dataset || {};

  switch (card) {
    case 'card':
      
  const parent = e.target.closest('li');
  const { id } = parent?.dataset || {};

  const existingItem = shopCard.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
    cardShopList.innerHTML = createMarkup(shopCard);
    CalcTotalSum(shopCard);
    saveShopCard();
  } else {
    const newItem = storeCard.find(item => item.id === id);
    shopCard.push(newItem);
    cardShopList.innerHTML = createMarkup(shopCard);
    CalcTotalSum(shopCard);
    saveShopCard();
  };

  Notiflix.Notify.success('Вау, твій товар уже в кошику!');
    break
  };
};

// Функиця подсчета общей стоимости товаров

function CalcTotalSum(array) {
  const sum = array.map(item => item.price * item.quantity);
  let totalSum = sum.reduce((acc, item) => {
    return acc += item
  }, 0);

  const totalPriceContent = document.querySelector('.card-shop-total-price');
  totalPriceContent.textContent = `${totalSum} ₴`;
}

const modalShopCard = document.querySelector('.js-shop-card');
const cardShopList = document.querySelector('.card-shop-list');

// Функция показа корзины товаров

function showModalShopCard() {
  modalShopCard.classList.remove('is-hidden');
  document.body.classList.add('body-open');

  if (shopCard.length) {
    cardShopList.innerHTML = createMarkup(shopCard);
    shopCardFormBtn.disabled = false;
  } emptyShopCard();
  
  CalcTotalSum(shopcard);
};

const openCardBtn = document.querySelector('.open-card-shop-btn');
openCardBtn.addEventListener('click', showModalShopCard);

// Функция закрытия корзины товаров

modalShopCard.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeModalShopCard();
  };
});

function closeModalShopCard() {
  modalShopCard.classList.add('is-hidden');
  document.body.classList.remove('body-open');
};

const modalShopCardBtn = document.querySelector('.card-shop-btn');
modalShopCardBtn.addEventListener('click', closeModalShopCard);

// Функия создания разметки списка корзины товаров

function createMarkup(array) {
  return array.map(item => `<li class="card-shop-item" data-id="${item.id}">
  <img class="card-shop-img" src="${item.img}" alt="${item.name}" />
  <div class="item-text-wrap">
  <p class="card-item-text">${item.name}</p>
  <p class="store-item-price">${item.price} &#8372;</p>
  <p class="card-item-text">Кількість: ${item.quantity}</p>
  </div>
  <button class="card-item-btn" type="button">Видалити</button>
  </li>`).join('');
};

// Функция удаление товара с корзины

cardShopList.addEventListener('click', onClickDeleteCard);

function onClickDeleteCard(e) {

  if (e.target.nodeName !== 'BUTTON') {
    return
  }

  const parent = e.target.closest('li');
  const { id } = parent?.dataset || {};

  shopCard = shopCard.filter((card) => id !== card.id);
  emptyShopCard();
  saveShopCard();
  CalcTotalSum(shopCard);
  parent.remove();
};

// Local Storage Shopping

function saveShopCard() {
  try {
      localStorage.setItem('Shopping card', JSON.stringify(shopCard));
    } catch (error) {
      console.error('error');
    };
};

function loadShopCard() {
  try {
      shopCard = JSON.parse(localStorage.getItem('Shopping card')) || [];
    } catch (error) {
      console.error('error');
    };
};

// Функция показал текста и дезейбл кнопки если корзина пустая 

const shopCardFormBtn = document.querySelector('.card-shop-form-btn');

function emptyShopCard() {
  if (!shopCard.length) {
    cardShopList.innerHTML = '<p class="empty-shop-card">А, ой!<br> Тут ще нічого немає</p>';
    shopCardFormBtn.disabled = true;
  };
};

// Функция отправки корзины товара

const shopCardForm = document.querySelector('.card-shop-form');
shopCardForm.addEventListener('submit', onShopCardSubmit);

function onShopCardSubmit(e) {
  e.preventDefault();
  const name = e.target.elements.name.value.trim();
  const phone = e.target.elements.phone.value.trim();

  const sentOrder = {
    name,
    phone,
    shopCard: [...shopCard],
  };
  console.log(sentOrder);

  cardShopList.innerHTML = "<p class='shop-card-sent'>Дякуємо за замовлення!<br> Володимир незабаром з тобою зв'яжеться</p>";
  shopCard = [];
  saveShopCard();
  shopCardForm.reset();
};