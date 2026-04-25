import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";

// Fallback App component since the original is missing
const App = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
    <h1 className="text-4xl font-bold mb-4">Hope Services Centre</h1>
    <p className="text-xl mb-8 text-center">Official website for Hope Services showcasing services, projects, and company information.</p>
    <div className="bg-card p-6 rounded-lg shadow-lg border border-border max-w-2xl w-full">
      <h2 className="text-2xl font-semibold mb-4">Deployment Note</h2>
      <p className="mb-4">
        The project structure was missing its main application components during the initial upload. 
        This is a placeholder entry point to enable successful deployment.
      </p>
      <div className="bg-muted p-4 rounded border border-border">
        <p className="text-sm font-mono">
          Missing files detected: App.tsx, components/*, pages/*
        </p>
      </div>
    </div>
  </div>
);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
