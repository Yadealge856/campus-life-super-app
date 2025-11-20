console.log("MVP starting...");

// Mock event data
const mockEvents = [
	{ title: "Campus Concert", date: "Nov 20" },
	{ title: "Tech Expo", date: "Dec 1" }
];

document.addEventListener("click", e => {
	if (e.target.classList.contains("add-calendar")) {
		console.log("Added to calendar!");
	}
});

// Placeholder for future API fetch
async function loadEvents() {
	console.log("API coming soon...");
}
