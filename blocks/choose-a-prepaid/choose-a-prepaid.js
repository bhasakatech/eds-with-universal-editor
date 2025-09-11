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
    console.log(data);

    // === Render Choose a Prepaid Block ===
    const prepaidWrapper = document.createElement('div');
    prepaidWrapper.className = 'choose-prepaid-dynamic';

    // Heading
    if (data.chooseHeading) {
      const heading = document.createElement('h1');
      heading.innerHTML = data.chooseHeading; // keep richtext
      prepaidWrapper.appendChild(heading);
    }

    // Description
    if (data.choosdescription) {
      const desc = document.createElement('p');
      desc.innerHTML = data.choosdescription;
      prepaidWrapper.appendChild(desc);
    }

    // Prepaid List
    if (data.choosePrepaidList) {
      const listContainer = document.createElement('div');
      listContainer.className = 'prepaid-list';

      const items = Array.isArray(data.choosePrepaidList)
        ? data.choosePrepaidList
        : Object.keys(data.choosePrepaidList)
          .filter((key) => key.startsWith('item'))
          .map((key) => data.choosePrepaidList[key]);

      items.forEach((item) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'prepaid-list-item';

        if (item.image) {
          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.title || '';
          itemEl.appendChild(img);
        }

        if (item.imageDescription) {
          const desc = document.createElement('div');
          desc.innerHTML = item.imageDescription; // richtext from AEM
          itemEl.appendChild(desc);
        }

        listContainer.appendChild(itemEl);
      });

      prepaidWrapper.appendChild(listContainer);
    }

    block.innerHTML = ''; // clear authored markup
    block.appendChild(prepaidWrapper);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('choose-a-prepaid:', error);
  }
}
