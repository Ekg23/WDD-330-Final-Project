import { getFeaturedArtworks } from "./apiData.mjs";
import { renderFeaturedArt } from "./display.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    const featured = await getFeaturedArtworks();
    renderFeaturedArt(featured);
});


import { getDefaultGalleryArtworks, getGalleryByCategory } from "./apiData.mjs";
import { renderGalleryArt } from "./display.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    // 1️⃣ Load default artworks
    const defaultArtworks = await getDefaultGalleryArtworks();
    renderGalleryArt(defaultArtworks);

    // 2️⃣ Handle category change
    const categorySelect = document.querySelector("#gallery-department");

    categorySelect.addEventListener("change", async () => {
        const category = categorySelect.value;
        if (!category) return;

        const filteredArtworks = await getGalleryByCategory(category);
        renderGalleryArt(filteredArtworks);
    });
});

import { fetchImageDetails } from './apiData.mjs';
import { showImage } from "./display.mjs";

document.querySelectorAll('.gallery-image').forEach(img => {
    img.addEventListener('click', async () => {
        const id = img.dataset.id;
        const data = await fetchImageDetails(id);
        showImage(data);  // just updates the single display area
    });
});
