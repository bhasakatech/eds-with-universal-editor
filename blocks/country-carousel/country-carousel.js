// export default async function decorate(block) {
//   try {
//     const resource = block.getAttribute('data-aue-resource');
//     if (!resource) return;

//     const jcrPath = resource.replace('urn:aemconnection:', '');
//     const domain = window.location.origin;
//     const url = `${domain}${jcrPath}.infinity.json`;

//     const response = await fetch(url);
//     if (!response.ok) return;

//     const data = await response.json();

//     // eslint-disable-next-line no-console
//     console.log('country carousel data', data);

//     block.innerHTML = '';

//     // Wrapper
//     const wrapper = document.createElement('div');
//     wrapper.className = 'country-carousel';

//     // Title
//     if (data.title) {
//       const titleEl = document.createElement('h2');
//       titleEl.className = 'carousel-title';
//       titleEl.textContent = data.title;
//       wrapper.appendChild(titleEl);
//     }

//     // Carousel Row
//     const carouselRow = document.createElement('div');
//     carouselRow.className = 'carousel-row';

//     // Left Arrow
//     if (data.leftArrowImage) {
//       const leftArrow = document.createElement('img');
//       leftArrow.className = 'carousel-arrow left-arrow';
//       leftArrow.src = data.leftArrowImage;
//       leftArrow.alt = 'Previous';
//       carouselRow.appendChild(leftArrow);
//     }

//     // Countries Wrapper
//     const countriesWrapper = document.createElement('div');
//     countriesWrapper.className = 'countries-wrapper';

//     if (data.countryCarouselList) {
//       Object.keys(data.countryCarouselList)
//         .filter((key) => key.startsWith('item'))
//         .forEach((key) => {
//           const item = data.countryCarouselList[key];
//           if (!item) return;

//           const countryEl = document.createElement('div');
//           countryEl.className = 'country-item';

//           if (item.countryImage) {
//             const img = document.createElement('img');
//             img.className = 'country-flag';
//             img.src = item.countryImage;
//             img.alt = item.countryTitle || 'Country';
//             countryEl.appendChild(img);
//           }

//           if (item.countryTitle) {
//             const title = document.createElement('div');
//             title.className = 'country-name';
//             title.textContent = item.countryTitle;
//             countryEl.appendChild(title);
//           }

//           countriesWrapper.appendChild(countryEl);
//         });
//     }

//     carouselRow.appendChild(countriesWrapper);

//     // Right Arrow
//     if (data.rightArrowImage) {
//       const rightArrow = document.createElement('img');
//       rightArrow.className = 'carousel-arrow right-arrow';
//       rightArrow.src = data.rightArrowImage;
//       rightArrow.alt = 'Next';
//       carouselRow.appendChild(rightArrow);
//     }

//     wrapper.appendChild(carouselRow);
//     block.appendChild(wrapper);
//   } catch (err) {
//     // eslint-disable-next-line no-console
//     console.error('Error rendering country carousel:', err);
//   }
// }

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
    console.log('country carousel data', data);

    block.innerHTML = '';

    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'country-carousel';

    // Title
    if (data.title) {
      const titleEl = document.createElement('h2');
      titleEl.className = 'carousel-title';
      titleEl.textContent = data.title;
      wrapper.appendChild(titleEl);
    }

    // Carousel Row
    const carouselRow = document.createElement('div');
    carouselRow.className = 'carousel-row';

    // Left Arrow
    let leftArrow;
    if (data.leftArrowImage) {
      leftArrow = document.createElement('img');
      leftArrow.className = 'carousel-arrow left-arrow';
      leftArrow.src = data.leftArrowImage;
      leftArrow.alt = 'Previous';
      carouselRow.appendChild(leftArrow);
    }

    // Countries Wrapper
    const countriesWrapper = document.createElement('div');
    countriesWrapper.className = 'countries-wrapper';

    if (data.countryCarouselList) {
      Object.keys(data.countryCarouselList)
        .filter((key) => key.startsWith('item'))
        .forEach((key) => {
          const item = data.countryCarouselList[key];
          if (!item) return;

          const countryEl = document.createElement('div');
          countryEl.className = 'country-item';

          if (item.countryImage) {
            const img = document.createElement('img');
            img.className = 'country-flag';
            img.src = item.countryImage;
            img.alt = item.countryTitle || 'Country';
            countryEl.appendChild(img);
          }

          if (item.countryTitle) {
            const title = document.createElement('div');
            title.className = 'country-name';
            title.textContent = item.countryTitle;
            countryEl.appendChild(title);
          }

          countriesWrapper.appendChild(countryEl);
        });
    }

    carouselRow.appendChild(countriesWrapper);

    // Right Arrow
    let rightArrow;
    if (data.rightArrowImage) {
      rightArrow = document.createElement('img');
      rightArrow.className = 'carousel-arrow right-arrow';
      rightArrow.src = data.rightArrowImage;
      rightArrow.alt = 'Next';
      carouselRow.appendChild(rightArrow);
    }

    wrapper.appendChild(carouselRow);
    block.appendChild(wrapper);

    // ==========================
    // Carousel Functionality
    // ==========================
    let currentIndex = 0;

    const getStep = () => {
      const firstItem = countriesWrapper.querySelector('.country-item');
      if (!firstItem) return 0;
      const style = window.getComputedStyle(countriesWrapper);
      const gapValue = style.gap || '40px';
      const gap = parseInt(gapValue, 10) || 40;
      return firstItem.offsetWidth + gap;
    };

    const updateSlide = () => {
      const step = getStep();
      countriesWrapper.style.transition = 'transform 0.4s ease-in-out';
      countriesWrapper.style.transform = `translateX(-${currentIndex * step}px)`;

      // eslint-disable-next-line no-console
      console.log('Slide updated → currentIndex:', currentIndex, 'transform:', countriesWrapper.style.transform);
    };

    // Left arrow click
    if (leftArrow) {
      leftArrow.addEventListener('click', () => {
        // eslint-disable-next-line no-console
        console.log('Left arrow clicked');
        if (currentIndex > 0) {
          currentIndex -= 1;
          updateSlide();
        }
      });
    }

    // Right arrow click
    if (rightArrow) {
      rightArrow.addEventListener('click', () => {
        // eslint-disable-next-line no-console
        console.log('Right arrow clicked');
        const totalItems = countriesWrapper.querySelectorAll('.country-item').length;
        const visibleItems = Math.max(
          1,
          Math.floor(wrapper.offsetWidth / Math.max(1, getStep())),
        );
        if (currentIndex < totalItems - visibleItems) {
          currentIndex += 1;
          updateSlide();
        }
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error rendering country carousel:', err);
  }
}
