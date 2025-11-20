console.log("MVP starting...");

// Mock event data
const mockEvents = [
	{ id: 1, title: "Campus Concert", date: "2025-11-20", loc: "Campus Green" },
	{ id: 2, title: "Tech Expo", date: "2025-12-01", loc: "Engineering Hall" }
];

const mockDining = {
	breakfast: [{ name: "Breakfast Sandwich", price: 3.5 }],
	lunch: [{ name: "Chicken Salad", price: 6.25 }],
	dinner: [{ name: "Pasta Primavera", price: 7.5 }]
};

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

function wireSearch() {
	const input = document.getElementById('event-search');
	if (!input) return;
	input.addEventListener('input', (e) => {
		const q = e.target.value.toLowerCase();
		const filtered = mockEvents.filter(ev => ev.title.toLowerCase().includes(q) || (ev.loc || '').toLowerCase().includes(q));
		renderEvents(filtered);
	});
}

function showToast(message) {
	// Simple toast: create an element, show it for 2s, then remove it.
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

function addToCalendar(eventObj) {
	// Beginner-friendly: just show a confirmation instead of generating files.
	showToast(`Added "${eventObj.title}" to your calendar (placeholder)`);
}

document.addEventListener('click', e => {
	const target = e.target;
	if (target.classList.contains('add-calendar')) {
		const id = target.getAttribute('data-id');
		const ev = mockEvents.find(x => String(x.id) === String(id));
		if (ev) addToCalendar(ev);
	}
});

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

// Init on load
document.addEventListener('DOMContentLoaded', () => {
	renderEvents();
	wireSearch();
	renderDining();
});

// Placeholder for future API fetch
async function loadEvents() {
	console.log('API coming soon...');
}
