export default async function decorate(block) {
  try {
    console.log("Carousel init:", block);

    // 1. Get resource path
    const itemEls = block.getAttribute("data-aue-resource");
    console.log("Carousel: itemEls", itemEls);
    if (!itemEls) {
      console.warn("Carousel: Missing data-aue-resource");
      return;
    }

    // 2. Extract JCR path
    const jcrPath = itemEls.replace("urn:aemconnection:", "");
    console.log("Carousel jcrPath:", jcrPath);

    // 3. Add domain + infinity.json
    const domain = window.location.origin; // e.g. http://localhost:4502
    const url = `${domain}${jcrPath}.infinity.json`;
    console.log("Carousel fetch URL:", url);

    // 4. Fetch data (use await)
    const response = await fetch(url);
    console.log("Carousel fetch response:", response);

    if (!response.ok) {
      console.error("Carousel: Failed to fetch", url);
      return;
    }

    // 5. Parse JSON (use await)
    const data = await response.json();
    console.log("Carousel JSON data:", data);

    // 👉 Now you can loop through data to build your carousel
    // Example:
    // if (data && data.item0) {
    //   Object.keys(data).forEach(key => {
    //     console.log("Carousel Item:", data[key]);
    //   });
    // }

  } catch (error) {
    console.error("Carousel: Error", error);
  }
}
