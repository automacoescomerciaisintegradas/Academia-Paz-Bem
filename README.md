# Academia Paz & Bem
A high-conversion landing page and enrollment platform for online theological courses, featuring user registration and a streamlined payment process.
[cloudflarebutton]
Academia Paz & Bem is a visually stunning, high-conversion educational platform designed for the 'Escola PAZ e BEM'. It serves as a comprehensive landing page and enrollment portal for online biblical and theological courses. The application is built on Cloudflare's edge network, utilizing Workers and Durable Objects for a fast, scalable, and secure user experience. The primary goal is to transform visitors into enrolled students through an intuitive and persuasive user journey.
## Key Features
- **High-Conversion Landing Page:** Designed to engage visitors and guide them towards enrollment.
- **Seamless User Registration:** A clean, multi-step form for user registration with robust validation.
- **Mock PIX Payment Flow:** A simulated payment process to complete the enrollment journey.
- **Dynamic Content:** Course categories and articles are managed and served dynamically from the backend.
- **Modern & Responsive UI:** Built with ShadCN UI and Tailwind CSS for a beautiful experience on any device.
- **Edge-First Architecture:** Powered by Cloudflare Workers and Durable Objects for global low-latency performance.
## Technology Stack
- **Frontend:** React, Vite, React Router, TypeScript
- **UI:** ShadCN UI, Tailwind CSS, Framer Motion, Lucide React
- **State Management:** Zustand
- **Forms:** React Hook Form, Zod
- **Backend:** Cloudflare Workers, Hono
- **Storage:** Cloudflare Durable Objects
- **Tooling:** Bun, Wrangler CLI
## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
- [Bun](https://bun.sh/) installed on your machine.
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for interacting with the Cloudflare platform.
### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/academia_paz_e_bem.git
    cd academia_paz_e_bem
    ```
2.  **Install dependencies:**
    This project uses Bun for package management.
    ```bash
    bun install
    ```
## Development
To start the development server, which includes the Vite frontend and a local Wrangler instance for the backend Worker, run:
```bash
bun dev
```
This will typically start the frontend on `http://localhost:3000` and the worker on a separate port managed by Wrangler. The Vite dev server is configured to proxy API requests to the local worker.
### A Note on Websocket Errors in Development
During development (`bun dev`), you may see a console error message like `[vite] failed to connect to websocket`. This is a known issue related to Vite's Hot Module Replacement (HMR) within the specific proxying environment used for local development.
**This error only affects the development server and does not impact the production build.** The application will function correctly when deployed to Cloudflare. You can safely ignore this message during local development.
## Deployment
This project is designed for seamless deployment to the Cloudflare network.
1.  **Build the project:**
    This command bundles the frontend application and the worker code.
    ```bash
    bun build
    ```
2.  **Deploy to Cloudflare:**
    Make sure you are logged in to your Cloudflare account via the Wrangler CLI (`wrangler login`). Then, run the deploy command:
    ```bash
    bun deploy
    ```
Alternatively, you can deploy directly from your GitHub repository using the button below.
[cloudflarebutton]
## Project Structure
-   `src/`: Contains the frontend React application source code.
    -   `pages/`: Top-level page components.
    -   `components/`: Reusable UI components, including ShadCN UI elements.
    -   `lib/`: Utility functions and API client.
    -   `hooks/`: Custom React hooks.
-   `worker/`: Contains the Cloudflare Worker backend code.
    -   `index.ts`: The entry point for the worker.
    -   `user-routes.ts`: API route definitions.
    -   `entities.ts`: Data models and logic for Durable Objects.
-   `shared/`: TypeScript types and constants shared between the frontend and the worker.
## License
This project is licensed under the MIT License.