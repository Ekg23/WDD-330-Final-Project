import { fetchArtwork, getGalleryByCategory } from "./apiData.mjs";
import { renderFeaturedArt, renderGalleryArt, displayArtists } from "./display.mjs";
import { groupArtworksByArtist } from './details.mjs';

let ARTWORK_CACHE = [];

document.addEventListener('DOMContentLoaded', async () => {
    // 1️⃣ Fetch all artwork details once to avoid CORS
    ARTWORK_CACHE = await fetchArtwork();

    // 2️⃣ Render featured artworks from the cache
    const featured = ARTWORK_CACHE.slice(0, 4); // First 4 artworks for featured
    renderFeaturedArt(featured);

    // 3️⃣ Render the default gallery from the cache
    renderGalleryArt(ARTWORK_CACHE);

    // 4️⃣ Group artworks by artist and display them
    const artists = groupArtworksByArtist(ARTWORK_CACHE);
    displayArtists(artists);
});

// Handle category changes for the gallery
document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.querySelector("#gallery-department");
    if (!categorySelect) return; 

    categorySelect.addEventListener("change", async () => {
        const category = categorySelect.value;
        if (!category) return;

        const filteredArtworks = await getGalleryByCategory(category);
        renderGalleryArt(filteredArtworks);
    });
});

// Handle artwork click to show details from cache
const galleryContainer = document.getElementById('gallery-container');

if (galleryContainer) {
    galleryContainer.addEventListener('click', (e) => {
        const img = e.target.closest('img');
        if (!img) return;

        const id = Number(img.dataset.id);
        const artwork = ARTWORK_CACHE.find(a => a.objectID === id);
        if (!artwork) return;

        showArtworkDetails(artwork); // Only display from cached data
    });
}

function showArtworkDetails(art) {
    const container = document.getElementById('details-container');
    if (!container) return;

    container.innerHTML = `
        <img src="${art.primaryImageSmall}" alt="${art.title}">
        <h2>${art.title}</h2>
        <p><strong>Artist:</strong> ${art.artistDisplayName || 'Unknown'}</p>
        <p><strong>Date:</strong> ${art.objectDate || 'N/A'}</p>
        <p><strong>Medium:</strong> ${art.medium || 'N/A'}</p>
    `;
}


import { renderNearbyPlaces } from "./display.mjs";
document.addEventListener("DOMContentLoaded", renderNearbyPlaces);



// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
    const hamButton = document.getElementById('ham-btn');
    const navMenu = document.getElementById('nav-menu');
    const mainContent = document.querySelector('main');

    hamButton.addEventListener('click', () => {
        hamButton.classList.toggle('show');
        navMenu.classList.toggle('show');
        mainContent.classList.toggle('menu-open');
    });
});    

import { fetchEvents } from "./events.mjs";
document.addEventListener("DOMContentLoaded", async () => {
    await fetchEvents();
});



async function init() {
    const artworks = await fetchArtwork();          // fetch ONCE
    const artists = groupArtworksByArtist(artworks); // reuse data
    displayArtists(artists);                          // render
}

document.addEventListener('DOMContentLoaded', init);



document.addEventListener('DOMContentLoaded', () => {
    const artistContainer = document.getElementById('artist-list');
    if (artistContainer) {
        artistContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.artist-card');
            if (!card) return;

            const artistName = card.querySelector('h3').textContent;
            const artist = ARTWORK_CACHE.find(art => art.artistDisplayName === artistName);

            if (artist) {
                document.getElementById('modal-artist-name').textContent = artist.artistDisplayName;
                document.getElementById('modal-artist-bio').textContent = artist.artistBio || 'No bio available';
                document.getElementById('modal-artist-born').textContent = artist.artistBeginDate || 'N/A';
                document.getElementById('modal-artist-style').textContent = artist.artistNationality || 'N/A';

                const modalArtworksContainer = document.getElementById('modal-artworks');
                if (artist.artworks && Array.isArray(artist.artworks)) {
                    modalArtworksContainer.innerHTML = artist.artworks.map(a => `
            <div class="modal-artwork">
                <img src="${a.primaryImageSmall}" alt="${a.title}">
                <p>${a.title}</p>
            </div>
        `).join('');
                } else {
                    modalArtworksContainer.innerHTML = '<p>No artworks available.</p>';
                }

                // Show the modal
                document.getElementById('artist-modal').style.display = 'flex';
            }
    // rest of your logic here
        });
    }
});



document.getElementById('artist-modal').style.display = 'flex';
const closeModal = document.getElementById('close-modal');
closeModal.addEventListener('click', () => {
    document.getElementById('artist-modal').style.display = 'none';
});
