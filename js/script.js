// Lasell University Campus Life Super App
// This file contains all the JavaScript for interactivity, API calls, and rendering.

// Fetch and display live weather using OpenWeather API (or Open-Meteo for demo)
function fetchWeather() {
	const weatherDiv = document.getElementById('weather');
	if (!weatherDiv) return;
	// Lasell University: Newton, MA
	const lat = 42.3426, lon = -71.2276;
	const apiKey = 'demo'; // Replace with your OpenWeather API key
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
	fetch(url)
		.then(res => res.json())
		.then(data => {
			if (data.current_weather) {
				const temp = data.current_weather.temperature;
				const wind = data.current_weather.windspeed;
				weatherDiv.innerHTML = `<div class="alert alert-info" role="alert">Current Weather: ${temp}&deg;C, Wind: ${wind} km/h</div>`;
			} else {
				weatherDiv.innerHTML = `<div class="alert alert-warning" role="alert">Weather data unavailable.</div>`;
			}
		})
		.catch(() => {
			weatherDiv.innerHTML = `<div class="alert alert-danger" role="alert">Could not load weather.</div>`;
		});
}

console.log("MVP starting...");

// Mock event data for demo purposes
const mockEvents = [
	{ id: 1, title: "Campus Concert", date: "2025-11-20", loc: "Campus Green" },
	{ id: 2, title: "Tech Expo", date: "2025-12-01", loc: "Engineering Hall" }
];

// Mock dining menu data
const mockDining = {
	breakfast: [{ name: "Breakfast Sandwich", price: 3.5 }],
	lunch: [{ name: "Chicken Salad", price: 6.25 }],
	dinner: [{ name: "Pasta Primavera", price: 7.5 }]
};

// Render events to the events page
function renderEvents(list = mockEvents) {
	const container = document.getElementById('events-list');
	if (!container) return;
	container.innerHTML = '';
	list.forEach(ev => {
		const col = document.createElement('div');
		col.className = 'mb-3';
		col.innerHTML = `
			<div class="border p-3">
				<h4>${ev.title}</h4>
				<p>Date: ${ev.date}</p>
				<p>Location: ${ev.loc || 'TBD'}</p>
				<button class="btn btn-secondary add-calendar" data-id="${ev.id}">Add to Calendar</button>
			</div>
		`;
		container.appendChild(col);
	});
}

// Wire up the search bar for events
function wireSearch() {
	const input = document.getElementById('event-search');
	if (!input) return;
	input.addEventListener('input', (e) => {
		const q = e.target.value.toLowerCase();
		const filtered = mockEvents.filter(ev => ev.title.toLowerCase().includes(q) || (ev.loc || '').toLowerCase().includes(q));
		renderEvents(filtered);
	});
}

// Show a temporary toast message (used for Add to Calendar)
function showToast(message) {
	const t = document.createElement('div');
	t.textContent = message;
	t.style.position = 'fixed';
	t.style.right = '16px';
	t.style.bottom = '16px';
	t.style.background = 'rgba(0,0,0,0.85)';
	t.style.color = 'white';
	t.style.padding = '10px 14px';
	t.style.borderRadius = '6px';
	t.style.zIndex = 9999;
	document.body.appendChild(t);
	setTimeout(() => t.remove(), 2000);
}

// Add to Calendar button handler (shows toast)
function addToCalendar(eventObj) {
	showToast(`Added "${eventObj.title}" to your calendar (placeholder)`);
}

// Delegate click events for Add to Calendar buttons
// (so dynamically rendered buttons work)
document.addEventListener('click', e => {
	const target = e.target;
	if (target.classList.contains('add-calendar')) {
		const id = target.getAttribute('data-id');
		const ev = mockEvents.find(x => String(x.id) === String(id));
		if (ev) addToCalendar(ev);
	}
});

// Render dining menu sections to the dining page
function renderDining() {
	const container = document.getElementById('dining-sections');
	if (!container) return;
	container.innerHTML = '';
	const makeSection = (title, items) => {
		const div = document.createElement('div');
		div.className = 'border p-3 mb-3';
		div.innerHTML = `<h4>${title}</h4>` + items.map(i => `<p>${i.name} – $${i.price.toFixed(2)}</p>`).join('');
		return div;
	};
	container.appendChild(makeSection('Breakfast (6–10 AM)', mockDining.breakfast));
	container.appendChild(makeSection('Lunch (11–3 PM)', mockDining.lunch));
	container.appendChild(makeSection('Dinner (5–9 PM)', mockDining.dinner));
}

// Initialize all features on page load
document.addEventListener('DOMContentLoaded', () => {
	renderEvents();
	wireSearch();
	renderDining();
	fetchWeather();

	// Feature button navigation (Home page)
	const btnEvents = document.getElementById('btn-events');
	if (btnEvents) btnEvents.addEventListener('click', () => {
		window.location.href = 'events.html';
	});
	const btnDining = document.getElementById('btn-dining');
	if (btnDining) btnDining.addEventListener('click', () => {
		window.location.href = 'dining.html';
	});
	// Campus Map modal handled by Bootstrap attributes
});

// Placeholder for future API fetch
async function loadEvents() {
	console.log('API coming soon...');
}
