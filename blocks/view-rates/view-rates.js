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

    // === Text + Link in same div ===
    if (data.text || data.arrowLink) {
      const textLinkWrapper = document.createElement('div');
      textLinkWrapper.className = 'text-link-wrapper'; // optional for CSS styling

      // Paragraph
      if (data.text) {
        const p = document.createElement('p');
        p.innerHTML = data.text; // use innerHTML to render HTML
        textLinkWrapper.appendChild(p);
      }

      // Anchor with arrow/icon
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

        textLinkWrapper.appendChild(link);
      }

      viewRatesWrapper.appendChild(textLinkWrapper);
    }

    block.innerHTML = ''; // clear authored markup
    block.appendChild(viewRatesWrapper);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('viewrates:', error);
  }
}
