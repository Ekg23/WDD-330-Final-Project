export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}



export function updateFavoriteUI() {
    const favorites = getFavorites();
    const favCount = favorites.length;
    const favCountDisplay = document.getElementById('fav-count');

    // Update the count in the navbar
    if (favCountDisplay) {
        favCountDisplay.textContent = favCount;
    }

    // Update heart buttons in the gallery
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const artID = parseInt(btn.closest('.gallery-card').dataset.id);
        if (favorites.some(art => art.objectID === artID)) {
            btn.classList.add('favorited'); // Add filled heart class
        } else {
            btn.classList.remove('favorited'); // Remove filled heart class
        }
    });
}

