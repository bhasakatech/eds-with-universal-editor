export default function decorate(block) {
  const imagePaths = block.dataset.image?.split(',') || [];

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('teaser-carousel');

  imagePaths.forEach((path) => {
    const img = document.createElement('img');
    img.src = path.trim(); // Trim any whitespace
    img.alt = block.dataset.imageAlt || 'Teaser image';
    imageContainer.appendChild(img);
  });

  block.innerHTML = ''; // Clear original content
  block.appendChild(imageContainer);

  // Optionally: Add JS to turn this into a real carousel
}
