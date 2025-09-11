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

    // === Render viewrates properties ===
    const viewRatesWrapper = document.createElement('div');
    viewRatesWrapper.className = 'view-rates-wrapper-dynamic';

    // Mobile Image
    if (data.mobileImage) {
      const img = document.createElement('img');
      img.src = data.mobileImage;
      img.alt = 'Mobile Image';
      viewRatesWrapper.appendChild(img);
    }

    // === Text ===
    if (data.text) {
      const textWrapper = document.createElement('div');
      textWrapper.innerHTML = data.text;
      viewRatesWrapper.appendChild(textWrapper);
    }

    // Arrow Icon with Link
    if (data.arrowLink) {
      const link = document.createElement('a');
      link.href = data.arrowLink;

      if (data.arrowIcon) {
        const icon = document.createElement('img');
        icon.src = data.arrowIcon;
        icon.alt = 'Arrow';
        link.appendChild(icon);
      } else {
        link.textContent = 'View Rates';
      }

      viewRatesWrapper.appendChild(link);
    }

    block.innerHTML = ''; // clear authored markup
    block.appendChild(viewRatesWrapper);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('viewrates:', error);
  }
}
