// Calculate level and progress based on points
const calculateLevel = (points) => {
  let level = 1;
  let totalRequired = 0;
  let increment = 100;
  
  while (points >= totalRequired + increment) {
    totalRequired += increment;
    level++;
    increment += 100;
  }
  
  const pointsInCurrentLevel = points - totalRequired;
  const pointsNeededForNextLevel = increment;
  const progress = (pointsInCurrentLevel / pointsNeededForNextLevel) * 100;
  
  return { level, progress, pointsInCurrentLevel, pointsNeededForNextLevel, totalRequired };
};

export default function TokenDisplay({ tokens = 0 }) {
    const { level, progress, pointsInCurrentLevel, pointsNeededForNextLevel } = calculateLevel(tokens);
    const radius = 50
    const circumference = Math.PI * radius
    const offset = circumference * (1 - progress / 100)
  return (
    <div className="w-1/2 h-1/2 flex items-center justify-center">
    <div className="w-180 h-150 flex flex-col items-center justify-center text-white text-center">
  <svg viewBox="0 0 120 60" className="w-full h-full">
    <path
      d="M10 50 A50 50 0 0 1 110 50"
      fill="none"
      stroke="#e5e7eb"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <path
        d="M10 50 A50 50 0 0 1 110 50"
        fill="none"
        stroke="url(#rainbow)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
    />
    <defs>
      <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="25%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#34d399" />
        <stop offset="75%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
  </svg>
  <div className="text-center mt-2">
    <p className="font-bold text-5xl">Level {level}</p>
    <p className="text-2xl text-gray-400 mt-1">{tokens} Tokens</p>
    <p className="text-sm text-gray-500 mt-1">{pointsInCurrentLevel} / {pointsNeededForNextLevel} to next level</p>
  </div>
</div>
</div>

  )
}
