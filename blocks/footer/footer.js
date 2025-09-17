// import { getMetadata } from '../../scripts/aem.js';
// import { loadFragment } from '../fragment/fragment.js';

// /**
//  * loads and decorates the footer
//  * @param {Element} block The footer block element
//  */
// export default async function decorate(block) {
//   const footerMeta = getMetadata('footer');
//   const footerPath = footerMeta
//     ? new URL(footerMeta, window.location).pathname
//     : '/footer';

//   try {
//     // try JSON first
//     if (footerPath.endsWith('.json') || footerPath === '/footer') {
//       const res = await fetch('/footer.json');
//       if (res.ok) {
//         const data = await res.json();

//         // eslint-disable-next-line no-console
//         console.log('Footer JSON data:', data);
//         const model = data.models.find((m) => m.id === 'footer');

//         // eslint-disable-next-line no-console
//         console.log('Footer model:', model);
//         block.textContent = '';
//         const wrapper = document.createElement('div');
//         wrapper.classList.add('footer-columns');

//         // Loop through each column
//         // eslint-disable-next-line no-plusplus
//         for (let i = 1; i <= 5; i++) {
//           const heading = model.fields.find((f) => f.name === `column${i}`);
//           const list = model.fields.find((f) => f.name === `column${i}List`);

//           const col = document.createElement('div');
//           col.classList.add('footer-col');

//           if (heading?.value) {
//             col.innerHTML = `<h4>${heading.value}</h4>`;
//           }

//           if (list?.value && Array.isArray(list.value)) {
//             const ul = document.createElement('ul');
//             list.value.forEach((item) => {
//               if (item.title) {
//                 const li = document.createElement('li');
//                 li.innerHTML = `<a href="${item.link || '#'}">${
//                   item.title
//                 }</a>`;
//                 ul.appendChild(li);
//               }
//             });
//             col.appendChild(ul);
//           }

//           wrapper.appendChild(col);
//         }

//         block.append(wrapper);
//         return; // Stop here, no need for fragment
//       }
//     }

//     // fallback: load fragment as usual
//     const fragment = await loadFragment(footerPath);
//     block.textContent = '';
//     const footer = document.createElement('div');
//     while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
//     block.append(footer);
//   } catch (err) {
//     // eslint-disable-next-line no-console
//     console.error('Footer render failed:', err);
//   }
// }
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
