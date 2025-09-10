export default async function decorate(block) {
  try {
    const itemEls = block.getAttribute('data-aue-resource');
    if (!itemEls) {
      return;
    }

    const jcrPath = itemEls.replace('urn:aemconnection:', '');
    const domain = window.location.origin;
    const url = `${domain}${jcrPath}.infinity.json`;

    const response = await fetch(url);
    if (!response.ok) {
      return;
    }

    const data = await response.json();

    // eslint-disable-next-line no-console
    console.log('joinlyca', data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('joinlyca:', error);
  }
}
