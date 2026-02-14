const API_KEY = "aK48D4Ihw8zdkM9t5Shr4Zq0uj8GfvNb";
const EVENTS_URL = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=art&apikey=${API_KEY}`;


export async function fetchEvents() {
    try {
        const res = await fetch(EVENTS_URL);
        const data = await res.json();

        console.log(data); // keep this while testing

        displayEvents(data._embedded?.events);

    } catch (err) {
        console.error("Error fetching events:", err);
    }
}


export function displayEvents(events) {
    const container = document.getElementById("events-container");
    if (!container) return; 
    container.innerHTML = "";

    if (!events || events.length === 0) {
        container.innerHTML = "<p>No events found.</p>";
        return;
    }

    events.forEach(event => {
        const card = document.createElement("article");
        card.className = "event-card";

        const image = event.images?.[0]?.url || "";
        const venue = event._embedded?.venues?.[0]?.name || "Unknown venue";
        const date = event.dates?.start?.localDate || "Date TBA";

        card.innerHTML = `
            <img src="${image}" alt="${event.name}">
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Venue:</strong> ${venue}</p>
            <a href="${event.url}" target="_blank">View Event</a>
        `;

        container.appendChild(card);
    });
}


