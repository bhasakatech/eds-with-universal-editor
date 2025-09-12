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
    console.log('whylyca data:', data);

    const wrapper = document.createElement('div');
    wrapper.className = 'whylyca-dynamic';

    // Heading
    if (data.heading) {
      const heading = document.createElement('div');
      heading.innerHTML = data.heading; // keep <h1>
      wrapper.appendChild(heading);
    }

    // List
    if (data.whyLycaList) {
      const list = document.createElement('div');
      list.className = 'whylyca-list';

      Object.keys(data.whyLycaList)
        .filter((k) => k.startsWith('item'))
        .forEach((key) => {
          const item = data.whyLycaList[key];

          const card = document.createElement('div');
          card.className = 'whylyca-item';

          if (item.image) {
            const img = document.createElement('img');
            img.src = item.image;
            card.appendChild(img);
          }

          if (item.whyLycaDescription) {
            const desc = document.createElement('div');
            desc.innerHTML = item.whyLycaDescription; // keep <p>, <strong>
            card.appendChild(desc);
          }

          list.appendChild(card);
        });

      wrapper.appendChild(list);
    }

    block.innerHTML = '';
    block.appendChild(wrapper);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('whylyca block error:', err);
  }
}
