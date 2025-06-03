# 🔐 Security and Incident Response System (SIRS)

**SIRS** (Security and Incident Response System) is a secure, AI-powered web platform that collects and monitors personal and sensitive data for anomalies using LSTM neural networks. It combines a Next.js frontend, Flask backend, and Auth0 authentication to ensure user privacy and real-time security.

---

## ⚙️ Key Features

- 🔐 **Auth0 Authentication** – Secure user login and identity management.
- 📁 **Dual Data Vaults** – Separate storage for **Personal Data** (e.g., name, address) and **Sensitive Data** (e.g., Aadhaar, PAN, bank info).
- 🧠 **LSTM Anomaly Detection** – AI-driven monitoring of user data for suspicious changes or tampering.
- 📦 **Local JSON Storage** – Each user's data is stored securely in a unique, hash-protected JSON file.
- 🔑 **Token-based Access** – Users can retrieve stored data using system-generated secure tokens.
- 📲 **Free SMS Alerts** – Real-time anomaly alerts via an alternative to Twilio (to be integrated).

---

## 🧱 Tech Stack

- **Frontend**: Next.js (React-based framework)
- **Backend**: Flask (Python)
- **Authentication**: Auth0
- **AI Model**: TensorFlow (LSTM)
- **Storage**: Local JSON files (planned migration to AWS S3)
- **Notifications**: SMS using a free alternative to Twilio

---

## 📁 Project Structure

sirs/
├── backend/                      # Flask backend
│   ├── app.py                   # API endpoints (data handling, routing)
│   ├── monitor.py               # LSTM anomaly detection logic
│   ├── utils.py                 # Utilities: hashing, alerting, token management
│   ├── model/
│   │   └── lstm_model.h5        # Pre-trained LSTM model for anomaly detection
│   └── vault/                   # Secure storage for user data (JSON files)
│
├── frontend/                    # Next.js frontend
│   ├── pages/                   # Application pages (e.g., login, vault forms)
│   │   ├── index.js             # Landing or dashboard page after login
│   │   ├── personal-data.js     # Form to collect personal data
│   │   ├── sensitive-data.js    # Form to collect sensitive data
│   │   └── access.js            # Token-based access to stored data
│   └── components/              # Reusable UI components
│
├── README.md                    # Project documentation
├── requirements.txt             # Python dependencies for backend
└── package.json                 # Node.js dependencies for frontend
