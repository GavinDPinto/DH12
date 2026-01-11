import TaskSuggestions from "./TaskSuggestions.jsx";

export default function ChatMessage({
  message,
  messageIdx,
  taskList,
  selectedTasks,
  loading,
  onToggleSelect,
  onDeleteTask,
  onAddSelectedTasks,
  onGenerateMore,
}) {
  const messageId = message.messageId || messageIdx;

  return (
    <div>
      <div
        className={`px-4 py-2 rounded-xl max-w-[75%] ${
          message.sender === "user"
            ? "bg-blue-500 text-white self-end ml-auto"
            : "bg-gray-700 text-white self-start"
        }`}
      >
        {message.text}
      </div>
      {message.isConfirmation && (
        <div className="mt-2 text-sm text-green-400">✓ {message.text}</div>
      )}
      <TaskSuggestions
        tasks={taskList}
        messageId={messageId}
        selectedTasks={selectedTasks}
        loading={loading}
        onToggleSelect={onToggleSelect}
        onDelete={onDeleteTask}
        onAddSelected={onAddSelectedTasks}
        onGenerateMore={onGenerateMore}
      />
    </div>
  );
}
