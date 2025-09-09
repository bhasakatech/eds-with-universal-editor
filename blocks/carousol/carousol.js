export default function decorate(block) {
  //  all 4 elements
  const leftBtn = block.querySelector('[data-aue-prop="leftbuttonimage"]');
  const rightBtn = block.querySelector('[data-aue-prop="rightbuttonimage"]');
  const image1 = block.querySelector('[data-aue-prop="image1"]');
  const image2 = block.querySelector('[data-aue-prop="image2"]');

  // Store slides in array
  const slides = [image1, image2];
  let currentIndex = 0;

  // Hide all except the first
  slides.forEach((s, i) => {
    s.style.display = i === 0 ? 'block' : 'none';
  });

  // === Create dots container ===
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
    if (i === 0) dot.classList.add('active'); // first dot active
    dot.addEventListener('click', () => {
      // show clicked slide
      slides[currentIndex].style.display = 'none';
      currentIndex = i;
      slides[currentIndex].style.display = 'block';
      updateDots();
    });
    dotsContainer.appendChild(dot);
  });

  block.appendChild(dotsContainer);

  // Left button click
  leftBtn.addEventListener('click', () => {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].style.display = 'block';
  });

  // Right button click
  rightBtn.addEventListener('click', () => {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].style.display = 'block';
  });

  setInterval(() => {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].style.display = 'block';
  }, 4000);
}
