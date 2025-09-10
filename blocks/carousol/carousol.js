export default async function decorate(block) {
  try {
    const itemEls = block.getAttribute("data-aue-resource");
    if (!itemEls) {
      console.warn("Carousel: Missing data-aue-resource");
      return;
    }

    const jcrPath = itemEls.replace("urn:aemconnection:", "");
    const domain = window.location.origin;
    const url = `${domain}${jcrPath}.infinity.json`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error("Carousel: Failed to fetch", url);
      return;
    }

    const data = await response.json();
    console.log("Carousel JSON data:", data);

    if (!data.test) {
      console.warn("Carousel: No slides found under 'test'");
      return;
    }

    // === Build slides dynamically from JSON ===
    const slides = Object.keys(data.test)
      .filter((key) => key.startsWith("item"))
      .map((key) => data.test[key]);

    console.log("Carousel slides:", slides);

    // Create slide elements inside block
    const slideEls = slides.map((slide) => {
      const img = document.createElement("img");
      img.src = slide.image;
      img.alt = slide.alt || "";
      img.style.display = "none"; // hide initially
      img.classList.add("carousel-slide");
      block.appendChild(img);
      return img;
    });

    // === Add navigation buttons ===
    const leftBtn = block.querySelector('[data-aue-prop="leftbuttonimage"]');
    const rightBtn = block.querySelector('[data-aue-prop="rightbuttonimage"]');

    let currentIndex = 0;

    // Show first slide
    if (slideEls.length > 0) {
      slideEls[0].style.display = "block";
    }

    // === Create dots ===
    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("carousel-dots");

    function updateDots() {
      dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    slideEls.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        slideEls[currentIndex].style.display = "none";
        currentIndex = i;
        slideEls[currentIndex].style.display = "block";
        updateDots();
      });

      dotsContainer.appendChild(dot);
    });

    block.appendChild(dotsContainer);

    // === Left button navigation ===
    if (leftBtn) {
      leftBtn.addEventListener("click", () => {
        slideEls[currentIndex].style.display = "none";
        currentIndex = (currentIndex - 1 + slideEls.length) % slideEls.length;
        slideEls[currentIndex].style.display = "block";
        updateDots();
      });
    }

    // === Right button navigation ===
    if (rightBtn) {
      rightBtn.addEventListener("click", () => {
        slideEls[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % slideEls.length;
        slideEls[currentIndex].style.display = "block";
        updateDots();
      });
    }

    // === Auto-play every 4s ===
    setInterval(() => {
      if (slideEls.length > 0) {
        slideEls[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % slideEls.length;
        slideEls[currentIndex].style.display = "block";
        updateDots();
      }
    }, 4000);
  } catch (error) {
    console.error("Carousel: Error", error);
  }
}
