document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousol.block');
  const slides = carousel.querySelectorAll("img[data-aue-prop^='image']");
  const leftBtn = carousel.querySelector("img[data-aue-prop='leftbuttonimage']");
  const rightBtn = carousel.querySelector("img[data-aue-prop='rightbuttonimage']");

  let currentIndex = 0;

  function showSlide(index) {
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;
  }

  leftBtn.parentElement.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  rightBtn.parentElement.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });
});
