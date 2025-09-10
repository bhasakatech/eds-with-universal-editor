export default async function decorate(block) {
  try {
    const itemEls = block.getAttribute("data-aue-resource");
    const jcrPath = itemEls.replace("urn:aemconnection:", "");
    const domain = window.location.origin;
    const url = `${domain}${jcrPath}.infinity.json`;
    const response = await fetch(url);
    console.log("Carousel fetch response:", response);

    // 1. Parse JSON (use await)
    const data = await response.json();
    console.log("Carousel JSON data:", data);

    if (data.test) {
      const slides = Object.keys(data.test)
        .filter((key) => key.startsWith("item")) 
        .map((key) => data.test[key]);

      console.log("✅ Carousel slides:", slides);
    } else {
      console.warn("Carousel: No slides found under 'test'");
    }

  } catch (error) {
    console.error("Carousel: Error", error);
  }
}
