import React, { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import RadiologyPage from "./components/RadiologyPage";
import { Brain, Stethoscope } from "lucide-react";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "radiology">(
    "landing"
  );
  // Backend wake-up logic
  useEffect(() => {
    const BACKEND_URL = "https://lung-disease-detection-wvi9.onrender.com/";
    const MAX_ATTEMPTS = 4;
    const TIMEOUT = 20000; // 20 seconds

    const fetchWithTimeout = (url: string, timeout: number) => {
      return new Promise<Response>((resolve, reject) => {
        const controller = new AbortController();
        const timer = setTimeout(() => {
          controller.abort();
        }, timeout);

        fetch(url, { signal: controller.signal })
          .then((response) => {
            clearTimeout(timer);
            resolve(response);
          })
          .catch((err) => {
            clearTimeout(timer);
            reject(err);
          });
      });
    };

    const pingBackend = async () => {
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          const res = await fetchWithTimeout(BACKEND_URL, TIMEOUT);
          const data = await res.json();
          if (data?.message === "Lung Disease Detection API is running") {
            console.log(`✅ Backend awake on attempt ${attempt}`);
            break;
          }
        } catch (error: unknown) {
          console.warn(`⚠️ Attempt ${attempt} failed to wake backend.`, error);
        }
      }
    };

    pingBackend();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LungAI</h1>
                <p className="text-sm text-blue-200">Diagnostic Support</p>
              </div>
            </div>

            <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setCurrentPage("landing")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPage === "landing"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setCurrentPage("radiology")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  currentPage === "radiology"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>AI Analysis</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="pt-20">
        {currentPage === "landing" ? <LandingPage /> : <RadiologyPage />}
      </div>
    </div>
  );
}

export default App;
