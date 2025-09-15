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
    console.log('signup block data', data);

    // Clear
    block.innerHTML = '';

    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'signup-wrapper';

    // Heading
    if (data.heading) {
      const headingEl = document.createElement('div');
      headingEl.className = 'signup-heading';
      headingEl.innerHTML = data.heading; // already contains <h1>
      wrapper.appendChild(headingEl);
    }

    // Form
    const formEl = document.createElement('form');
    formEl.className = 'signup-form';

    // Input
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';

    const input = document.createElement('input');
    input.type = 'email';
    input.placeholder = data.emailPrompt
      ? data.emailPrompt.replace(/<[^>]+>/g, '') // strip <p>
      : 'Enter your email address';
    input.className = 'signup-input';
    inputWrapper.appendChild(input);

    formEl.appendChild(inputWrapper);

    // Button
    if (data.signUpButtonText) {
      const button = document.createElement('button');
      button.type = 'submit';
      button.className = 'signup-button';
      button.innerHTML = data.signUpButtonText; // contains <p>
      formEl.appendChild(button);
    }

    wrapper.appendChild(formEl);

    // Description
    if (data.emailDesctiption) {
      const descEl = document.createElement('div');
      descEl.className = 'signup-description';
      descEl.innerHTML = data.emailDesctiption;
      wrapper.appendChild(descEl);
    }

    block.appendChild(wrapper);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error rendering signup block:', err);
  }
}
