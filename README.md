> **Note:** live demo at [https://tickerdashboard.co.uk](https://tickerdashboard.co.uk).  

## Project Overview

Ticker Dashboard is a web-only application for tracking and visualizing real-time stock data. Users can browse live quotes, interactive charts, and manage custom watchlists—all without installing or building locally.

## Live Demo

- **URL:** [https://tickerdashboard.co.uk](https://tickerdashboard.co.uk)  
- No downloads, no installs—just open in your browser and explore.

## Key Features

- **Live Price Updates:** Fetches up-to-the-second stock prices via a the finnhub API.   
- **Responsive Design:** Fully functional on desktop and mobile browsers.  
- **Secure Authentication:** Password-less sign-in powered by Clerk.

## Technology Stack

- **Frontend:** React, a component-based UI library maintained by Meta 
- **Type Safety:** TypeScript adds static typing to JavaScript for improved tooling  
- **Build Tool:** Vite—a blazing-fast development server with Hot Module Replacement 
- **Backend:** Express.js, a minimal and flexible Node.js framework for building APIs 
- **Authentication:** Clerk for secure, password-less user management  
- **Database:** Firebase Firestore for persisting user preferences and watchlists  
- **Hosting:** Deployed on Railway under the custom domain `tickerdashboard.co.uk`

## Architecture Overview

```plaintext
Browser (React + Vite)
           ↓
   Clerk Authentication
           ↓
    Express.js API
           ↓
Firebase Firestore
```

1. **Browser:** Loads the React app served by Vite.  
2. **Clerk:** Handles sign-in/sign-up flows before API access.  
3. **Express.js:** Serves mock stock-data endpoints and watchlist CRUD.  
4. **Firebase Firestore:** Stores user-specific data securely.

## Contributing

Improvements and UI tweaks are welcome:

1. Fork the [GitHub repo](https://github.com/Hashim332/Ticker-Dashboard).  
2. Create a descriptive branch (`feature/…` or `fix/…`).  
3. Submit a pull request with a clear summary and, if relevant, screenshots.

## License

This project is licensed under the [MIT License](LICENSE).
