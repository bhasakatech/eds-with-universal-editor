import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function buildColumn(title, list = {}) {
  const col = document.createElement('div');
  col.classList.add('footer-column');

  if (title) {
    const h4 = document.createElement('h4');
    h4.textContent = title;
    col.append(h4);
  }

  const ul = document.createElement('ul');
  Object.values(list).forEach((item) => {
    if (item.link && item.title) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.link;
      a.textContent = item.title;
      li.append(a);
      ul.append(li);
    }
  });

  col.append(ul);
  return col;
}

function buildSocialColumn(title, list = {}) {
  const col = document.createElement('div');
  col.classList.add('footer-column', 'footer-social');

  if (title) {
    const h4 = document.createElement('h4');
    h4.textContent = title;
    col.append(h4);
  }

  const wrapper = document.createElement('div');
  wrapper.classList.add('social-icons');

  Object.values(list).forEach((item) => {
    if (item.socialImages) {
      const img = document.createElement('img');
      img.src = item.socialImages;
      wrapper.append(img);
    }
  });

  col.append(wrapper);
  return col;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment (same as your code)
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // clear block
  block.textContent = '';

  // parse JSON inside fragment (if present)
  const dataEl = fragment.querySelector('script[type="application/json"]');
  if (!dataEl) {
    console.error('No footer JSON found inside fragment');
    return;
  }
  const data = JSON.parse(dataEl.textContent);

  // wrapper container
  const container = document.createElement('div');
  container.classList.add('footer-container');

  // build columns 1–4
  container.append(buildColumn(data.column1, data.column1List));
  container.append(buildColumn(data.column2, data.column2List));
  container.append(buildColumn(data.column3, data.column3List));
  container.append(buildColumn(data.column4, data.column4List));

  // build social column
  container.append(buildSocialColumn(data.column5, data.column5List));

  // final footer wrapper
  const footer = document.createElement('div');
  footer.classList.add('footer');
  footer.append(container);

  block.append(footer);
}
