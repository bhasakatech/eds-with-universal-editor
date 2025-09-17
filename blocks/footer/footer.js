import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Renders a single footer column from JSON
 */
function renderColumn(title, listKey, data) {
  if (!data[listKey]) return null;

  const col = document.createElement('div');
  col.className = 'footer-column';

  if (title) {
    const h4 = document.createElement('h4');
    h4.textContent = title;
    col.appendChild(h4);
  }

  const ul = document.createElement('ul');
  const items = Object.values(data[listKey]);

  items.forEach((item) => {
    if (item.title && item.link) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.link;
      a.textContent = item.title;
      li.appendChild(a);
      ul.appendChild(li);
    }
  });

  col.appendChild(ul);
  return col;
}

/**
 * Loads and decorates the footer
 */
export default async function decorate(block) {
  try {
    // 1️⃣ Try JSON first
    const footerMeta = getMetadata('footer');
    const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
    const jsonUrl = `${footerPath}.infinity.json`;

    const response = await fetch(jsonUrl);
    if (response.ok) {
      const data = await response.json();
      // eslint-disable-next-line no-console
      console.log('Footer JSON data:', data);

      block.innerHTML = '';

      const wrapper = document.createElement('div');
      wrapper.className = 'footer-container';

      const col1 = renderColumn('Join Lyca Mobile', 'column1List', data);
      const col2 = renderColumn('Quick links', 'column2List', data);
      const col3 = renderColumn('Help & support', 'column3List', data);
      const col4 = renderColumn('Lyca Mobile US', 'column4List', data);

      [col1, col2, col3, col4].forEach((c) => c && wrapper.appendChild(c));

      // Social icons (column5List)
      if (data.column5List) {
        const col5 = document.createElement('div');
        col5.className = 'footer-column footer-social';

        const h4 = document.createElement('h4');
        h4.textContent = 'Lyca on the go';
        col5.appendChild(h4);

        const iconsWrapper = document.createElement('div');
        iconsWrapper.className = 'social-icons';

        const items = Object.values(data.column5List);

        items.forEach((item) => {
          if (item.socialImages) {
            const img = document.createElement('img');
            img.src = item.socialImages;
            img.alt = 'social icon';
            iconsWrapper.appendChild(img);
          }
        });

        col5.appendChild(iconsWrapper);
        wrapper.appendChild(col5);
      }

      block.appendChild(wrapper);
      return; // ✅ Stop here, JSON succeeded
    }

    // 2️⃣ Fallback: load footer as fragment
    const fragment = await loadFragment(footerPath);
    block.textContent = '';
    const footerEl = document.createElement('div');
    while (fragment.firstElementChild) footerEl.append(fragment.firstElementChild);
    block.appendChild(footerEl);

  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error rendering footer block:', err);
  }
}
