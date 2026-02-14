export async function fetchDetails(artId) {
    try {
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`);
        const data = await res.json();

        displayDetails(data);

        // optional: toggle sections
        document.getElementById('gallery-section').hidden = true;
        document.getElementById('details-section').hidden = false;

    } catch (err) {
        console.error('Error fetching details:', err);
    }
}



export function groupArtworksByArtist(artworks) {
    const map = {};

    artworks.forEach(art => {
        const name = art.artistDisplayName || 'Unknown Artist';

        if (!map[name]) {
            map[name] = {
                name,
                nationality: art.artistNationality || '',
                image: art.primaryImageSmall || '',
                artworks: []
            };
        }

        map[name].artworks.push(art);
    });

    return Object.values(map);
}
