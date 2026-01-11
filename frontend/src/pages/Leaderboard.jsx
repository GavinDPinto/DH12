import { useState, useEffect } from "react";
import { api } from "../utils/api.js";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
    // Get current user from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setCurrentUser(user.username);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await api.getLeaderboard();
      setLeaderboard(data.leaderboard);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-white text-xl">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">🏆 Global Leaderboard</h1>
        
        <div className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          {leaderboard.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No users found</p>
          ) : (
            <div className="divide-y divide-gray-800">
              {leaderboard.map((entry, index) => {
                const isCurrentUser = entry.username === currentUser;
                const rankColor = 
                  index === 0 ? "text-yellow-400" : 
                  index === 1 ? "text-gray-300" : 
                  index === 2 ? "text-amber-600" : 
                  "text-gray-500";
                
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 hover:bg-gray-800 transition ${
                      isCurrentUser ? "bg-gray-800 border-l-4 border-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className={`text-2xl font-bold w-12 text-center ${rankColor}`}>
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                      </span>
                      
                      <div className="flex-1">
                        <p className={`text-lg font-semibold ${isCurrentUser ? "text-blue-400" : "text-white"}`}>
                          {entry.username}
                          {isCurrentUser && <span className="ml-2 text-sm text-gray-400">(You)</span>}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-400">Level {entry.level}</p>
                        <p className="text-sm text-gray-400">{entry.total_points} points</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
