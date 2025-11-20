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

function addToCalendar(eventObj) {
	// Create a minimal .ics file for the event
	const dt = eventObj.date.replace(/-/g, '') + 'T090000'; // 9:00 AM default
	const uid = `event-${eventObj.id}@lasell.edu`;
	const ics = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Lasell University//Campus Life//EN',
		'BEGIN:VEVENT',
		`UID:${uid}`,
		`DTSTAMP:${dt}Z`,
		`DTSTART:${dt}Z`,
		`SUMMARY:${eventObj.title}`,
		`LOCATION:${eventObj.loc || ''}`,
		'END:VEVENT',
		'END:VCALENDAR'
	].join('\r\n');

	const blob = new Blob([ics], { type: 'text/calendar' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `${eventObj.title.replace(/\s+/g,'_')}.ics`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
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
