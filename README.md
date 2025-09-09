# Wealth Dashboard React Auth

A modern wealth dashboard web application built with Next.js, React, and TypeScript. This project features authentication using Keycloak and OIDC, providing secure access to analytics, transactions, and alerts.

## Backend
This dashboard is designed to work with the backend provided at [fintech-event-streaming-template](https://github.com/Siddharth-Baichoo/fintech-event-streaming-template). Please refer to that repository for backend setup and API details.

## Features
- User authentication (Keycloak, OIDC)
- Dashboard overview
- Analytics and transaction tracking
- Alerts system
- Responsive UI

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- Docker (for Keycloak setup)

### Installation
1. Clone the repository:
   ```powershell
   git clone https://github.com/your-username/wealth-dashboard-react-auth.git
   ```
2. Install dependencies:
   ```powershell
   pnpm install
   ```
3. Start the development server:
   ```powershell
   pnpm dev
   ```

### Keycloak Setup
1. Navigate to the `keycloak/` directory.
2. Start Keycloak using Docker Compose:
   ```powershell
   cd keycloak; docker-compose up -d
   ```
3. Import the realm configuration (`realm-export-fintech.json`) via Keycloak admin console.

## Project Structure
```
wealth-dashboard-react-auth/
  app/            # Next.js app directory
  components/     # React components
  lib/            # Utility libraries (API, OIDC)
  public/         # Static assets
  ...
keycloak/         # Keycloak Docker setup and realm config
```

## Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server

## License
MIT

## Author
Siddharth Baichoo + Chat gpt (1 hour)
