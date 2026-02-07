const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";


export async function fetchArtwork() {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data);
    return data;
}

// Search artworks by keyword 
export async function searchArtworks(query) {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    const data = await response.json();
    return data.objectIDs || [];
}

// Get full details for ONE artwork
export async function getArtworkDetails(id) {
    const response = await fetch(`${BASE_URL}/objects/${id}`);
    return await response.json();
}

// Get featured artwork
export async function getFeaturedArtworks() {
    const FEATURED_IDS = [
        436535,
        459055,
        437853,
        435882
    ];

    const artworks = await Promise.all(
        FEATURED_IDS.map(id => getArtworkDetails(id))
    );

    return artworks.filter(art => art.primaryImageSmall);
}

// Get default Art Work for Gallery 
export async function getDefaultGalleryArtworks() {
    const response = await fetch(`${BASE_URL}/search?hasImages=true&q=art`);
    const data = await response.json();
    const ids = data.objectIDs.slice(0, 24);
    const artworks = await Promise.all(
        ids.map(id => fetch(`${BASE_URL}/objects/${id}`).then(res => res.json())
        )
    );
    return artworks.filter(art => art.primaryImageSmall);
}


export async function getGalleryByCategory(category) {
    const response = await fetch(
        `${BASE_URL}/search?hasImages=true&q=${category}`
    );
    const data = await response.json();

    const ids = data.objectIDs.slice(0, 24);

    const artworks = await Promise.all(
        ids.map(id =>
            fetch(`${BASE_URL}/objects/${id}`).then(res => res.json())
        )
    );

    return artworks.filter(art => art.primaryImageSmall);
}

export async function fetchImageDetails(objectID) {
    try {
        const response = await fetch(`${BASE_URL}/${objectID}`)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // expects { imageUrl, title, description }
        return data;
    }   catch (error) {
        console.error('Error fetching image details:', error);
        return null;
    }
}

    
    