# Foreweather 🌦️

Your personal weather forecast application. Built with **React**, **Vite**, and **Tailwind CSS**, and powered by the **Open-Meteo API** to deliver accurate weather data.

---

## 📌 Description

Foreweather is a **lightweight and modern web application** that displays weather forecasts for any location. It uses React for the user interface, Vite as a fast build tool for an optimal development experience, and Tailwind CSS for flexible, responsive styling. Weather information is fetched from the **Open-Meteo API**, which requires no API keys or complex configuration.

---

## 🚀 Features

- 🔎 **Location search** to view current weather and forecasts  
- 🌍 **Real-time weather data** (temperature, conditions, etc.)  
- 📊 **Modern, responsive design** with Tailwind CSS  
- ⚡ **Fast development workflow** with Vite and React  
- 🔌 **Open-Meteo API integration** for free, no-auth forecasts  

---

## 🧱 Technologies Used

| Technology | Purpose |
|------------|---------|
| **React** | Declarative, component-based UI |
| **Vite** | Ultra-fast build and dev server |
| **Tailwind CSS** | Utility-first, responsive styling |
| **Open-Meteo API** | Live weather data |
| **JavaScript / HTML / CSS** | Core frontend languages |

---

## 🧾 Installation

Follow these steps to run Foreweather locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/faidrn/foreweather.git

2. **Navigate to the project directory:**
   ```bash
   cd foreweather

3. **nstall dependencies:**
   ```bash
   npm install

4. **Start the development server:**
   ```bash
   npm run dev

5. Open your browser at http://localhost:5173 (or the URL shown by Vite). ✨

## 📦 Project Structure
```plaintext
foreweather/
├── public/                    # Static assets
├── src/
│   ├── components/            # React components
│   ├── styles/                # Custom styles
│   ├── App.jsx                # Main app component
│   └── main.jsx               # App entry point
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 📡 Weather Data

Foreweather uses the Open-Meteo API, a public API that requires no authentication and provides:

+ 📍 Forecasts by coordinates
+ 🌡️ Current temperature
+ ☁️ Sky conditions
+ 🌞 Hourly and daily forecasts

You can customize the API requests in the code to extend the available data.

## 🤝 Contributing

1. Contributions are welcome!
2. Fork the repository
3. Create a feature branch (```git checkout -b feature/your-feature-name```)
4. Commit your changes (```git commit -m "Add …```")
5. Push your branch (```git push origin feature/your-feature-name```)
6. Open a pull request describing your changes

## 📝 License

This project is licensed under the **MIT License.**

## 😊 About

Created by **faidrn** — feel free to open issues or suggest improvements via GitHub.