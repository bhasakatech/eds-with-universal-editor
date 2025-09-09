export default function decorate(block) {

  const leftBtn = block.querySelector('[data-aue-prop="leftbuttonimage"]');
  const rightBtn = block.querySelector('[data-aue-prop="rightbuttonimage"]');
  const image1 = block.querySelector('[data-aue-prop="image1"]');
  const image2 = block.querySelector('[data-aue-prop="image2"]');
const carouselcontainer=block.querySelector('.carousel')
  // === i created array with image 1 and 2 ===
  const slides = [image1, image2];
  let currentIndex = 0;

  // Hide all except first
  slides.forEach((s, i) => {
    s.style.display = i === 0 ? 'block' : 'none';
  });

  // main div container for keeping or wrapind  dots div
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('carousel-dots');

  // Helper to update dots active state
  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // Creating single dots dynamically
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active'); // first one active
    dot.addEventListener('click', () => {
      slides[currentIndex].style.display = 'none';
      currentIndex = i;
      slides[currentIndex].style.display = 'block';
      updateDots();
    });
    dotsContainer.appendChild(dot);
  });

  // Appending dots at end of block
  carouselcontainer.appendChild(dotsContainer);

  // === Left button click ===
  leftBtn.addEventListener('click', () => {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].style.display = 'block';
    updateDots();
  });

  // === Right button click ===
  rightBtn.addEventListener('click', () => {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].style.display = 'block';
    updateDots();
  });

  // === Auto-play every 4s ===
  setInterval(() => {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].style.display = 'block';
    updateDots();
  }, 4000);
}
