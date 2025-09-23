export default async function decorate(block) {
  try {
    const resource = block.getAttribute('data-aue-resource');
    if (!resource) return;

    const jcrPath = resource.replace('urn:aemconnection:', '');
    const url = `${window.location.origin}${jcrPath}.infinity.json`;

    const response = await fetch(url);
    if (!response.ok) return;

    const data = await response.json();

    // eslint-disable-next-line no-console
    console.log('Lyca UI block data:', data);

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'lyca-ui-wrapper';

    // Heading
    if (data.heading) {
      const heading = document.createElement('div');
      heading.className = 'lyca-ui-heading';
      heading.innerHTML = data.heading;
      wrapper.appendChild(heading);
    }

    // Subheading
    if (data.subHeading) {
      const subHeading = document.createElement('div');
      subHeading.className = 'lyca-ui-subheading';
      subHeading.innerHTML = data.subHeading;
      wrapper.appendChild(subHeading);
    }

    // Buttons
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'lyca-ui-button-group';

    const rechargeBtn = document.createElement('button');
    rechargeBtn.className = 'lyca-ui-button recharge';
    rechargeBtn.textContent = data.rechargeButtonText || 'Recharge';

    const renewBtn = document.createElement('button');
    renewBtn.className = 'lyca-ui-button renew';
    renewBtn.textContent = data.renewButtonText || 'Renew Plan';

    buttonGroup.appendChild(rechargeBtn);
    buttonGroup.appendChild(renewBtn);
    wrapper.appendChild(buttonGroup);

    // Phone input
    const inputGroup = document.createElement('div');
    inputGroup.className = 'lyca-ui-input-group';

    const phoneWrapper = document.createElement('div');
    phoneWrapper.className = 'lyca-ui-phone-wrapper';

    const countryCode = document.createElement('span');
    countryCode.className = 'lyca-ui-country-code';
    countryCode.textContent = data.countryCode || '+91';

    const phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.placeholder = data.phonePlaceholder || 'Enter phone number';
    phoneInput.className = 'lyca-ui-phone-input';

    phoneWrapper.appendChild(countryCode);
    phoneWrapper.appendChild(phoneInput);
    inputGroup.appendChild(phoneWrapper);

    const validationMsg = document.createElement('p');
    validationMsg.className = 'lyca-ui-validation';
    validationMsg.textContent = data.validationMessage || 'Please enter your phone number!';
    validationMsg.style.display = 'none';
    inputGroup.appendChild(validationMsg);

    wrapper.appendChild(inputGroup);

    // App download section
    const appDownload = document.createElement('div');
    appDownload.className = 'lyca-ui-app-download';

    if (data.handmobileimage) {
      const appImg = document.createElement('img');
      appImg.src = data.handmobileimage;
      appImg.alt = 'Mobile App';
      appImg.className = 'lyca-ui-app-image';
      appDownload.appendChild(appImg);
    }

    const appTextWrapper = document.createElement('div');
    appTextWrapper.className = 'lyca-ui-app-text';

    if (data.appDownloadText) {
      const appText = document.createElement('div');
      appText.innerHTML = data.appDownloadText;
      appTextWrapper.appendChild(appText);
    }

    if (data.downloadapparrowimage) {
      const arrowImg = document.createElement('img');
      arrowImg.src = data.downloadapparrowimage;
      arrowImg.alt = 'Arrow';
      arrowImg.className = 'lyca-ui-arrow-image';
      appTextWrapper.appendChild(arrowImg);
    }

    appDownload.appendChild(appTextWrapper);
    wrapper.appendChild(appDownload);

    // Validation logic
    const validatePhone = () => {
      if (!phoneInput.value.trim()) {
        validationMsg.style.display = 'block';
      } else {
        validationMsg.style.display = 'none';
        // Trigger recharge or renew logic here
      }
    };

    rechargeBtn.addEventListener('click', validatePhone);
    renewBtn.addEventListener('click', validatePhone);

    // Final render
    block.innerHTML = '';
    block.appendChild(wrapper);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Lyca UI block error:', error);
  }
}
