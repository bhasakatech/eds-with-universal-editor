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
    console.log('blog list data', data);

    // Clear existing content
    block.innerHTML = '';

    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'bloglist-wrapper';

    // Heading
    if (data.heading) {
      const headingEl = document.createElement('div');
      headingEl.className = 'bloglist-heading';
      headingEl.innerHTML = data.heading; // already contains <h1>
      wrapper.appendChild(headingEl);
    }

    // Blog List
    if (data.blogList) {
      const listEl = document.createElement('div');
      listEl.className = 'bloglist-inner';

      Object.keys(data.blogList)
        .filter((key) => key.startsWith('item'))
        .forEach((key) => {
          const item = data.blogList[key];
          if (!item) return;

          const card = document.createElement('div');
          card.className = 'blog-card';

          // Image
          if (item.blogImage) {
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'blog-card-image';

            const img = document.createElement('img');
            img.src = item.blogImage;
            img.alt = 'Blog Image';

            imgWrapper.appendChild(img);
            card.appendChild(imgWrapper);
          }

          // Description (title + meta)
          if (item.blogDescription) {
            const content = document.createElement('div');
            content.className = 'blog-card-content';
            content.innerHTML = item.blogDescription; // already contains <p>, <strong>
            card.appendChild(content);
          }

          listEl.appendChild(card);
        });

      wrapper.appendChild(listEl);
    }

    block.appendChild(wrapper);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error rendering blog list block:', err);
  }
}
