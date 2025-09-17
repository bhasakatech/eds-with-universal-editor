import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  console.log('Footer block starting...');

  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';

  let fragment;
  try {
    fragment = await loadFragment(footerPath);
    console.log('Fragment loaded:', fragment);
  } catch (e) {
    console.error('Error loading fragment:', e);
    return;
  }

  // Clear block
  block.textContent = '';

  // Create wrapper
  const footer = document.createElement('div');
  footer.classList.add('footer-container');

  // 👉 Instead of moving the original children (which causes recursion),
  // clone them safely
  [...fragment.children].forEach((child) => {
    footer.append(child.cloneNode(true));
  });

  block.append(footer);

  console.log('Footer block finished.');
}
