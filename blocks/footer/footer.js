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
  data[listKey].forEach((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.link || '#';
    a.textContent = item.text || '';
    li.appendChild(a);
    ul.appendChild(li);
  });

  col.appendChild(ul);
  return col;
}

export default async function decorate(block) {
  try {
    const resource = block.getAttribute('data-aue-resource');
    if (!resource) return;

    const jcrPath = resource.replace('urn:aemconnection:', '');
    const domain = window.location.origin;
    const url = `${domain}${jcrPath}.infinity.json`;

    const response = await fetch(url);
    if (!response.ok) return;

    const data = await response.json();

    // eslint-disable-next-line no-console
    console.log('footer block data', data);

    block.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'footer-container';

    const col1 = renderColumn('Join Lyca Mobile', 'column1List', data);
    const col2 = renderColumn('Quick links', 'column2List', data);
    const col3 = renderColumn('Help & support', 'column3List', data);
    const col4 = renderColumn('Lyca Mobile US', 'column4List', data);

    [col1, col2, col3, col4].forEach((c) => c && wrapper.appendChild(c));

    if (data.column5List) {
      const col5 = document.createElement('div');
      col5.className = 'footer-column footer-social';

      const h4 = document.createElement('h4');
      h4.textContent = 'Lyca on the go';
      col5.appendChild(h4);

      const iconsWrapper = document.createElement('div');
      iconsWrapper.className = 'social-icons';

      data.column5List.forEach((item) => {
        const img = document.createElement('img');
        img.src = item.image || '';
        img.alt = item.alt || '';
        iconsWrapper.appendChild(img);
      });

      col5.appendChild(iconsWrapper);
      wrapper.appendChild(col5);
    }

    block.appendChild(wrapper);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Err or rendering footer block:', err);
  }
}
