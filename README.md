# ⚡ Gym Companion

**Stronger every day, smarter every rep.**  
Complete workout + nutrition tracking — Powered by WGER API.

---

## 📖 About the Project

**Gym Companion** is an all-in-one fitness companion web application.  
It helps users **track workouts, explore exercises, and manage nutrition** in one place.  

The app integrates with the **[WGER API](https://wger.de/en/software/api)** for up-to-date exercise and nutrition data.  

---

## ✨ Features

- 🏠 **Home Dashboard** — Quick stats showing total workouts, sets, and reps logged.  
- 🏋️ **Exercise Database** — Search and filter exercises with descriptions and embedded demo videos.  
- 📊 **Workout Tracker** — Log workouts with sets, reps, weight, duration, and notes.  
- 📈 **Progress Analytics** — View charts and graphs of your activity over time:
  - Daily activity (line chart)
  - Most frequent exercises (bar chart)
  - Exercise distribution (pie chart)  
- 🍎 **Nutrition Search** — Look up foods and ingredients to view nutritional values. *(Currently includes a known bug: search sometimes returns duplicate results — to be fixed in future updates).*  
- ⚠️ **Error Handling** — Graceful fallbacks and error messages if the API is unavailable.  

---

## 🛠️ Tech Stack

- **React 18**
- **React Router DOM**
- **Tailwind CSS** for styling
- **Axios** for API requests
- **Recharts** for charts and analytics
- **WGER API** for exercise & nutrition data

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/<your-username>/gym-companion.git
cd gym-companion

2. Install Dependencies
npm install

3. Run the App
npm run dev

📂 Project Structure
fitness-tracker-capstone/
├── data/
│   └── exercises.js
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── pages/
│   │   │   ├── ExercisesPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── NutritionPage.jsx
│   │   │   └── TrackerPage.jsx
│   │   └── services/
│   │   │   ├── wgerService.js
│   │   └── utils/
│   │       ├── storage.js
│   │       └── videoLibrary.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js

🧪 Known Issues / Bugs

🍞 Nutrition Search Bug: Searching for different foods (e.g., “rice” vs “bread”) may return the same results.
This happens due to query handling with the API and will be addressed in future updates.

🤝 Contributing

Contributions are welcome!

Fork the repo

Create a new branch (feature/amazing-feature)

Commit changes (git commit -m 'feat: add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

📜 License

This project is open source under the MIT License.

🙏 Acknowledgements

WGER API
 — for exercise and nutrition data

Tailwind CSS — for styling

Recharts — for progress analytics

Inspiration from fitness tracking apps & personal workout needs

👨‍💻 Author

Eviano James

linkedin: https://www.linkedin.com/in/james-eviano/