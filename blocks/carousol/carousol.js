export default async function decorate(block) {
  try {
    // 1. Get resource path from block
    const resourceUrn = block.dataset.aueResource;
    console.log("Carousel resourceUrn:", resourceUrn);
    if (!resourceUrn) {
      console.warn("Carousel: Missing data-aue-resource on block");
      return;
    }

    // Extract JCR path from URN (everything after `urn:aemconnection:`)
    const jcrPath = resourceUrn.replace("urn:aemconnection:", "");

    console.log("Carousel jcrPath:", jcrPath);

    // 2. Build .model.json URL
    const url = `${jcrPath}.model.json`;

    console.log("Carousel model URL:", url);

    // 3. Fetch JSON
    const response = await fetch(url);
    console.log("Carousel fetch response:", response);
    if (!response.ok) {
      console.error("Carousel: Failed to fetch model", url);
      return;
    }
    const data = await response.json();

    console.log("Carousel model data:", data);

  } catch (err) {
    console.error("Carousel error:", err);
  }
}
