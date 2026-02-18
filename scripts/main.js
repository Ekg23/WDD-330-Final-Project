import { fetchArtwork, getGalleryByCategory } from "./apiData.mjs";
import { renderFeaturedArt, renderGalleryArt, displayArtists } from "./display.mjs";
import { groupArtworksByArtist } from './details.mjs';
import { getFavorites, saveFavorites, updateFavoriteUI } from "./favorite.mjs";
let ARTWORK_CACHE = [];

document.addEventListener('DOMContentLoaded', async () => {
    // 1️⃣ Fetch all artwork details once to avoid CORS
    ARTWORK_CACHE = await fetchArtwork();

    // 2️⃣ Render featured artworks from the cache
    const featured = ARTWORK_CACHE.slice(5, 9); // First 4 artworks for featured
    renderFeaturedArt(featured);

    // 3️⃣ Render the default gallery from the cache
    renderGalleryArt(ARTWORK_CACHE);
    updateFavoriteUI();

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
        updateFavoriteUI(); // Update favorite UI after rendering new artworks
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


document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery-container');
    if (!gallery) return;

    gallery.addEventListener('click', (e) => {
        const btn = e.target.closest('.favorite-btn');
        if (!btn) return;

        e.stopPropagation(); // prevents image click interference

        const card = btn.closest('.gallery-card');
        const artID = Number(card.dataset.id);

        let favorites = getFavorites();
        const index = favorites.findIndex(a => a.objectID === artID);

        if (index !== -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push({
                objectID: artID,
                title: card.querySelector('h3')?.textContent || 'Untitled',
                artistDisplayName: card.querySelector('p')?.textContent || '',
                primaryImageSmall: card.querySelector('img')?.src || ''
            });
        }

        saveFavorites(favorites);
        updateFavoriteUI();
    });
});


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


document.addEventListener('DOMContentLoaded', () => {
    const artistContainer = document.getElementById('artist-list');
    const artistModal = document.getElementById('artist-modal');
    const closeModal = document.getElementById('close-modal');

    if (!artistContainer || !artistModal || !closeModal) return;

    // Open modal when clicking an artist card
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
            artistModal.style.display = 'flex';
        }
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        artistModal.style.display = 'none';
    });

    // Optional: close modal when clicking outside the modal content
    artistModal.addEventListener('click', (e) => {
        if (e.target === artistModal) {
            artistModal.style.display = 'none';
        }
    });
});






// Favorites page logic
import { displayFavorites } from './display.mjs';

document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
});


// Favorites click handler
const gallery = document.getElementById('gallery-container');
if (gallery) {
    // Event delegation — only once
    gallery.addEventListener('click', (e) => {
        const btn = e.target.closest('.favorite-btn');
        if (!btn) return;

        e.stopPropagation();

        const card = btn.closest('.gallery-card');
        if (!card) return;

        const artID = Number(card.dataset.id);
        let favorites = getFavorites();
        const index = favorites.findIndex(a => a.objectID === artID);

        if (index !== -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push({
                objectID: artID,
                title: card.querySelector('h3')?.textContent || 'Untitled',
                artistDisplayName: card.querySelector('p')?.textContent || '',
                primaryImageSmall: card.querySelector('img')?.src || ''
            });
        }

        saveFavorites(favorites);
        updateFavoriteUI();
    });
}




// Search functionality
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent page reload

        const query = searchInput.value.trim().toLowerCase();

        let results = [];

        if (!query) {
            // Empty search → show full gallery
            results = ARTWORK_CACHE;
        } else {
            // Filter artworks by title or artist
            results = ARTWORK_CACHE.filter(art => {
                const title = art.title?.toLowerCase() || '';
                const artist = art.artistDisplayName?.toLowerCase() || '';
                return title.includes(query) || artist.includes(query);
            });
        }

        // Render the filtered results
        renderGalleryArt(results);

        // Update favorite hearts after rendering
        updateFavoriteUI();

        // Important: If you previously used attachFavoriteHandlers(), you would call it here
        // attachFavoriteHandlers(); // only if you still have it
    });
}
