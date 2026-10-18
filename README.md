# ECG Visualisation Platform

**A web application for visualising ECG (electrocardiogram) signals.**

Team project developed during my internship at the **National Institute for Research & Development in Informatics – ICI Bucharest** (March – June 2025), under the guidance of a mentor. The application lets users create an account, log in and explore an ECG recording on an interactive, zoomable chart.

---

## Features

- **User accounts**: registration and login with JWT authentication (access and refresh tokens).
- **ECG data API**: the back end reads ECG recordings from CSV files with pandas, cleans invalid rows and serves them as JSON. Large files are processed in chunks.
- **CSV upload**: an endpoint for uploading a new ECG recording.
- **Interactive chart**: the React front end displays the ECG signal with Chart.js, with zoom and pan.
- **Continuous integration**: GitHub Actions runs the back-end and front-end tests on every push and pull request.

---

## Tech stack

| Layer | Technologies |
|---|---|
| Front end | React, React Router, Chart.js, chartjs-plugin-zoom, Axios |
| Back end | Python, Django, Django REST Framework, Simple JWT, pandas |
| Database | SQLite |
| CI | GitHub Actions |

---

## My role

The team had four members: two on the front end and two on the back end. In each pair, one member built the features and the other tested them.

I was responsible for **testing the back end**: running the full application locally (Django API and React front end), verifying new features end to end (registration, login, ECG data loading and display) and giving feedback to the developers on functionality, structure and user experience.

---

## Project timeline

![Project timeline](docs/project-timeline.png)

---

## Project structure

```
ECG-Visualisation-Platform/
├── ekg_backend/       # Django project
│   ├── ekg/           # App: models, views, serializers, API routes, tests
│   └── ekg_backend/   # Settings and root URLs
├── src/, public/      # React front end (main version)
├── ekg-frontend/      # React front end (alternative version, used by CI)
├── ecg_clean.csv      # Sample ECG recording (time in seconds, voltage in mV)
└── .github/workflows/ # CI pipeline
```

---

## Getting started

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Back end

```bash
cd ekg_backend
python -m venv venv
# Windows: venv\Scripts\activate   |   macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API runs at `http://localhost:8000/api/`.
Optional environment variables: `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`.

### 2. Front end

```bash
npm install
npm start
```

The app runs at `http://localhost:3000/`.

---

## API overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register/` | Create an account |
| POST | `/api/token/` | Log in, returns JWT access and refresh tokens |
| POST | `/api/token/refresh/` | Refresh the access token |
| GET | `/api/ekg/` | ECG data from the sample CSV |
| POST | `/api/ekg/` | Upload a CSV file (`file`) and get the parsed ECG data |

---

## Credits

Team project developed at ICI Bucharest, 2025. Original repository by [cvs261](https://github.com/cvs261), released under the MIT License (see `LICENSE`).

Maintained on this profile by **Alexandru Donici** · [LinkedIn](https://www.linkedin.com/in/alexandru-donici-b5593819b/) · [GitHub](https://github.com/alexdonici)
