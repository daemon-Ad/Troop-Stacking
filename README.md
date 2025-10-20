# Troop Optimizer

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

---

## What It Does

**Troop Optimizer** is a strategic calculation tool designed to help you determine the most efficient troop composition for your military engagements. By analyzing your health bonuses and leadership capacity constraints, the application computes optimal unit distributions that maximize valor point generation while maintaining tactical superiority on the battlefield.

The system transforms complex mathematical relationships between troop statistics, health modifiers, and capacity limitations into actionable strategic insights, enabling commanders to make data-driven decisions about force composition without manual calculation overhead.

![Application Preview](./git-images/preview.png)

---

## Features

The application delivers real-time troop optimization through an intuitive web interface, processing your health bonuses and leadership constraints to generate optimal unit distributions instantly. Sophisticated algorithms automatically layer troops based on health thresholds and combat effectiveness, ensuring efficient deployment of higher-tier units while maintaining tactical superiority.

The system includes an import/export feature for saving custom configurations, seamless light/dark mode switching, and a step-based workflow that guides users through the optimization process while maintaining full transparency into calculations and allocation logic.

---

## Project Structure

```
troop-optimizer/
├── backend/
│   ├── main.py                # FastAPI entry point
│   ├── core/
│   │   ├── logic.py           # Core troop optimization logic
│   │   ├── utils.py           # Helper utilities
│   │   └── data_loader.py     # JSON reader for troop data
│   └── troops_data.json       # Base data file for troop stats
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/        # InputPanel, ResultsTable, SummaryPanel
│   │   └── api/api.js         # Axios API integration
│
└── README.md
```

---

## Built With

- **Python (FastAPI)** — High-performance asynchronous backend framework for rapid API development
- **React + Vite** — Modern frontend stack combining component-based architecture with lightning-fast build tooling
- **Axios** — Promise-based HTTP client for seamless backend communication
- **TailwindCSS** — Utility-first CSS framework enabling responsive and maintainable styling

---

## License

This project is licensed under the **GNU General Public License v3.0 (GPLv3)**.

You are free to use, modify, and distribute this software, provided that any derivative works remain open source under the same license terms. See the [LICENSE](LICENSE) file for complete details.