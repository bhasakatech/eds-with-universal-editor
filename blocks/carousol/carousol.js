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
