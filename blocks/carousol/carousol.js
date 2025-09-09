export default function decorate(block) {
  const leftBtn = block.querySelector('[data-aue-prop="leftbuttonimage"]');
  const rightBtn = block.querySelector('[data-aue-prop="rightbuttonimage"]');
  const image1 = block.querySelector('[data-aue-prop="image1"]');
  const image2 = block.querySelector('[data-aue-prop="image2"]');
  const image3 = block.querySelector('[data-aue-prop="image3"]');

  const slides = [image1, image2, image3].filter(Boolean);
  let currentIndex = 0;

  // Show first slide only
  slides.forEach((s, i) => {
    s.style.display = i === 0 ? 'block' : 'none';
  });

  // === Create dots ===
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('carousel-dots');

  // === Update dots state ===
  function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
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

  block.appendChild(dotsContainer);

  // Left button
  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      slides[currentIndex].style.display = 'none';
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      slides[currentIndex].style.display = 'block';
      updateDots();
    });
  }

  // Right button
  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      slides[currentIndex].style.display = 'none';
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].style.display = 'block';
      updateDots();
    });
  }

  // Auto-play every 4s
  setInterval(() => {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].style.display = 'block';
    updateDots();
  }, 4000);
}
