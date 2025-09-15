export default async function decorate(block) {
  try {
    // Get JCR Path from data-aue-resource
    const resourceAttr = block.getAttribute('data-aue-resource');
    if (!resourceAttr) return;

    const jcrPath = resourceAttr.replace('urn:aemconnection:', '');
    const domain = window.location.origin;
    const url = `${domain}${jcrPath}.infinity.json`;

    // Fetch JSON
    const response = await fetch(url);
    if (!response.ok) return;
    const data = await response.json();

    // eslint-disable-next-line no-console
    console.log('Fetched JSON:', data);

    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'your-component-wrapper';

    // Example: Heading
    if (data.title) {
      const heading = document.createElement('h2');
      heading.className = 'your-component-heading';
      heading.innerHTML = data.title;
      wrapper.appendChild(heading);
    }

    // Example: Description
    if (data.description) {
      const desc = document.createElement('p');
      desc.className = 'your-component-desc';
      desc.innerHTML = data.description;
      wrapper.appendChild(desc);
    }

    // Example: Image
    if (data.image) {
      const img = document.createElement('img');
      img.src = data.image;
      img.alt = data.alt || 'Image';
      img.className = 'your-component-image';
      wrapper.appendChild(img);
    }

    // Example: Multifield List
    if (data.itemList) {
      const listContainer = document.createElement('div');
      listContainer.className = 'your-component-list';

      Object.keys(data.itemList)
        .filter((key) => key.startsWith('item'))
        .forEach((key) => {
          const item = data.itemList[key];
          const el = document.createElement('div');
          el.className = 'your-component-item';
          el.innerHTML = `<span>${item.text}</span>`;
          listContainer.appendChild(el);
        });

      wrapper.appendChild(listContainer);
    }

    // Replace block content
    block.innerHTML = '';
    block.appendChild(wrapper);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error rendering block:', err);
  }
}
