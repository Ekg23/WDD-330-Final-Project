export const museum = {
    lat: 40.7794,
    lon: -73.9632
};

export const places = [
    {
        name: "Central Park Café",
        type: "cafe",
        lat: 40.7812,
        lon: -73.9665
    },
    {
        name: "Modern Art Gallery",
        type: "gallery",
        lat: 40.7780,
        lon: -73.9602
    },
    {
        name: "Riverside Park",
        type: "park",
        lat: 40.8007,
        lon: -73.9708
    },
    {
        name: "City Museum Shop",
        type: "shop",
        lat: 40.7803,
        lon: -73.9621
    },
    {
        name: "Heritage Restaurant",
        type: "restaurant",
        lat: 40.7775,
        lon: -73.9640
    },
    {
        name: "Artisan Coffee House",
        type: "cafe",
        lat: 40.7758,
        lon: -73.9614
    },
    {
        name: "Green Leaf Park",
        type: "park",
        lat: 40.7829,
        lon: -73.9699
    },
    {
        name: "Local History Gallery",
        type: "gallery",
        lat: 40.7763,
        lon: -73.9587
    }
];


// Calculate the distance using latitude and logitude 
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}



export function getIcon(type) {
    const icons = {
        cafe: "☕ Café",
        gallery: "🖼️ Gallery",
        park: "🌳 Park",
        restaurant: "🍽️ Restaurant",
        shop: "🛍️ Shop"
    };
    return icons[type] || "📍 Place";
}
