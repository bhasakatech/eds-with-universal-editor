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

    // eslint-disable-next-line no-console
    console.log('whylycadata from json', data);

    // === Render whyLycaList ===
    const wrapper = document.createElement('div');
    wrapper.className = 'why-lyca-list-dynamic';

    // Loop through JSON items (item0, item1, etc.)
    Object.keys(data)
      .filter((key) => key.startsWith('item'))
      .forEach((key) => {
        const item = data[key];
        const itemEl = document.createElement('div');
        itemEl.className = 'why-lyca-list-item';

        // Image
        if (item.image) {
          const img = document.createElement('img');
          img.src = item.image;
          img.alt = 'Why Lyca Feature';
          itemEl.appendChild(img);
        }

        // Description (richtext from AEM)
        if (item.whyLycaDescription) {
          const desc = document.createElement('div');
          desc.innerHTML = item.whyLycaDescription;
          itemEl.appendChild(desc);
        }

        wrapper.appendChild(itemEl);
      });

    // Clear authored markup & append rendered content
    block.innerHTML = '';
    block.appendChild(wrapper);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('whyLycaList:', error);
  }
}
