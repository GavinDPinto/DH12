export default function TaskCard({ task, taskIdx, messageId, isSelected, onToggleSelect, onDelete }) {
  return (
    <div
      className={`bg-gray-800 border rounded-lg p-3 cursor-pointer text-gray-200 text-sm transition ${
        isSelected
          ? "border-blue-500 shadow-lg shadow-blue-500/30"
          : "border-gray-700 opacity-60"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(`${messageId}-${taskIdx}`)}
          className="mt-1 w-4 h-4 cursor-pointer"
        />
        <div className="flex-1">
          <p className="font-semibold text-white">{task.title}</p>
          <p className="text-gray-400 text-xs mt-1">{task.description}</p>
          <div className="mt-2 flex gap-2 text-xs">
            <span className="bg-blue-600 bg-opacity-50 px-2 py-1 rounded">{task.points} pts</span>
            <span className="bg-purple-600 bg-opacity-50 px-2 py-1 rounded">{task.type}</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(messageId, taskIdx)}
          className="text-red-400 hover:text-red-300 text-xl cursor-pointer leading-none"
          title="Delete this task"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
