import { useState, useEffect } from "react";
import HomeScreen from "./pages/HomeScreen.jsx";
import Account from "./pages/Account.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import pp from "./assets/pp.png";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem("user");
  });
  const [authScreen, setAuthScreen] = useState("login"); // "login" | "signup" | null
  const [showSplash, setShowSplash] = useState(true);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-900 text-white overflow-hidden">

      {/* SPLASH SCREEN */}
      {showSplash && (
        <div className="flex flex-col fixed inset-0 z-50 bg-gray-900 flex items-center justify-center animate-swipeUp">
          <img
            src={pp}
            alt="App Logo"
            className="w-32 h-32 mb-6"
          />
          <h1 className="text-7xl font-bold text-white">
            Welcome to PeerPressure 
          </h1>
        </div>
      )}

      {/* APP CONTENT */}
      <div className="flex-1 overflow-auto p-20">

        {/* AUTH SCREENS */}
        {!loggedIn && authScreen === "login" && (
          <LogIn
            onLogin={() => {
              setLoggedIn(true);
              setActiveTab("home");
              setAuthScreen(null);
            }}
            onSignUp={() => setAuthScreen("signup")}
          />
        )}

        {!loggedIn && authScreen === "signup" && (
          <SignUp
            onSignUp={() => {
              setLoggedIn(true);
              setActiveTab("home");
              setAuthScreen(null);
            }}
            onBack={() => setAuthScreen("login")}
          />
        )}

        {/* MAIN APP */}
        {loggedIn && activeTab === "home" && <HomeScreen />}
        {loggedIn && activeTab === "leaderboard" && <Leaderboard />}
        {loggedIn && activeTab === "account" && (
          <Account
            onLogout={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setLoggedIn(false);
              setAuthScreen("login");
            }}
          />
        )}
      </div>

      {/* TAB BAR */}
      {loggedIn && (
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

function TabBar({ activeTab, setActiveTab }) {
  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 flex justify-around items-center gap-2 px-4">
      <Tab label="Home" icon="🏠" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
      <Tab label="Leaderboard" icon="🏆" active={activeTab === "leaderboard"} onClick={() => setActiveTab("leaderboard")} />
      <Tab label="Account" icon="👤" active={activeTab === "account"} onClick={() => setActiveTab("account")} />
    </div>
  );
}

function Tab({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col cursor-pointer items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
          : "text-gray-400 hover:text-white hover:bg-gray-800"
      }`}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
