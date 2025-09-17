import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Helper: create list items from a JSON column list
 */
function createList(listData = {}) {
  const ul = document.createElement('ul');
  Object.keys(listData).forEach((key) => {
    const item = listData[key];
    if (item.title && item.link) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.link;
      a.textContent = item.title;
      li.appendChild(a);
      ul.appendChild(li);
    } else if (item.socialImages) {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = item.socialImages;
      img.alt = 'app-icon';
      li.appendChild(img);
      ul.appendChild(li);
    }
  });
  return ul;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment (default Franklin behavior)
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';
  const fragment = await loadFragment(footerPath);

  // clear block before decorating
  block.textContent = '';

  // Build footer wrapper
  const footer = document.createElement('div');
  footer.classList.add('footer-container');

  // Loop through fragment children OR JSON data
  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  // Example: if your JSON is exposed on window.footerModel
  if (window.footerModel && window.footerModel.block) {
    const {
      column1,
      column2,
      column3,
      column4,
      column5,
      column1List,
      column2List,
      column3List,
      column4List,
      column5List,
    } = window.footerModel.block;

    const wrapper = document.createElement('div');
    wrapper.classList.add('footer-columns');

    // Column 1
    if (column1) {
      const col = document.createElement('div');
      col.classList.add('footer-col');
      col.innerHTML = `<h4>${column1}</h4>`;
      col.appendChild(createList(column1List));
      wrapper.appendChild(col);
    }

    // Column 2
    if (column2) {
      const col = document.createElement('div');
      col.classList.add('footer-col');
      col.innerHTML = `<h4>${column2}</h4>`;
      col.appendChild(createList(column2List));
      wrapper.appendChild(col);
    }

    // Column 3
    if (column3) {
      const col = document.createElement('div');
      col.classList.add('footer-col');
      col.innerHTML = `<h4>${column3}</h4>`;
      col.appendChild(createList(column3List));
      wrapper.appendChild(col);
    }

    // Column 4
    if (column4) {
      const col = document.createElement('div');
      col.classList.add('footer-col');
      col.innerHTML = `<h4>${column4}</h4>`;
      col.appendChild(createList(column4List));
      wrapper.appendChild(col);
    }

    // Column 5 (social images)
    if (column5) {
      const col = document.createElement('div');
      col.classList.add('footer-col');
      col.innerHTML = `<h4>${column5}</h4>`;
      col.appendChild(createList(column5List));
      wrapper.appendChild(col);
    }

    footer.appendChild(wrapper);
  }

  block.append(footer);
}
