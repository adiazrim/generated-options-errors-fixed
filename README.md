# FlowIntel: Unusual Options Activity Monitor
<a href="https://deploy.workers.cloudflare.com/?url=https://github.com/adiazrim/orionoptions-almost-final" target="_blank">
  <img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare">
</a>
FlowIntel is a sophisticated, visually stunning end-of-day analyzer for unusual options activity (UOA). It's designed to provide traders with a high-level overview of the most significant market movements, highlighting high-probability opportunities through a weighted scoring system. The application features a data-dense, single-page dashboard with interactive filtering and sorting capabilities. Key components include a 'Top Highlights' section for the three most promising stocks, a comprehensive data table for deeper analysis, and an intuitive filtering panel to screen opportunities by sector and price. The entire interface is built with a focus on visual clarity, intuitive interaction, and performance, ensuring a professional-grade user experience.
## ✨ Key Features
-   **Comprehensive Dashboard**: A single-page, data-dense interface for end-of-day analysis of options flow.
-   **Top 3 Highlights**: Prominently displays the top 3 stocks based on a proprietary probability score for quick insights.
-   **Advanced Filtering**: Dynamically filter opportunities by sector (AI, Energy, Crypto, etc.) and price range.
-   **Real-time Sorting**: Sort the entire dataset by key metrics like Probability Score, RSI, Volume Ratio, and more.
-   **Weighted Scoring System**: A unique probability score calculated based on UOA volume (40%), Open Interest delta (25%), RSI alignment (20%), and sentiment momentum (15%).
-   **Detailed Data Table**: View all opportunities with critical data points including Ticker, Price, Sector, RSI, Volume Ratio, UOA %, OI Change, and Flow Direction.
-   **Visual Clarity**: A modern, dark-themed UI with color-coded indicators for bullish/bearish flows and RSI levels, designed for optimal data visualization.
## ���️ Technology Stack
-   **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Backend & Deployment**: [Hono](https://hono.dev/), [Cloudflare Workers](https://workers.cloudflare.com/)
## 🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
-   [Node.js](https://nodejs.org/en/) (v18 or later recommended)
-   [Bun](https://bun.sh/) package manager
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up)
### Installation
1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/flowintel_options_monitor.git
    cd flowintel_options_monitor
    ```
2.  **Install dependencies:**
    This project uses Bun for package management.
    ```sh
    bun install
    ```
## 💻 Development
To run the application in development mode, which includes hot-reloading for both the frontend and the worker backend:
```sh
bun run dev
```
This will start the Vite development server, typically available at `http://localhost:3000`.
## ☁️ Deployment
This application is designed for seamless deployment to Cloudflare Workers.
1.  **Login to Wrangler:**
    First, ensure you are logged into your Cloudflare account via the Wrangler CLI.
    ```sh
    npx wrangler login
    ```
2.  **Deploy the application:**
    Run the deploy script. This will build the Vite frontend and deploy the application using Wrangler.
    ```sh
    bun run deploy
    ```
After deployment, Wrangler will provide you with the URL to your live application.
Alternatively, you can deploy directly from your GitHub repository with a single click:
<a href="https://deploy.workers.cloudflare.com/?url=https://github.com/adiazrim/orionoptions-almost-final" target="_blank">
  <img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare">
</a>
## 📂 Project Structure
The project is organized into three main directories:
-   `src/`: Contains the entire React frontend application, including pages, components, hooks, and styles.
-   `worker/`: Contains the Hono backend application that runs on Cloudflare Workers. All API logic resides here.
-   `shared/`: Contains TypeScript types and mock data shared between the frontend and the worker, ensuring type safety across the stack.
## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.