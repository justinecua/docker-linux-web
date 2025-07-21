import { useState } from "react";
import TerminalComponent from "./pages/Terminal";
import Challenges from "./pages/Challenges";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentView, setCurrentView] = useState("terminal");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-cyan-100 font-mono">
      {showIntro ? (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#111] relative overflow-hidden">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAgMEwxMDAgMjVWNzVMNTAgMTAwTDAgNzVWMjVMNTAgMFoiIHN0cm9rZT0iIzAwZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')] animate-pulse"></div>

          {/* Glowing center line */}
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"></div>

          <div className="relative z-10 text-center p-8 border border-cyan-400/10 bg-[#0a0a0a]/90 backdrop-blur-sm rounded-lg shadow-2xl shadow-cyan-400/10">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 border-2 border-cyan-400/50 rounded-lg flex items-center justify-center animate-pulse">
                <div className="w-12 h-12 border border-cyan-400/30 rounded-sm"></div>
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-4 tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                HACK4GOV TRAINING
              </span>
            </h1>
            <p className="mb-8 text-cyan-300/60 text-sm tracking-widest font-light uppercase">
              Free Linux Tutorial for Students
            </p>

            <button
              onClick={() => setShowIntro(false)}
              className="px-8 py-3 bg-[#0a0a0a] text-cyan-300 border border-cyan-400/20 hover:bg-cyan-400/10 hover:border-cyan-400/40 hover:text-white transition-all duration-200 tracking-wider group relative overflow-hidden"
            >
              <span className="relative z-10">START</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>

            <div className="mt-8 text-xs text-cyan-400/40 tracking-widest">
              <p>v0.0.1</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
          <header className="bg-[#0a0a0a] border-b border-cyan-400/10">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="text-lg text-cyan-300 font-light tracking-tight flex items-center">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
                <span className="text-cyan-400 font-medium">root@hack4gov</span>
                :~${" "}
                <span className="ml-1 text-cyan-400/40">// secure_session</span>
              </div>
              <nav className="flex space-x-6">
                <button
                  onClick={() => setCurrentView("challenges")}
                  className={`px-3 py-1 text-xs tracking-widest uppercase flex items-center ${
                    currentView === "challenges"
                      ? "text-white before:content-['>_'] before:mr-1 before:text-cyan-400"
                      : "text-cyan-400/60 hover:text-cyan-300"
                  }`}
                >
                  Challenges
                </button>
                <button
                  onClick={() => setCurrentView("terminal")}
                  className={`px-3 py-1 text-xs tracking-widest uppercase flex items-center ${
                    currentView === "terminal"
                      ? "text-white before:content-['>_'] before:mr-1 before:text-cyan-400"
                      : "text-cyan-400/60 hover:text-cyan-300"
                  }`}
                >
                  Terminal
                </button>
              </nav>
            </div>
          </header>

          <main className="flex-grow container mx-auto px-4 py-6">
            {currentView === "terminal" ? (
              <TerminalComponent />
            ) : (
              <Challenges />
            )}
          </main>

          <footer className="bg-[#0a0a0a] border-t border-cyan-400/10 py-3 text-center text-xs text-cyan-400/40 tracking-widest flex justify-between px-8">
            <p>HACK4GOV v0.0.1</p>
            <p className="flex items-center">
              ©2025 PracticeLinux. All rights reserved
            </p>
            <p>Developed by Justine Cua</p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
