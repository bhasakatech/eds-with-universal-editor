export default async function decorate(block) {
  try {
    const itemEls = block.getAttribute('data-aue-resource');
    if (!itemEls) return;

    const jcrPath = itemEls.replace('urn:aemconnection:', '');
    const domain = window.location.origin;
    const url = `${domain}${jcrPath}.infinity.json`;

    const response = await fetch(url);
    if (!response.ok) return;

    const data = await response.json();

    // === Render only joinLycaList items ===
    if (data.joinLycaList) {
      const listContainer = document.createElement('div');
      listContainer.className = 'joinlyca-list';

      Object.keys(data.joinLycaList)
        .filter((key) => key.startsWith('item'))
        .forEach((key) => {
          const item = data.joinLycaList[key];
          const itemEl = document.createElement('div');
          itemEl.className = 'joinlyca-list-item';

          if (item.image) {
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title || '';
            itemEl.appendChild(img);
          }

          if (item.title) {
            const title = document.createElement('h3');
            title.textContent = item.title;
            itemEl.appendChild(title);
          }

          listContainer.appendChild(itemEl);
        });

      block.appendChild(listContainer);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('joinlyca:', error);
  }
}
