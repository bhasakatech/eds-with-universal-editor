export default function decorate(block) {
  try {
    console.log("Carousel init:", block);
    const itemEls = block.getAttribute("data-aue-resource")

    console.log("Carousel: itemEls", itemEls);
    const jcrPath = itemEls.replace("urn:aemconnection:", "");
    console.log("Carousel jcrPath:", jcrPath);

    // 3. Build infinity.json URL
    const url = `${jcrPath}.infinity.json`;
    console.log("Carousel fetch URL:", url);

    // 4. Fetch data
    const response = fetch(url);
    if (!response.ok) {
      console.error("Carousel: Failed to fetch", url);
      return;
    }
    const data = response.json();
    console.log("Carousel JSON data:", data);
  } catch (error) {
    console.error("Carousel: Error", error);
  }
}
