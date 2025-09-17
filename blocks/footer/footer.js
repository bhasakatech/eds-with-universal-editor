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
    fragment = document.createElement('div');
    fragment.textContent = 'Footer fragment not found.';
  }

  // Clear block
  block.textContent = '';

  // Create wrapper
  const footer = document.createElement('div');
  footer.classList.add('footer-container');

  // Add fragment content if available
  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  block.append(footer);

  console.log('Footer block finished.');
}
