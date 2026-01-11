# Master Korea Itinerary 2025

A personal travel itinerary planner and budget tracker web application designed for a trip to South Korea in 2025. This application helps organize attractions, cafes, restaurants, and shopping lists while keeping track of expenses in both KRW and USD.

## Features

- **Itinerary Management**: View, add, edit, and delete travel items.
- **Categorization**: Filter items by categories (e.g., Palaces & History, Cafes & Districts, Shopping List).
- **Status Tracking**: Mark items as "Done" to move them to an Archive view.
- **Budget Tracker**: Real-time calculation of total budget, amount spent, and remaining funds.
  - Supports dual currency display (KRW / USD).
  - Visual progress bar.
- **Data Persistence**:
  - **Firebase Firestore**: Syncs data to the cloud.
  - **LocalStorage**: Fallback for offline access or local settings.
- **Responsive Design**: Mobile-friendly interface with a pastel aesthetic.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Backend/Database**: Firebase Firestore (v10).
- **Styling**: Custom CSS with CSS variables for theming.

## Setup & Usage

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/master-korea-itinerary.git
   ```

2. **Open the application**:
   Since this is a static web application using ES modules, it is recommended to serve it using a local server to avoid CORS issues.
   - Using Python: `python -m http.server`
   - Using VS Code Live Server extension.
   - Or simply open `index.html` in a modern browser (functionality may vary depending on browser security policies regarding local files).

3. **Firebase Configuration**:
   The project is currently configured with a specific Firebase project in `index.html`. To use your own backend:
   - Create a project in the Firebase Console.
   - Create a Firestore database.
   - Update the `firebaseConfig` object in `index.html` with your own credentials.

## Project Structure

- `index.html`: Main entry point containing the DOM structure and Firebase initialization.
- `script.js`: Core logic for state management, rendering, event handling, and database operations.
- `styles.css`: Global styles, responsive layout, and pastel color themes.

## Notes

- **Currency Conversion**: Currently set to a fixed rate (1 USD = 1,438.98 KRW) in `script.js`.
- **Budget**: Default total budget is set to $1,000 USD (configurable in `script.js`).