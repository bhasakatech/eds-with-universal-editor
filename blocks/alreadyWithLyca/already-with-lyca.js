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
    console.log('alreadyWithLyca data', data);

    // === Main Wrapper ===
    const wrapper = document.createElement('div');
    wrapper.className = 'lyca-wrapper';

    // === Heading Section ===
    if (data.heading) {
      const heading = document.createElement('div');
      heading.className = 'lyca-heading';
      heading.innerHTML = data.heading;
      wrapper.appendChild(heading);
    }

    if (data.subHeading) {
      const subHeading = document.createElement('p');
      subHeading.className = 'lyca-subheading';
      subHeading.innerHTML = data.subHeading;
      wrapper.appendChild(subHeading);
    }

    // === Buttons (Recharge + Renew Plan) ===
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'lyca-buttons';

    if (data.rechargeButtonText) {
      const rechargeBtn = document.createElement('button');
      rechargeBtn.className = 'lyca-btn recharge-btn';
      rechargeBtn.textContent = data.rechargeButtonText;
      buttonContainer.appendChild(rechargeBtn);
    }

    if (data.renewButtonText) {
      const renewBtn = document.createElement('button');
      renewBtn.className = 'lyca-btn renew-btn';
      renewBtn.textContent = data.renewButtonText;
      buttonContainer.appendChild(renewBtn);
    }

    wrapper.appendChild(buttonContainer);

    // === Phone Input Section ===
    const phoneContainer = document.createElement('div');
    phoneContainer.className = 'lyca-phone-container';

    const countryCode = document.createElement('span');
    countryCode.className = 'lyca-country-code';
    countryCode.textContent = data.countryCode || '+1';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = data.phonePlaceholder || 'Enter your Number';
    input.className = 'lyca-phone-input';

    const arrowBtn = document.createElement('button');
    arrowBtn.className = 'lyca-arrow-btn';
    if (data.ctaArrowImage) {
      const arrowImg = document.createElement('img');
      arrowImg.src = data.ctaArrowImage;
      arrowImg.alt = 'Submit';
      arrowBtn.appendChild(arrowImg);
    }

    phoneContainer.appendChild(countryCode);
    phoneContainer.appendChild(input);
    phoneContainer.appendChild(arrowBtn);

    wrapper.appendChild(phoneContainer);

    // === Validation Message ===
    if (data.validationMessage) {
      const validation = document.createElement('div');
      validation.className = 'lyca-validation';
      validation.textContent = data.validationMessage;
      wrapper.appendChild(validation);
    }

    // === App Download Link ===
    if (data.appDownloadText && data.appDownloadLink) {
      const appDownload = document.createElement('div');
      appDownload.className = 'lyca-app-download';

      const appLink = document.createElement('a');
      appLink.href = data.appDownloadLink;
      appLink.innerHTML = data.appDownloadText;
      appDownload.appendChild(appLink);

      wrapper.appendChild(appDownload);
    }

    // === Replace Block Content ===
    block.innerHTML = '';
    block.appendChild(wrapper);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('alreadyWithLyca block error:', error);
  }
}
