export default function decorate(block) {
  const leftBtn = block.querySelector('[data-aue-prop="leftbuttonimage"]');
  const rightBtn = block.querySelector('[data-aue-prop="rightbuttonimage"]');
  const image1 = block.querySelector('[data-aue-prop="image1"]');
  const image2 = block.querySelector('[data-aue-prop="image2"]');

  // ✅ block itself is the carousel container
  const carouselcontainer = block;

  // slides
  const slides = [image1, image2].filter(Boolean);
  let currentIndex = 0;

  slides.forEach((s, i) => {
    s.style.display = i === 0 ? 'block' : 'none';
  });

  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('carousel-dots');

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      slides[currentIndex].style.display = 'none';
      currentIndex = i;
      slides[currentIndex].style.display = 'block';
      updateDots();
    });
    dotsContainer.appendChild(dot);
  });

  // ✅ append dots inside .carousol block
  carouselcontainer.appendChild(dotsContainer);

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      slides[currentIndex].style.display = 'none';
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      slides[currentIndex].style.display = 'block';
      updateDots();
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      slides[currentIndex].style.display = 'none';
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].style.display = 'block';
      updateDots();
    });
  }

  setInterval(() => {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].style.display = 'block';
    updateDots();
  }, 4000);
}
