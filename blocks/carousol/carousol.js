export default function decorate(block) {
  try {
    console.log("Carousel init:", block);

    // 1. Find item elements inside block (children with data-aue-resource)
    const itemEls = block.querySelectorAll("[data-aue-resource*='/block/test/item']");
    if (!itemEls.length) {
      console.warn("Carousel: No items found");
      return;
    }
    console.log(`Carousel: Found ${itemEls.length} items`);
  } catch (err) {
    console.error("Carousel error:", err);
  }
}
