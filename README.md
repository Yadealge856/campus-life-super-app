# Lasell University Campus Life Super App

## Description
A responsive web app for Lasell University students to explore campus events, dining options, and campus resources. The app is designed for accessibility, mobile-friendliness, and ease of use.

## Purpose
- Centralize campus information for students
- Provide live event and dining info
- Offer interactive features and campus map

## Technologies Used
- HTML5 (semantic structure)
- CSS3 (custom styles, responsive layout, media queries)
- Bootstrap 5 (responsive components)
- JavaScript (event-driven interactivity)
- OpenWeather API (live weather)
- GitHub Pages (deployment)

## Setup & Deployment
1. Clone the repository:
   ```
   git clone https://github.com/Yadealge856/campus-life-super-app.git
   ```
2. Open `index.html` in your browser, or use a local server:
   ```
   # Python 3
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```
3. For deployment, push to GitHub and enable GitHub Pages in repo settings (branch: `gh-pages`).

## Features & Usage
- **Home Page:**
  - Welcome section, live weather, feature cards for Events, Dining, and Campus Map
  - Navigation bar for all pages
- **Events Page:**
  - Searchable list of campus events
  - "Add to Calendar" button (shows confirmation)
- **Dining Page:**
  - Lists breakfast, lunch, and dinner options
- **Campus Map:**
  - Modal popup with campus map image
- **Accessibility:**
  - Semantic headings, alt text, color contrast, ARIA attributes
- **Responsive Design:**
  - Works on desktop, tablet, and mobile

## Future Improvements / Stretch Goals
- Real-time event and dining data from campus APIs
- User authentication and personalized dashboard
- Interactive campus map (with locations and directions)
- Push notifications for new events or dining updates
- Enhanced calendar integration (ICS download)
- Dark mode toggle

## Commit History
- Project contains 10+ commits with clear, descriptive messages for each feature and improvement.

## License
MIT
