export default async function decorate(block) {
  try {
    // Get resource path from block attribute
    const resource = block.getAttribute('data-aue-resource');
    if (!resource) return;

    const jcrPath = resource.replace('urn:aemconnection:', '');
    const domain = window.location.origin;
    const url = `${domain}${jcrPath}.infinity.json`;

    const response = await fetch(url);
    if (!response.ok) return;

    const data = await response.json();
    // eslint-disable-next-line no-console
    console.log('help block data', data);

    // Clear existing content
    block.innerHTML = '';

    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'help-wrapper';

    // Heading
    if (data.heading) {
      const headingEl = document.createElement('div');
      headingEl.className = 'help-heading';
      headingEl.innerHTML = data.heading; // already contains <h1>
      wrapper.appendChild(headingEl);
    }

    // Help List
    if (data.helpList) {
      const listEl = document.createElement('div');
      listEl.className = 'help-list';

      Object.keys(data.helpList)
        .filter((key) => key.startsWith('item'))
        .forEach((key) => {
          const item = data.helpList[key];
          if (!item) return;

          const itemEl = document.createElement('div');
          itemEl.className = 'help-item';

          // Image
          if (item.helpImage) {
            const img = document.createElement('img');
            img.src = item.helpImage;
            img.alt = 'help icon';
            itemEl.appendChild(img);
          }

          // Description (text with link)
          if (item.helpDescription) {
            const desc = document.createElement('div');
            desc.className = 'help-desc';
            desc.innerHTML = item.helpDescription; // contains <a> tags
            itemEl.appendChild(desc);
          }

          listEl.appendChild(itemEl);
        });

      wrapper.appendChild(listEl);
    }

    block.appendChild(wrapper);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error rendering help block:', err);
  }
}
