export default function decorate(block) {
  const leftBtn = block.querySelector('[data-aue-prop="leftbuttonimage"]');
  const rightBtn = block.querySelector('[data-aue-prop="rightbuttonimage"]');
  const image1 = block.querySelector('[data-aue-prop="image1"]');
  const image2 = block.querySelector('[data-aue-prop="image2"]');
  const image3 = block.querySelector('[data-aue-prop="image3"]');

  // Collect available slides (ignore nulls)
  const slides = [image1, image2, image3].filter(Boolean);
  let currentIndex = 0;

  // Hide all except the first
  slides.forEach((s, i) => {
    s.style.display = i === 0 ? 'block' : 'none';
  });

  // === Create dots container ===
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('carousel-dots');

  // Function to update active dot
  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // Create dots dynamically for each slide
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active'); // First dot active
    dot.addEventListener('click', () => {
      slides[currentIndex].style.display = 'none';
      currentIndex = i;
      slides[currentIndex].style.display = 'block';
      updateDots();
    });
    dotsContainer.appendChild(dot);
  });

  // Append dots below carousel block
  block.appendChild(dotsContainer);

  // === Left button click ===
  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      slides[currentIndex].style.display = 'none';
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      slides[currentIndex].style.display = 'block';
      updateDots();
    });
  }

  // === Right button click ===
  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      slides[currentIndex].style.display = 'none';
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].style.display = 'block';
      updateDots();
    });
  }

  // === Auto-play every 4s ===
  setInterval(() => {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].style.display = 'block';
    updateDots();
  }, 4000);
}
