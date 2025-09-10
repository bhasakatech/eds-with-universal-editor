export default async function decorate(block) {
  try {
    // 1. Get resource path from block
    const resourceUrn = block.dataset.aueResource;
    if (!resourceUrn) {
      console.warn("Carousel: Missing data-aue-resource on block");
      return;
    }

    // Extract JCR path from URN (everything after `urn:aemconnection:`)
    const jcrPath = resourceUrn.replace("urn:aemconnection:", "");

    // 2. Build .model.json URL
    const url = `${jcrPath}.model.json`;

    // 3. Fetch JSON
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Carousel: Failed to fetch model", url);
      return;
    }
    const data = await response.json();

    // 🔑 Expecting structure like:
    // data.slides = [{ image: "...", title: "...", description: "..." }, ...]
    const slides = data.slides || [];
    if (slides.length === 0) {
      block.innerHTML = "<p>No carousel slides found.</p>";
      return;
    }

    // 4. Clear existing placeholders
    block.innerHTML = "";

    // 5. Create wrapper for slides
    const slidesWrapper = document.createElement("div");
    slidesWrapper.className = "carousel-slides";

    slides.forEach((slide, i) => {
      const slideEl = document.createElement("div");
      slideEl.className = "carousel-slide";
      if (i === 0) slideEl.classList.add("active");

      slideEl.innerHTML = `
        <img src="${slide.image}" alt="${slide.title || "Carousel Image"}"/>
        <div class="carousel-caption">
          <h3>${slide.title || ""}</h3>
          <p>${slide.description || ""}</p>
        </div>
      `;
      slidesWrapper.appendChild(slideEl);
    });

    // 6. Add navigation
    const prevBtn = document.createElement("button");
    prevBtn.className = "carousel-prev";
    prevBtn.textContent = "❮";

    const nextBtn = document.createElement("button");
    nextBtn.className = "carousel-next";
    nextBtn.textContent = "❯";

    // 7. Add dots
    const dotsWrapper = document.createElement("div");
    dotsWrapper.className = "carousel-dots";
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dotsWrapper.appendChild(dot);
    });

    // 8. Append to block
    block.appendChild(slidesWrapper);
    block.appendChild(prevBtn);
    block.appendChild(nextBtn);
    block.appendChild(dotsWrapper);

    // 9. Carousel functionality
    let currentIndex = 0;
    const slideEls = slidesWrapper.querySelectorAll(".carousel-slide");
    const dotEls = dotsWrapper.querySelectorAll(".dot");

    function showSlide(index) {
      slideEls.forEach((s, i) => s.classList.toggle("active", i === index));
      dotEls.forEach((d, i) => d.classList.toggle("active", i === index));
      currentIndex = index;
    }

    prevBtn.addEventListener("click", () => {
      const newIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    });

    nextBtn.addEventListener("click", () => {
      const newIndex = (currentIndex + 1) % slides.length;
      showSlide(newIndex);
    });

    dotEls.forEach((dot, i) => {
      dot.addEventListener("click", () => showSlide(i));
    });

  } catch (err) {
    console.error("Carousel error:", err);
  }
}
