// display.js
export function renderArtworks(artworks) {
    const container = document.getElementById("gallery");
    container.innerHTML = "";

    artworks.forEach(art => {
        container.innerHTML += `
      <div class="art-card">
        <h3>${art.title}</h3>
        <p>${art.artist}</p>
      </div>
    `;
    });
}



// Display featured art
export function renderFeaturedArt(artworks) {
    const container = document.querySelector("#featured-container");

    if (!container) return;

    artworks.forEach(art => {
        const card = document.createElement("div");
        card.classList.add("featured-card");

        card.innerHTML = `
        <img src="${art.primaryImageSmall}" alt="${art.title}">
        <h3>${art.title}</h3>
        <p>${art.artistDisplayName || "Unknown Artist"}</p>
        `;

        container.appendChild(card);
    });

}

//Display Galllery Art Work
export function renderGalleryArt(artworks) {
    const container = document.querySelector("#gallery-container")
    if (!container) return;
    //Clear previous content 
    container.innerHTML = "";

    if (!artworks || artworks.length === 0) {
        container.innerHTML = "<p class='no-result'>No artworks found.</p>";
    }

    artworks.forEach(art => {
        const card = document.createElement("div");
        card.classList.add("gallery-card");

        card.innerHTML = `
      <div class="gallery-image">
        <img 
          src="${art.primaryImageSmall}" 
          alt="${art.title || "Artwork"}"
          loading="lazy"
        >
        <div class="gallery-info">
            <h3>${art.title || "Untitled"}</h3>
            <p>${art.artistDisplayName || "Unknown Artist"}</p>
        </div>
      </div>
      
    `;

        container.appendChild(card);
    });

}


export function showImage(data) {
    const container = document.getElementById('full-view');
    const img = document.getElementById('full-image');
    const desc = document.getElementById('image-description');

    img.src = data.imageUrl;        // set new image
    img.alt = data.title || "Artwork";
    desc.textContent = data.description;  // set new description

    container.style.display = 'block';    // show the container
}

import { places } from './places.mjs';
import { getIcon } from './places.mjs';
import { museum } from './places.mjs';
import { calculateDistance } from './places.mjs';
export function renderNearbyPlaces(){
    const list = document.getElementById("places-list");

    places.map(place => ({
            ...place,
            distance: calculateDistance(
                museum.lat,
                museum.lon,
                place.lat,
                place.lon
            )
        }))
        .sort((a, b) => a.distance - b.distance)
        .forEach(place => {
            const li = document.createElement("li");
            li.innerHTML = `
      <h3>${getIcon(place.type)}<br>${place.name}</h3>
      <p>${place.distance.toFixed(2)} km away</p>
      <a href="https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}" target="_blank">
        View on Map
      </a>
    `;
            list.appendChild(li);
        });

}



export function displayArtists(artists) {
    const container = document.getElementById('artist-list');

    container.innerHTML = artists.map(artist => `
        <div class="artist-card">
            <img src="${artist.image || 'images/placeholder.jpg'}" alt="${artist.name}">
            <h3>${artist.name}</h3>
            <p>${artist.nationality}</p>
            <p>${artist.artworks.length} artworks</p>
        </div>
    `).join('');
}
