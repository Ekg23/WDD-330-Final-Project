const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

/**
 * Fetch artworks once and cache them locally
 */
export async function fetchArtwork(limit = 60) {
    // Check if we already have the data cached
    const cached = localStorage.getItem('artworkData');
    if (cached) {
        return JSON.parse(cached); // Return cached data
    }

    // If not cached, fetch from the API
    const searchRes = await fetch(`${BASE_URL}/search?q=art&hasImages=true`);
    const data = await searchRes.json();
    if (!data.objectIDs) return [];

    const ids = data.objectIDs.slice(0, limit);

    const artworks = await Promise.all(
        ids.map(id =>
            fetch(`${BASE_URL}/objects/${id}`).then(res => res.json()).catch(() => null)
        )
    );

    const validArtworks = artworks.filter(a => a); // Remove failed fetches

    // Cache the results locally
    localStorage.setItem('artworkData', JSON.stringify(validArtworks));

    return validArtworks; // Return fresh data
}

/**
 * Fetch artworks by category (no caching here, fetches fresh each time)
 */
export async function getGalleryByCategory(category, limit =60) {
    if (!category) return [];

    const searchRes = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(category)}&hasImages=true`);
    const data = await searchRes.json();

    if (!data.objectIDs) return [];

    const ids = data.objectIDs.slice(0, limit);

    const artworks = await Promise.all(
        ids.map(id =>
            fetch(`${BASE_URL}/objects/${id}`).then(res => res.json()).catch(() => null)
        )
    );

    return artworks.filter(a => a); // Remove failed fetches
}


/* ---------- FEATURED ARTWORKS ---------- */
export async function getFeaturedArtworks() {
    const cached = localStorage.getItem('featuredData');
    if (cached) {
        return JSON.parse(cached);
    }

    const FEATURED_IDS = [436121, 459055, 437853, 436532];
    const artworks = await Promise.all(
        FEATURED_IDS.map(id =>
            fetch(`${BASE_URL}/objects/${id}`).then(res => res.json()).catch(() => null)
        )
    );

    const validArtworks = artworks.filter(a => a && a.primaryImageSmall);
    localStorage.setItem('featuredData', JSON.stringify(validArtworks));

    return validArtworks;
}