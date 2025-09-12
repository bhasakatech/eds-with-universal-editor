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
    console.log('appdownload data from json', data);

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'download-app-wrapper';

    // Create layout container
    const layout = document.createElement('div');
    layout.className = 'download-app-layout';

    // Left container (Main Image)
    const leftContainer = document.createElement('div');
    leftContainer.className = 'download-app-left';

    if (data.appDownloadImage) {
      const mainImg = document.createElement('img');
      mainImg.src = data.appDownloadImage;
      mainImg.alt = 'App Download';
      mainImg.className = 'download-app-main-img'; // ✅ Scoped class for styling
      leftContainer.appendChild(mainImg);
    }

    // Right container (Heading + Icon List + Download Badges)
    const rightContainer = document.createElement('div');
    rightContainer.className = 'download-app-right';

    if (data.downloadAppTitle) {
      const heading = document.createElement('div');
      heading.className = 'download-app-heading';
      heading.innerHTML = data.downloadAppTitle;
      rightContainer.appendChild(heading);
    }

    if (data.downloadAppList) {
      const listContainer = document.createElement('div');
      listContainer.className = 'download-app-list';

      Object.keys(data.downloadAppList)
        .filter((key) => key.startsWith('item'))
        .forEach((key) => {
          const item = data.downloadAppList[key];
          const itemEl = document.createElement('div');
          itemEl.className = 'download-app-item';

          if (item.iconImage) {
            const icon = document.createElement('img');
            icon.src = item.iconImage;
            icon.alt = item.iconText || '';
            itemEl.appendChild(icon);
          }

          if (item.iconText) {
            const text = document.createElement('p');
            text.textContent = item.iconText;
            itemEl.appendChild(text);
          }

          listContainer.appendChild(itemEl);
        });

      rightContainer.appendChild(listContainer);
    }

    if (data.imageList) {
      const imagesContainer = document.createElement('div');
      imagesContainer.className = 'download-app-images';

      Object.keys(data.imageList)
        .filter((key) => key.startsWith('item'))
        .forEach((key) => {
          const imgData = data.imageList[key];
          if (imgData.image) {
            const img = document.createElement('img');
            img.src = imgData.image;
            img.alt = '';
            imagesContainer.appendChild(img);
          }
        });

      rightContainer.appendChild(imagesContainer);
    }

    // Assemble layout
    layout.appendChild(leftContainer);
    layout.appendChild(rightContainer);
    wrapper.appendChild(layout);

    block.innerHTML = '';
    block.appendChild(wrapper);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('download-app block error:', error);
  }
}
