export default function decorate(block) {
  const leftBtn = block.querySelector('[data-aue-prop="leftbuttonimage"]');
  const rightBtn = block.querySelector('[data-aue-prop="rightbuttonimage"]');
  const image1 = block.querySelector('[data-aue-prop="image1"]');
  const image2 = block.querySelector('[data-aue-prop="image2"]');
  const image3 = block.querySelector('[data-aue-prop="image3"]');

  const slides = [image1, image2, image3].filter(Boolean);
  let currentIndex = 0;

  slides.forEach((s, i) => {
    s.style.display = i === 0 ? 'block' : 'none';
  });

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      slides[currentIndex].style.display = 'none';
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      slides[currentIndex].style.display = 'block';
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      slides[currentIndex].style.display = 'none';
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].style.display = 'block';
    });
  }

  setInterval(() => {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].style.display = 'block';
  }, 4000);
}
