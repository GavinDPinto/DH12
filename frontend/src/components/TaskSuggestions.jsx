import { useState } from "react";
import TaskCard from "./TaskCard.jsx";

export default function TaskSuggestions({
  tasks,
  messageId,
  selectedTasks,
  loading,
  onToggleSelect,
  onDelete,
  onAddSelected,
  onGenerateMore,
}) {
  const [showAll, setShowAll] = useState(false);

  if (!tasks || tasks.length === 0) return null;

  const displayedTasks = showAll ? tasks : tasks.slice(0, 5);
  const hasMore = tasks.length > 5;

  return (
    <div className="mt-3 space-y-2 max-w-[90%]">
      <p className="text-gray-400 text-sm font-semibold">Suggested tasks:</p>
      {displayedTasks.map((task, taskIdx) => {
        const taskKey = `${messageId}-${taskIdx}`;
        const isSelected = selectedTasks[taskKey];

        return (
          <TaskCard
            key={taskIdx}
            task={task}
            taskIdx={taskIdx}
            messageId={messageId}
            isSelected={isSelected}
            onToggleSelect={onToggleSelect}
            onDelete={onDelete}
          />
        );
      })}
      {hasMore && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full text-blue-400 hover:text-blue-300 text-sm font-semibold py-2 rounded-lg transition"
        >
          Show All ({tasks.length} tasks)
        </button>
      )}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onAddSelected(messageId)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-2 rounded-lg transition"
        >
          Add Selected to List
        </button>
      </div>
    </div>
  );
}
