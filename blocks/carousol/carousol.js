export default function decorate(block) {
  const slides = [...block.querySelectorAll(':scope > div')]; // each row = one slide

  if (!slides.length) return;

  let current = 0;

  // Wrap slides
  const wrapper = document.createElement('div');
  wrapper.classList.add('carousel-wrapper');

  slides.forEach((slide, i) => {
    slide.classList.add('carousel-slide');
    if (i !== 0) slide.style.display = 'none';
    wrapper.appendChild(slide);
  });

  block.innerHTML = '';
  block.appendChild(wrapper);

  // Controls
  const prev = document.createElement('button');
  prev.textContent = '‹';
  const next = document.createElement('button');
  next.textContent = '›';
  prev.className = 'carousel-prev';
  next.className = 'carousel-next';

  block.append(prev, next);

  function showSlide(index) {
    slides[current].style.display = 'none';
    current = (index + slides.length) % slides.length;
    slides[current].style.display = 'block';
  }

  prev.addEventListener('click', () => showSlide(current - 1));
  next.addEventListener('click', () => showSlide(current + 1));
}
