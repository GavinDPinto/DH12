export default function Account() {

  return (
    <div className="h-full overflow-y-auto flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-8">

        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
            AJ
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">Angeni Jerish</h1>
            <p className="text-gray-400">Engineering I · Mechatronics</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Stat label="Tokens" value="125" />
          <Stat label="Tasks Completed" value="42" />
          <Stat label="Streak" value="7 days" />
          <Stat label="Level" value="3" />
        </div>

        <div className="bg-gray-800 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-white mb-2">About</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            First-year engineering student focused on building productive habits,
            balancing academics, and staying consistent. Loves clean UIs and
            shipping projects.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <ProfileButton onClick={() => {}} label="Edit Profile" />
          <ProfileButton onClick={() => {}} label="Settings" />
          <ProfileButton
            label="Log Out"
            danger
          />
        </div>

      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 text-center">
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}

function ProfileButton({ label, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-xl font-semibold transition ${
        danger
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-gray-700 hover:bg-gray-600 text-white"
      }`}
    >
      {label}
    </button>
  );
}
