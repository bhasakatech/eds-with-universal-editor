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

export default function decorate(block) {
  const resourceUrn = block.dataset.aueResource;
  if (!resourceUrn) return;

  const resourcePath = resourceUrn.replace('urn:aemconnection:', '');

  fetch(`${resourcePath}.model.json`)
    .then((resp) => resp.json())
    .then((json) => {
      const countries = json?.items || [];
      const wrapper = document.createElement('div');
      wrapper.className = 'country-carousel';

      // title
      const title = document.createElement('h2');
      title.className = 'carousel-title';
      title.textContent = json.title || 'Cheap international calls for everyone';
      wrapper.appendChild(title);

      // row
      const row = document.createElement('div');
      row.className = 'carousel-row';

      // left arrow
      const leftArrow = document.createElement('img');
      leftArrow.className = 'carousel-arrow left-arrow';
      leftArrow.src = '/content/dam/lyca-mobile/assets/leftArrowBlue.4aabcacc1.svg';
      leftArrow.alt = 'Previous';
      row.appendChild(leftArrow);

      // countries wrapper
      const countriesWrapper = document.createElement('div');
      countriesWrapper.className = 'countries-wrapper';

      // track inside wrapper
      const track = document.createElement('div');
      track.className = 'countries-track';
      countriesWrapper.appendChild(track);

      countries.forEach((c) => {
        const item = document.createElement('div');
        item.className = 'country-item';

        if (c.flag) {
          const img = document.createElement('img');
          img.className = 'country-flag';
          img.src = c.flag;
          img.alt = c.name || 'Country';
          item.appendChild(img);
        }

        if (c.name) {
          const name = document.createElement('div');
          name.className = 'country-name';
          name.textContent = c.name;
          item.appendChild(name);
        }

        track.appendChild(item);
      });

      row.appendChild(countriesWrapper);

      // right arrow
      const rightArrow = document.createElement('img');
      rightArrow.className = 'carousel-arrow right-arrow';
      rightArrow.src = '/content/dam/lyca-mobile/assets/rightArrowBlue.beb7ab20.svg';
      rightArrow.alt = 'Next';
      row.appendChild(rightArrow);

      wrapper.appendChild(row);
      block.appendChild(wrapper);

      // --- SLIDER LOGIC ---
      let currentIndex = 0;
      const itemWidth = 200; // px, match CSS
      const gap = 40; // px, match CSS
      const step = itemWidth + gap;

      function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * step}px)`;
      }

      if (leftArrow) {
        leftArrow.addEventListener('click', () => {
          if (currentIndex > 0) {
            currentIndex -= 1;
            updateSlide();
          }
        });
      }

      if (rightArrow) {
        rightArrow.addEventListener('click', () => {
          if (currentIndex < track.children.length - 1) {
            currentIndex += 1;
            updateSlide();
          }
        });
      }
    });
}
